import os
import jwt
from flask import request, jsonify, send_from_directory, current_app
from flask_cors import CORS
from config import app, db
from models import User, Attendee, Organizer, UserRole, Event
from werkzeug.security import generate_password_hash, check_password_hash
from werkzeug.utils import secure_filename
from datetime import datetime, timedelta
from functools import wraps

# CORS(app)  

# User Routes:
@app.route("/users", methods=["GET"])
def get_users():
    users = User.query.all()
    json_users = [user.to_json() for user in users]
    return jsonify({"users": json_users})

@app.route("/create_user", methods=["POST"])
def create_users():
    data = request.json
    role = data.get("role")
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")

    if not role or not name or not email or not password:
        return (
            jsonify({"message": "Missing required fields"}),
            400,
        )

    if role == UserRole.ATTENDEE.value:
        new_user = Attendee(name=name, email=email, password=password, role=UserRole.ATTENDEE)
    elif role == UserRole.ORGANIZER.value:
        new_user = Organizer(name=name, email=email, password=password, role=UserRole.ORGANIZER)
    else:
        return jsonify({"message": "Invalid role"}), 400
        

    try:
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({"message": str(e)}), 400

    return jsonify({"message": f"{role.capitalize()} created!"}), 201

@app.route("/update_user/<int:user_id>", methods=["PATCH"])
def update_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    data = request.json
    user.name = data.get("name", user.name)
    user.email = data.get("email", user.email)

    if data.get("password"):
        user.password = data["password"]
    user.role = UserRole(data["role"])

    db.session.commit()

    return jsonify({"message": "User updated."}), 200

@app.route("/delete_user/<int:user_id>", methods=["DELETE"])
def delete_user(user_id):
    user = User.query.get(user_id)

    if not user:
        return jsonify({"message": "User not found"}), 404

    db.session.delete(user)
    db.session.commit()

    return jsonify({"message": "User deleted!"}), 200


### Authentication Routes:
@app.route("/register", methods=["POST"])
def register_user():
    data = request.json
    name = data.get("name")
    email = data.get("email")
    password = data.get("password")
    hashed_password = generate_password_hash(password)
    # role = data.get("role")  # "attendee" or "organizer"

    if not all([name, email, password]):
        return jsonify({"message": "All fields are required."}), 400

    if User.query.filter_by(email=email).first():
        return jsonify({"message": "Email already registered."}), 409

    # if role == UserRole.ATTENDEE.value:
    #     new_user = Attendee(name=name, email=email, password=password, role=UserRole.ATTENDEE)
    # elif role == UserRole.ORGANIZER.value:
    #     new_user = Organizer(name=name, email=email, password=password, role=UserRole.ORGANIZER)
    # else:
    #     return jsonify({"message": "Invalid role."}), 400
    new_user = User(name=name, email=email, password=hashed_password)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Account registered successfully!"}), 201

def token_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None
        if 'Authorization' in request.headers:
            bearer = request.headers['Authorization']
            if bearer.startswith("Bearer "):
                token = bearer[7:]
        if not token:
            return jsonify({'message': 'Token is missing!'}), 401
        try:
            data = jwt.decode(token, SECRET_KEY, algorithms=["HS256"])
            current_user = User.query.get(data['user_id'])
        except Exception as e:
            return jsonify({'message': 'Token is invalid!'}), 401
        return f(current_user, *args, **kwargs)
    return decorated

SECRET_KEY = "your_secret_key" 
@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and check_password_hash(user.password, password):
        token = jwt.encode(
            {
                "user_id": user.id,
                "exp": datetime.utcnow() + timedelta(hours=1)
            },
            SECRET_KEY,
            algorithm="HS256"
        )
        return jsonify({"message": "Login successful", "token": token, "user": user.to_json()}), 200
    return jsonify({"message": "Invalid credentials"}), 401

@app.route("/check-email", methods=["POST"])
def check_email():
    data = request.json
    email = data.get("email")
    if not email:
        return jsonify({"exists": False}), 400
    user = User.query.filter_by(email=email).first()
    return jsonify({"exists": bool(user)})

@app.route("/reset_password", methods=["POST"])
def reset_password():
    data = request.json
    email = data.get("email")
    new_password = data.get("new_password")

    if not email or not new_password:
        return jsonify({"message": "Email and new password are required."}), 400

    user = User.query.filter_by(email=email).first()
    if not user:
        return jsonify({"message": "User not found."}), 404

    user.password = generate_password_hash(new_password)
    db.session.commit()

    return jsonify({"message": "Password updated successfully."}), 200


# Event Routes:
@app.route("/events", methods=["GET"])
# @token_required
# def get_events(current_user):
def get_events():
    events = Event.query.all()
    return jsonify([event.to_json() for event in events])


ALLOWED_EXTENSIONS = {'png', 'jpg', 'jpeg', 'gif'}
def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

