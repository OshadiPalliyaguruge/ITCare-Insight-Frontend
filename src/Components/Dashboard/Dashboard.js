// import React, { useState, useMemo, useEffect  } from 'react';
// import { Bar, Pie, Line } from 'react-chartjs-2';

// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import './Dashboard.css';
// import { linearRegression, linearRegressionLine } from 'simple-statistics';
// import Chatbox from '../Chatbox/Chatbox';
// import { Link } from 'react-router-dom';
// import axios from 'axios';

// ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// const Dashboard = ({ data, problemsSolutionData }) => {
//   const [statusChartData, setStatusChartData] = useState([]);
//   const [slmData, setSlmData] = useState([]);
//   const [submitDateData, setSubmitDateData] = useState([]);
//   const [dataQuality, setDataQuality] = useState({});
//   const [resolutionTimes, setResolutionTimes] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [filters, setFilters] = useState({ startDate: '', endDate: '', priority: '', status: '' });
//   const [problemsSolutions, setProblemsSolutions] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [results, setResults] = useState([]);
//   const [file, setFile] = useState(null);
//   const [departmentPerformance, setDepartmentPerformance] = useState([]);
//   const [peakHours, setPeakHours] = useState([]);
//   const [categoryTrends, setCategoryTrends] = useState([]);
//   const [severityImpact, setSeverityImpact] = useState([]);
//   const [sentimentTrends, setSentimentTrends] = useState([]);

//   const getRandomColor = () => {
//     const letters = '0123456789ABCDEF';
//     let color = '#';
//     for (let i = 0; i < 6; i++) {
//         color += letters[Math.floor(Math.random() * 16)];
//     }
//     return color;
// };

 


//   const fetchData = async (url, setState) => {
//     try {
//       const response = await fetch(url);
//       const data = await response.json();
//       setState(data);
//     } catch (err) {
//       console.error('Error fetching data from:', url, err);
//       setError('Error fetching data');
//     }
//   };

//   const [sentimentTrends, setSentimentTrends] = useState([]);
//   useEffect(() => {
//     fetchData('http://localhost:5000/api/status-data', setStatusChartData);
//     fetchData('http://localhost:5000/api/slm-status', setSlmData);
//     fetchData('http://localhost:5000/api/submit-date-trends', setSubmitDateData);
//     fetchData('http://localhost:5000/api/data-quality', setDataQuality);

//     fetchData('http://localhost:5000/api/department-resolution-performance', setDepartmentPerformance);
//     fetchData('http://localhost:5000/api/peak-hours', setPeakHours);
//     fetchData('http://localhost:5000/api/top-categories-trends', setCategoryTrends);
//     fetchData('http://localhost:5000/api/severity-impact', setSeverityImpact);
//     fetchData('http://localhost:5000/api/sentiment-trends', setSentimentTrends);
    
//     fetchData('http://localhost:5000/api/resolution-times', (data) =>
//       setResolutionTimes(data.map((item) => item.resolutionTime))
//     );
//     fetchData('http://localhost:5000/api/problems-solutions', setProblemsSolutions);
//   }, []);

//   useEffect(() => {
//     const fetchFilteredData = async () => {
//       const query = new URLSearchParams(filters).toString();
//       fetchData(`http://localhost:5000/api/incidents-filter?${query}`, setFilteredData);
//     };
//     fetchFilteredData();
//   }, [filters]);

//   const handleFilterChange = (e) => {
//     setFilters({ ...filters, [e.target.name]: e.target.value });
//   };

//   // Chart Data
//   const status1Data = useMemo(() => ({
//     labels: statusChartData.map((d) => d.status),
//     datasets: [
//       {
//         data: statusChartData.map((d) => d.incidentCount),
//         backgroundColor: ['#36a2eb', '#ff6384', '#cc65fe', '#ffce56'],
//       },
//     ],
//   }), [statusChartData]);

//   const resolutionTimeChartData = useMemo(() => ({
//     labels: resolutionTimes,
//     datasets: [
//       {
//         label: 'Resolution Times (Hours)',
//         data: resolutionTimes,
//         backgroundColor: '#42a5f5',
//       },
//     ],
//   }), [resolutionTimes]);

