"use client";
import Navigation from "@/Components/Navigation.jsx";
import Link from "next/link";

function AboutPage() {
  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-8">
              About Algerian Forest Fire Detection
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              This application uses machine learning to predict forest fire risk in Algeria
              based on environmental factors such as temperature, humidity, and wind conditions.
            </p>
            <div className="bg-white shadow rounded-lg p-6 mt-8">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                How It Works
              </h2>
              <p className="text-gray-600">
                Our Ridge Regression model analyzes historical forest fire data to identify
                patterns and predict the likelihood of forest fires occurring in specific
                environmental conditions.
              </p>
            </div>
            
            {/* Additional Information */}
            <div className="bg-white shadow rounded-lg p-6 mt-6">
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                Key Features
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
                <div className="flex items-start space-x-3">
                  <div className="text-blue-500 text-xl">🔥</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Real-time Predictions</h3>
                    <p className="text-gray-600 text-sm">Get instant fire risk assessments</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-green-500 text-xl">📊</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Data Analysis</h3>
                    <p className="text-gray-600 text-sm">Track your prediction history</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-purple-500 text-xl">🌍</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">Algeria Focused</h3>
                    <p className="text-gray-600 text-sm">Specifically designed for Algerian conditions</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <div className="text-orange-500 text-xl">🤖</div>
                  <div>
                    <h3 className="font-semibold text-gray-800">ML Powered</h3>
                    <p className="text-gray-600 text-sm">Advanced Ridge Regression algorithm</p>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Navigation Options */}
            <div className="mt-8 space-y-4">
              <h3 className="text-lg font-semibold text-gray-800">Ready to get started?</h3>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button 
                  onClick={() => window.location.href = '/'}
                  className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  🚀 Make Your First Prediction
                </button>
                <button 
                  onClick={() => window.location.href = '/dashboard'}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
                >
                  📊 View Dashboard
                </button>
              </div>
              
              {/* Quick Links */}
              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500 mb-3">Quick Navigation:</p>
                <div className="flex flex-wrap justify-center gap-3">
                  <Link 
                    href="/" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors duration-200"
                  >
                    ← Back to Home
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link 
                    href="/dashboard" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors duration-200"
                  >
                    View Dashboard
                  </Link>
                  <span className="text-gray-400">•</span>
                  <Link 
                    href="/" 
                    className="text-blue-600 hover:text-blue-800 text-sm font-medium hover:underline transition-colors duration-200"
                  >
                    Make Prediction
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;
