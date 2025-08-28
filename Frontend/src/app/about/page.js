export default function AboutPage() {
  return (
    <main className="light-page">
      <section className="card about-accent" style={{ maxWidth: 1040, margin: '24px auto' }}>
        <h1>About</h1>
        <p style={{ color: '#64748b' }}>
          Fire Weather Index (FWI) Predictor is an ML-powered web app built with Next.js and Flask. It uses a
          Ridge Regression model trained on the Algerian Forest Fires dataset to estimate the FWI based on
          environmental parameters. The interface is designed for clarity and speed, with client-side validation
          and instant results.
        </p>
        <div className="grid" style={{ marginTop: 12 }}>
          <div className="card">
            <h2>Inputs</h2>
            <p style={{ color: '#64748b' }}>
              Temperature (°C), Relative Humidity (%), Wind Speed (km/h), Rainfall (mm), FFMC (Fine Fuel Moisture Code),
              DMC (Duff Moisture Code), ISI (Initial Spread Index), Classes (0 = not fire, 1 = fire), and Region
              (Bejaia = 0, Sidi-Bel Abbes = 1).
            </p>
          </div>
          <div className="card">
            <h2>Ranges</h2>
            <p style={{ color: '#64748b' }}>
              Temperature: 20–100, RH: 21–90, Ws: 6–29, Rain: 0–16.8, FFMC: 28.6–92.5, DMC: 1.1–65.9, ISI: 0–18.5.
            </p>
          </div>
          <div className="card">
            <h2>Tech Stack</h2>
            <p style={{ color: '#64748b' }}>
              Next.js (React), Flask API, client-side history, and a lightweight visualization.
            </p>
          </div>
        </div>
      </section>
    </main>
  )
}


