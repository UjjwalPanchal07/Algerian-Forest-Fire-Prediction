import os
import pickle
from flask import Flask, request, jsonify, render_template, send_from_directory, redirect
from flask_cors import CORS
from jinja2 import ChoiceLoader, FileSystemLoader
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler

BASE_DIR = os.path.dirname(os.path.abspath(__file__))
TEMPLATE_FOLDER = os.path.normpath(os.path.join(BASE_DIR, '..', 'Frontend', 'templates'))
STATIC_REACT_DIR = os.path.normpath(os.path.join(BASE_DIR, '..', 'Frontend', 'static', 'react'))

application = Flask(__name__, template_folder=TEMPLATE_FOLDER)
app = application

CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=False)

# Use default Jinja loader; React SPA is served from static build when present

## import ridge regerssion ans standard scaler pickle

ridge_model=pickle.load(open('models/ridge.pkl','rb'))
standard_scaler=pickle.load(open('models/scaler.pkl','rb'))

@app.route('/')
def index():
    index_path = os.path.join(STATIC_REACT_DIR, 'index.html')
    if os.path.exists(index_path):
        return send_from_directory(STATIC_REACT_DIR, 'index.html')
    # Dev mode: no build found. Open Vite dev server at http://localhost:5173
    return (
        "React build not found. Run 'npm run dev' in Frontend/react and open http://localhost:5173, "
        "or build with 'npm run build' and refresh this page.",
        200,
        {"Content-Type": "text/plain"}
    )

@app.route('/assets/<path:asset_path>')
def serve_react_assets(asset_path: str):
    assets_dir = os.path.join(STATIC_REACT_DIR, 'assets')
    return send_from_directory(assets_dir, asset_path)

@app.route('/predict', methods=['GET', 'POST'])
def predict_datapoint():
    # Legacy endpoint: redirect React users to the SPA
    return redirect('/')

@app.route('/api/predict', methods=['POST'])
def api_predict():
    try:
    #     data = request.get_json(force=True) or {}
    #     Temperature = float(data.get('Temperature'))
    #     RH = float(data.get('RH'))
    #     Ws = float(data.get('Ws'))
    #     Rain = float(data.get('Rain'))
    #     FFMC = float(data.get('FFMC'))
    #     DMC = float(data.get('DMC'))
    #     ISI = float(data.get('ISI'))
    #     Classes = float(data.get('Classes'))
    #     region = float(data.get('region'))

    #     features = [[Temperature, RH, Ws, Rain, FFMC, DMC, ISI, Classes, region]]
    #     new_data_scaled = standard_scaler.transform(features)
    #     result = ridge_model.predict(new_data_scaled)
    #     return jsonify({"result": float(result[0])})
    # except Exception as e:
    #     return jsonify({"error": str(e)}), 400
        data = request.get_json(force=True) or {}
        required_fields = ['Temperature', 'RH', 'Ws', 'Rain', 'FFMC', 'DMC', 'ISI', 'Classes', 'region']
        features = []
        for field in required_fields:
            value = data.get(field)
            try:
                value = float(value)
                if not np.isfinite(value):
                    raise ValueError
            except (TypeError, ValueError):
                return jsonify({"error": f"Missing or invalid value for '{field}'"}), 400
            features.append(value)

        new_data_scaled = standard_scaler.transform([features])
        result = ridge_model.predict(new_data_scaled)
        console.log(result[0])
        if not np.isfinite(result[0]):
            return jsonify({"error": "Prediction result is not a finite number."}), 400
        return jsonify({"result": float(result[0])})
    except Exception as e:
        return jsonify({"error": str(e)}), 400

# Ensure CORS headers on all responses and handle preflight
@app.after_request
def add_cors_headers(response):
    response.headers['Access-Control-Allow-Origin'] = '*'
    response.headers['Access-Control-Allow-Headers'] = 'Content-Type, Authorization'
    response.headers['Access-Control-Allow-Methods'] = 'GET, POST, OPTIONS'
    return response

@app.route('/api/predict', methods=['OPTIONS'])
def api_predict_options():
    return ('', 204)

if __name__=="__main__":
    app.run(host="0.0.0.0")

