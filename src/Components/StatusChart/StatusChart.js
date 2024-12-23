// StatusChart.js
import React from 'react';
import { Pie } from 'react-chartjs-2';

const StatusChart = ({ data }) => {
  const statusData = {
    labels: [...new Set(data.map(d => d.status))],
    datasets: [{
      label: 'Incident Status',
      data: data.map(d => d.incidentCount),
      backgroundColor: ['#36a2eb', '#ff6384', '#cc65fe', '#ffce56'],
    }],
  };

  return (
    <div>
      <h3>Incident Status Breakdown</h3>
      <Pie data={statusData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default StatusChart;


