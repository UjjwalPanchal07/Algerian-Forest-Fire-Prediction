import { useState } from "react";
import PredictionResultModal from "./PredictionResultModal.jsx";
import Link from "next/link.js";

export default function PredictionForm() {
  const [formData, setFormData] = useState({
    Temperature: "",
    RH: "",
    Ws: "",
    Rain: "",
    FFMC: "",
    DMC: "",
    ISI: "",
    Classes: "",
    region: "",
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (['Temperature', 'RH', 'Ws', 'Rain', 'FFMC', 'DMC', 'ISI', 'Classes'].includes(name)) {
      const numValue = parseFloat(value);
      if (value !== '' && (isNaN(numValue) || numValue < 0)) {
        return;
      }
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const savePredictionToHistory = (predictionData, region) => {
    try {
      const existingPredictions = localStorage.getItem('forestFirePredictions');
      let predictions = existingPredictions ? JSON.parse(existingPredictions) : [];

      const newPrediction = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        temperature: parseFloat(formData.Temperature) || 0,
        humidity: parseFloat(formData.RH) || 0,
        windSpeed: parseFloat(formData.Ws) || 0,
        rainfall: parseFloat(formData.Rain) || 0,
        prediction: predictionData.prediction,
        risk: getRiskLevel(predictionData.prediction),
        region: region || 'Algeria'
      };

      predictions.unshift(newPrediction);
      // if (predictions.length > 20) {
      //   predictions = predictions.slice(0, 20);
      // }
      localStorage.setItem('forestFirePredictions', JSON.stringify(predictions));
    } catch (error) {
      console.error('Error saving prediction to history:', error);
    }
  };

  const getRiskLevel = (predictionValue) => {
    if (predictionValue < 5) return 'LOW';
    if (predictionValue < 15) return 'MEDIUM';
    if (predictionValue < 30) return 'HIGH';
    return 'EXTREME';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setPrediction(null);
    setLoading(true);

    if (!formData.region || formData.region.trim() === '') {
      setError('Please select a region');
      setLoading(false);
      return;
    }

    try {
      const temperature = parseFloat(formData.Temperature);
      const rh = parseFloat(formData.RH);
      const ws = parseFloat(formData.Ws);
      const rain = parseFloat(formData.Rain);
      const ffmc = parseFloat(formData.FFMC);
      const dmc = parseFloat(formData.DMC);
      const isi = parseFloat(formData.ISI);
      const classes = parseFloat(formData.Classes);

      if (isNaN(temperature) || isNaN(rh) || isNaN(ws) || isNaN(rain) ||
        isNaN(ffmc) || isNaN(dmc) || isNaN(isi) || isNaN(classes)) {
        setError('Please fill in all numeric fields with valid numbers');
        setLoading(false);
        return;
      }

      const apiPayload = {
        Temperature: temperature,
        RH: rh,
        Ws: ws,
        Rain: rain,
        FFMC: ffmc,
        DMC: dmc,
        ISI: isi,
        Classes: classes,
        region: formData.region === 'Bejaia' ? 0 : 1
      };

      const response = await fetch('https://algerian-forest-fire-prediction-3cpe.onrender.com/', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(apiPayload)
      });

      const data = await response.json();

      if (response.ok) {
        const roundedPrediction = Math.round(data.prediction * 100) / 100;
        setPrediction(roundedPrediction);
        savePredictionToHistory({ prediction: roundedPrediction }, formData.region);
        setShowModal(true);
      } else {
        setError(data.error || `API Error: ${response.status} ${response.statusText}`);
      }
    } catch (err) {
      setError(err.message || 'Network error occurred');
    }
    setLoading(false);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="max-w-lg mx-auto mt-10 bg-gray-800 p-8 rounded-2xl shadow-lg">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-white mb-2">Forest Fire Risk Prediction</h1>
        <p className="text-gray-300">Enter environmental conditions to assess fire risk</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[
            { label: "Temperature (°C)", name: "Temperature", placeholder: "25" },
            { label: "Relative Humidity (%)", name: "RH", placeholder: "60" },
            { label: "Wind Speed (km/h)", name: "Ws", placeholder: "15" },
            { label: "Rainfall (mm)", name: "Rain", placeholder: "0" },
            { label: "FFMC Index", name: "FFMC", placeholder: "85" },
            { label: "DMC Index", name: "DMC", placeholder: "50" },
            { label: "ISI Index", name: "ISI", placeholder: "8" },
            { label: "Classes", name: "Classes", placeholder: "1" },
          ].map((field) => (
            <div key={field.name}>
              <label className="block text-sm font-medium text-gray-200 mb-2">{field.label}</label>
              <input
                type="number"
                name={field.name}
                value={formData[field.name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white placeholder:text-gray-600"
                placeholder={field.placeholder}
                required
              />
            </div>
          ))}
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-200 mb-2">Region</label>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="w-full px-3 py-2 border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-gray-700 text-white"
            required
          >
            <option value="">Select a region</option>
            <option value="Bejaia">Bejaia</option>
            <option value="Sidi-Bel-Abbes">Sidi-Bel-Abbes</option>
          </select>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white py-3 px-4 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95 disabled:cursor-not-allowed"
        >
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2"></div>
              Predicting...
            </div>
          ) : (
            "Predict Fire Risk"
          )}
        </button>
      </form>

      {error && (
        <div className="mt-6 p-4 bg-red-900 border border-red-700 rounded-lg">
          <div className="flex items-center">
            <div className="text-red-400 text-xl mr-2">❌</div>
            <p className="text-red-200">{error}</p>
          </div>
        </div>
      )}

      <div className="mt-6 text-center">
        <Link
          href="/dashboard"
          className="text-blue-400 hover:text-blue-300 text-sm font-medium"
        >
          View your prediction history →
        </Link>
      </div>

      <PredictionResultModal
        isOpen={showModal}
        onClose={closeModal}
        prediction={prediction}
        formData={formData}
      />
    </div>
  );
}