//   const filteredChartData = useMemo(() => ({
//     labels: filteredData.map((d) => `${d.priority} - ${d.status}`),
//     datasets: [
//       {
//         label: 'Filtered Incident Counts',
//         data: filteredData.map((d) => d.incidentCount),
//         backgroundColor: '#36a2eb',
//       },
//     ],
//   }), [filteredData]);


//   const handleUpload = async () => {
//     if (!file) return;
  
//     setLoading(true);
//     setError(null);
  
//     const formData = new FormData();
//     formData.append('file', file);
  
//     try {
//       const response = await fetch('http://localhost:5000/api/sentiment-analysis', {
//         method: 'POST',
//         body: formData,
//       });
//       if (!response.ok) throw new Error('Failed to analyze sentiment');
  
//       const data = await response.json();
//       setResults(data); // assuming you want to set the results in state
  
//       // Fetch sentiment data if it's available in the results
//       if (data.sentimentResults) {
//         setSentimentData(data.sentimentResults);
//       }
//     } catch (err) {
//       console.error(err);
//       setError('Error analyzing sentiment');
//     } finally {
//       setLoading(false);
//     }
//   };
 

// const [sentimentData, setSentimentData] = useState([]);
//   // Fetch sentiment data
//   useEffect(() => {
//     const fetchSentimentData = async () => {
//       try {
//         const response = await fetch('/sentiment_results.json'); // Update to a valid URL
//         const result = await response.json();
//         console.log('Fetched sentiment data:', result); // Debugging line
//         setSentimentData(result);
//       } catch (error) {
//         console.error('Error fetching sentiment data:', error);
//       }
//     };

//     fetchSentimentData();
//   }, []);
//   // Prepare chart data for sentiment analysis
// const sentimentChartData = useMemo(() => ({
//   labels: sentimentData.map(item => item.sentiment),
//   datasets: [
//     {
//       label: 'Sentiment Count',
//       data: sentimentData.map(item => item.counts),
//       backgroundColor: ['red', 'blue', 'green'], // Colors for negative, neutral, and positive
//     },
//   ],
// }), [sentimentData]);
// // Chart options
// const sentimentChartOptions = {
//   plugins: {
//     legend: {
//       display: true, // Show the legend for pie chart
//     },
//     tooltip: {
//       callbacks: {
//         label: function(tooltipItem) {
//           const sentiment = tooltipItem.label;
//           const count = tooltipItem.raw; // Get the count value for the tooltip
//           return `${sentiment}: ${count.toLocaleString()}`; // Format the label
//         },
//       },
//     },
//   },
// };

// useEffect(() => {
//   fetchData('http://localhost:5000/api/department-resolution-performance', setDepartmentPerformance);
// }, []);

// const departmentPerformanceData = useMemo(() => ({
//   labels: departmentPerformance.map((d) => d.Department),
//   datasets: [
//       {
//           label: 'Average Resolution Time (Hours)',
//           data: departmentPerformance.map((d) => d.avgResolutionTime),
//           backgroundColor: '#42a5f5',
//       },
//   ],
// }), [departmentPerformance]);


// useEffect(() => {
//   fetchData('http://localhost:5000/api/peak-hours', setPeakHours);
// }, []);

// const peakHoursData = useMemo(() => ({
//   labels: peakHours.map((d) => `${d.hour}:00`),
//   datasets: [
//       {
//           label: 'Incident Submissions',
//           data: peakHours.map((d) => d.incidentCount),
//           backgroundColor: '#ff6384',
//       },
//   ],
// }), [peakHours]);


// useEffect(() => {
//   fetchData('http://localhost:5000/api/top-categories-trends', setCategoryTrends);
// }, []);

// const categoryTrendsData = useMemo(() => ({
//   labels: [...new Set(categoryTrends.map((d) => d.month))],
//   datasets: categoryTrends.map((category) => ({
//       label: category.Category,
//       data: categoryTrends
//           .filter((d) => d.Category === category.Category)
//           .map((d) => d.incidentCount),
//       backgroundColor: getRandomColor(),
//   })),
// }), [categoryTrends]);

// useEffect(() => {
//   fetchData('http://localhost:5000/api/severity-impact', setSeverityImpact);
// }, []);

// const severityImpactData = useMemo(() => ({
//   labels: severityImpact.map((d) => d.Priority),
//   datasets: [
//       {
//           label: 'Average Resolution Time (Hours)',
//           data: severityImpact.map((d) => d.avgResolutionTime),
//           borderColor: '#36a2eb',
//           fill: false,
//       },
//   ],
// }), [severityImpact]);


