from flask import *
users_bp = Blueprint("users_bp", __name__)

import bcrypt
import jwt

import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mydatabase']
collection = mydb['users']

@users_bp.route('/register', methods=['POST'])
def register():
    try:
        password = request.form['password']
        password = password.encode("utf-8")
        hashed = bcrypt.hashpw(password, bcrypt.gensalt())
        collection.insert_one({"firstName": request.form['firstName'], "lastName": request.form['lastName'], "phone": request.form['phone'], "email": request.form['email'], "password": hashed})
        return {"success": "Registration successful"}, 200
    except:
        return {"error": "Internal server error"}, 400

@users_bp.route('/login', methods=['POST'])
def login():
    try:
        email = request.form['email']
        password = request.form['password'].encode("utf-8")
        user = collection.find_one({"email": email})
        if not user:
            return {"error": "Wrong login credentials"}, 400
        hashed = user['password']
        if bcrypt.checkpw(password, hashed):
            encoded_jwt = jwt.encode({"id": str(user['_id'])}, "SignedByRK", algorithm="HS256")
            return {"token": encoded_jwt}, 200
        else:
            return {"error": "Wrong login credentials"}, 400
    except:
        return {"error": "Internal server error"}, 500
    
@users_bp.route('/getuser')
def getuser():
    try:
        user = request.environ['user']
        if(user):
            return {"username": user['firstName'] + " " + user['lastName']}, 200
        else:
            return {"error": "Invalid authorization"}, 400
    except:
        return {"error": "Internal server error"}, 500