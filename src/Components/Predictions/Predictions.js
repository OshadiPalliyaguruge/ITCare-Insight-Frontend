// import React, { useEffect, useState } from 'react';
// import Chatbox from '../Chatbox/Chatbox';
// import './Predictions.css'; // Custom CSS file for styling

// const Predictions = () => {
//   const [userInput, setUserInput] = useState({
//     operationalTier: '',
//     summary: '',
//     priority: '',
//     organization: '', 
//     department: ''
//   });
//   const [predictedGroup, setPredictedGroup] = useState('');

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
//       <div className="sections-container">
//         {/* Predict Assigned Group Section */}
//         <div className="section user-input-section">
//           <h3 className="section-title">Predict Assigned Group</h3>
//           <form onSubmit={handleSubmit} className="prediction-form">
//             <div className="form-group">
//               <label>Operational Tier</label>
//               <input
//                 type="text"
//                 name="operationalTier"
//                 placeholder="Enter Operational Tier"
//                 value={userInput.operationalTier}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label>Summary</label>
//               <input
//                 type="text"
//                 name="summary"
//                 placeholder="Enter Summary"
//                 value={userInput.summary}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label>Priority</label>
//               <input
//                 type="text"
//                 name="priority"
//                 placeholder="Enter Priority"
//                 value={userInput.priority}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label>Organization</label>
//               <input
//                 type="text"
//                 name="organization"
//                 placeholder="Enter Organization"
//                 value={userInput.organization}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label>Department</label>
//               <input
//                 type="text"
//                 name="department"
//                 placeholder="Enter Department"
//                 value={userInput.department}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//             <button type="submit" className="btn btn-primary">Predict</button>
//           </form>
//           {predictedGroup && (
//             <div className="prediction-output">
//               <p className="output-title">Predicted Assigned Group:</p>
//               <p className="output-result">{predictedGroup}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Predictions;


// import React, { useEffect, useState } from 'react';
// import Chatbox from '../Chatbox/Chatbox';
// import './Predictions.css';
// import axios from 'axios';

// const Predictions = () => {
//   const [userInput, setUserInput] = useState({
//     operationalTier: '',
//     summary: '',
//     priority: '',
//     organization: '',
//     department: ''
//   });
//   const [predictedGroup, setPredictedGroup] = useState('');
//   const [options, setOptions] = useState({
//     priorities: [],
//     organizations: [],
//     departments: []
//   });

