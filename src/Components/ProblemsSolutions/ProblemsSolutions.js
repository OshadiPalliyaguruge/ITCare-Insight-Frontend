// SampleProblems.js
// import React from 'react';
// import Chatbox from '../Chatbox/Chatbox';

// const ProblemsSolutions = () => {
//   const sampleProblemsSolutions = [
//     { summery: "Internet is down", resolution: "Restart the router." },
//     { summery: "Printer not working", resolution: "Check the printer's connection and refill paper." },
//     { summery: "Software installation failed", resolution: "Ensure you have the necessary permissions and sufficient disk space." },
//     { summery: "Cannot access email", resolution: "Check your internet connection and reset your email password." },
//     { summery: "Application crashing", resolution: "Update the application to the latest version." },
//   ];

//   return (
//    <div><div className="sample-problem-solution-section">
//       <h3>Sample Problems and Solutions</h3>
//       <table className="problems-solutions-table">
//         <thead>
//           <tr>
//             <th>Problem</th>
//             <th>Solution</th>
//           </tr>
//         </thead>
//         <tbody>
//           {sampleProblemsSolutions.map((item, index) => (
//             <tr key={index}>
//               <td>{item.summery}</td>
//               <td>{item.resolution}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
    
//     </div>
          
            
//                 <div className="chatbox-container">
//                 <Chatbox/>
//               </div>
          
//               </div> 
//   );
// };

// export default ProblemsSolutions;

import React, { useEffect, useState } from 'react';
import Chatbox from '../Chatbox/Chatbox';

const ProblemsSolutions = () => {
  const [problemsSolutions, setProblemsSolutions] = useState([]);

  useEffect(() => {
    // Fetch the data from the backend API
    fetch('http://localhost:5000/api/problems-solutions')
      .then((response) => response.json())
      .then((data) => {
        setProblemsSolutions(data);
      })
      .catch((error) => {
        console.error('Error fetching problems and solutions:', error);
      });
  }, []);

  return (
    <div>
      <div className="sample-problem-solution-section">
        <h3>Sample Problems and Solutions</h3>
        <table className="problems-solutions-table">
          <thead>
            <tr>
              <th>Problem</th>
              <th>Solution</th>
            </tr>
          </thead>
          <tbody>
            {problemsSolutions.map((item, index) => (
              <tr key={index}>
                <td>{item.question}</td>
                <td>{item.answer}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="chatbox-container">
        <Chatbox />
      </div>
    </div>
  );
};

export default ProblemsSolutions;
