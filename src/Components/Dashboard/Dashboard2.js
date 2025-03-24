
import React, { useState, useMemo, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';

import {
  Chart as ChartJS,
  ArcElement,
  BarElement,
  LineElement,
  PointElement,
  CategoryScale,
  LinearScale,
  Tooltip,
  Legend,
} from 'chart.js';
import './Dashboard.css';

ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = ({ data }) => {
  const [statusChartData, setStatusChartData] = useState([]);
  const [resolutionTimes, setResolutionTimes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [slmData, setSlmData] = useState([]);
  const [submitDateData, setSubmitDateData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [weekdayData, setWeekdayData] = useState([]);

  const totalIncidents = useMemo(() => data?.reduce((sum, d) => sum + d.incidentCount, 0) || 0, [data]);
  const priorityCounts = useMemo(() => new Set(data?.map((d) => d.priority)).size || 0, [data]);
  const statusCounts = useMemo(() => new Set(data?.map((d) => d.status)).size || 0, [data]);
  const departmentCounts = useMemo(() => new Set(data?.map((d) => d.department)).size || 0, [data]);

  const status1Data = useMemo(() => ({
    labels: statusChartData.map((d) => d.status),
    datasets: [
      {
        data: statusChartData.map((d) => d.incidentCount),
        backgroundColor: ['#36a2eb', '#ff6384', '#cc65fe', '#ffce56'],
      },
    ],
  }), [statusChartData]);

  const resolutionTimeChartData = useMemo(() => ({
    labels: resolutionTimes,
    datasets: [
      {
        label: 'Resolution Times (Hours)',
        data: resolutionTimes,
        backgroundColor: '#42a5f5',
      },
    ],
  }), [resolutionTimes]);

  const filteredChartData = useMemo(() => ({
    labels: filteredData.map((d) => `${d.priority} - ${d.status}`),
    datasets: [
      {
        label: 'Filtered Incident Counts',
        data: filteredData.map((d) => d.incidentCount),
        backgroundColor: '#36a2eb',
      },
    ],
  }), [filteredData]);

  const sentimentChartData = useMemo(() => ({
    labels: sentimentData.map((item) => item.sentiment),
    datasets: [
      {
        label: 'Sentiment Count',
        data: sentimentData.map((item) => item.counts),
        backgroundColor: ['red', 'blue', 'green'],
      },
    ],
  }), [sentimentData]);

  const sentimentChartOptions = {
    plugins: {
      legend: { display: true },
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const sentiment = tooltipItem.label;
            const count = tooltipItem.raw;
            return `${sentiment}: ${count.toLocaleString()}`;
          },
        },
      },
    },
  };

  const slmChartData = useMemo(() => ({
    labels: slmData.map((d) => d.slmStatus),
    datasets: [
      {
        data: slmData.map((d) => d.incidentCount),
        backgroundColor: ['#36a2eb', '#ff6384', '#00FF00'],
      },
    ],
  }), [slmData]);

  const submitDateChartData = useMemo(() => ({
    labels: submitDateData.map((d) => d.submitDate),
    datasets: [
      {
        label: 'Incidents',
        data: submitDateData.map((d) => d.incidentCount),
        borderColor: '#42a5f5',
      },
    ],
  }), [submitDateData]);

  const yearlyChartData = useMemo(() => ({
    labels: yearlyData.map((d) => d.year),
    datasets: [
      {
        label: 'Yearly Incidents',
        data: yearlyData.map((d) => d.incidentCount),
        borderColor: '#42a5f5',
        fill: false,
      },
    ],
  }), [yearlyData]);

  const monthlyChartData = useMemo(() => ({
    labels: monthlyData.map((d) => d.month),
    datasets: [
      {
        label: 'Monthly Incidents',
        data: monthlyData.map((d) => d.incidentCount),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  }), [monthlyData]);

  const weekdayChartData = useMemo(() => ({
    labels: weekdayData.map((d) => d.weekday),
    datasets: [
      {
        label: 'Weekday Incidents',
        data: weekdayData.map((d) => d.incidentCount),
        backgroundColor: 'rgba(255,159,64,0.6)',
      },
    ],
  }), [weekdayData]);

  const handleCardClick = (category) => {
    console.log(`Card clicked: ${category}`);
  };

  useEffect(() => {
    const fetchData = async (endpoint, setState) => {
      try {
        const response = await fetch(`http://localhost:5000/api/${endpoint}`);
        const data = await response.json();
        setState(data);
      } catch (error) {
        console.error(`Error fetching ${endpoint}:`, error);
      }
    };

    fetchData('status-data', setStatusChartData);
    fetchData('resolution-times', setResolutionTimes);
    fetchData('filtered-data', setFilteredData);
    fetchData('sentiment-trends', setSentimentData);
    fetchData('slm-status', setSlmData);
    fetchData('submit-date-trends', setSubmitDateData);
    fetchData('yearly-trend', setYearlyData);
    fetchData('monthly-distribution', setMonthlyData);
    fetchData('weekday-distribution', setWeekdayData);
  }, []);

  return (
    <div className="wrapper">
      <div className="main-content">
        <h2>Incident Data Dashboard</h2>
        <div className="summary-cards">
          <div className="card" onClick={() => handleCardClick('incidentCount')}>
            <h4>Total Incidents</h4>
            <p>{totalIncidents}</p>
          </div>
          <div className="card" onClick={() => handleCardClick('priority')}>
            <h4>Priority Levels</h4>
            <p>{priorityCounts}</p>
          </div>
          <div className="card" onClick={() => handleCardClick('status')}>
            <h4>Status Types</h4>
            <p>{statusCounts}</p>
          </div>
          <div className="card" onClick={() => handleCardClick('department')}>
            <h4>Departments</h4>
            <p>{departmentCounts}</p>
          </div>
        </div>

        <div className="chart-row">
          <div className="chart-container">
            <h3>Yearly Incident Trend</h3>
            <Line data={yearlyChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <div className="chart-container">
            <h3>Monthly Incident Distribution</h3>
            <Bar data={monthlyChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <div className="chart-container">
            <h3>Weekday Incident Distribution</h3>
            <Bar data={weekdayChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <div className="chart-row">
          <div className="chart-container">
            <h3>Incident Status Breakdown</h3>
            {statusChartData.length > 0 ? (
              <Pie data={status1Data} options={{ responsive: true }} />
            ) : (
              <p>Loading status data...</p>
            )}
          </div>
          <div className="chart-container">
            <h3>Resolution Times</h3>
            <Bar data={resolutionTimeChartData} options={{ responsive: true }} />
          </div>
        </div>

        <div className="chart-row">
          <h3>Filtered Incident Data</h3>
          <Bar data={filteredChartData} options={{ responsive: true }} />
        </div>

        <div className="chart-container">
          <h3>Sentiment Analysis Results</h3>
          {sentimentData.length > 0 ? (
            <Pie data={sentimentChartData} options={sentimentChartOptions} />
          ) : (
            <p>Loading sentiment data...</p>
          )}
        </div>

        <div className="chart-grid">
          <div className="chart-container">
            <h3>SLM Real Time Status</h3>
            <Pie data={slmChartData} />
          </div>
          <div className="chart-container">
            <h3>Incident Submission Trends</h3>
            <Line data={submitDateChartData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
.dashboard-container {
  padding: 20px;
  font-family: Arial, sans-serif;
}

.summary-cards {
  display: flex;
  justify-content: space-between;
  margin-bottom: 30px;
}

.card {
  background-color: #f5f5f5;
  border-radius: 8px;
  padding: 20px;
  flex: 1;
  margin: 0 10px;
  text-align: center;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  cursor: pointer;
  transition: transform 0.2s ease-in-out;
}

.card:hover {
  transform: scale(1.05);
}

.card h4 {
  margin-bottom: 10px;
  font-size: 1.2em;
}

.detail-section {
  margin-top: 20px;
}

.detail-section h3 {
  margin-bottom: 15px;
}

canvas {
  max-width: 100% !important;
}
/* Flexbox layout for chart containers */
.chart-row {
  display: flex; /* Use flexbox for horizontal layout */
  justify-content: space-between; /* Space between the two charts */
  margin-bottom: 20px; /* Space between rows */
}

.chart-container {
  flex: 1; /* Allow both chart containers to grow equally */
  padding: 20px; /* Add some padding for spacing */
  box-sizing: border-box; /* Include padding in total width/height */
  width: 50%; /* Set each chart container to take up half the row */
}

.problem-solution-section {
  margin-top: 20px;
}

.problems-solutions-table {
  width: 100%;
  border-collapse: collapse;
  margin: 20px 0;
}

.problems-solutions-table th,
.problems-solutions-table td {
  border: 1px solid #ddd;
  padding: 8px;
}

.problems-solutions-table th {
  background-color: #f2f2f2;
  text-align: left;
}

.problems-solutions-table td {
  word-wrap: break-word;
  max-width: 300px;
}
.sample-problem-solution-section {
  margin-top: 20px;
}

.problems-solutions-table {
  width: 100%;
  border-collapse: collapse;
}

.problems-solutions-table th,
.problems-solutions-table td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.problems-solutions-table th {
  background-color: #f2f2f2;
}
.navigation-section {
  margin-top: 20px;
}

.sample-problems-link button {
  padding: 10px 20px;
  background-color: #42a5f5;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 16px;
}

.sample-problems-link button:hover {
  background-color: #2196f3;
}
.chart-container {
  width: 400px; /* Adjust this to reduce the width */
  height: 400px; /* Adjust this to reduce the height */
  margin: 0 auto; /* Center the chart */
  position: left; /* Ensure proper positioning for charts */
}

.chart-container canvas {
  max-width: 100% !important; /* Ensure the chart scales properly */
  max-height: 100% !important;
}
/* Container for holding the charts in two columns */
.chart-grid, .chart-row {
  display: grid;
  grid-template-columns: 1fr 1fr; /* Two equal-width columns */
  gap: 20px; /* Add some space between the charts */
  margin-top: 20px;
}

/* Ensure charts take up the full width within their column */
.chart-container {
  width: 100%;
}
 

