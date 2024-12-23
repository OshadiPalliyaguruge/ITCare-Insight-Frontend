// IncidentTrendChart.js
import React from 'react';
import { Line } from 'react-chartjs-2';
import { linearRegression, linearRegressionLine } from 'simple-statistics';

const IncidentTrendChart = ({ data }) => {
  const dates = data.map(d => new Date(d.date).getTime()); // Convert dates to timestamps
  const incidents = data.map(d => d.incidentCount);

  const regression = linearRegression(dates.map((date, i) => [date, incidents[i]]));
  const predictedIncident = linearRegressionLine(regression);

  const futureDate = new Date().getTime() + (30 * 24 * 60 * 60 * 1000); // Predicting for 30 days ahead
  const predictedCount = predictedIncident(futureDate);

  const incidentTrendData = {
    labels: data.map(d => d.date),
    datasets: [{
      label: 'Incident Trends Over Time',
      data: data.map(d => d.incidentCount),
      fill: false,
      borderColor: '#42a5f5',
      tension: 0.1,
    }],
  };

  return (
    <div>
      <h3>Incident Trends Over Time</h3>
      <Line data={incidentTrendData} options={{ responsive: true, maintainAspectRatio: false }} />
      <h4>Predicted Incident Count (30 Days Ahead): {Math.round(predictedCount)}</h4>
    </div>
  );
};

export default IncidentTrendChart;
