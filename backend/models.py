from enum import Enum
from config import db
from datetime import datetime

# Enums
# class TicketType(Enum):
#     GENERAL = "general"
#     VIP = "vip"
class PaymentStatus(Enum):
    PENDING = "pending"
    COMPLETED = "completed"
    REFUNDED = "refunded"
class Mode(Enum):
    ONLINE = "online"
    OFFLINE = "offline"


# Objects:
class User(db.Model):
    __tablename__ = "users"

    id = db.Column(db.Integer, primary_key=True)
    name  = db.Column(db.String(80), nullable=False)
    email = db.Column(db.String(120), unique=True, nullable=False)
    password = db.Column(db.String(120), nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "email": self.email,
        }

class Category(Enum):
    CONCERT = "Concert"
    SPORTS = "Sports"
    ART = "Art"
    FOOD_DRINK = "Food & Drink"
    OTHER = "Other"
class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text, nullable=False)
    date = db.Column(db.DateTime, nullable=False)
    location = db.Column(db.String(150), nullable=False)
    category = db.Column(db.Enum(Category), nullable=False)
    image_url = db.Column(db.String(255), nullable=False)
    ticket_price = db.Column(db.JSON, nullable=False) # stores {type: {price, refundable}}
    tickets_available = db.Column(db.Integer, nullable=False)
    organizer_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=False)

    tickets = db.relationship('Ticket', backref='event', lazy=True)
    payments = db.relationship('Payment', backref='event', lazy=True)

    def to_json(self):
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "date": self.date.isoformat(),
            "category": self.category.value,  
            "location": self.location,
            "image_url": self.image_url,
            "ticket_price": self.ticket_price,
            "tickets_available": self.tickets_available,
            "organizer_id": self.organizer_id,
            "tickets": [ticket.to_json() for ticket in self.tickets],
        }
    
class DeliveryMethod(Enum):
    MOBILE_TICKET = "Mobile Ticket"
    PDF = "PDF"
    PRINT_AT_HOME = "Print at Home"
class Ticket(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    event_id = db.Column(db.Integer, db.ForeignKey('event.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('users.id'), nullable=True)
    type = db.Column(db.String(50), nullable=False)
    price = db.Column(db.Float, nullable=False)
    delivery_method = db.Column(db.Enum(DeliveryMethod), nullable=False) 
    is_refundable = db.Column(db.Boolean, default=False)
    registration_date = db.Column(db.DateTime, default=datetime.utcnow)
    quantity = db.Column(db.Integer, default=1, nullable=False)

    def to_json(self):
        return {
            "id": self.id,
            "event_id": self.event_id,
            "user_id": self.user_id,
            "type": self.type,
            "price": self.price,
            "delivery_method": self.delivery_method.value,  
            "is_refundable": self.is_refundable,
            "registration_date": self.registration_date.isoformat(),
            "quantity": self.quantity,
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