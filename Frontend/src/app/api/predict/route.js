export async function POST(request) {
  try {
    const payload = await request.json()
    const base = (typeof process !== 'undefined' && process.env && process.env.NEXT_PUBLIC_API_BASE_URL) ? process.env.NEXT_PUBLIC_API_BASE_URL : 'https://algerian-forest-fire-prediction-3cpe.onrender.com'
    const url = `${base.replace(/\/$/, '')}/api/predict`
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    // Check if response has content
    const text = await response.text()
    let data
    try {
      data = text ? JSON.parse(text) : {}
    } catch (e) {
      data = { error: 'Invalid JSON response from backend.' }
    }

    return new Response(JSON.stringify(data), {
      status: response.status,
      headers: { 'Content-Type': 'application/json' }
    })
  } catch (err) {
    return new Response(JSON.stringify({ error: String(err) }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
}


