// import React, { useEffect, useState } from 'react';
// import Chatbox from '../Chatbox/Chatbox';

// const ProblemsSolutions = () => {
//   const [problemsSolutions, setProblemsSolutions] = useState([]);
//   const [userInput, setUserInput] = useState({
//     operationalTier: '',
//     summary: '',
//     priority: '',
//     organization: '', 
//     department: ''
//   });
//   const [predictedGroup, setPredictedGroup] = useState('');

//   useEffect(() => {
//     // Fetch sample problems and solutions from the backend API
//     fetch('http://localhost:5000/api/problems-solutions')
//       .then((response) => response.json())
//       .then((data) => {
//         setProblemsSolutions(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching problems and solutions:', error);
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserInput({ ...userInput, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Send user input to the backend for prediction
//     fetch('http://localhost:5000/api/predict', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(userInput)
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setPredictedGroup(data.predicted_group);
//       })
//       .catch((error) => {
//         console.error('Error fetching prediction:', error);
//       });
//   };

//   return (
//     <div>
//       <div className="sample-problem-solution-section">
//         <h3>Sample Problems and Solutions</h3>
//         <table className="problems-solutions-table">
//           <thead>
//             <tr>
//               <th>Problem</th>
//               <th>Solution</th>
//             </tr>
//           </thead>
//           <tbody>
//             {problemsSolutions.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.question}</td>
//                 <td>{item.answer}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       {/* User Input Section */}
//       <div className="user-input-section">
//         <h3>Predict Assigned Group</h3>
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name="operationalTier"
//             placeholder="Operational Tier"
//             value={userInput.operationalTier}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="summary"
//             placeholder="Summary"
//             value={userInput.summary}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="priority"
//             placeholder="Priority"
//             value={userInput.priority}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="organization"
//             placeholder="Organization"
//             value={userInput.organization}
//             onChange={handleChange}
//           />
//           <input
//             type="text"
//             name="department"
//             placeholder="Department"
//             value={userInput.department}
//             onChange={handleChange}
//           />
//           <button type="submit">Predict</button>
//         </form>
//         {predictedGroup && <p>Predicted Assigned Group: {predictedGroup}</p>}
//       </div>

//       <div className="chatbox-container">
//         <Chatbox />
//       </div>
//     </div>
//   );
// };


//------------------------------------ Add designs ------------------------------------
// import React, { useEffect, useState } from 'react';
// import Chatbox from '../Chatbox/Chatbox';
// import './ProblemsSolutions.css'; // Custom CSS file for styling

// const ProblemsSolutions = () => {
//   const [problemsSolutions, setProblemsSolutions] = useState([]);
//   const [userInput, setUserInput] = useState({
//     operationalTier: '',
//     summary: '',
//     priority: '',
//     organization: '', 
//     department: ''
//   });
//   const [predictedGroup, setPredictedGroup] = useState('');

//   useEffect(() => {
//     // Fetch sample problems and solutions from the backend API
//     fetch('http://localhost:5000/api/problems-solutions')
//       .then((response) => response.json())
//       .then((data) => {
//         setProblemsSolutions(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching problems and solutions:', error);
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserInput({ ...userInput, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Send user input to the backend for prediction
//     fetch('http://localhost:5000/api/predict', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(userInput)
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setPredictedGroup(data.predicted_group);
//       })
//       .catch((error) => {
//         console.error('Error fetching prediction:', error);
//       });
//   };

//   return (
//     <div className="container">
//       <div className="sample-problem-solution-section">
//         <h3 className="section-title">Sample Problems and Solutions</h3>
//         <table className="problems-solutions-table">
//           <thead>
//             <tr>
//               <th>Problem</th>
//               <th>Solution</th>
//             </tr>
//           </thead>
//           <tbody>
//             {problemsSolutions.map((item, index) => (
//               <tr key={index}>
//                 <td>{item.question}</td>
//                 <td>{item.answer}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>
//       </div>

//       <div className="user-input-section">
//         <h3 className="section-title">Predict Assigned Group</h3>
//         <form onSubmit={handleSubmit} className="prediction-form">
//           <div className="form-group">
//             <label>Operational Tier</label>
//             <input
//               type="text"
//               name="operationalTier"
//               placeholder="Enter Operational Tier"
//               value={userInput.operationalTier}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label>Summary</label>
//             <input
//               type="text"
//               name="summary"
//               placeholder="Enter Summary"
//               value={userInput.summary}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label>Priority</label>
//             <input
//               type="text"
//               name="priority"
//               placeholder="Enter Priority"
//               value={userInput.priority}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label>Organization</label>
//             <input
//               type="text"
//               name="organization"
//               placeholder="Enter Organization"
//               value={userInput.organization}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label>Department</label>
//             <input
//               type="text"
//               name="department"
//               placeholder="Enter Department"
//               value={userInput.department}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">Predict</button>
//         </form>
//         {predictedGroup && (
//           <div className="prediction-output">
//             <p className="output-title">Predicted Assigned Group:</p>
//             <p className="output-result">{predictedGroup}</p>
//           </div>
//         )}
//       </div>

//       <div className="chatbox-container">
//         <Chatbox />
//       </div>
//     </div>
//   );
// };

// export default ProblemsSolutions;


//-------------------------- Add  cards ------------------------
// import React, { useEffect, useState } from 'react';
// import Chatbox from '../Chatbox/Chatbox';
// import './ProblemsSolutions.css'; // Custom CSS file for styling

// const ProblemsSolutions = () => {
//   const [problemsSolutions, setProblemsSolutions] = useState([]);
//   const [userInput, setUserInput] = useState({
//     operationalTier: '',
//     summary: '',
//     priority: '',
//     organization: '', 
//     department: ''
//   });
//   const [predictedGroup, setPredictedGroup] = useState('');

//   useEffect(() => {
//     // Fetch sample problems and solutions from the backend API
//     fetch('http://localhost:5000/api/problems-solutions')
//       .then((response) => response.json())
//       .then((data) => {
//         setProblemsSolutions(data);
//       })
//       .catch((error) => {
//         console.error('Error fetching problems and solutions:', error);
//       });
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserInput({ ...userInput, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // Send user input to the backend for prediction
//     fetch('http://localhost:5000/api/predict', {
//       method: 'POST',
//       headers: { 'Content-Type': 'application/json' },
//       body: JSON.stringify(userInput)
//     })
//       .then((response) => response.json())
//       .then((data) => {
//         setPredictedGroup(data.predicted_group);
//       })
//       .catch((error) => {
//         console.error('Error fetching prediction:', error);
//       });
//   };

//   return (
//     <div className="container">
//       <div className="sample-problem-solution-section">
//         <h3 className="section-title">Sample Problems and Solutions</h3>
//         <div className="problem-solution-cards">
//           {problemsSolutions.map((item, index) => (
//             <div key={index} className="card">
//               <div className="card-header">
//                 <h5 className="card-title">Problem {index + 1}</h5>
//               </div>
//               <div className="card-body">
//                 <p className="problem">{item.question}</p>
//                 <hr />
//                 <p className="solution">{item.answer}</p>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>

//       <div className="user-input-section">
//         <h3 className="section-title">Predict Assigned Group</h3>
//         <form onSubmit={handleSubmit} className="prediction-form">
//           <div className="form-group">
//             <label>Operational Tier</label>
//             <input
//               type="text"
//               name="operationalTier"
//               placeholder="Enter Operational Tier"
//               value={userInput.operationalTier}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label>Summary</label>
//             <input
//               type="text"
//               name="summary"
//               placeholder="Enter Summary"
//               value={userInput.summary}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label>Priority</label>
//             <input
//               type="text"
//               name="priority"
//               placeholder="Enter Priority"
//               value={userInput.priority}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label>Organization</label>
//             <input
//               type="text"
//               name="organization"
//               placeholder="Enter Organization"
//               value={userInput.organization}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <div className="form-group">
//             <label>Department</label>
//             <input
//               type="text"
//               name="department"
//               placeholder="Enter Department"
//               value={userInput.department}
//               onChange={handleChange}
//               className="form-control"
//             />
//           </div>
//           <button type="submit" className="btn btn-primary">Predict</button>
//         </form>
//         {predictedGroup && (
//           <div className="prediction-output">
//             <p className="output-title">Predicted Assigned Group:</p>
//             <p className="output-result">{predictedGroup}</p>
//           </div>
//         )}
//       </div>

//       <div className="chatbox-container">
//         <Chatbox />
//       </div>
//     </div>
//   );
// };

// export default ProblemsSolutions;



//------------------------------------ Organized structure ------------------------------------
import React, { useEffect, useState } from 'react';
import Chatbox from '../Chatbox/Chatbox';
import './ProblemsSolutions.css'; // Custom CSS file for styling

const ProblemsSolutions = () => {
  const [problemsSolutions, setProblemsSolutions] = useState([]);
  const [userInput, setUserInput] = useState({
    operationalTier: '',
    summary: '',
    priority: '',
    organization: '', 
    department: ''
  });
  const [predictedGroup, setPredictedGroup] = useState('');

  useEffect(() => {
    // Fetch sample problems and solutions from the backend API
    fetch('http://localhost:5000/api/problems-solutions')
      .then((response) => response.json())
      .then((data) => {
        setProblemsSolutions(data);
      })
      .catch((error) => {
        console.error('Error fetching problems and solutions:', error);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInput({ ...userInput, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Send user input to the backend for prediction
    fetch('http://localhost:5000/api/predict', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(userInput)
    })
      .then((response) => response.json())
      .then((data) => {
        setPredictedGroup(data.predicted_group);
      })
      .catch((error) => {
        console.error('Error fetching prediction:', error);
      });
  };

  return (
    <div className="container">
      <div className="sections-container">
        {/* Sample Problems and Solutions */}
      
          <h3 className="section-title">Sample Problems and Solutions</h3>
          <div className="problem-solution-cards">
            {problemsSolutions.map((item, index) => (
              <div key={index} className="card">
                <div className="card-header">
                  <h5 className="card-title">Problem {index + 1}</h5>
                </div>
                <div className="card-body">
                  <p className="problem">{item.question}</p>
                  <hr />
                  <p className="solution">{item.answer}</p>
                </div>
              </div>
            ))}
          </div>
     
      </div>

      {/* Chatbox */}
      <div className="chatbox-container">
        <Chatbox />
      </div>
    </div>
  );
};

export default ProblemsSolutions;
