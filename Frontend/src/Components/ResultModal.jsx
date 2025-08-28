"use client"
export default function ResultModal({ open, onClose, result }) {
  if (!open) return null
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal" onClick={(e) => e.stopPropagation()}>
        <div className="modal-header">
          <h3>Prediction Result</h3>
          <button className="icon-button" onClick={onClose} aria-label="Close">✕</button>
        </div>
        <div className="modal-body">
          <div className="result-card">
            <div className="result-value">{result}</div>
            <div className="result-sub">Fire Weather Index (FWI)</div>
          </div>
          <div className="result-reaction" style={{ marginTop: 8 }}>
            {Number(result) >= 20 ? '🔥 High risk — caution advised.' : Number(result) >= 10 ? '⚠️ Moderate risk — stay alert.' : '✅ Low risk — conditions are favorable.'}
          </div>
          <div className="detail-grid" style={{ marginTop: 12 }}>
            <div className="key">What is FWI?</div><div>The Fire Weather Index summarizes fire potential based on fuel moisture and wind.</div>
            <div className="key">How to interpret?</div><div>Higher values indicate more severe fire conditions. Combine with local advisories.</div>
          </div>
          <div style={{ marginTop: 12 }}>
            <div className="meter"><span style={{ width: `${Math.min(100, Number(result) * 3)}%` }}></span></div>
          </div>
        </div>
        <div className="modal-footer">
          <button className="primary" onClick={onClose}>Close</button>
        </div>
      </div>
    </div>
  )
}


