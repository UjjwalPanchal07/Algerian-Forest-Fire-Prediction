"use client"
import { useState } from 'react'
import ResultModal from './ResultModal'
import { usePredictions } from './PredictionContext'

export default function Form() {
  const { addPrediction } = usePredictions()
  const [form, setForm] = useState({
    Temperature: '', RH: '', Ws: '', Rain: '', FFMC: '', DMC: '', ISI: '', Classes: '', region: ''
  })
  const [result, setResult] = useState(null)
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)
  const [open, setOpen] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Always use the API route, let next.config.mjs handle rewrites
      const res = await fetch('/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form)
      });

      // Parse response safely
      const text = await res.text();
      let data = {};
      try {
        data = text ? JSON.parse(text) : {};
      } catch {
        setError('Received non-JSON response from server.');
        setLoading(false);
        return;
      }

      // Handle HTTP errors and backend errors
      if (!res.ok || data.error) {
        setError(data.error || `Request failed (${res.status})`);
        setLoading(false);
        return;
      }

      // Validate prediction result
      const prediction = Number(data.result);
      if (!isFinite(prediction)) {
        setError('Prediction result is not a valid number.');
        setLoading(false);
        return;
      }

      setResult(prediction);
      addPrediction(form, prediction);
      setOpen(true);
    } catch (err) {
      setError('Network or server error.');
    } finally {
      setLoading(false);
    }
  }

  return (
    <div>
      <h2 style={{ fontSize: 18, margin: '0 0 12px' }}>Enter Parameters</h2>
      <form onSubmit={onSubmit} className="form">
        <div className="field"><label htmlFor="Temperature">Temperature (20–100 °C)</label><input id="Temperature" name="Temperature" type="number" min="20" max="100" step="0.1" value={form.Temperature} onChange={onChange} required /></div>
        <div className="field"><label htmlFor="RH">Relative Humidity (21–90 %)</label><input id="RH" name="RH" type="number" min="21" max="90" step="1" value={form.RH} onChange={onChange} required /></div>
        <div className="field"><label htmlFor="Ws">Wind Speed (6–29 km/h)</label><input id="Ws" name="Ws" type="number" min="6" max="29" step="0.1" value={form.Ws} onChange={onChange} required /></div>
        <div className="field"><label htmlFor="Rain">Rainfall (0–16.8 mm)</label><input id="Rain" name="Rain" type="number" min="0" max="16.8" step="0.1" value={form.Rain} onChange={onChange} required /></div>
        <div className="field"><label htmlFor="FFMC">FFMC Index (28.6–92.5)</label><input id="FFMC" name="FFMC" type="number" min="28.6" max="92.5" step="0.1" value={form.FFMC} onChange={onChange} required /></div>
        <div className="field"><label htmlFor="DMC">DMC Index (1.1–65.9)</label><input id="DMC" name="DMC" type="number" min="1.1" max="65.9" step="0.1" value={form.DMC} onChange={onChange} required /></div>
        <div className="field"><label htmlFor="ISI">ISI Index (0–18.5)</label><input id="ISI" name="ISI" type="number" min="0" max="18.5" step="0.1" value={form.ISI} onChange={onChange} required /></div>
        <div className="field"><label htmlFor="Classes">Classes (0/1)</label><input id="Classes" name="Classes" type="number" min="0" max="1" step="1" value={form.Classes} onChange={onChange} required /></div>
        <div className="center-row"><label htmlFor="region" className="key">Region</label>
          <select id="region" name="region" value={form.region} onChange={onChange} required>
            <option value="">Select region</option>
            <option value="0">Bejaia</option>
            <option value="1">Sidi-Bel Abbes</option>
          </select></div>
        <div className="actions">
          <button type="submit" className="primary" disabled={loading}>{loading ? 'Predicting…' : 'Predict'}</button>
        </div>
      </form>
      {error && <div style={{ marginTop: 12, color: '#ef4444' }}>{error}</div>}
      <ResultModal open={open} onClose={() => setOpen(false)} result={result} />
    </div>
  )
}