// useEffect(() => {
//   fetchData('http://localhost:5000/api/sentiment-trends', setSentimentTrends);
// }, []);

// const sentimentTrendsData = useMemo(() => ({
//   labels: sentimentTrends.map((d) => d.date),
//   datasets: [
//       {
//           label: 'Positive',
//           data: sentimentTrends
//               .filter((d) => d.Sentiment === 'Positive')
//               .map((d) => d.count),
//           borderColor: 'green',
//       },
//       {
//           label: 'Neutral',
//           data: sentimentTrends
//               .filter((d) => d.Sentiment === 'Neutral')
//               .map((d) => d.count),
//           borderColor: 'blue',
//       },
//       {
//           label: 'Negative',
//           data: sentimentTrends
//               .filter((d) => d.Sentiment === 'Negative')
//               .map((d) => d.count),
//           borderColor: 'red',
//       },
//   ],
// }), [sentimentTrends]);



// useEffect(() => {
//   const fetchSlmData = async () => {
//     const response = await fetch('http://localhost:5000/api/slm-status');
//     const data = await response.json();
//     setSlmData(data);
//   };
//   fetchSlmData();
// }, []);
// const slmChartData = useMemo(() => ({
//   labels: slmData.map(d => d.slmStatus),
//   datasets: [{ data: slmData.map(d => d.incidentCount), backgroundColor: ['#36a2eb', '#ff6384','#00FF00'] }]
// }), [slmData]);


// // Submission Date Trends Chart

// useEffect(() => {
//   const fetchSubmitDateData = async () => {
//     const response = await fetch('http://localhost:5000/api/submit-date-trends');
//     const data = await response.json();
//     setSubmitDateData(data);
//   };
//   fetchSubmitDateData();
// }, []);
// const submitDateChartData = useMemo(() => ({
//   labels: submitDateData.map(d => d.submitDate),
//   datasets: [{ label: 'Incidents', data: submitDateData.map(d => d.incidentCount), borderColor: '#42a5f5' }]
// }), [submitDateData]);


// useEffect(() => {
//     const fetchDataQuality = async () => {
//         const response = await fetch('http://localhost:5000/api/data-quality');
//         const data = await response.json();
//         setDataQuality(data);
//     };
//     fetchDataQuality();
// }, []);

// const dataQualityChartData = {
//     labels: ['Missing Service', 'Missing Resolution'],
//     datasets: [
//         {
//             label: 'Missing Data Count',
//             data: [dataQuality.missingService, dataQuality.missingResolution],
//             backgroundColor: ['#f39c12', '#e74c3c']
//         }
//     ]
// };

// useEffect(() => {
//     const fetchResolutionTimes = async () => {
//         const response = await fetch('http://localhost:5000/api/resolution-times');
//         const data = await response.json();
//         setResolutionTimes(data.map(item => item.resolutionTime));
//     };
//     fetchResolutionTimes();
// }, []);


// useEffect(() => {
//     const fetchFilteredData = async () => {
//         const query = new URLSearchParams(filters).toString();
//         const response = await fetch(`http://localhost:5000/api/incidents-filter?${query}`);
//         const data = await response.json();
//         setFilteredData(data);
//     };
//     fetchFilteredData();
// }, [filters]);


// const [selectedCategory, setSelectedCategory] = useState('incidentCount');
// const [yearlyData, setYearlyData] = useState([]);
// const [monthlyData, setMonthlyData] = useState([]);
// const [weekdayData, setWeekdayData] = useState([]);

// useEffect(() => {
//   const fetchYearlyData = async () => {
//     const response = await fetch('http://localhost:5000/api/yearly-trend');
//     const data = await response.json();
//     setYearlyData(data);
//   };

//   const fetchMonthlyData = async () => {
//     const response = await fetch('http://localhost:5000/api/monthly-distribution');
//     const data = await response.json();
//     setMonthlyData(data);
//   };

//   const fetchWeekdayData = async () => {
//     const response = await fetch('http://localhost:5000/api/weekday-distribution');
//     const data = await response.json();
//     setWeekdayData(data);
//   };

//   fetchYearlyData();
//   fetchMonthlyData();
//   fetchWeekdayData();
// }, []);


