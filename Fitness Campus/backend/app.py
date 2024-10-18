from flask import Flask, jsonify, request
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager, jwt_required, create_access_token, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
import os
import datetime

app = Flask(__name__)
CORS(app)

# Configuration
app.config['SQLALCHEMY_DATABASE_URI'] = os.environ.get('DATABASE_URL', 'sqlite:///fitness_campus.db')
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['JWT_SECRET_KEY'] = os.environ.get('JWT_SECRET_KEY', 'your-secret-key')

# Initialize extensions
db = SQLAlchemy(app)
jwt = JWTManager(app)

# Models
class User(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique=True, nullable=False)
    password_hash = db.Column(db.String(120), nullable=False)

class Event(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)
    location = db.Column(db.String(120), nullable=False)
    time = db.Column(db.String(80), nullable=False)
    description = db.Column(db.Text, nullable=True)
    participants = db.Column(db.Integer, default=0)
    latitude = db.Column(db.Float, nullable=False)
    longitude = db.Column(db.Float, nullable=False)

class Chat(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(120), nullable=False)

class Message(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    chat_id = db.Column(db.Integer, db.ForeignKey('chat.id'), nullable=False)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.Text, nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

class Story(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False)
    content = db.Column(db.String(255), nullable=False)
    timestamp = db.Column(db.DateTime, nullable=False)

# Routes
@app.route('/register', methods=['POST'])
def register():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    if not username or not password:
        return jsonify({"msg": "Missing username or password"}), 400
    
    if User.query.filter_by(username=username).first():
        return jsonify({"msg": "Username already exists"}), 400
    
    new_user = User(username=username, password_hash=generate_password_hash(password))
    db.session.add(new_user)
    db.session.commit()
    
    return jsonify({"msg": "User created successfully"}), 201

@app.route('/login', methods=['POST'])
def login():
    username = request.json.get('username', None)
    password = request.json.get('password', None)
    
    user = User.query.filter_by(username=username).first()
    if user and check_password_hash(user.password_hash, password):
        access_token = create_access_token(identity=username)
        return jsonify(access_token=access_token), 200
    
    return jsonify({"msg": "Bad username or password"}), 401

@app.route('/events', methods=['GET'])
@jwt_required()
def get_events():
    events = Event.query.all()
    return jsonify([{
        'id': event.id,
        'name': event.name,
        'location': event.location,
        'time': event.time,
        'description': event.description,
        'participants': event.participants,
        'latitude': event.latitude,
        'longitude': event.longitude
    } for event in events]), 200

@app.route('/events', methods=['POST'])
@jwt_required()
def create_event():
    data = request.json
    new_event = Event(
        name=data['name'],
        location=data['location'],
        time=data['time'],
        description=data.get('description', ''),
        latitude=data['latitude'],
        longitude=data['longitude']
    )
    db.session.add(new_event)
    db.session.commit()
    return jsonify({"msg": "Event created successfully"}), 201

@app.route('/chats', methods=['GET'])
@jwt_required()
def get_chats():
    chats = Chat.query.all()
    return jsonify([{
        'id': chat.id,
        'name': chat.name,
        'lastMessage': Message.query.filter_by(chat_id=chat.id).order_by(Message.timestamp.desc()).first().content
    } for chat in chats]), 200

@app.route('/chats/<int:chat_id>/messages', methods=['GET'])
@jwt_required()
def get_chat_messages(chat_id):
    messages = Message.query.filter_by(chat_id=chat_id).order_by(Message.timestamp.desc()).all()
    return jsonify([{
        'id': message.id,
        'content': message.content,
        'timestamp': message.timestamp.isoformat(),
        'user_id': message.user_id
    } for message in messages]), 200

@app.route('/chats/<int:chat_id>/messages', methods=['POST'])
@jwt_required()
def send_message(chat_id):
    data = request.json
    new_message = Message(
        chat_id=chat_id,
        user_id=get_jwt_identity(),
        content=data['message'],
        timestamp=datetime.utcnow()
    )
    db.session.add(new_message)
    db.session.commit()
    return jsonify({"msg": "Message sent successfully"}), 201

@app.route('/stories', methods=['GET'])
@jwt_required()
def get_stories():
    stories = Story.query.order_by(Story.timestamp.desc()).all()
    return jsonify([{
        'id': story.id,
        'content': story.content,
        'timestamp': story.timestamp.isoformat(),
        'user_id': story.user_id
    } for story in stories]), 200

@app.route('/stories', methods=['POST'])
@jwt_required()
def create_story():
    data = request.json
    new_story = Story(
        user_id=get_jwt_identity(),
        content=data['content'],
        timestamp=datetime.utcnow()
    )
    db.session.add(new_story)
    db.session.commit()
    return jsonify({"msg": "Story created successfully"}), 201

if __name__ == '__main__':
    with app.app_context():
        db.create_all()
    app.run(debug=True)
