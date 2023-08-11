from flask import *
search_bp = Blueprint("search_bp", __name__)

import pymongo
myclient = pymongo.MongoClient("mongodb://localhost:27017/")
mydb = myclient['mydatabase']
collection = mydb['mycollection']

# Import the search model :-
import search_result.search_result as search_result

@search_bp.route("/search", methods=['POST'])
def search():
    try:
        searchStr = request.form['searchStr']
        results = search_result(searchStr)
        if(not results):
            return {"error": "No result found"}, 400
        return results, 200
    except:
        return {"error": "Server error"}, 500