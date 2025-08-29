"use client";
import React, { useEffect, useState } from "react";

const PredictionResultModal = ({ isOpen, onClose, prediction, formData }) => {
  const [isVisible, setIsVisible] = useState(false);
  const [animationStep, setAnimationStep] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setIsVisible(true);
      setAnimationStep(0);

      const timer1 = setTimeout(() => setAnimationStep(1), 100);
      const timer2 = setTimeout(() => setAnimationStep(2), 300);
      const timer3 = setTimeout(() => setAnimationStep(3), 600);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    } else {
      setIsVisible(false);
      setAnimationStep(0);
    }
  }, [isOpen]);

  const getRiskLevel = (predictionValue) => {
    if (predictionValue < 5)
      return {
        level: "LOW",
        color: "text-green-600",
        bgColor: "bg-green-100",
        icon: "🟢",
        description: "Minimal fire risk",
      };
    if (predictionValue < 15)
      return {
        level: "MEDIUM",
        color: "text-yellow-600",
        bgColor: "bg-yellow-100",
        icon: "🟡",
        description: "Moderate fire risk",
      };
    if (predictionValue < 30)
      return {
        level: "HIGH",
        color: "text-orange-600",
        bgColor: "bg-orange-100",
        icon: "🟠",
        description: "High fire risk",
      };
    return {
      level: "EXTREME",
      color: "text-red-600",
      bgColor: "bg-red-100",
      icon: "🔴",
      description: "Extreme fire risk",
    };
  };

  const getRiskAdvice = (riskLevel) => {
    switch (riskLevel) {
      case "LOW":
        return "Continue monitoring conditions. Fire risk is minimal at this time.";
      case "MEDIUM":
        return "Exercise caution. Monitor weather conditions and be prepared for changes.";
      case "HIGH":
        return "High alert! Implement fire prevention measures and monitor closely.";
      case "EXTREME":
        return "CRITICAL! Immediate action required. Implement all fire prevention protocols.";
      default:
        return "Monitor conditions and stay alert.";
    }
  };

  // Round prediction score
  const roundedPrediction = Math.round(prediction * 100) / 100;

  const riskInfo = getRiskLevel(roundedPrediction);

  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black transition-opacity duration-300 ${
          animationStep >= 1 ? "opacity-50" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Modal wrapper with scrollable content & hidden scrollbar */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-500 ${
          animationStep >= 2 ? "scale-100 opacity-100" : "scale-95 opacity-0"
        } max-h-[90vh] overflow-y-auto scrollbar-hide`}
        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
      >
        <style jsx>{`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
        `}</style>

        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 opacity-90" />
          <div className="relative p-6 text-center text-white">
            <div
              className={`text-6xl mb-4 transform transition-all duration-700 ${
                animationStep >= 3 ? "scale-100 rotate-0" : "scale-0 rotate-180"
              }`}
            >
              {riskInfo.icon}
            </div>
            <h2 className="text-2xl font-bold mb-2">Fire Risk Assessment</h2>
            <p className="text-blue-100">Based on environmental conditions</p>
          </div>
        </div>

        {/* Content */}
        <div className="p-6">
          {/* Risk Level */}
          <div
            className={`text-center mb-6 transform transition-all duration-700 delay-200 ${
              animationStep >= 3
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div
              className={`inline-flex items-center px-6 py-3 rounded-full ${riskInfo.bgColor} ${riskInfo.color} mb-3`}
            >
              <span className="text-2xl mr-2">{riskInfo.icon}</span>
              <span className="text-xl font-bold">{riskInfo.level}</span>
            </div>
            <p className="text-gray-600 text-sm">{riskInfo.description}</p>
          </div>

          {/* Prediction Score */}
          <div
            className={`bg-gray-50 rounded-xl p-4 mb-6 text-center transform transition-all duration-700 delay-300 ${
              animationStep >= 3
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="text-4xl font-bold text-gray-800 mb-2">
              {roundedPrediction}
            </div>
            <div className="text-gray-600">Risk Score</div>
          </div>

          {/* Environmental Factors */}
          <div
            className={`mb-6 transform transition-all duration-700 delay-400 ${
              animationStep >= 3
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Environmental Conditions
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🌡️</div>
                <div className="text-sm text-gray-600">Temperature</div>
                <div className="font-semibold text-gray-800">
                  {formData.Temperature}°C
                </div>
              </div>
              <div className="bg-green-50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">💧</div>
                <div className="text-sm text-gray-600">Humidity</div>
                <div className="font-semibold text-gray-800">
                  {formData.RH}%
                </div>
              </div>
              <div className="bg-gray-50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">💨</div>
                <div className="text-sm text-gray-600">Wind Speed</div>
                <div className="font-semibold text-gray-800">
                  {formData.Ws} km/h
                </div>
              </div>
              <div className="bg-blue-50 rounded-lg p-3 text-center">
                <div className="text-2xl mb-1">🌧️</div>
                <div className="text-sm text-gray-600">Rainfall</div>
                <div className="font-semibold text-gray-800">
                  {formData.Rain} mm
                </div>
              </div>
            </div>
          </div>

          {/* Safety Advice */}
          <div
            className={`bg-yellow-50 border-l-4 border-yellow-400 p-4 mb-6 transform transition-all duration-700 delay-500 ${
              animationStep >= 3
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <div className="flex items-start">
              <div className="text-yellow-600 text-xl mr-3">⚠️</div>
              <div>
                <h4 className="font-semibold text-yellow-800 mb-1">
                  Safety Advice
                </h4>
                <p className="text-yellow-700 text-sm">
                  {getRiskAdvice(riskInfo.level)}
                </p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div
            className={`flex gap-3 transform transition-all duration-700 delay-600 ${
              animationStep >= 3
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <button
              onClick={onClose}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            >
              Close
            </button>
            <button
              onClick={() => (window.location.href = "/dashboard")}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg font-medium transition-all duration-200 hover:scale-105 active:scale-95"
            >
              View Dashboard
            </button>
          </div>
        </div>

        {/* Decorative */}
        <div className="absolute top-4 right-4">
          <div className="w-3 h-3 bg-white rounded-full opacity-60"></div>
        </div>
        <div className="absolute bottom-4 left-4">
          <div className="w-2 h-2 bg-blue-200 rounded-full opacity-60"></div>
        </div>
      </div>
    </div>
  );
};

export default PredictionResultModal;
