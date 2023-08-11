from flask import *
app = Flask(__name__)

# Enable CORS :-
from flask_cors import CORS
CORS(app)

# Register the blueprints :-
# import routes.search as search
# app.register_blueprint(search.search_bp)

import search_result

@app.route("/search", methods=['POST'])
def search():
    try:
        searchStr = request.form['searchStr']
        results = search_result.search_result(searchStr)
        if(not len(results)):
            return {"error": "No result found"}, 400
        return {"result": results.tolist()}, 200
    except:
        return {"error": "Server error"}, 500

if __name__ == "__main__":
    app.run(debug=True, port=8000) # Start the server at port 8000