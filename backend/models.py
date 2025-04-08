from enum import Enum
from config import db


class UserRole(Enum):
    ATTENDEE = "attendee"
    ORGANIZER = "organizer"

class User(db.Model):
    __tablename__ = "users"
    # __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    name  = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    role = db.Column(db.Enum(UserRole), nullable=False)

    __mapper_args__ = {
        "polymorphic_identity": "user",
        "polymorphic_on": role,
    }

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            "role": self.role.value,
        }

class Attendee(User):
    __tablename__ = "attendees"
    id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    # registeredTickets = 

    __mapper_args__ = {
        "polymorphic_identity": UserRole.ATTENDEE,
    }

    # def to_json(self):
    #     return {
    #         # "registered_tickets": 
    #     }


class Organizer(User):
    __tablename__ = "organizers"
    id = db.Column(db.Integer, db.ForeignKey("users.id"), primary_key=True)
    # createdEvents = 

    __mapper_args__ = {
        "polymorphic_identity": UserRole.ORGANIZER,
    }

    # def to_json(self):
    #     return {
    #         # "created_events": 
    #     }