import React, { useState, useMemo, useEffect } from 'react';
import { Bar, Pie, Line } from 'react-chartjs-2';
import io from 'socket.io-client';
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
import { LineChart} from 'recharts';
import { Link } from 'react-router-dom';

// Registering chart components
ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000'); // Replace with your backend URL

const DashboardAnalytics = ({ data }) => {
  const [statusChartData, setStatusChartData] = useState([]);
  const [resolutionTimes, setResolutionTimes] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [weekdayData, setWeekdayData] = useState([]);
  const [submitDateData, setSubmitDateData] = useState([]);
  const [slmData, setSlmData] = useState([]);
  const [departmentResolutionData, setDepartmentResolutionData] = useState([]);
  const [departmentClosureRateData, setDepartmentClosureRateData] = useState([]);
  const [peakHoursData, setPeakHoursData] = useState([]);
  const [peakDaysData, setPeakDaysData] = useState([]);
  const [peakMonthsData, setPeakMonthsData] = useState([]);
  
  // Utility for fetching data
  const fetchData = async (endpoint, setState) => {
    try {
      const response = await fetch(`http://localhost:5000/api/${endpoint}`);
      const data = await response.json();
      setState(data);
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
    }
  }; 

  useEffect(() => {
    fetchData('status-data', setStatusChartData);
    fetchData('resolution-times', setResolutionTimes);
    fetchData('incident-resolution-sentiment', setSentimentData);
    fetchData('yearly-trend', setYearlyData);
    fetchData('monthly-distribution', setMonthlyData);
    fetchData('weekday-distribution', setWeekdayData);
    fetchData('submit-date-trends', setSubmitDateData);
    fetchData('slm-status', setSlmData);
    fetchData('department-resolution-performance', setDepartmentResolutionData);
    fetchData('department-closure-rate', setDepartmentClosureRateData);
    fetchData('peak-hours', setPeakHoursData);
    fetchData('peak-days', setPeakDaysData);
    fetchData('peak-months', setPeakMonthsData);
  }, []);

  // Real-time updates using Socket.io
  useEffect(() => {
    // Listen for real-time updates for each of the data categories
    socket.on('statusUpdate', (data) => setStatusChartData(data));
    socket.on('resolutionUpdate', (data) => setResolutionTimes(data));
    socket.on('sentimentUpdate', (data) => setSentimentData(data));
    socket.on('yearlyUpdate', (data) => setYearlyData(data));
    socket.on('monthlyUpdate', (data) => setMonthlyData(data));
    socket.on('weekdayUpdate', (data) => setWeekdayData(data));
    socket.on('submitDateUpdate', (data) => setSubmitDateData(data));
    socket.on('slmUpdate', (data) => setSlmData(data));
    socket.on('departmentResolutionUpdate', (data) => setDepartmentResolutionData(data));
    socket.on('departmentClosureRateUpdate', (data) => setDepartmentClosureRateData(data));
    socket.on('peakHoursUpdate', (data) => setPeakHoursData(data));
    socket.on('peakDaysUpdate', (data) => setPeakDaysData(data));
    socket.on('peakMonthsUpdate', (data) => setPeakMonthsData(data));


    return () => {
      // Clean up listeners when component unmounts
      socket.off('statusUpdate');
      socket.off('resolutionUpdate');
      socket.off('sentimentUpdate');
      socket.off('yearlyUpdate');
      socket.off('monthlyUpdate');
      socket.off('weekdayUpdate');
      socket.off('submitDateUpdate');
      socket.off('slmUpdate');
      socket.off('departmentResolutionUpdate');
      socket.off('departmentClosureRateUpdate');
      socket.off('peakHoursUpdate');
      socket.off('peakDaysUpdate');
      socket.off('peakMonthsUpdate');
    };
  }, []);

  // Chart Data Configurations
  const statusChartDataConfig = useMemo(() => ({
    labels: statusChartData.map(d => d.status),
    datasets: [
      {
        data: statusChartData.map(d => d.incidentCount),
        backgroundColor: ['#36a2eb', '#ff6384', '#cc65fe', '#ffce56'],
      },
    ],
  }), [statusChartData]);

  const resolutionTimesConfig = useMemo(() => ({
    labels: resolutionTimes.map((_, i) => `Incident ${i + 1}`),
    datasets: [
      {
        label: 'Resolution Times (Hours)',
        data: resolutionTimes.map(item => item.resolutionTime),
        backgroundColor: '#42a5f5',
      },
    ],
  }), [resolutionTimes]);

const sentimentChartData = useMemo(() => ({
    labels: ['Positive', 'Negative', 'Neutral'], // Labels based on sentiment categories
    datasets: [
      {
        label: 'Sentiment Count',
        data: [sentimentData?.positive || 0, sentimentData?.negative || 0, sentimentData?.neutral || 0],
        backgroundColor: ['red', 'blue', 'green'], // Colors for negative, neutral, and positive
      },
    ],
  }), [sentimentData]);

  const yearlyChartData = useMemo(() => ({
    labels: yearlyData.map(d => d.year),
    datasets: [
      {
        label: 'Yearly Incidents',
        data: yearlyData.map(d => d.incidentCount),
        borderColor: '#42a5f5',
        fill: false,
      },
    ],
  }), [yearlyData]);

  const monthlyChartData = useMemo(() => ({
    labels: monthlyData.map(d => d.month),
    datasets: [
      {
        label: 'Monthly Incidents',
        data: monthlyData.map(d => d.incidentCount),
        backgroundColor: 'rgba(75,192,192,0.6)',
      },
    ],
  }), [monthlyData]);

  const weekdayChartData = useMemo(() => ({
    labels: weekdayData.map(d => d.weekday),
    datasets: [
      {
        label: 'Weekday Incidents',
        data: weekdayData.map(d => d.incidentCount),
        backgroundColor: 'rgba(255,159,64,0.6)',
      },
    ],
  }), [weekdayData]);

  const submitDateChartData = useMemo(() => ({
    labels: submitDateData.map(d => d.submitDate),
    datasets: [
      {
        label: 'Incidents',
        data: submitDateData.map(d => d.incidentCount),
        borderColor: '#42a5f5',
      },
    ],
  }), [submitDateData]);

  const slmChartData = useMemo(() => ({
    labels: slmData.map(d => d.slmStatus),
    datasets: [
      {
        data: slmData.map(d => d.incidentCount),
        backgroundColor: ['#36a2eb', '#ff6384', '#00FF00'],
      },
    ],
  }), [slmData]);

const departmentResolutionDataConfig = useMemo(() => ({
  labels: departmentResolutionData.map(d => d.Department),
  datasets: [
    {
      label: 'Resolved Count',
      data: departmentResolutionData.map(d => d.resolvedCount),
      backgroundColor: 'rgba(75,192,192,0.6)',
    },
  ],
}), [departmentResolutionData]);

const departmentClosureRateConfig = useMemo(() => ({
  labels: departmentClosureRateData.map(d => d.Department),
  datasets: [
    {
      label: 'Closure Rate (%)',
      data: departmentClosureRateData.map(d => d.closureRate),
      backgroundColor: 'rgba(153,102,255,0.6)',
    },
  ],
}), [departmentClosureRateData]);

const peakHoursConfig = useMemo(() => {
  // Ensure that hours are formatted correctly for the x-axis
  const labels = Array.from({ length: 24 }, (_, i) => `${i}:00`); // Generates ['0:00', '1:00', ..., '23:00']
  
  // Create an array of incident counts, filling in 0 for any missing hours
  const incidentCounts = labels.map((label, index) => {
      const hourData = peakHoursData.find(d => d.hour === index);
      return hourData ? hourData.incidentCount : 0; // Use 0 if there's no data for this hour
  });

  return {
      labels,
      datasets: [
          {
              label: 'Incidents',
              data: incidentCounts,
              borderColor: 'rgb(208, 219, 52)',
              backgroundColor: 'rgba(208, 219, 52,0.2)',
              fill: true,
          },
      ],
  };
}, [peakHoursData]);

const peakDaysConfig = useMemo(() => ({
  labels: peakDaysData.map(d => d.weekday), // Use peakDaysData
  datasets: [
    {
      label: 'Incidents',
      data: peakDaysData.map(d => d.incidentCount), // Use peakDaysData
      borderColor: 'rgb(61, 228, 186)',
      backgroundColor: 'rgba(61, 228, 186, 0.2)',
      fill: true,
    },
  ],
}), [peakDaysData]);

const peakMonthsConfig = useMemo(() => ({
  labels: peakMonthsData.map(d => {
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return monthNames[d.month - 1]; // Convert month number to month name
  }), // Use peakMonthsData
  datasets: [
    {
      label: 'Incidents',
      data: peakMonthsData.map(d => d.incidentCount), // Use peakMonthsData
      borderColor: 'rgb(201, 8, 201)',
      backgroundColor: 'rgba(201, 8, 201, 0.2)',
      fill: true,
    },
  ],
}), [peakMonthsData]);
 

  return (
    <div className="wrapper">
      <div className="main-content1">
        <h2 className="dashboard-heading">Basic Analytics</h2>

        <div className="chart-row">
          <div className="chart-container">
            <h3>SLM Status</h3>
            <Pie data={slmChartData} options={{ responsive: true }} />
          </div>
          <div className="chart-container">
            <h3>Status Distribution</h3>
            <Pie data={statusChartDataConfig} options={{ responsive: true }} />
          </div>
        </div>

        {/* Charts */}
        <div className="chart-row">
        <div className="chart-container">
          <h3>Sentiment Analysis Of Resolutions</h3>
          <Pie data={sentimentChartData} options={{ responsive: true }} />
        </div>
        </div>

        <h3 className="section-title">Resolution Time Analysis</h3>
        <div className="chart-row">
          <div className="chart-container">
            <h3>Resolution Times</h3>
            <Bar data={resolutionTimesConfig} options={{ responsive: true }} />
          </div>
        </div>


        <h3 className="section-title">Incident Submission Trends</h3>
        <div className="chart-row">
        <div className="chart-container">
          <h3>Incident Submission Trends</h3>
          <Line data={submitDateChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        </div>

        <h3 className="section-title">Incident Trend Analysis</h3>
        <div className="chart-row">
          <div className="chart-container">
            <h3>Yearly Incident Trend</h3>
            <Line data={yearlyChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <div className="chart-container">
            <h3>Monthly Distribution</h3>
            <Bar data={monthlyChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
          <div className="chart-container">
            <h3>Weekday Distribution</h3>
            <Bar data={weekdayChartData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        </div>

        <h3 className="section-title">Peak Time Analysis</h3>
        <div className="chart-row">
        <div className="chart-container">
          <h3>Peak Hours Analysis</h3>
          <Line data={peakHoursConfig} options={{ responsive: true }} />
        </div>
        </div>
        <div className="chart-row">
        <div className="chart-container">
          <h3>Peak Days Analysis</h3>
          <Line data={peakDaysConfig} options={{ responsive: true }} />
        </div>
        </div>
        <div className="chart-row">
        <div className="chart-container">
          <h3>Peak Months Analysis</h3>
          <Line data={peakMonthsConfig} options={{ responsive: true }} />
        </div>
        </div>
        
        <h3 className="section-title">Department Analysis</h3>
        <div className="chart-row">
          {/* Department Closure Rate */}
          <div className="chart-container">
            <h3>Department Closure Rate</h3>
            <Bar data={departmentClosureRateConfig} options={{ responsive: true }} />
            <div className="text-summary">
              <h4>Closure Rates by Department:</h4>
              <ul>
                {departmentClosureRateData.map((d, index) => (
                  <li key={index}>
                    <strong>{d.Department}:</strong> {d.closureRate}% closure rate
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        <div className="chart-row">
          {/* Department Resolution Performance */}
          <div className="chart-container">
            <h3>Department Resolution Performance</h3>
            <Bar data={departmentResolutionDataConfig} options={{ responsive: true }} />
            <div className="text-summary">
              <h4>Resolved Counts by Department:</h4>
              <ul>
                {departmentResolutionData.map((d, index) => (
                  <li key={index}>
                    <strong>{d.Department}:</strong> {d.resolvedCount} incidents
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default DashboardAnalytics;
