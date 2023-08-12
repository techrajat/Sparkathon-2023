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