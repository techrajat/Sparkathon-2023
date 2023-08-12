from flask import *
app = Flask(__name__)

# Enable CORS :-
from flask_cors import CORS
CORS(app)

import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mydatabase']
collection = mydb['mycollection']

import base64

# Register the blueprints :-
# import routes.search as search
# app.register_blueprint(search.search_bp)

import search_result

# Endpoint to search for items with a given search string :-
@app.route("/search", methods=['POST'])
def search():
    try:
        searchStr = request.form['searchStr']
        results = search_result.search_result(searchStr)
        if not len(results):
            return {"error": "No products found"}, 400
        results = results.tolist()
        products = []
        for article_id in results:
            product = collection.find_one({"article_id": article_id}, {"_id": 0})
            if product:
                product["image"] = base64.b64encode(product["image"]).decode('utf-8')
                products.append(product)
            else:
                print(article_id, " not found")
        if not len(products):
            return {"error": "No products found"}, 400
        return {"result": products}, 200
    except:
        return {"error": "Server error"}, 500
    
# Endpoint to search for a particular item with a given article_id :-
@app.route("/getitemdetails", methods=['POST'])
def getItemDetails():
    try:
        article_id = request.form['article_id']
        if not article_id:
            return {"error": "No product found"}, 400
        article_id = int(article_id)
        item = collection.find_one({'article_id': article_id}, {'_id': 0})
        if not item:
            return {"error": "No product found"}, 400
        item["image"] = base64.b64encode(item["image"]).decode('utf-8')
        return {"result": item}, 200
    except:
        return {"error": "Server error"}, 500

if __name__ == "__main__":
    app.run(debug=True, port=8000) # Start the server at port 8000