"use client"
import { createContext, useContext, useMemo, useState } from 'react'

const PredictionContext = createContext(null)

export function usePredictions() {
  const ctx = useContext(PredictionContext)
  if (!ctx) throw new Error('usePredictions must be used within PredictionProvider')
  return ctx
}

export function PredictionProvider({ children }) {
  const [history, setHistory] = useState([])

  const addPrediction = (input, result) => {
    const entry = {
      id: crypto.randomUUID(),
      timestamp: new Date().toISOString(),
      input,
      result
    }
    setHistory((prev) => [entry, ...prev])
  }

  const value = useMemo(() => ({ history, addPrediction }), [history])
  return <PredictionContext.Provider value={value}>{children}</PredictionContext.Provider>
}


