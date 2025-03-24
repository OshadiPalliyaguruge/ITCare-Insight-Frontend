// import { Link } from 'react-router-dom';
// import './Dashboard.css';
// import React, { useState, useMemo, useEffect } from 'react';
// import { Bar, Pie, Line } from 'react-chartjs-2';
// import io from 'socket.io-client';
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

// // Registering chart components
// ChartJS.register(ArcElement, BarElement, LineElement, PointElement, CategoryScale, LinearScale, Tooltip, Legend);

// const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000'); // Replace with your backend URL

// const DashboardSummary = ({ data }) => {
//   // const [dataQuality, setDataQuality] = useState({});
//   const [dataQuality, setDataQuality] = useState({
//     newIssues: 0,
//     inProgressIssues: 0,
//     resolvedIssues: 0,
// });

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
//     fetchData('data-quality', setDataQuality);

//   }, []);

//   // Real-time updates using Socket.io
//   useEffect(() => {
//     // Listen for real-time updates for each of the data categories
//     socket.on('dataQualityUpdate', (data) => setDataQuality(data));


//     return () => {
//       // Clean up listeners when component unmounts
//       socket.off('dataQualityUpdate');
//     };
//   }, []);


//   const totalIncidents = useMemo(() => data?.reduce((sum, d) => sum + d.incidentCount, 0) || 0, [data]);


//   return (
//     <div className="wrapper">
//       <div className="main-content1">
//         <h2 className="dashboard-heading">Incident Summary</h2>

//         {/* Top Summary Cards */}
//         <div className="summary-cards">
//           <div className="card" onClick={() => console.log('Total Incidents Clicked')}>
//             <h4>Total Incidents</h4>
//             <p>{totalIncidents}</p>
//           </div>
//           <div className="card" onClick={() => console.log('Resolved Incidents Clicked')}>
//             <h4>Resolved Incidents</h4>
//             <p>{dataQuality.resolvedIssues}</p>
//           </div>
//           <div className="card" onClick={() => console.log('Missing Resolution Count Clicked')}>
//             <h4>New Incidents</h4>
//             <p>{dataQuality.newIssues }</p>
//           </div> 
//           <div className="card" onClick={() => console.log('In Progress Incidents Clicked')}>
//             <h4>In Progress Incidents</h4>
//             <p>{dataQuality.inProgressIssues}</p>
//           </div>
//         </div>

//         <div className="navigation-section">
//           <Link to="/analytics">
//             <button className="nav-button">View Detailed Analytics</button>
//           </Link>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default DashboardSummary;


import { Link } from 'react-router-dom';
import './Dashboard.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import io from 'socket.io-client';

const DashboardSummary = ({ data }) => {
  const [dataQuality, setDataQuality] = useState({
    newIssues: 0,
    inProgressIssues: 0,
    resolvedIssues: 0,
  });
  const navigate = useNavigate();

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
    fetchData('data-quality', setDataQuality);
    
    const socket = io(process.env.REACT_APP_API_URL || 'http://localhost:5000');
    socket.on('dataQualityUpdate', (data) => setDataQuality(data));
    
    return () => {
      socket.off('dataQualityUpdate');
    };
  }, []);

  const totalIncidents = data?.reduce((sum, d) => sum + d.incidentCount, 0) || 0;

  const summaryCards = [
    { title: 'Total Incidents', value: totalIncidents, onClick: () => console.log('Total Incidents Clicked') },
    { title: 'Resolved Incidents', value: dataQuality.resolvedIssues, onClick: () => console.log('Resolved Incidents Clicked') },
    { title: 'New Incidents', value: dataQuality.newIssues, onClick: () => console.log('New Incidents Clicked') },
    { title: 'In Progress Incidents', value: dataQuality.inProgressIssues, onClick: () => console.log('In Progress Incidents Clicked') }
  ];

  const navigationCards = [
    {
      title: "Basic Analysis",
      description: "Quick insights and summary statistics",
      icon: "📈",
      className: "card-basic",
      path: "/analytics"
    },
    {
      title: "Advanced Analysis",
      description: "Deep dive with advanced analytics",
      icon: "📊",
      className: "card-advanced",
      path: "/report"
    },
    {
      title: "Predictions",
      description: "AI-powered forecasting models",
      icon: "🕸️",
      className: "card-predictions",
      path: "/predictions"
    },
    {
      title: "Frequent Questions",
      description: "Most commonly asked queries",
      icon: "❓",
      className: "card-faq",
      path: "/Q&A"
    },
    {
      title: "Answer Suggestions",
      description: "Recommended responses and solutions",
      icon: "💬",
      className: "card-suggestions",
      path: "/Q&A"
    }
  ];

  return (
    <div className="wrapper" style={{ marginTop: "5%" }}>
      <div className="main-content1">
      <h2 className="dashboard-heading">ITCare Insight</h2>
        <h3 style={{ textAlign: 'center', margin: '50px 0', color: '#4a5588' }}>Incident Management Dashboard</h3>

        {/* Summary Cards Section */}
        <div className="summary-cards">
          {summaryCards.map((card, index) => (
            <div key={index} className="card" onClick={card.onClick}>
              <h4>{card.title}</h4>
              <p>{card.value}</p>
            </div>
          ))}
        </div>

        {/* Quick Navigation Section */}
        <h3 style={{ textAlign: 'center', margin: '50px 0', color: '#4a5588' }}>Quick Navigation</h3>
        <div className="navigation-grid">
      {navigationCards.map((card, index) => (
        <div 
          key={index}
          className={`navigation-card ${card.className}`}
          onClick={() => navigate(card.path)}
        >
          <span className="card-icon">{card.icon}</span>
          <h3>{card.title}</h3>
          <p>{card.description}</p>
        </div>
      ))}
    </div>

        {/* Call to Action Section */}
        {/* <div className="navigation-section">
          <Link to="/analytics">
            <button className="nav-button">View Detailed Analytics →</button>
          </Link>
        </div> */}
      </div>
    </div>
  );
};

export default DashboardSummary;