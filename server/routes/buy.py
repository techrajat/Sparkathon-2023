from flask import *
buy_bp = Blueprint("buy_bp", __name__)

import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mydatabase']
dataCollection = mydb['mycollection']
collection = mydb['cart']
storeCollection = mydb['store']

import base64

# Endpoint to add an item to cart :-
@buy_bp.route("/addtocart", methods=['POST'])
def addtocart():
    try:
        user = request.environ['user']
        article_id = request.form['article_id']
        item = collection.find_one({'user_id': user['_id'], 'article_id': int(article_id)})
        if item:
            return {"error": "Item already present in cart"}, 400
        else:
            collection.insert_one({'user_id': user['_id'], 'article_id': int(article_id)})
            return {"success": "Item added to cart"}, 200
    except:
        return {"error": "Server error"}, 500
    
# Endpoint to get the number of items in cart :-
@buy_bp.route("/numcart")
def numcart():
    try:
        user = request.environ['user']
        items = collection.find({'user_id': user['_id']})
        if not items:
            return {"numsItems": 0}, 200
        else:
            return {"numsItems": len(list(items))}, 200
    except:
        return {"error": "Server error"}, 400
    
# Endpoint to check whether a given item is present in the cart or not :-
@buy_bp.route("/checkcart", methods=['POST'])
def checkcart():
    try:
        user = request.environ['user']
        article_id = request.form['article_id']
        item = collection.find_one({'user_id': user['_id'], 'article_id': int(article_id)})
        if not item:
            return {"result": "Item is not present in cart"}, 400
        else:
            return {"result": "Item is present in cart"}, 200
    except:
        return {"error": "Server error"}, 500
    
# Endpoint to return the products present in the cart of a user :-
@buy_bp.route('/cartitems')
def cartitems():
    try:
        user = request.environ['user']
        items = collection.find({'user_id': user['_id']})
        products = []
        for item in list(items):
            product = dataCollection.find_one({'article_id': int(item['article_id'])}, {'_id': 0})
            if product:
                product["image"] = base64.b64encode(product["image"]).decode('utf-8')
                products.append(product)
            else:
                print(item['article_id'], "not found")
        return {"result": products}, 200
    except:
        return {"error": "Server error"}, 500
    
# Endpoint to store the products for in-store buying :-
@buy_bp.route('/store', methods=['POST'])
def store():
    try:
        user = request.environ['user']
        if not user:
            return {"error": "User not found"}, 400
        items = request.form['items']
        for item in items.split(','):
            storeCollection.insert_one({'user_id': user['_id'], 'article_id': int(item)})
        return {"success": "Items stored succesfully"}, 200
    except:
        return {"error": "Server error"}, 500
    
# Endpoint to retrieve the products for in-store buying :-
@buy_bp.route('/getstore')
def getstore():
    try:
        user = request.environ['user']
        if not user:
            return {"error": "User not found"}, 400
        items = storeCollection.find({'user_id': user['_id']})
        products = []
        for item in list(items):
            product = dataCollection.find_one({'article_id': item['article_id']}, {'_id': 0})
            product["image"] = base64.b64encode(product["image"]).decode('utf-8')
            products.append(product)
        return {"result": products}, 200
    except:
        return {"error": "Server error"}, 500
    
# Endpoint to empty the user's cart :-
@buy_bp.route('/emptycart')
def emptycart():
    try:
        user = request.environ['user']
        if not user:
            return {"error": "User not found"}, 400
        collection.delete_many({'user_id': user['_id']})
        return {"success": "Cart emptied successfully"}, 200
    except:
        return {"error": "Server error"}, 500