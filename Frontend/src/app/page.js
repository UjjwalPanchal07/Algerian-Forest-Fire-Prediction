import Form from '../Components/Form'

export default function HomePage() {
  return (
    <main>
      <section className="card" style={{ maxWidth: 960, margin: '24px auto' }}>
        <h1>FWI Prediction</h1>
        <p style={{ color: '#9ca3af', marginBottom: 12 }}>Enter environmental parameters to estimate the Fire Weather Index.</p>
        <Form />
      </section>
    </main>
  )
}