// const yearlyChartData = {
//   labels: yearlyData.labels,
//   datasets: [{
//     label: 'Yearly Incident Trend',
//     data: yearlyData.values,
//     borderColor: '#42a5f5',
//     fill: false,
//   }],
// };

// const monthlyChartData = {
//   labels: monthlyData.labels,
//   datasets: [{
//     label: 'Monthly Incident Distribution',
//     data: monthlyData.values,
//     backgroundColor: 'rgba(75,192,192,0.6)',
//   }],
// };

// const weekdayChartData = {
//   labels: weekdayData.labels,
//   datasets: [{
//     label: 'Weekday Incident Distribution',
//     data: weekdayData.values,
//     backgroundColor: 'rgba(255,159,64,0.6)',
//   }],
// };

    

//   // Summary statistics
//   const totalIncidents = useMemo(() => data.reduce((sum, d) => sum + d.incidentCount, 0), [data]);
//   const priorityCounts = useMemo(() => new Set(data.map(d => d.priority)).size, [data]);
//   const statusCounts = useMemo(() => new Set(data.map(d => d.status)).size, [data]);
//   const departmentCounts = useMemo(() => new Set(data.map(d => d.department)).size, [data]);

//   // Incident Trend Forecasting (using linear regression)
//   const dates = data.map(d => new Date(d.date).getTime()); // Convert dates to timestamps
//   const incidents = data.map(d => d.incidentCount);

//   const regression = linearRegression(dates.map((date, i) => [date, incidents[i]]));
//   const predictedIncident = linearRegressionLine(regression);

//   const futureDate = new Date().getTime() + 30 * 24 * 60 * 60 * 1000; // Predicting for 30 days ahead
//   const predictedCount = predictedIncident(futureDate);

//   // Chart Data for Users Behavior
//   const userBehaviorData = useMemo(() => ({
//     labels: ['9:00AM', '12:00PM', '3:00PM', '6:00PM', '9:00PM', '12:00AM', '3:00AM', '6:00AM'],
//     datasets: [
//       {
//         label: 'Open',
//         data: [200, 300, 400, 500, 600, 650, 700, 750],
//         borderColor: '#4b0082', // Dark Indigo
//         fill: false,
//       },
//       {
//         label: 'Click',
//         data: [100, 150, 200, 250, 300, 350, 400, 450],
//         borderColor: '#8b0000', // Dark Red
//         fill: false,
//       },
//       {
//         label: 'Click Second Time',
//         data: [50, 100, 150, 180, 200, 250, 300, 350],
//         borderColor: '#6b8e23', // Dark Olive Green
//         fill: false,
//       },
//     ],
//   }), []);
  
  
//   // Chart data for priority, status, etc.
//   const priorityData = useMemo(() => ({
//     labels: [...new Set(data.map((d) => `Priority ${d.priority}`))],
//     datasets: [
//       {
//         label: 'Incident Priority',
//         data: data.map((d) => d.incidentCount),
//         backgroundColor: ['#ff6384', '#36a2eb', '#ffce56', '#4caf50', '#f44336'],
//       },
//     ],
//   }), [data]);

//   const statusData = useMemo(() => ({
//     labels: [...new Set(data.map((d) => d.status))],
//     datasets: [
//       {
//         label: 'Incident Status',
//         data: data.map((d) => d.incidentCount),
//         backgroundColor: ['#36a2eb', '#ff6384', '#cc65fe', '#ffce56'],
//       },
//     ],
//   }), [data]);

//   const departmentData = useMemo(() => ({
//     labels: [...new Set(data.map((d) => d.department))],
//     datasets: [
//       {
//         label: 'Departments',
//         data: data.map((d) => d.incidentCount),
//         backgroundColor: '#42a5f5',
//       },
//     ],
//   }), [data]);


//   const incidentTrendData = useMemo(() => ({
//     labels: data.map((d) => d.date),
//     datasets: [
//       {
//         label: 'Incident Trends Over Time',
//         data: data.map((d) => d.incidentCount),
//         fill: false,
//         borderColor: '#42a5f5',
//         tension: 0.1,
//       },
//     ],
//   }), [data]);

//   // Handle card click
//   const handleCardClick = (category) => setSelectedCategory(category);

