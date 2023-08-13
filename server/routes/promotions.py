from flask import *
promotions_bp = Blueprint("promotions_bp", __name__)

import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mydatabase']
collection = mydb['mycollection']

import base64

@promotions_bp.route('/general')
def general():
    try:
        items = collection.find({}, {'_id': 0}).limit(50)
        products = []
        for item in list(items):
            item["image"] = base64.b64encode(item["image"]).decode('utf-8')
            products.append(item)
        return {"result": products}, 200
    except:
        return {"error": "Server error"}, 500