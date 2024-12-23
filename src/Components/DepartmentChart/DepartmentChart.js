// DepartmentChart.js
import React from 'react';
import { Bar } from 'react-chartjs-2';

const DepartmentChart = ({ data }) => {
  const departmentData = {
    labels: [...new Set(data.map(d => d.department))],
    datasets: [{
      label: 'Departments',
      data: data.map(d => d.incidentCount),
      backgroundColor: '#42a5f5',
    }],
  };

  return (
    <div>
      <h3>Departments Breakdown</h3>
      <Bar data={departmentData} options={{ responsive: true, maintainAspectRatio: false }} />
    </div>
  );
};

export default DepartmentChart;
