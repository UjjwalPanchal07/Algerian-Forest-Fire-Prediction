"use client";
import React, { useState, useEffect, useMemo } from "react";

const DashboardChart = React.memo(function DashboardChart({ data, type = "line", title, height = 300 }) {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    if (data && data.length > 0) {
      setChartData(data);
    }
  }, [data]);

  // Helper function to safely get numeric values
  const getSafeValue = useMemo(() => (value) => {
    const num = parseFloat(value);
    return isNaN(num) ? 0 : num;
  }, []);

  // Helper function to safely calculate chart positions
  const getChartPosition = useMemo(() => (value, maxValue, minValue, chartHeight) => {
    if (maxValue === minValue) return chartHeight / 2;
    const safeValue = getSafeValue(value);
    return ((maxValue - safeValue) / (maxValue - minValue)) * chartHeight;
  }, [getSafeValue]);

  // Memoized chart calculations
  const chartCalculations = useMemo(() => {
    if (!chartData.length) return null;

    // Handle both x/y and value formats
    const values = chartData.map(d => getSafeValue(d.y || d.value));
    const maxValue = Math.max(...values);
    const minValue = Math.min(...values);
    const range = maxValue - minValue;

    return { values, maxValue, minValue, range };
  }, [chartData, getSafeValue]);

  const renderLineChart = () => {
    if (!chartData.length) return <div className="text-gray-500 text-center py-8">No data available</div>;
    if (!chartCalculations) return null;
    
    const { maxValue, minValue, range } = chartCalculations;
    
    return (
      <svg width="100%" height={height} className="overflow-visible">
        <defs>
          <linearGradient id="lineGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
            <stop offset="100%" stopColor="rgba(59, 130, 246, 0.1)" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {Array.from({ length: 5 }, (_, i) => (
          <line
            key={i}
            x1="0"
            y1={(i / 4) * height}
            x2="100%"
            y2={(i / 4) * height}
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}
        
        {/* Line path */}
        <path
          d={chartData.map((point, index) => {
            const x = (index / (chartData.length - 1)) * 100;
            const y = getChartPosition(point.y || point.value, maxValue, minValue, height);
            return `${index === 0 ? 'M' : 'L'} ${x}% ${y}`;
          }).join(' ')}
          stroke="#3b82f6"
          strokeWidth="3"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        
        {/* Area fill */}
        <path
          d={chartData.map((point, index) => {
            const x = (index / (chartData.length - 1)) * 100;
            const y = getChartPosition(point.y || point.value, maxValue, minValue, height);
            return `${index === 0 ? 'M' : 'L'} ${x}% ${y}`;
          }).join(' ') + ` L 100% ${height} L 0 ${height} Z`}
          fill="url(#lineGradient)"
          opacity="0.3"
        />
        
        {/* Data points */}
        {chartData.map((point, index) => {
          const x = (index / (chartData.length - 1)) * 100;
          const y = getChartPosition(point.y || point.value, maxValue, minValue, height);
          return (
            <circle
              key={index}
              cx={`${x}%`}
              cy={y}
              r="4"
              fill="#3b82f6"
              className="hover:r-6 transition-all duration-200"
            />
          );
        })}
        
        {/* X-axis labels */}
        {chartData.map((point, index) => {
          const x = (index / (chartData.length - 1)) * 100;
          return (
            <text
              key={index}
              x={`${x}%`}
              y={height + 20}
              textAnchor="middle"
              className="text-xs text-gray-500"
            >
              {point.label || point.x || `Day ${index + 1}`}
            </text>
          );
        })}
        
        {/* Y-axis labels */}
        {Array.from({ length: 5 }, (_, i) => {
          const value = maxValue - (i / 4) * range;
          const y = (i / 4) * height;
          return (
            <text
              key={i}
              x="-10"
              y={y + 4}
              textAnchor="end"
              className="text-xs text-gray-500"
            >
              {Math.round(getSafeValue(value))}
            </text>
          );
        })}
      </svg>
    );
  };

  const renderBarChart = () => {
    if (!chartData.length) return <div className="text-gray-500 text-center py-8">No data available</div>;
    if (!chartCalculations) return null;
    
    const { maxValue } = chartCalculations;
    const barWidth = 100 / chartData.length;
    
    return (
      <svg width="100%" height={height} className="overflow-visible">
        {/* Grid lines */}
        {Array.from({ length: 5 }, (_, i) => (
          <line
            key={i}
            x1="0"
            y1={(i / 4) * height}
            x2="100%"
            y2={(i / 4) * height}
            stroke="#e5e7eb"
            strokeWidth="1"
            opacity="0.5"
          />
        ))}
        
        {/* Bars */}
        {chartData.map((point, index) => {
          const value = getSafeValue(point.y || point.value);
          const barHeight = maxValue === 0 ? 0 : (value / maxValue) * height;
          const x = index * barWidth;
          const y = height - barHeight;
          
          return (
            <g key={index}>
              <rect
                x={`${x + 2}%`}
                y={y}
                width={`${barWidth - 4}%`}
                height={barHeight}
                fill="#3b82f6"
                rx="2"
                className="hover:fill-blue-600 transition-colors duration-200"
              />
              <text
                x={`${x + barWidth / 2}%`}
                y={y - 10}
                textAnchor="middle"
                className="text-xs font-medium text-gray-700"
              >
                {Math.round(value)}
              </text>
            </g>
          );
        })}
        
        {/* X-axis labels */}
        {chartData.map((point, index) => {
          const x = index * barWidth + barWidth / 2;
          return (
            <text
              key={index}
              x={`${x}%`}
              y={height + 20}
              textAnchor="middle"
              className="text-xs text-gray-500"
            >
              {point.label || point.x || `Category ${index + 1}`}
            </text>
          );
        })}
        
        {/* Y-axis labels */}
        {Array.from({ length: 5 }, (_, i) => {
          const value = (i / 4) * maxValue;
          const y = height - (i / 4) * height;
          return (
            <text
              key={i}
              x="-10"
              y={y + 4}
              textAnchor="end"
              className="text-xs text-gray-500"
            >
              {Math.round(getSafeValue(value))}
            </text>
          );
        })}
      </svg>
    );
  };

  const renderChart = () => {
    switch (type) {
      case "line":
        return renderLineChart();
      case "bar":
        return renderBarChart();
      default:
        return renderLineChart();
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">{title}</h3>
      <div className="relative">
        {renderChart()}
      </div>
    </div>
  );
});

export default DashboardChart;