//   // Render detailed chart based on the selected category
//   const renderDetails = () => {
//     switch (selectedCategory) {
//       case 'priority':
//         return (
//           <div className="detail-section">
//             <h3>Priority Levels Breakdown</h3>
//             <Bar data={priorityData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//         );
//       case 'status':
//         return (
//           <div className="detail-section">
//             <h3>Incident Status Breakdown</h3>
//             <Pie data={statusData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//         );
//       case 'department':
//         return (
//           <div className="detail-section">
//             <h3>Departments Breakdown</h3>
//             <Bar data={departmentData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//         );
//       case 'incidentCount':
//         return (
//           <div className="detail-section">
//             <h3>Incident Trends Over Time</h3>
//             <Line data={incidentTrendData} options={{ responsive: true, maintainAspectRatio: false }} />
//             <h4>Predicted Incident Count (30 Days Ahead): {Math.round(predictedCount)}</h4>
//           </div>
//         );
//       default:
//         return null;
//     }
//   };


//   const sampleProblemsSolutions = [
//     { summery: "Internet is down", resolution: "Restart the router." },
//     { summery: "Printer not working", resolution: "Check the printer's connection and refill paper." },
//     { summery: "Software installation failed", resolution: "Ensure you have the necessary permissions and sufficient disk space." },
//     { summery: "Cannot access email", resolution: "Check your internet connection and reset your email password." },
//     { summery: "Application crashing", resolution: "Update the application to the latest version." },
//   ];

//   return (
//     <div className="wrapper">
//       {/* Main Content */}
//       <div className="main-content">
//         <h2>Incident Data Dashboard</h2>

//         {/* Top summary cards */}
//         <div className="summary-cards">
//           <div className="card" onClick={() => handleCardClick('incidentCount')}>
//             <h4>Total Incidents</h4>
//             <p>{totalIncidents}</p>
//           </div>
//           <div className="card" onClick={() => handleCardClick('priority')}>
//             <h4>Priority Levels</h4>
//             <p>{priorityCounts}</p>
//           </div>
//           <div className="card" onClick={() => handleCardClick('status')}>
//             <h4>Status Types</h4>
//             <p>{statusCounts}</p>
//           </div>
//           <div className="card" onClick={() => handleCardClick('department')}>
//             <h4>Departments</h4>
//             <p>{departmentCounts}</p>
//           </div>
//         </div>


//         {/* Render charts in a two-column layout */}
//         <div className="chart-row">
//           <div className="chart-container">
//             <h3>Users Behavior</h3>
//             <Line data={userBehaviorData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>


// <div className="chart-container">
//         <h3>Incident Status Breakdown</h3>
//         {statusChartData.length > 0 ? (
//           <Pie data={status1Data} options={{ responsive: true, maintainAspectRatio: false }} />
//         ) : (
//           <p>Loading status data...</p>
//         )}
//       </div>
    
//         <div className="chart-container">
//             <h3>Resolution Times</h3>
//             <Bar data={resolutionTimeChartData} options={{ responsive: true }} />
//           </div>
//         </div>

//         <div className="chart-row">
//           <h3>Filtered Incident Data</h3>
//           <Bar data={filteredChartData} options={{ responsive: true }} />
//         </div>


// {/* Add the sentiment analysis chart */}
// <div className="chart-container">
//   <h3>Sentiment Analysis Results</h3>
//   {sentimentData.length > 0 ? ( // Check if sentiment data exists
//     <Pie data={sentimentChartData} options={sentimentChartOptions} />
//   ) : (
//     <p>Loading sentiment data...</p>
//   )}
// </div>


// <div className="chart-grid">
//   {/* SLM Status Chart */}
//   <div className="chart-container">
//     <h3>SLM Real Time Status</h3>
//     <Pie data={slmChartData} />
//   </div>


//   {/* Submit Date Trends */}
//   <div className="chart-container">
//     <h3>Incident Submission Trends</h3>
//     <Line data={submitDateChartData} />
//   </div>
// </div>

// <div className="chart-row">
//   <div className="chart-container">
//     <h3>Yearly Incident Trend</h3>
//     <Line data={yearlyChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//   </div>
//   <div className="chart-container">
//     <h3>Monthly Incident Distribution</h3>
//     <Bar data={monthlyChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//   </div>
//   <div className="chart-container">
//     <h3>Weekday Incident Distribution</h3>
//     <Bar data={weekdayChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//   </div>
// </div>



