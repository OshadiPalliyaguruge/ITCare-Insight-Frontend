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

// import React, { useEffect, useState } from 'react';
// import { ClipLoader } from 'react-spinners'; // Import the spinner
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
//   const [options, setOptions] = useState({
//     priorities: [],
//     organizations: [],
//     departments: []
//   });
//   const [isLoading, setIsLoading] = useState(false); // New state for loading indicator

//   useEffect(() => {
//     // Fetch dropdown options from the backend and clean them
//     fetch('http://localhost:5000/api/options')
//       .then(response => response.json())
//       .then(data => {
//         setOptions({
//           priorities: data.priorities.map(p => p.trim()), // Remove spaces & \r
//           organizations: data.organizations.map(org => org.trim()),
//           departments: data.departments.map(dept => dept.trim())
//         });
//       })
//       .catch(error => console.error('Error fetching options:', error));
//   }, []);

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setUserInput({ ...userInput, [name]: value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsLoading(true);
  
//     // Check if required fields are empty
//     if (!userInput.operationalTier || !userInput.summary || !userInput.priority || !userInput.organization || !userInput.department) {
//       alert("Please fill in all required fields.");
//       setIsLoading(false);
//       return;
//     }
  
//     try {
//       const response = await fetch('http://localhost:5000/api/predict', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify(userInput)
//       });
  
//       const data = await response.json();
  
//       if (response.ok) {
//         setPredictedGroup(data.predicted_group);
//       } else {
//         /*alert(data.error || "An error occurred during prediction.");*/
//       }
//     } catch (error) {
//       console.error('Error fetching prediction:', error);
//       alert("An error occurred. Please try again.");
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container">
//       <div className="sections-container">
//         {/* Predict Assigned Group Section */}
//         <div className="section user-input-section">
//           <h3 className="section-title">Predict Assigned Group</h3>
//           <form onSubmit={handleSubmit} className="prediction-form">
            
//             {/* Operational Tier */}
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

//             {/* Summary */}
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

//             {/* Priority Dropdown */}
//             <div className="form-group">
//               <label>Priority</label>
//               <select
//                 name="priority"
//                 value={userInput.priority}
//                 onChange={handleChange}
//                 className="form-control"
//               >
//                 <option value="">Select Priority</option>
//                 {options.priorities.map((priority, index) => (
//                   <option key={index} value={priority}>{priority}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Organization Dropdown */}
//             <div className="form-group">
//               <label>Organization</label>
//               <select
//                 name="organization"
//                 value={userInput.organization}
//                 onChange={handleChange}
//                 className="form-control"
//               >
//                 <option value="">Select Organization</option>
//                 {options.organizations.map((org, index) => (
//                   <option key={index} value={org}>{org}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Department Dropdown */}
//             <div className="form-group">
//               <label>Department</label>
//               <select
//                 name="department"
//                 value={userInput.department}
//                 onChange={handleChange}
//                 className="form-control"
//               >
//                 <option value="">Select Department</option>
//                 {options.departments.map((dept, index) => (
//                   <option key={index} value={dept}>{dept}</option>
//                 ))}
//               </select>
//             </div>

//             {/* Submit Button */}
//             <button type="submit" className="btn btn-primary" disabled={isLoading}>
//               {isLoading ? 'Predicting...' : 'Predict'}
//             </button>
//           </form>

//           {/* Prediction Output */}
//           {isLoading ? (
//             <div className="loading-indicator">
//               <ClipLoader color="#007bff" size={30} /> {/* Use the spinner */}
//               <p>Predicting...</p>
//             </div>
//           ) : (
//             predictedGroup && (
//               <div className="prediction-output">
//                 <p className="output-title">Predicted Assigned Group:</p>
//                 <p className="output-result">{predictedGroup}</p>
//               </div>
//             )
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Predictions;

import React, { useEffect, useState } from 'react';
import { ClipLoader } from 'react-spinners'; // Import the spinner
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
  const [isLoading, setIsLoading] = useState(false); // New state for loading indicator
  const [errorMessage, setErrorMessage] = useState(''); // New state for error messages

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setPredictedGroup(''); // Clear previous prediction
    setErrorMessage(''); // Clear previous error message

    // Check if required fields are empty
    if (!userInput.operationalTier || !userInput.summary || !userInput.priority || !userInput.organization || !userInput.department) {
      setErrorMessage('Please check the inputs'); // Set error message for missing inputs
      setIsLoading(false);
      return;
    }

    try {
      console.log('Submitting:', userInput); // Debugging: Log the payload
      const response = await fetch('http://localhost:5000/api/predict', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userInput)
      });

      console.log('Response:', response); // Debugging: Log the response
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Cannot find prediction');
      }

      const data = await response.json();
      console.log('Response Data:', data); // Debugging: Log the response data
      setPredictedGroup(data.predicted_group); // Set prediction if successful
    } catch (error) {
      console.error('Error fetching prediction:', error);
      setErrorMessage(error.message || 'An error occurred. Please try again.'); // Set error message
    } finally {
      setIsLoading(false);
    }
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
            <button type="submit" className="btn btn-primary" disabled={isLoading}>
              {isLoading ? 'Predicting...' : 'Predict'}
            </button>
          </form>

          {/* Prediction Output */}
          {isLoading ? (
            <div className="loading-indicator">
              <ClipLoader color="#007bff" size={30} /> {/* Use the spinner */}
              <p>Predicting...</p>
            </div>
          ) : (
            predictedGroup ? (
              <div className="prediction-output">
                <p className="output-title">Predicted Assigned Group:</p>
                <p className="output-result">{predictedGroup}</p>
              </div>
            ) : (
              errorMessage && (
                <div className="error-message">
                  <p>{errorMessage}</p>
                </div>
              )
            )
          )}
        </div>
      </div>
    </div>
  );
};

export default Predictions;