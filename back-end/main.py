from flask import Flask, request, jsonify, render_template
from flask_cors import CORS
import json
import sqlite3
from call_api import generate_response
import os
from dotenv import load_dotenv

app = Flask(__name__, static_folder='./assets', template_folder='./assets')
CORS(app)  # Enable CORS for all routes

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api', methods=['POST'])
def next():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid format"}), 400

    print(data)
    
    response = generate_response(data)

    print(response)

    return jsonify(response), 200, {"Content-Type": "application/json"}

def main() -> None:
    load_dotenv()
    app.run(port=5000)

if __name__ == "__main__":
    main()