import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

# UPLOAD_FOLDER = os.path.join(os.getcwd(), 'public', 'images', 'events')
UPLOAD_FOLDER = os.path.join('public', 'images', 'uploaded_events')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# CORS(app)
CORS(app, resources={r"/*": {"origins": "https://ticket-please-app.onrender.com"}})

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
# using Gmail SMTP
app.config['MAIL_SERVER'] = 'ticketplease.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'nducmanh08@gmail.com'         # Your Gmail
app.config['MAIL_PASSWORD'] = 'your_app_password'            # App password, not your Gmail login
app.config['MAIL_DEFAULT_SENDER'] = 'your_email@gmail.com'

# mail = Mail(app)
db = SQLAlchemy(app)
