from flask_swagger_ui import get_swaggerui_blueprint
from flask import jsonify
import json
SWAGGER_URL = '/api/docs' 
API_URL = 'http://localhost:5000/api/docs/swagger'
import os
swaggeruiBluePrint=get_swaggerui_blueprint(
    SWAGGER_URL,
    API_URL,
    config={
        'app_name':'Sangeet'
    }
)

@swaggeruiBluePrint.route('/swagger', methods=['GET'])
def swagger():
    print("Inside Swagger",os.getcwd())
    with open(os.getcwd()+'\\application\\Controllers\\swagger.json', 'r') as f:
        return jsonify(json.load(f))
