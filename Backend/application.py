import pickle
from flask import Flask, request, jsonify, render_template
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from flask_cors import CORS
import os

application = Flask(__name__)
app = application

CORS(app)  

ridge_model = pickle.load(open("models/ridge.pkl", "rb"))
standard_scaler = pickle.load(open("models/scaler.pkl", "rb"))


@app.route('/', methods=['GET','POST'])
def predict_datapoint():
    if request.method == 'GET':
        return jsonify('Welcome to Algerian Forest Fires Prediction')
    else :
        try:
            data = request.get_json()
            Temprature = float(data['Temperature'])
            RH = float(data['RH'])
            Ws = float(data['Ws'])
            Rain = float(data['Rain'])
            FFMC = float(data['FFMC'])
            DMC = float(data['DMC'])
            ISI = float(data['ISI'])
            Classes = float(data['Classes'])
            region = float(data['region'])

            # Scale and predict
            new_data = standard_scaler.transform(
                [[Temprature, RH, Ws, Rain, FFMC, DMC, ISI, Classes, region]]
            )
            result = ridge_model.predict(new_data)

            return jsonify(prediction= 0 if result[0] < 0 else result[0])
        except Exception as e:
            return jsonify(error=str(e)), 400

if __name__ == '__main__':
    port = int(os.environ.get("PORT", 5000))
    app.run(host='0.0.0.0', port=port)
