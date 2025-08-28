"use client"
import DashboardChart from '../../Components/DashboardChart'
import { usePredictions } from '../../Components/PredictionContext'

export default function DashboardPage() {
  const { history } = usePredictions()
  if (history.length === 0) {
    return (
      <main style={{ maxWidth: 800, margin: '24px auto', padding: 16 }}>
        <section className="card">
          <h1>Dashboard</h1>
          <p style={{ color: '#9ca3af' }}>No predictions yet. Make a prediction on the Home page to see analytics here.</p>
        </section>
      </main>
    )
  }
  return (
    <main className="light-page">
      <section className="card" style={{ maxWidth: 1040, margin: '24px auto' }}>
        <h1>Dashboard</h1>
        <p style={{ color: '#64748b', marginBottom: 12 }}>Session-only analytics of your predictions.</p>
        <div className="grid">
          <div className="light-section" style={{ padding: 12 }}>
            <h2>History</h2>
            <div style={{ maxHeight: 280, overflow: 'auto' }}>
              {history.length === 0 && <div style={{ color: '#9ca3af' }}>No predictions yet.</div>}
              {history.map((h) => (
                <div key={h.id} style={{ display: 'grid', gridTemplateColumns: '1fr auto', gap: 8, padding: '8px 0', borderBottom: '1px solid #1f2937' }}>
                  <div>
                    <div style={{ fontWeight: 600 }}>FWI: {h.result}</div>
                    <div style={{ color: '#9ca3af', fontSize: 12 }}>{new Date(h.timestamp).toLocaleString()}</div>
                    <div style={{ color: '#9ca3af', fontSize: 12 }}>Temp {h.input.Temperature}, RH {h.input.RH}, Ws {h.input.Ws}, Rain {h.input.Rain}, FFMC {h.input.FFMC}, DMC {h.input.DMC}, ISI {h.input.ISI}, Class {h.input.Classes}, Region {h.input.region}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="light-section" style={{ padding: 12 }}>
            <h2>Inputs & Result</h2>
            <table className="light-table">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Temp</th>
                  <th>RH</th>
                  <th>Ws</th>
                  <th>Rain</th>
                  <th>FFMC</th>
                  <th>DMC</th>
                  <th>ISI</th>
                  <th>Class</th>
                  <th>Region</th>
                  <th>FWI</th>
                </tr>
              </thead>
              <tbody>
                {history.map((h, i) => (
                  <tr key={h.id}>
                    <td>{i + 1}</td>
                    <td>{h.input.Temperature}</td>
                    <td>{h.input.RH}</td>
                    <td>{h.input.Ws}</td>
                    <td>{h.input.Rain}</td>
                    <td>{h.input.FFMC}</td>
                    <td>{h.input.DMC}</td>
                    <td>{h.input.ISI}</td>
                    <td>{h.input.Classes}</td>
                    <td>{h.input.region === '1' ? 'Sidi-Bel Abbes' : 'Bejaia'}</td>
                    <td><span className={`chip ${Number(h.result) >= 20 ? 'high' : Number(h.result) >= 10 ? 'mid' : 'low'}`}>{h.result}</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="light-section" style={{ padding: 12 }}>
            <h2>Summary Chart</h2>
            <DashboardChart />
          </div>
        </div>
      </section>
    </main>
  )
}