@app.route("/create_event", methods=["POST"])
# @token_required
# def create_event(current_user):
def create_event():
    """
    data = request.json
    # Organizer should be authenticated in a real system
    new_event = Event(**data)
    db.session.add(new_event)
    db.session.commit()
    return jsonify({"message": "Event created!"}), 201
    """
    title = request.form.get('title')
    description = request.form.get('description')
    location = request.form.get('location')
    # category = request.form.get('category')
    # ticket_price = request.form.get('ticket_price')
    # tickets_available = request.form.get('tickets_available')
    date_str = request.form.get('date')
    print("Received date_str:", date_str) 

    date = None
    if date_str:
        try:
            # Try parsing with time first
            date = datetime.strptime(date_str, "%Y-%m-%dT%H:%M")
        except ValueError:
            try:
                # Fallback to date only
                date = datetime.strptime(date_str, "%Y-%m-%d")
            except ValueError:
                return jsonify({"message": "Invalid date format. Use YYYY-MM-DD or YYYY-MM-DDTHH:MM."}), 400
            

    image_url = ""
    if 'image' in request.files:
        image = request.files['image']
        if image and allowed_file(image.filename):
            filename = secure_filename(image.filename)
            save_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
            os.makedirs(os.path.dirname(save_path), exist_ok=True)
            image.save(save_path)
            image_url = f"/images/events/{filename}"
    
    new_event = Event(
        title=title,
        description=description,
        date=date,
        location=location,
        image_url=image_url,
        # organizer_id=current_user.id
        # category=category,
        # ticket_price=ticket_price,
        # tickets_available=tickets_available,
    )
    
    db.session.add(new_event)
    db.session.commit()
    return jsonify({"message": "Event created!", "image_url": image_url}), 201

@app.route('/images/events/<filename>')
def serve_event_image(filename):
    print("Serving from:", current_app.config['UPLOAD_FOLDER'])
    return send_from_directory(current_app.config['UPLOAD_FOLDER'], filename)

@app.route("/my_events", methods=["GET"])
# @token_required
# def my_events(current_user):
def my_events():
    # events = Event.query.filter_by(organizer_id=current_user.id).all()
    events = Event.query.all()
    return jsonify([event.to_json() for event in events])

@app.route("/event/<int:event_id>", methods=["GET"])
# @token_required
# def get_event(current_user, event_id):
def get_event(event_id):
    event = Event.query.get_or_404(event_id)
    return jsonify(event.to_json())

@app.route("/event/<int:event_id>", methods=["DELETE"])
# @token_required
# def delete_event(current_user, event_id):
def delete_event(event_id):
    event = Event.query.get_or_404(event_id)
    db.session.delete(event)
    db.session.commit()
    return jsonify({"message": "Event deleted successfully"}), 200

@app.route("/search", methods=["GET"])
def search_events():
    query = request.args.get("query", "")
    events = Event.query.filter(Event.title.ilike(f"%{query}%")).all()
    return jsonify([event.to_json() for event in events])


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True, port=5000)

# @app.route("/event/<int:event_id>", methods=["GET"])
# def get_event(event_id):
#     event = Event.query.get(event_id)
#     if not event:
#         return jsonify({"message": "Event not found"}), 404
#     return jsonify(event.to_json())

# @app.route("/update_event/<int:event_id>", methods=["PATCH"])
# def update_event(event_id):
#     event = Event.query.get(event_id)
#     if not event:
#         return jsonify({"message": "Event not found"}), 404
#     data = request.json
#     # Update fields...
#     db.session.commit()
#     return jsonify({"message": "Event updated"}), 200

# @app.route("/delete_event/<int:event_id>", methods=["DELETE"])
# def delete_event(event_id):
#     event = Event.query.get(event_id)
#     if not event:
#         return jsonify({"message": "Event not found"}), 404
#     db.session.delete(event)
#     db.session.commit()
#     return jsonify({"message": "Event deleted"}), 200

# # Attendee - Event Registration Routes:
# @app.route("/register_event", methods=["POST"])
# def register_event():
#     data = request.json
#     user_id = data.get("user_id")
#     event_id = data.get("event_id")

#     # You might need a separate registration table/model
#     registration = EventRegistration(user_id=user_id, event_id=event_id)
#     db.session.add(registration)
#     db.session.commit()
#     return jsonify({"message": "User registered for event"}), 201

# @app.route("/cancel_registration", methods=["POST"])
# def cancel_registration():
#     data = request.json
#     user_id = data.get("user_id")
#     event_id = data.get("event_id")

#     registration = EventRegistration.query.filter_by(user_id=user_id, event_id=event_id).first()
#     if not registration:
#         return jsonify({"message": "Registration not found"}), 404

#     db.session.delete(registration)
#     db.session.commit()
#     return jsonify({"message": "Registration cancelled"}), 200

# @app.route("/attendee_events/<int:user_id>", methods=["GET"])
# def get_user_events(user_id):
#     user = User.query.get(user_id)
#     if not user or user.role != UserRole.ATTENDEE:
#         return jsonify({"message": "Attendee not found"}), 404

