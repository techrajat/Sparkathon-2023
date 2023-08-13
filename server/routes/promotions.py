from flask import *
promotions_bp = Blueprint("promotions_bp", __name__)

import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mydatabase']
collection = mydb['mycollection']
search_collection = mydb['searchHistory']

import base64

# Endpoint to give 50 products randomly :-
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
    
# Endpoint to insert the search string of a user in the database :-
@promotions_bp.route('/setstring', methods=['POST'])
def setstring():
    try:
        user = request.environ['user']
        if not user:
            return {"error": "User not found"}, 400
        curr_str = request.form['str']
        try:
            original_str = search_collection.find_one({'user_id': user['_id']})
            original_str = original_str['search_string']
            search_collection.update_one({'user_id': user['_id']}, {"$set": {"search_string": curr_str + " " + original_str}})
        except:
            search_collection.insert_one({'user_id': user['_id'], 'search_string': curr_str})
        return {"success": "Search string updated"}, 200
    except:
        return {"error": "Server error"}, 500