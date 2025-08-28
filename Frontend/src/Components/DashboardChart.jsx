"use client"
import { useEffect, useRef } from 'react'
import { usePredictions } from './PredictionContext'

export default function DashboardChart() {
  const ref = useRef(null)
  const { history } = usePredictions()

  useEffect(() => {
    if (!ref.current) return
    // Derive series from history (FWI values over time)
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const values = history.map(h => Number(h.result)).slice().reverse()
    if (values.length === 0) {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      ctx.fillStyle = '#94a3b8'
      ctx.font = '14px system-ui'
      ctx.fillText('No data to chart', 10, 24)
      return
    }
    const w = canvas.width
    const h = canvas.height
    const bw = w / values.length
    ctx.clearRect(0, 0, w, h)
    const max = Math.max(...values, 1)
    values.forEach((v, i) => {
      const bh = (v / max) * (h - 20)
      const x = i * bw + 8
      const y = h - bh
      // gradient bar
      const grad = ctx.createLinearGradient(0, y, 0, y + bh)
      grad.addColorStop(0, '#60a5fa')
      grad.addColorStop(1, '#a78bfa')
      ctx.fillStyle = grad
      ctx.fillRect(x, y, bw - 16, bh)
    })
    // Axis line
    ctx.strokeStyle = '#e5e7eb'
    ctx.beginPath()
    ctx.moveTo(0, h - 0.5)
    ctx.lineTo(w, h - 0.5)
    ctx.stroke()
  }, [history])

  return (
    <div>
      <canvas ref={ref} width={480} height={200} style={{ border: '1px solid #e5e7eb', background: '#fff', borderRadius: 8 }} />
    </div>
  )
}


