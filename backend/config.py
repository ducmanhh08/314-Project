import os
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)

UPLOAD_FOLDER = os.path.join(os.getcwd(), 'public', 'images', 'events')
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# CORS(app)
CORS(app, resources={r"/*": {"origins": "http://localhost:3000"}})

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///mydatabase.db"
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

db = SQLAlchemy(app)