#     registrations = EventRegistration.query.filter_by(user_id=user_id).all()
#     events = [reg.event.to_json() for reg in registrations]

#     return jsonify({"registered_events": events}), 200


# @app.route("/event_schedule", methods=["GET"])
# def get_event_schedule():
#     events = Event.query.all()
#     return jsonify([event.to_schedule_json() for event in events])  # Use simplified schedule info

# @app.route("/ticket/<int:user_id>/<int:event_id>", methods=["GET"])
# def view_ticket(user_id, event_id):
#     registration = EventRegistration.query.filter_by(user_id=user_id, event_id=event_id).first()
#     if not registration:
#         return jsonify({"message": "Ticket not found"}), 404

#     return jsonify(registration.to_ticket_json())  # Includes event, user, seat info

# import random
# import string
# import qrcode
# from io import BytesIO
# import base64

# @app.route("/generate_ticket/<int:user_id>/<int:event_id>", methods=["GET"])
# def generate_ticket(user_id, event_id):
#     registration = EventRegistration.query.filter_by(user_id=user_id, event_id=event_id).first()
#     if not registration:
#         return jsonify({"message": "Registration not found"}), 404

#     # Generate random ticket code
#     ticket_code = ''.join(random.choices(string.ascii_uppercase + string.digits, k=10))
#     registration.ticket_code = ticket_code
#     db.session.commit()

#     # Optional: generate QR
#     img = qrcode.make(ticket_code)
#     buffer = BytesIO()
#     img.save(buffer, format="PNG")
#     qr_base64 = base64.b64encode(buffer.getvalue()).decode()

#     return jsonify({
#         "ticket_code": ticket_code,
#         "qr_code": f"data:image/png;base64,{qr_base64}"
#     }), 200



# # Organizer - Event Management Routes:

# @app.route("/cancel_event/<int:event_id>", methods=["DELETE"])
# def cancel_event(event_id):
#     event = Event.query.get(event_id)
#     if not event:
#         return jsonify({"message": "Event not found"}), 404

#     db.session.delete(event)
#     db.session.commit()
#     return jsonify({"message": "Event cancelled"}), 200

# @app.route("/manage_event/<int:event_id>", methods=["GET"])
# def manage_event(event_id):
#     event = Event.query.get(event_id)
#     if not event:
#         return jsonify({"message": "Event not found"}), 404

#     return jsonify(event.to_full_json())  # Include details + stats + attendees if needed

# @app.route("/event_attendees/<int:event_id>", methods=["GET"])
# def view_event_attendees(event_id):
#     registrations = EventRegistration.query.filter_by(event_id=event_id).all()
#     attendees = [reg.user.to_json() for reg in registrations if reg.user.role == UserRole.ATTENDEE]
#     return jsonify({"attendees": attendees})

# @app.route("/event_report/<int:event_id>", methods=["GET"])
# def generate_event_report(event_id):
#     event = Event.query.get(event_id)
#     if not event:
#         return jsonify({"message": "Event not found"}), 404

#     report = {
#         "event": event.to_json(),
#         "attendee_count": len(event.registrations),
#         "attendees": [reg.user.to_json() for reg in event.registrations]
#         # Add stats like revenue, feedback if applicable
#     }
#     return jsonify(report)

# @app.route("/update_event/<int:event_id>", methods=["PATCH"])
# def update_event(event_id):
#     event = Event.query.get(event_id)
#     if not event:
#         return jsonify({"message": "Event not found"}), 404

#     data = request.json
#     event.name = data.get("name", event.name)
#     event.date = data.get("date", event.date)
#     event.location = data.get("location", event.location)
#     event.description = data.get("description", event.description)
    
#     db.session.commit()

#     # Notify attendees about the update
#     registrations = EventRegistration.query.filter_by(event_id=event_id).all()
#     for reg in registrations:
#         send_notification(
#             reg.user.email, 
#             f"Event '{event.name}' has been updated.",
#             f"Check your event schedule for the latest info."
#         )

#     return jsonify({"message": "Event updated and attendees notified."}), 200

# # Ticket Routes:    

# @app.route("/process_payment", methods=["POST"])
# def process_payment():
#     data = request.json
#     user_id = data.get("user_id")
#     event_id = data.get("event_id")
#     payment_info = data.get("payment_info")  # e.g., card/token

#     # Simulate payment success
#     success = True  # Replace with real gateway logic later
#     if not success:
#         return jsonify({"message": "Payment failed"}), 402

#     # Register user to event
#     registration = EventRegistration(user_id=user_id, event_id=event_id)
#     db.session.add(registration)
#     db.session.commit()

#     return jsonify({"message": "Payment successful. User registered for event."}), 200

# @app.route("/send_notification", methods=["POST"])
# def send_notification_route():
#     data = request.json
#     user_ids = data.get("user_ids", [])
#     subject = data.get("subject")
#     message = data.get("message")

#     for uid in user_ids:
#         user = User.query.get(uid)
#         if user:
#             send_notification(user.email, subject, message)

#     return jsonify({"message": "Notifications sent."}), 200

