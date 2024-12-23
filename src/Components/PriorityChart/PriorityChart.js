// PriorityChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const PriorityChart = ({ data }) => {
  const priorityData = {
    labels: [...new Set(data.map(d => `Priority ${d.priority}`))],
    datasets: [{
      label: 'Incident Priority',
      data: data.map(d => d.incidentCount),
      backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4caf50', '#f44336'],
    }],
  };

  return (
    <div>
      <h3>Priority Levels Breakdown</h3>
      <Bar data={priorityData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default PriorityChart;