//   useEffect(() => {
//     axios.get('http://localhost:5000/api/options')
//       .then(response => {
//         setOptions({
//           priorities: response.data.priorities || [],
//           organizations: response.data.organizations || [],
//           departments: response.data.departments || []
//         });
//       })
//       .catch(error => console.error('Error fetching options:', error));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserInput({ ...userInput, [name]: value });
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     axios.post('http://localhost:5000/api/predict', userInput, {
//       headers: { 'Content-Type': 'application/json' }
//     })
//       .then((response) => setPredictedGroup(response.data.predicted_group))
//       .catch((error) => console.error('Error fetching prediction:', error));
//   };

//   return (
//     <div className="container">
//       <div className="sections-container">
//         <div className="section user-input-section">
//           <h3 className="section-title">Predict Assigned Group</h3>
//           <form onSubmit={handleSubmit} className="prediction-form">
//             <div className="form-group">
//               <label>Operational Tier</label>
//               <input
//                 type="text"
//                 name="operationalTier"
//                 placeholder="Enter Operational Tier"
//                 value={userInput.operationalTier}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label>Summary</label>
//               <input
//                 type="text"
//                 name="summary"
//                 placeholder="Enter Summary"
//                 value={userInput.summary}
//                 onChange={handleChange}
//                 className="form-control"
//               />
//             </div>
//             <div className="form-group">
//               <label>Priority</label>
//               <select name="priority" value={userInput.priority} onChange={handleChange} className="form-control">
//                 <option value="">Select Priority</option>
//                 {options.priorities.map((priority, index) => (
//                   <option key={index} value={priority}>{priority}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Organization</label>
//               <select name="organization" value={userInput.organization} onChange={handleChange} className="form-control">
//                 <option value="">Select Organization</option>
//                 {options.organizations.map((org, index) => (
//                   <option key={index} value={org}>{org}</option>
//                 ))}
//               </select>
//             </div>
//             <div className="form-group">
//               <label>Department</label>
//               <select name="department" value={userInput.department} onChange={handleChange} className="form-control">
//                 <option value="">Select Department</option>
//                 {options.departments.map((dept, index) => (
//                   <option key={index} value={dept}>{dept}</option>
//                 ))}
//               </select>
//             </div>
//             <button type="submit" className="btn btn-primary">Predict</button>
//           </form>
//           {predictedGroup && (
//             <div className="prediction-output">
//               <p className="output-title">Predicted Assigned Group:</p>
//               <p className="output-result">{predictedGroup}</p>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Predictions;

import React, { useEffect, useState } from 'react';
import Chatbox from '../Chatbox/Chatbox';
import './Predictions.css'; // Custom CSS file for styling

const Predictions = () => {
  const [userInput, setUserInput] = useState({
    operationalTier: '',
    summary: '',
    priority: '',
    organization: '',
    department: ''
  });

  const [predictedGroup, setPredictedGroup] = useState('');
  const [options, setOptions] = useState({
    priorities: [],
    organizations: [],
    departments: []
  });

  useEffect(() => {
    // Fetch dropdown options from the backend and clean them
    fetch('http://localhost:5000/api/options')
      .then(response => response.json())
      .then(data => {
        setOptions({
          priorities: data.priorities.map(p => p.trim()), // Remove spaces & \r
          organizations: data.organizations.map(org => org.trim()),
          departments: data.departments.map(dept => dept.trim())
        });
      })
      .catch(error => console.error('Error fetching options:', error));
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
        {/* Predict Assigned Group Section */}
        <div className="section user-input-section">
          <h3 className="section-title">Predict Assigned Group</h3>
          <form onSubmit={handleSubmit} className="prediction-form">
            
            {/* Operational Tier */}
            <div className="form-group">
              <label>Operational Tier</label>
              <input
                type="text"
                name="operationalTier"
                placeholder="Enter Operational Tier"
                value={userInput.operationalTier}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* Summary */}
            <div className="form-group">
              <label>Summary</label>
              <input
                type="text"
                name="summary"
                placeholder="Enter Summary"
                value={userInput.summary}
                onChange={handleChange}
                className="form-control"
              />
            </div>

            {/* Priority Dropdown */}
            <div className="form-group">
              <label>Priority</label>
              <select
                name="priority"
                value={userInput.priority}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Priority</option>
                {options.priorities.map((priority, index) => (
                  <option key={index} value={priority}>{priority}</option>
                ))}
              </select>
            </div>

            {/* Organization Dropdown */}
            <div className="form-group">
              <label>Organization</label>
              <select
                name="organization"
                value={userInput.organization}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Organization</option>
                {options.organizations.map((org, index) => (
                  <option key={index} value={org}>{org}</option>
                ))}
              </select>
            </div>

            {/* Department Dropdown */}
            <div className="form-group">
              <label>Department</label>
              <select
                name="department"
                value={userInput.department}
                onChange={handleChange}
                className="form-control"
              >
                <option value="">Select Department</option>
                {options.departments.map((dept, index) => (
                  <option key={index} value={dept}>{dept}</option>
                ))}
              </select>
            </div>

            {/* Submit Button */}
            <button type="submit" className="btn btn-primary">Predict</button>
          </form>

          {/* Prediction Output */}
          {predictedGroup && (
            <div className="prediction-output">
              <p className="output-title">Predicted Assigned Group:</p>
              <p className="output-result">{predictedGroup}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Predictions;
