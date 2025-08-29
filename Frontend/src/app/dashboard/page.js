"use client";
import { useState, useEffect, useRef, useMemo, useCallback } from "react";
import Navigation from "@/Components/Navigation.jsx";
import DashboardChart from "@/Components/DashboardChart.jsx";

function DashboardPage() {
  const [predictions, setPredictions] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [gsap, setGsap] = useState(null);
  
  // Refs for sections
  const summaryRef = useRef(null);
  const chartsRef = useRef(null);
  const historyRef = useRef(null);

  // Load GSAP dynamically to prevent SSR issues
  useEffect(() => {
    const loadGSAP = async () => {
      try {
        const { gsap: gsapModule, ScrollToPlugin } = await import('gsap');
        gsapModule.registerPlugin(ScrollToPlugin);
        setGsap(gsapModule);
      } catch (error) {
        console.error('Failed to load GSAP:', error);
      }
    };
    
    loadGSAP();

    // Cleanup function to prevent memory leaks
    return () => {
      if (gsap) {
        // Kill any ongoing GSAP animations
        gsap.killTweensOf(window);
      }
    };
  }, []);

  // Load user's real predictions from localStorage
  useEffect(() => {
    const loadPredictions = () => {
      try {
        const savedPredictions = localStorage.getItem('forestFirePredictions');
        if (savedPredictions) {
          const parsedPredictions = JSON.parse(savedPredictions);
          setPredictions(parsedPredictions);
        } else {
          setPredictions([]);
        }
        setIsLoading(false);
      } catch (error) {
        console.error('Error loading predictions:', error);
        setPredictions([]);
        setIsLoading(false);
      }
    };

    loadPredictions();
  }, []);

  // Memoized chart data generation to prevent unnecessary recalculations
  const chartData = useMemo(() => {
    if (predictions.length === 0) return { temperatureTrend: [], predictionTrend: [], riskDistribution: [] };

    const last5Predictions = predictions.slice(0, 5).reverse();
    
    const temperatureTrend = last5Predictions.map((pred, index) => ({
      x: index + 1,
      y: pred.temperature,
      label: pred.date
    }));

    const predictionTrend = last5Predictions.map((pred, index) => ({
      x: index + 1,
      y: pred.prediction,
      label: pred.date
    }));

    const riskCounts = predictions.reduce((acc, pred) => {
      acc[pred.risk] = (acc[pred.risk] || 0) + 1;
      return acc;
    }, {});

    const riskDistribution = Object.entries(riskCounts).map(([risk, count]) => ({
      x: risk,
      y: count,
      label: risk
    }));

    return { temperatureTrend, predictionTrend, riskDistribution };
  }, [predictions]);

  // Memoized summary statistics to prevent recalculation
  const summaryStats = useMemo(() => {
    if (predictions.length === 0) {
      return {
        total: 0,
        average: 0,
        highest: 0,
        lowest: 0
      };
    }

    const values = predictions.map(p => p.prediction);
    return {
      total: predictions.length,
      average: (values.reduce((sum, val) => sum + val, 0) / values.length).toFixed(1),
      highest: Math.max(...values).toFixed(1),
      lowest: Math.min(...values).toFixed(1)
    };
  }, [predictions]);

  // Memoized risk color functions to prevent recreation
  const getRiskColor = useCallback((risk) => {
    switch (risk) {
      case "LOW": return "text-green-600";
      case "MEDIUM": return "text-yellow-600";
      case "HIGH": return "text-orange-600";
      case "EXTREME": return "text-red-600";
      default: return "text-gray-600";
    }
  }, []);

  const getRiskBgColor = useCallback((risk) => {
    switch (risk) {
      case "LOW": return "bg-green-100";
      case "MEDIUM": return "bg-yellow-100";
      case "HIGH": return "bg-orange-100";
      case "EXTREME": return "bg-red-100";
      default: return "bg-gray-100";
    }
  }, []);

  // Optimized scroll functions with useCallback
  const scrollToSection = useCallback((sectionRef, offset = 80) => {
    if (sectionRef.current && gsap && gsap.to && gsap.ScrollToPlugin) {
      try {
        gsap.to(window, {
          duration: 1.2,
          scrollTo: {
            y: sectionRef.current,
            offsetY: offset
          },
          ease: "power2.out"
        });
      } catch (error) {
        console.error('GSAP scrollTo error:', error);
        fallbackScrollToSection(sectionRef, offset);
      }
    } else {
      fallbackScrollToSection(sectionRef, offset);
    }
  }, [gsap]);

  const fallbackScrollToSection = useCallback((sectionRef, offset = 80) => {
    if (sectionRef.current) {
      try {
        const safeOffset = typeof offset === 'number' && !isNaN(offset) ? offset : 80;
        
        sectionRef.current.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        });
        
        setTimeout(() => {
          try {
            window.scrollBy({
              top: -safeOffset,
              behavior: 'smooth'
            });
          } catch (scrollByError) {
            window.scrollBy(0, -safeOffset);
          }
        }, 100);
        
      } catch (error) {
        console.error('Fallback scroll error:', error);
        try {
          sectionRef.current.scrollIntoView();
        } catch (finalError) {
          console.error('Final scroll fallback error:', finalError);
        }
      }
    }
  }, []);

  // Memoized scroll functions
  const scrollToSummary = useCallback(() => scrollToSection(summaryRef, 80), [scrollToSection]);
  const scrollToCharts = useCallback(() => scrollToSection(chartsRef, 80), [scrollToSection]);
  const scrollToHistory = useCallback(() => scrollToSection(historyRef, 80), [scrollToSection]);

  // Show loading state while GSAP is loading
  if (isLoading || !gsap) {
    return (
      <div>
        <Navigation />
        <div className="min-h-screen bg-gray-50 flex items-center justify-center">
          <div className="text-center">
            <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">
              {isLoading ? 'Loading your predictions...' : 'Loading smooth scrolling...'}
            </p>
          </div>
        </div>
      </div>
    );
  }

  // If no predictions exist, show empty state
  if (predictions.length === 0) {
    return (
      <div>
        <Navigation />
        <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <div className="bg-white rounded-lg shadow p-12">
              <div className="text-6xl mb-6">🔥</div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                No Predictions Yet
              </h1>
              <p className="text-lg text-gray-600 mb-8">
                You haven't made any forest fire predictions yet. Make your first prediction to see your history here!
              </p>
              <button 
                onClick={() => window.location.href = '/'}
                className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              >
                Make Your First Prediction
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <Navigation />
      <div className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="text-center mb-8">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Your Forest Fire Predictions
            </h1>
            <p className="text-lg text-gray-600 mb-6">
              Track your prediction history and analyze trends
            </p>
            
            {/* Quick Navigation with GSAP */}
            <div className="flex flex-wrap justify-center gap-3">
              <button 
                onClick={scrollToSummary}
                className="bg-blue-100 hover:bg-blue-200 text-blue-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              >
                📊 Summary
              </button>
              <button 
                onClick={scrollToCharts}
                className="bg-green-100 hover:bg-green-200 text-green-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              >
                📈 Charts
              </button>
              <button 
                onClick={scrollToHistory}
                className="bg-purple-100 hover:bg-purple-200 text-purple-700 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 hover:scale-105 active:scale-95"
              >
                📋 History
              </button>
            </div>
          </div>

          {/* Summary Cards */}
          <div ref={summaryRef} className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
            <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 card">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Total Predictions</h3>
              <div className="text-3xl font-bold text-blue-600">{summaryStats.total}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 card">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Average Risk</h3>
              <div className="text-3xl font-bold text-orange-600">{summaryStats.average}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 card">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Highest Risk</h3>
              <div className="text-3xl font-bold text-red-600">{summaryStats.highest}</div>
            </div>
            
            <div className="bg-white rounded-lg shadow p-6 text-center hover:shadow-lg transition-all duration-300 hover:scale-105 card">
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Lowest Risk</h3>
              <div className="text-3xl font-bold text-green-600">{summaryStats.lowest}</div>
            </div>
          </div>

          {/* Charts */}
          <div ref={chartsRef} className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <DashboardChart
              data={chartData.temperatureTrend}
              type="line"
              title="Temperature Trend (Last 5 Predictions)"
              height={250}
            />
            <DashboardChart
              data={chartData.predictionTrend}
              type="line"
              title="Fire Risk Trend (Last 5 Predictions)"
              height={250}
            />
          </div>

          <div className="mb-8">
            <DashboardChart
              data={chartData.riskDistribution}
              type="bar"
              title="Risk Level Distribution"
              height={250}
            />
          </div>

          {/* Predictions Table */}
          <div ref={historyRef} className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Prediction History</h2>
            <div className="overflow-x-auto dashboard-table custom-scrollbar">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Temperature</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Humidity</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Wind</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rainfall</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Score</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Risk Level</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {predictions.map((prediction) => (
                    <tr key={prediction.id} className="hover:bg-gray-50 transition-all duration-200 hover:scale-[1.01] table-row">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {prediction.date}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseFloat(prediction.temperature).toFixed(1)}°C
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseFloat(prediction.humidity).toFixed(1)}%
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseFloat(prediction.windSpeed).toFixed(1)} km/h
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseFloat(prediction.rainfall).toFixed(1)} mm
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {parseFloat(prediction.prediction).toFixed(1)}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getRiskBgColor(prediction.risk)} ${getRiskColor(prediction.risk)}`}>
                          {prediction.risk}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4 justify-center">
            <button 
              onClick={() => window.location.href = '/'}
              className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Make New Prediction
            </button>
            <button 
              onClick={() => window.location.href = '/about'}
              className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg font-medium transition-all duration-300 hover:scale-105 active:scale-95"
            >
              Learn More
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DashboardPage;
