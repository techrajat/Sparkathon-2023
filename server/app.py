from flask import *
app = Flask(__name__)

# Enable CORS :-
from flask_cors import CORS
CORS(app)

if __name__ == "__main__":
    app.run(debug=True, port=8000) # Start the backend at port 8000