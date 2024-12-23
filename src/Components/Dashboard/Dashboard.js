import React, { useState, useMemo, useEffect  } from 'react';
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
import { linearRegression, linearRegressionLine } from 'simple-statistics';
import Chatbox from '../Chatbox/Chatbox';
import { Link } from 'react-router-dom';
import axios from 'axios';

ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const Dashboard = ({ data, problemsSolutionData }) => {
  const [statusChartData, setStatusChartData] = useState([]);
  const [slmData, setSlmData] = useState([]);
  const [submitDateData, setSubmitDateData] = useState([]);
  const [dataQuality, setDataQuality] = useState({});
  const [resolutionTimes, setResolutionTimes] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [filters, setFilters] = useState({ startDate: '', endDate: '', priority: '', status: '' });
  const [problemsSolutions, setProblemsSolutions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [results, setResults] = useState([]);
  const [file, setFile] = useState(null);
  const [departmentPerformance, setDepartmentPerformance] = useState([]);
  const [peakHours, setPeakHours] = useState([]);
  const [categoryTrends, setCategoryTrends] = useState([]);
  const [severityImpact, setSeverityImpact] = useState([]);
  const [sentimentTrends, setSentimentTrends] = useState([]);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
};

 


  const fetchData = async (url, setState) => {
    try {
      const response = await fetch(url);
      const data = await response.json();
      setState(data);
    } catch (err) {
      console.error('Error fetching data from:', url, err);
      setError('Error fetching data');
    }
  };

  useEffect(() => {
    fetchData('http://localhost:5000/api/status-data', setStatusChartData);
    fetchData('http://localhost:5000/api/slm-status', setSlmData);
    fetchData('http://localhost:5000/api/submit-date-trends', setSubmitDateData);
    fetchData('http://localhost:5000/api/data-quality', setDataQuality);

    fetchData('http://localhost:5000/api/department-resolution-performance', setDepartmentPerformance);
    fetchData('http://localhost:5000/api/peak-hours', setPeakHours);
    fetchData('http://localhost:5000/api/top-categories-trends', setCategoryTrends);
    fetchData('http://localhost:5000/api/severity-impact', setSeverityImpact);
    fetchData('http://localhost:5000/api/sentiment-trends', setSentimentTrends);
    
    fetchData('http://localhost:5000/api/resolution-times', (data) =>
      setResolutionTimes(data.map((item) => item.resolutionTime))
    );
    fetchData('http://localhost:5000/api/problems-solutions', setProblemsSolutions);
  }, []);

  useEffect(() => {
    const fetchFilteredData = async () => {
      const query = new URLSearchParams(filters).toString();
      fetchData(`http://localhost:5000/api/incidents-filter?${query}`, setFilteredData);
    };
    fetchFilteredData();
  }, [filters]);

  const handleFilterChange = (e) => {
    setFilters({ ...filters, [e.target.name]: e.target.value });
  };

  // Chart Data
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


  const handleUpload = async () => {
    if (!file) return;
  
    setLoading(true);
    setError(null);
  
    const formData = new FormData();
    formData.append('file', file);
  
    try {
      const response = await fetch('http://localhost:5000/api/sentiment-analysis', {
        method: 'POST',
        body: formData,
      });
      if (!response.ok) throw new Error('Failed to analyze sentiment');
  
      const data = await response.json();
      setResults(data); // assuming you want to set the results in state
  
      // Fetch sentiment data if it's available in the results
      if (data.sentimentResults) {
        setSentimentData(data.sentimentResults);
      }
    } catch (err) {
      console.error(err);
      setError('Error analyzing sentiment');
    } finally {
      setLoading(false);
    }
  };
 

const [sentimentData, setSentimentData] = useState([]);
  // Fetch sentiment data
  useEffect(() => {
    const fetchSentimentData = async () => {
      try {
        const response = await fetch('/sentiment_results.json'); // Update to a valid URL
        const result = await response.json();
        console.log('Fetched sentiment data:', result); // Debugging line
        setSentimentData(result);
      } catch (error) {
        console.error('Error fetching sentiment data:', error);
      }
    };

    fetchSentimentData();
  }, []);
  // Prepare chart data for sentiment analysis
const sentimentChartData = useMemo(() => ({
  labels: sentimentData.map(item => item.sentiment),
  datasets: [
    {
      label: 'Sentiment Count',
      data: sentimentData.map(item => item.counts),
      backgroundColor: ['red', 'blue', 'green'], // Colors for negative, neutral, and positive
    },
  ],
}), [sentimentData]);
// Chart options
const sentimentChartOptions = {
  plugins: {
    legend: {
      display: true, // Show the legend for pie chart
    },
    tooltip: {
      callbacks: {
        label: function(tooltipItem) {
          const sentiment = tooltipItem.label;
          const count = tooltipItem.raw; // Get the count value for the tooltip
          return `${sentiment}: ${count.toLocaleString()}`; // Format the label
        },
      },
    },
  },
};

useEffect(() => {
  fetchData('http://localhost:5000/api/department-resolution-performance', setDepartmentPerformance);
}, []);

const departmentPerformanceData = useMemo(() => ({
  labels: departmentPerformance.map((d) => d.Department),
  datasets: [
      {
          label: 'Average Resolution Time (Hours)',
          data: departmentPerformance.map((d) => d.avgResolutionTime),
          backgroundColor: '#42a5f5',
      },
  ],
}), [departmentPerformance]);


useEffect(() => {
  fetchData('http://localhost:5000/api/peak-hours', setPeakHours);
}, []);

const peakHoursData = useMemo(() => ({
  labels: peakHours.map((d) => `${d.hour}:00`),
  datasets: [
      {
          label: 'Incident Submissions',
          data: peakHours.map((d) => d.incidentCount),
          backgroundColor: '#ff6384',
      },
  ],
}), [peakHours]);


useEffect(() => {
  fetchData('http://localhost:5000/api/top-categories-trends', setCategoryTrends);
}, []);

const categoryTrendsData = useMemo(() => ({
  labels: [...new Set(categoryTrends.map((d) => d.month))],
  datasets: categoryTrends.map((category) => ({
      label: category.Category,
      data: categoryTrends
          .filter((d) => d.Category === category.Category)
          .map((d) => d.incidentCount),
      backgroundColor: getRandomColor(),
  })),
}), [categoryTrends]);

useEffect(() => {
  fetchData('http://localhost:5000/api/severity-impact', setSeverityImpact);
}, []);

const severityImpactData = useMemo(() => ({
  labels: severityImpact.map((d) => d.Priority),
  datasets: [
      {
          label: 'Average Resolution Time (Hours)',
          data: severityImpact.map((d) => d.avgResolutionTime),
          borderColor: '#36a2eb',
          fill: false,
      },
  ],
}), [severityImpact]);


useEffect(() => {
  fetchData('http://localhost:5000/api/sentiment-trends', setSentimentTrends);
}, []);

const sentimentTrendsData = useMemo(() => ({
  labels: sentimentTrends.map((d) => d.date),
  datasets: [
      {
          label: 'Positive',
          data: sentimentTrends
              .filter((d) => d.Sentiment === 'Positive')
              .map((d) => d.count),
          borderColor: 'green',
      },
      {
          label: 'Neutral',
          data: sentimentTrends
              .filter((d) => d.Sentiment === 'Neutral')
              .map((d) => d.count),
          borderColor: 'blue',
      },
      {
          label: 'Negative',
          data: sentimentTrends
              .filter((d) => d.Sentiment === 'Negative')
              .map((d) => d.count),
          borderColor: 'red',
      },
  ],
}), [sentimentTrends]);



useEffect(() => {
  const fetchSlmData = async () => {
    const response = await fetch('http://localhost:5000/api/slm-status');
    const data = await response.json();
    setSlmData(data);
  };
  fetchSlmData();
}, []);
const slmChartData = useMemo(() => ({
  labels: slmData.map(d => d.slmStatus),
  datasets: [{ data: slmData.map(d => d.incidentCount), backgroundColor: ['#36a2eb', '#ff6384','#00FF00'] }]
}), [slmData]);


// Submission Date Trends Chart

useEffect(() => {
  const fetchSubmitDateData = async () => {
    const response = await fetch('http://localhost:5000/api/submit-date-trends');
    const data = await response.json();
    setSubmitDateData(data);
  };
  fetchSubmitDateData();
}, []);
const submitDateChartData = useMemo(() => ({
  labels: submitDateData.map(d => d.submitDate),
  datasets: [{ label: 'Incidents', data: submitDateData.map(d => d.incidentCount), borderColor: '#42a5f5' }]
}), [submitDateData]);


useEffect(() => {
    const fetchDataQuality = async () => {
        const response = await fetch('http://localhost:5000/api/data-quality');
        const data = await response.json();
        setDataQuality(data);
    };
    fetchDataQuality();
}, []);

const dataQualityChartData = {
    labels: ['Missing Service', 'Missing Resolution'],
    datasets: [
        {
            label: 'Missing Data Count',
            data: [dataQuality.missingService, dataQuality.missingResolution],
            backgroundColor: ['#f39c12', '#e74c3c']
        }
    ]
};

useEffect(() => {
    const fetchResolutionTimes = async () => {
        const response = await fetch('http://localhost:5000/api/resolution-times');
        const data = await response.json();
        setResolutionTimes(data.map(item => item.resolutionTime));
    };
    fetchResolutionTimes();
}, []);


useEffect(() => {
    const fetchFilteredData = async () => {
        const query = new URLSearchParams(filters).toString();
        const response = await fetch(`http://localhost:5000/api/incidents-filter?${query}`);
        const data = await response.json();
        setFilteredData(data);
    };
    fetchFilteredData();
}, [filters]);


const [selectedCategory, setSelectedCategory] = useState('incidentCount');
const [yearlyData, setYearlyData] = useState([]);
const [monthlyData, setMonthlyData] = useState([]);
const [weekdayData, setWeekdayData] = useState([]);

useEffect(() => {
  const fetchYearlyData = async () => {
    const response = await fetch('http://localhost:5000/api/yearly-trend');
    const data = await response.json();
    setYearlyData(data);
  };

  const fetchMonthlyData = async () => {
    const response = await fetch('http://localhost:5000/api/monthly-distribution');
    const data = await response.json();
    setMonthlyData(data);
  };

  const fetchWeekdayData = async () => {
    const response = await fetch('http://localhost:5000/api/weekday-distribution');
    const data = await response.json();
    setWeekdayData(data);
  };

  fetchYearlyData();
  fetchMonthlyData();
  fetchWeekdayData();
}, []);


const yearlyChartData = {
  labels: yearlyData.labels,
  datasets: [{
    label: 'Yearly Incident Trend',
    data: yearlyData.values,
    borderColor: '#42a5f5',
    fill: false,
  }],
};

const monthlyChartData = {
  labels: monthlyData.labels,
  datasets: [{
    label: 'Monthly Incident Distribution',
    data: monthlyData.values,
    backgroundColor: 'rgba(75,192,192,0.6)',
  }],
};

const weekdayChartData = {
  labels: weekdayData.labels,
  datasets: [{
    label: 'Weekday Incident Distribution',
    data: weekdayData.values,
    backgroundColor: 'rgba(255,159,64,0.6)',
  }],
};

    

  // Summary statistics
  const totalIncidents = useMemo(() => data.reduce((sum, d) => sum + d.incidentCount, 0), [data]);
  const priorityCounts = useMemo(() => new Set(data.map(d => d.priority)).size, [data]);
  const statusCounts = useMemo(() => new Set(data.map(d => d.status)).size, [data]);
  const departmentCounts = useMemo(() => new Set(data.map(d => d.department)).size, [data]);

  // Incident Trend Forecasting (using linear regression)
  const dates = data.map(d => new Date(d.date).getTime()); // Convert dates to timestamps
  const incidents = data.map(d => d.incidentCount);

  const regression = linearRegression(dates.map((date, i) => [date, incidents[i]]));
  const predictedIncident = linearRegressionLine(regression);

  const futureDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // Predicting for 30 days ahead
  const predictedCount = predictedIncident(futureDate);

  // Chart Data for Users Behavior
  const userBehaviorData = useMemo(() => ({
    labels: ['9:00AM', '12:00PM', '3:00PM', '6:00PM', '9:00PM', '12:00AM', '3:00AM', '6:00AM'],
    datasets: [
      {
        label: 'Open',
        data: [200, 300, 400, 500, 600, 650, 700, 750],
        borderColor: '#4b0082', // Dark Indigo
        fill: false,
      },
      {
        label: 'Click',
        data: [100, 150, 200, 250, 300, 350, 400, 450],
        borderColor: '#8b0000', // Dark Red
        fill: false,
      },
      {
        label: 'Click Second Time',
        data: [50, 100, 150, 180, 200, 250, 300, 350],
        borderColor: '#6b8e23', // Dark Olive Green
        fill: false,
      },
    ],
  }), []);
  
  
  // Chart data for priority, status, etc.
  const priorityData = useMemo(() => ({
    labels: [...new Set(data.map((d) => `Priority ${d.priority}`))],
    datasets: [
      {
        label: 'Incident Priority',
        data: data.map((d) => d.incidentCount),
        backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4caf50', '#f44336'],
      },
    ],
  }), [data]);

  const statusData = useMemo(() => ({
    labels: [...new Set(data.map((d) => d.status))],
    datasets: [
      {
        label: 'Incident Status',
        data: data.map((d) => d.incidentCount),
        backgroundColor: ['#36a2eb', '#ff6384', '#cc65fe', '#ffce56'],
      },
    ],
  }), [data]);

  const departmentData = useMemo(() => ({
    labels: [...new Set(data.map((d) => d.department))],
    datasets: [
      {
        label: 'Departments',
        data: data.map((d) => d.incidentCount),
        backgroundColor: '#42a5f5',
      },
    ],
  }), [data]);


  const incidentTrendData = useMemo(() => ({
    labels: data.map((d) => d.date),
    datasets: [
      {
        label: 'Incident Trends Over Time',
        data: data.map((d) => d.incidentCount),
        fill: false,
        borderColor: '#42a5f5',
        tension: 0.1,
      },
    ],
  }), [data]);

  // Handle card click
  const handleCardClick = (category) => setSelectedCategory(category);

  // Render detailed chart based on the selected category
  const renderDetails = () => {
    switch (selectedCategory) {
      case 'priority':
        return (
          <div className="detail-section">
            <h3>Priority Levels Breakdown</h3>
            <Bar data={priorityData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        );
      case 'status':
        return (
          <div className="detail-section">
            <h3>Incident Status Breakdown</h3>
            <Pie data={statusData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        );
      case 'department':
        return (
          <div className="detail-section">
            <h3>Departments Breakdown</h3>
            <Bar data={departmentData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>
        );
      case 'incidentCount':
        return (
          <div className="detail-section">
            <h3>Incident Trends Over Time</h3>
            <Line data={incidentTrendData} options={{ responsive: true, maintainAspectRatio: false }} />
            <h4>Predicted Incident Count (30 Days Ahead): {Math.round(predictedCount)}</h4>
          </div>
        );
      default:
        return null;
    }
  };


  const sampleProblemsSolutions = [
    { summery: "Internet is down", resolution: "Restart the router." },
    { summery: "Printer not working", resolution: "Check the printer's connection and refill paper." },
    { summery: "Software installation failed", resolution: "Ensure you have the necessary permissions and sufficient disk space." },
    { summery: "Cannot access email", resolution: "Check your internet connection and reset your email password." },
    { summery: "Application crashing", resolution: "Update the application to the latest version." },
  ];

  return (
    <div className="wrapper">
      {/* Main Content */}
      <div className="main-content">
        <h2>Incident Data Dashboard</h2>

        {/* Top summary cards */}
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


        {/* Render charts in a two-column layout */}
        <div className="chart-row">
          <div className="chart-container">
            <h3>Users Behavior</h3>
            <Line data={userBehaviorData} options={{ responsive: true, maintainAspectRatio: false }} />
          </div>


<div className="chart-container">
        <h3>Incident Status Breakdown</h3>
        {statusChartData.length > 0 ? (
          <Pie data={status1Data} options={{ responsive: true, maintainAspectRatio: false }} />
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


{/* Add the sentiment analysis chart */}
<div className="chart-container">
  <h3>Sentiment Analysis Results</h3>
  {sentimentData.length > 0 ? ( // Check if sentiment data exists
    <Pie data={sentimentChartData} options={sentimentChartOptions} />
  ) : (
    <p>Loading sentiment data...</p>
  )}
</div>


<div className="chart-grid">
  {/* SLM Status Chart */}
  <div className="chart-container">
    <h3>SLM Real Time Status</h3>
    <Pie data={slmChartData} />
  </div>


  {/* Submit Date Trends */}
  <div className="chart-container">
    <h3>Incident Submission Trends</h3>
    <Line data={submitDateChartData} />
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



{/* Button or link to navigate to Sample Problems Page */}
<div className="navigation-section">
          <Link to="/sample-problems" className="sample-problems-link">
            <button>View Sample Problems and Solutions</button>
          </Link>
        </div>
       
      </div>
    </div>
  );
};

export default Dashboard;




