from enum import Enum
from config import db
from datetime import datetime

# Enums
class UserRole(Enum):
    ATTENDEE = "attendee"
    ORGANIZER = "organizer"

class TicketType(Enum):
    GENERAL = "general"
    VIP = "vip"

class PaymentStatus(Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    REFUNDED = "refunded"

class Category(Enum):
    TECH = "tech"
    MUSIC = "music"
    SPORTS = "sports"
    OTHER = "other"

# class Mode(Enum):
#     ONLINE = "online"
#     OFFLINE = "offline"


# Objects:

class User(db.Model):
    __tablename__ = "users"
    # __abstract__ = True

    id = db.Column(db.Integer, primary_key=True)
    name  = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)
    # role = db.Column(db.Enum(UserRole), nullable=False)

    # (optional)
    __mapper_args__ = {
        "polymorphic_identity": "user",
        # "polymorphic_on": role,
    }

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
            # "role": self.role.value,
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

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(150), nullable=False)
    category = db.Column(db.Enum(Category), nullable=False)
    ticket_price = db.Column(db.Float, nullable=False)
    tickets_available = db.Column(db.Integer, nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    tickets = db.relationship('Ticket', backref='event', lazy=True)
    payments = db.relationship('Payment', backref='event', lazy=True)

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": self.date.isoformat() if self.date else None,
            "category": self.category.value,
            "location": self.role.value,
            "ticket_price": self.ticket_price,
            "tickets_available": self.tickets_available,
            "organizer_id": self.organizer_id,
            "tickets": [ticket.to_json() for ticket in self.tickets],
        }

class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    type = db.Column(db.Enum(TicketType), nullable=False)
    price = db.Column(db.Float, nullable=False)
    benefits = db.Column(db.String(255))

    def to_json(self):
        return {
            "id": self.id,
            "event_id": self.event_id,
            "user_id": self.user_id,
            "type": self.type.value,
            "price": self.price,
            "benefits": self.benefits,
        }

class Payment(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    amount = db.Column(db.Float, nullable=False)
    status = db.Column(db.Enum(PaymentStatus), default=PaymentStatus.PENDING, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "user_id": self.user_id,
            "event_id": self.event_id,
            "amount": self.amount,
            "status": self.status.value,
        }