// {/* Button or link to navigate to Sample Problems Page */}
// <div className="navigation-section">
//           <Link to="/sample-problems" className="sample-problems-link">
//             <button>View Sample Problems and Solutions</button>
//           </Link>
//         </div>
       
//       </div>
//     </div>
//   );
// };
 
// export default Dashboard;



// Combined and updated Dashboard.js 
// import React, { useState, useMemo, useEffect } from 'react';
// import { Bar, Pie, Line } from 'react-chartjs-2';

// import {
//   Chart as ChartJS,
//   ArcElement,
//   BarElement,
//   LineElement,
//   PointElement,
//   CategoryScale,
//   LinearScale,
//   Tooltip,
//   Legend,
// } from 'chart.js';
// import './Dashboard.css';

// ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// const Dashboard = ({ data }) => {
//   const [statusChartData, setStatusChartData] = useState([]);
//   const [resolutionTimes, setResolutionTimes] = useState([]);
//   const [sentimentData, setSentimentData] = useState([]);
//   const [yearlyData, setYearlyData] = useState([]);
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [weekdayData, setWeekdayData] = useState([]);
//   const [submitDateData, setSubmitDateData] = useState([]);
//   const [slmData, setSlmData] = useState([]);
//   const [dataQuality, setDataQuality] = useState({});

//   // Utility for fetching data
//   const fetchData = async (endpoint, setState) => {
//     try {
//       const response = await fetch(`http://localhost:5000/api/${endpoint}`);
//       const data = await response.json();
//       setState(data);
//     } catch (error) {
//       console.error(`Error fetching ${endpoint}:`, error);
//     }
//   };

//   useEffect(() => {
//     fetchData('status-data', setStatusChartData);
//     fetchData('resolution-times', setResolutionTimes);
//     fetchData('sentiment-trends', setSentimentData);
//     fetchData('yearly-trend', setYearlyData);
//     fetchData('monthly-distribution', setMonthlyData);
//     fetchData('weekday-distribution', setWeekdayData);
//     fetchData('submit-date-trends', setSubmitDateData);
//     fetchData('slm-status', setSlmData);
//     fetchData('data-quality', setDataQuality);
//   }, []);

//   const totalIncidents = useMemo(() => data?.reduce((sum, d) => sum + d.incidentCount, 0) || 0, [data]);
//   const priorityCounts = useMemo(() => new Set(data?.map(d => d.priority)).size || 0, [data]);
//   const statusCounts = useMemo(() => new Set(data?.map(d => d.status)).size || 0, [data]);
//   const departmentCounts = useMemo(() => new Set(data?.map(d => d.department)).size || 0, [data]);

//   // Chart Data Configurations
//   const statusChartDataConfig = useMemo(() => ({
//     labels: statusChartData.map(d => d.status),
//     datasets: [
//       {
//         data: statusChartData.map(d => d.incidentCount),
//         backgroundColor: ['#36a2eb', '#ff6384', '#cc65fe', '#ffce56'],
//       },
//     ],
//   }), [statusChartData]);

//   const resolutionTimesConfig = useMemo(() => ({
//     labels: resolutionTimes.map((_, i) => `Incident ${i + 1}`),
//     datasets: [
//       {
//         label: 'Resolution Times (Hours)',
//         data: resolutionTimes.map(item => item.resolutionTime),
//         backgroundColor: '#42a5f5',
//       },
//     ],
//   }), [resolutionTimes]);

//   // const sentimentChartData = useMemo(() => ({
//   //   labels: sentimentData.map(d => d.sentiment),
//   //   datasets: [
//   //     {
//   //       label: 'Sentiment Count',
//   //       data: sentimentData.map(d => d.counts),
//   //       backgroundColor: ['green', 'blue', 'red'], // Positive, Neutral, Negative
//   //     },
//   //   ],
//   // }), [sentimentData]);

  
//   const [sentimentTrends, setSentimentTrends] = useState([]);
//   useEffect(() => {
//     fetchData('http://localhost:5000/api/sentiment-trends', setSentimentTrends);
//   }, []);

//   // Fetch sentiment data
//   useEffect(() => {
//     const fetchSentimentData = async () => {
//       try {
//         const response = await fetch('/sentiment_results.json'); // Update to a valid URL
//         const result = await response.json();
//         console.log('Fetched sentiment data:', result); // Debugging line
//         setSentimentData(result);
//       } catch (error) {
//         console.error('Error fetching sentiment data:', error);
//       }
//     };

