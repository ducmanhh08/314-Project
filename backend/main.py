from flask import request, jsonify
from flask_cors import CORS
from config import app, db
from models import User, Attendee, Organizer, UserRole

# CORS(app)  

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


if __name__ == "__main__":
    with app.app_context():
        db.create_all()

    app.run(debug=True)
