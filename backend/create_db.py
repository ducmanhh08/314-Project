from flask import Flask
from flask_sqlalchemy import SQLAlchemy
# from enum import Enum

# Initialize Flask (for SQLAlchemy)
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///mydatabase.db'  # Use SQLite and create the file
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False  # Suppress a warning
db = SQLAlchemy(app)  # Initialize SQLAlchemy

# # Define User Roles as an Enum
# class UserRole(Enum):
#     ATTENDEE = "attendee"
#     ORGANIZER = "organizer"

# Define the User model
class User(db.Model):
    __tablename__ = "users"
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)  # Store hashed passwords in real apps
    # role = db.Column(db.Enum(UserRole), nullable=False)

    # __mapper_args__ = {
    #     "polymorphic_identity": "user",
    #     "polymorphic_on": role,
    # }

    def __repr__(self):  # Added for easier debugging
        return f"<User(name='{self.name}', email='{self.email}')>"

# # Define the Attendee model, inheriting from User
# class Attendee(User):
#     __tablename__ = "attendees"
#     id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)

#     __mapper_args__ = {
#         "polymorphic_identity": UserRole.ATTENDEE,
#     }

#     def __repr__(self):
#         return f"<Attendee(name='{self.name}', email='{self.email}')>"


# # Define the Organizer model, inheriting from User
# class Organizer(User):
#     __tablename__ = "organizers"
#     id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)

#     __mapper_args__ = {
#         "polymorphic_identity": UserRole.ORGANIZER,
#     }
#     def __repr__(self):
#         return f"<Organizer(name='{self.name}', email='{self.email}')>"


def create_users():
    """Creates an attendee and an organizer and saves them to the database."""
    with app.app_context():  # Push an application context
        db.create_all()  # Create tables (only if they don't exist)

        # Check if users already exist
        if User.query.count() > 0:
            print("Database already has users.  Skipping creation.")
            return

        # # Create an attendee
        # attendee = Attendee(
        #     name="Alice Attendee",
        #     email="alice@example.com",
        #     password="attendee_password",  #  NEVER store plain passwords.  Use hashing!
        #     # role=UserRole.ATTENDEE,
        # )
        # db.session.add(attendee)
        # print("Created attendee:", attendee) #debugging

        # # Create an organizer
        # organizer = Organizer(
        #     name="Bob Organizer",
        #     email="bob@example.com",
        #     password="organizer_password",  #  NEVER store plain passwords. Use hashing!
        #     role=UserRole.ORGANIZER,
        # )
        # db.session.add(organizer)
        # print("Created organizer:", organizer) #debugging

        # Create a basic user
        user1 = User(
            name="Alice Attendee",
            email="alice@example.com",
            password="attendee_password"
        )
        db.session.add(user1)
        print("Created user:", user1)

        user2 = User(
            name="Bob Organizer",
            email="bob@example.com",
            password="organizer_password"
        )
        db.session.add(user2)
        print("Created user:", user2)

        db.session.commit()  # Commit the changes
        print("Users added to mydatabase.db successfully.")



if __name__ == "__main__":
    create_users()  # Call the function to create the users