//     fetchSentimentData();
//   }, []);
//   // Prepare chart data for sentiment analysis
// const sentimentChartData = useMemo(() => ({
//   labels: sentimentData.map(item => item.sentiment),
//   datasets: [
//     {
//       label: 'Sentiment Count',
//       data: sentimentData.map(item => item.counts),
//       backgroundColor: ['red', 'blue', 'green'], // Colors for negative, neutral, and positive
//     },
//   ],
// }), [sentimentData]);
// // Chart options
// const sentimentChartOptions = {
//   plugins: {
//     legend: {
//       display: true, // Show the legend for pie chart
//     },
//     tooltip: {
//       callbacks: {
//         label: function(tooltipItem) {
//           const sentiment = tooltipItem.label;
//           const count = tooltipItem.raw; // Get the count value for the tooltip
//           return `${sentiment}: ${count.toLocaleString()}`; // Format the label
//         },
//       },
//     },
//   },
// };

//   const yearlyChartData = useMemo(() => ({
//     labels: yearlyData.map(d => d.year),
//     datasets: [
//       {
//         label: 'Yearly Incidents',
//         data: yearlyData.map(d => d.incidentCount),
//         borderColor: '#42a5f5',
//         fill: false,
//       },
//     ],
//   }), [yearlyData]);

//   const monthlyChartData = useMemo(() => ({
//     labels: monthlyData.map(d => d.month),
//     datasets: [
//       {
//         label: 'Monthly Incidents',
//         data: monthlyData.map(d => d.incidentCount),
//         backgroundColor: 'rgba(75,192,192,0.6)',
//       },
//     ],
//   }), [monthlyData]);

//   const weekdayChartData = useMemo(() => ({
//     labels: weekdayData.map(d => d.weekday),
//     datasets: [
//       {
//         label: 'Weekday Incidents',
//         data: weekdayData.map(d => d.incidentCount),
//         backgroundColor: 'rgba(255,159,64,0.6)',
//       },
//     ],
//   }), [weekdayData]);

//   const submitDateChartData = useMemo(() => ({
//     labels: submitDateData.map(d => d.submitDate),
//     datasets: [
//       {
//         label: 'Incidents',
//         data: submitDateData.map(d => d.incidentCount),
//         borderColor: '#42a5f5',
//       },
//     ],
//   }), [submitDateData]);

//   const slmChartData = useMemo(() => ({
//     labels: slmData.map(d => d.slmStatus),
//     datasets: [
//       {
//         data: slmData.map(d => d.incidentCount),
//         backgroundColor: ['#36a2eb', '#ff6384', '#00FF00'],
//       },
//     ],
//   }), [slmData]);

//   const dataQualityChartData = useMemo(() => ({
//     labels: ['Missing Service', 'Missing Resolution'],
//     datasets: [
//       {
//         label: 'Missing Data Count',
//         data: [dataQuality.missingService || 0, dataQuality.missingResolution || 0],
//         backgroundColor: ['#f39c12', '#e74c3c'],
//       },
//     ],
//   }), [dataQuality]);

//   return (
//     <div className="wrapper">
//       <div className="main-content">
//         <h2>Incident Dashboard</h2>

//         {/* Top Summary Cards */}
//         <div className="summary-cards">
//           <div className="card" onClick={() => console.log('Total Incidents Clicked')}>
//             <h4>Total Incidents</h4>
//             <p>{totalIncidents}</p>
//           </div>
//           <div className="card" onClick={() => console.log('Priority Levels Clicked')}>
//             <h4>Priority Levels</h4>
//             <p>{priorityCounts}</p>
//           </div>
//           <div className="card" onClick={() => console.log('Status Types Clicked')}>
//             <h4>Status Types</h4>
//             <p>{statusCounts}</p>
//           </div>
//           <div className="card" onClick={() => console.log('Departments Clicked')}>
//             <h4>Departments</h4>
//             <p>{departmentCounts}</p>
//           </div>
//         </div>

//         {/* Charts */}
//         <div className="chart-row">
//           <div className="chart-container">
//             <h3>Status Distribution</h3>
//             <Pie data={statusChartDataConfig} options={{ responsive: true }} />
//           </div>
//           <div className="chart-container">
//             <h3>Resolution Times</h3>
//             <Bar data={resolutionTimesConfig} options={{ responsive: true }} />
//           </div>
//         </div>

