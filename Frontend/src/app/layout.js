import Navigation from '../Components/Navigation'
import './globals.css'
import { PredictionProvider } from '../Components/PredictionContext'

export const metadata = {
  title: 'FWI Prediction',
  description: 'Predict Fire Weather Index using a trained model'
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <PredictionProvider>
          <Navigation />
          {children}
        </PredictionProvider>
      </body>
    </html>
  )
}


