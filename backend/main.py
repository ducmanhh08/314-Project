from flask import request, jsonify
from flask_cors import CORS
from config import app, db
from models import User, Attendee, Organizer, UserRole

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
    new_user = User(name=name, email=email, password=password)

    db.session.add(new_user)
    db.session.commit()
    return jsonify({"message": "Account registered successfully!"}), 201


@app.route("/login", methods=["POST"])
def login():
    data = request.json
    email = data.get("email")
    password = data.get("password")

    user = User.query.filter_by(email=email).first()
    if user and user.password == password:
        return jsonify({"message": "Login successful", "user": user.to_json()}), 200
    return jsonify({"message": "Invalid credentials"}), 401

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

    user.password = new_password  # Hash this in production
    db.session.commit()

    return jsonify({"message": "Password updated successfully."}), 200

if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True, port=5000)

# # Event Routes:
# @app.route("/events", methods=["GET"])
# def get_events():
#     events = Event.query.all()
#     return jsonify([event.to_json() for event in events])

# @app.route("/create_event", methods=["POST"])
# def create_event():
#     data = request.json
#     # Organizer should be authenticated in a real system
#     new_event = Event(**data)
#     db.session.add(new_event)
#     db.session.commit()
#     return jsonify({"message": "Event created!"}), 201

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