//         <div className="chart-container">
//           <h3>Sentiment Analysis</h3>
//           <Pie data={sentimentChartData} options={{ responsive: true }} />
//         </div>

//         <div className="chart-row">
//           <div className="chart-container">
//             <h3>Yearly Incident Trend</h3>
//             <Line data={yearlyChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//           <div className="chart-container">
//             <h3>Monthly Distribution</h3>
//             <Bar data={monthlyChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//           <div className="chart-container">
//             <h3>Weekday Distribution</h3>
//             <Bar data={weekdayChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//         </div>

//         <div className="chart-container">
//           <h3>Incident Submission Trends</h3>
//           <Line data={submitDateChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//         </div>

//         <div className="chart-row">
//           <div className="chart-container">
//             <h3>SLM Real Time Status</h3>
//             <Pie data={slmChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//           <div className="chart-container">
//             <h3>Data Quality Insights</h3>
//             <Bar data={dataQualityChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//           </div>
//         </div>
//       </div>
//     </div> 
//   );
// };

// export default Dashboard;

//real time updates
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

// Registering chart components
ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000'); // Replace with your backend URL

const Dashboard = ({ data }) => {
  const [statusChartData, setStatusChartData] = useState([]);
  const [resolutionTimes, setResolutionTimes] = useState([]);
  const [sentimentData, setSentimentData] = useState([]);
  const [yearlyData, setYearlyData] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);
  const [weekdayData, setWeekdayData] = useState([]);
  const [submitDateData, setSubmitDateData] = useState([]);
  const [slmData, setSlmData] = useState([]);
  // const [dataQuality, setDataQuality] = useState({});
  const [dataQuality, setDataQuality] = useState({
    newIssues: 0,
    inProgressIssues: 0,
    resolvedIssues: 0,
});
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
    fetchData('data-quality', setDataQuality);
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
    socket.on('dataQualityUpdate', (data) => setDataQuality(data));
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
      socket.off('dataQualityUpdate');
      socket.off('departmentResolutionUpdate');
      socket.off('departmentClosureRateUpdate');
      socket.off('peakHoursUpdate');
      socket.off('peakDaysUpdate');
      socket.off('peakMonthsUpdate');
    };
  }, []);

  // Compute totals using useMemo to avoid unnecessary recalculations
  const totalIncidents = useMemo(() => data?.reduce((sum, d) => sum + d.incidentCount, 0) || 0, [data]);
  // const priorityCounts = useMemo(() => new Set(data?.map(d => d.priority)).size || 0, [data]);
  // const statusCounts = useMemo(() => new Set(data?.map(d => d.status)).size || 0, [data]);
  // const departmentCounts = useMemo(() => new Set(data?.map(d => d.department)).size || 0, [data]);

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
        <h2 className="dashboard-heading">Incident Dashboard</h2>

        {/* Top Summary Cards */}
        <div className="summary-cards">
          <div className="card" onClick={() => console.log('Total Incidents Clicked')}>
            <h4>Total Incidents</h4>
            <p>{totalIncidents}</p>
          </div>
          <div className="card" onClick={() => console.log('Resolved Incidents Clicked')}>
            <h4>Resolved Incidents</h4>
            <p>{dataQuality.resolvedIssues}</p>
          </div>
          <div className="card" onClick={() => console.log('Missing Resolution Count Clicked')}>
            <h4>New Incidents</h4>
            <p>{dataQuality.newIssues }</p>
          </div> 
          <div className="card" onClick={() => console.log('In Progress Incidents Clicked')}>
            <h4>In Progress Incidents</h4>
            <p>{dataQuality.inProgressIssues}</p>
          </div>

        </div>


        {/* Charts */}
        <div className="chart-row">
        <div className="chart-container">
          <h3>Sentiment Analysis Of Resolutions</h3>
          <Pie data={sentimentChartData} options={{ responsive: true }} />
        </div>
 
        </div>

        <div className="chart-row">

          <div className="chart-container">
            <h3>Resolution Times</h3>
            <Bar data={resolutionTimesConfig} options={{ responsive: true }} />
          </div>
        </div>

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

        <div className="chart-row">
        <div className="chart-container">
          <h3>Incident Submission Trends</h3>
          <Line data={submitDateChartData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        </div>


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

export default Dashboard;
