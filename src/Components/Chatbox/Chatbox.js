// // import React, { useState } from 'react';
// // import './Chatbox.css'; // Create a CSS file for styling

// // const Chatbox = () => {
// //   const [messages, setMessages] = useState([]);
// //   const [input, setInput] = useState('');

// //   const handleInputChange = (e) => {
// //     setInput(e.target.value);
// //   };

// //   const handleSubmit = (e) => {
// //     e.preventDefault();
// //     if (input.trim() === '') return; // Prevent empty messages

// //     // Add user message to chat
// //     setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    
// //     // Simulated response (you can replace this with your recommendation logic)
// //     const response = input.includes('network') 
// //       ? 'Try resetting your router.' 
// //       : 'Please consult the manual for troubleshooting.';
      
// //     // Add bot response to chat after a brief delay
// //     setTimeout(() => {
// //       setMessages((prev) => [...prev, { text: response, sender: 'bot' }]);
// //     }, 1000);

// //     setInput(''); // Clear input field
// //   };

// //   return (
// //     <div className="chatbox">
// //       <div className="messages">
// //         {messages.map((msg, index) => (
// //           <div key={index} className={msg.sender}>
// //             {msg.text}
// //           </div>
// //         ))}
// //       </div>
// //       <form onSubmit={handleSubmit} className="chat-input">
// //         <input 
// //           type="text" 
// //           value={input} 
// //           onChange={handleInputChange} 
// //           placeholder="Type your problem..." 
// //           required 
// //         />
// //         <button type="submit">Send</button>
// //       </form>
// //     </div>
// //   );
// // };

// // export default Chatbox;





// import Papa from 'papaparse';
// import React, { useState, useEffect } from 'react';
// import './Chatbox.css';

// const Chatbox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');
//   const [faqData, setFaqData] = useState([]);

//   useEffect(() => {
//     // Load and parse CSV file
//     Papa.parse('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\incident_report_preprocessed_final.csv', {
//       download: true,
//       header: true,
//       complete: (result) => {
//         setFaqData(result.data); // Store parsed CSV data in state
//       },
//       error: (error) => {
//         console.error('Error loading CSV:', error);
//       }
//     });
//   }, []);

//   const findAnswer = (inputText) => {
//     // Perform partial matching
//     const matchedEntry = faqData.find((entry) =>
//       inputText.toLowerCase().includes(entry.question.toLowerCase())
//     );

//     return matchedEntry ? matchedEntry.answer : "Sorry, I couldn't find an answer to that.";
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (!input.trim()) return;

//     // Add user message to chat
//     setMessages((prev) => [...prev, { text: input, sender: 'user' }]);

//     // Find answer from CSV data
//     const answer = findAnswer(input);

//     // Add bot response to chat
//     setTimeout(() => {
//       setMessages((prev) => [...prev, { text: answer, sender: 'bot' }]);
//     }, 1000);

//     setInput(''); // Clear input
//   };

//   return (
//     <div className="chatbox">
//       <div className="messages">
//         {messages.map((msg, index) => (
//           <div key={index} className={msg.sender}>
//             {msg.text}
//           </div>
//         ))}
//       </div>
//       <form onSubmit={handleSubmit} className="chat-input">
//         <input 
//           type="text" 
//           value={input} 
//           onChange={(e) => setInput(e.target.value)} 
//           placeholder="Type your problem..." 
//           required 
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chatbox;


import React, { useState } from 'react';
import './Chatbox.css';
import axios from 'axios';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');

  const handleInputChange = (e) => {
    setInput(e.target.value);
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   if (!input.trim()) return;

  //   setMessages((prev) => [...prev, { text: input, sender: 'user' }]);

  //   try {
  //     const response = await axios.post('http://localhost:5002/api/search', {
  //       query: input
  //     });

  //     console.log("Full API Response:", response.data); // Debugging

  //     const results = response.data.results || [];
  //     console.log("Extracted Results:", results);
  //     console.log("Response:", response); // Debugging

  //     if (results.length === 0) {
  //       setMessages((prev) => [...prev, { text: "No relevant answer found.", sender: 'bot' }]);
  //     } else {
  //       results.forEach((res) => {
  //         setMessages((prev) => [...prev, { text: `**Q:** ${res.question}\n**A:** ${res.answer}`, sender: 'bot' }]);
  //       });
  //     }
  //   } catch (error) {
  //     console.error("Error fetching solution:", error.response?.data || error.message);
  //     setMessages((prev) => [...prev, { text: "There was an error fetching the solution.", sender: 'bot' }]);
  //   }

  //   setInput('');
  // };

  const toSentenceCase = (str) => {
    if (!str) return "";
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
  
    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
  
    try {
      const response = await axios.post('http://localhost:5002/api/search', {
        query: input
      });
  
      console.log("Full API Response:", response.data);
  
      const results = response.data.results || [];
  
      if (results.length === 0) {
        setMessages((prev) => [...prev, { text: " No relevant answer found.", sender: 'bot' }]);
      } else {
        results.forEach((res) => {
          setMessages((prev) => [...prev, {
            text: (
              <div>
                <strong>❓ Question:</strong> {toSentenceCase(res.question)} <br />
                <strong>✅ Answer:</strong> {toSentenceCase(res.answer)}
              </div>
            ),
            sender: 'bot'
          }]);
        });
      }
    } catch (error) {
      console.error("Error fetching solution:", error.response?.data || error.message);
      setMessages((prev) => [...prev, { text: "🚨 There was an error fetching the solution.", sender: 'bot' }]);
    }
  
    setInput('');
  };
  
  
  
  return (
    <div className="chatbox">
      <div className="messages">
        {messages.map((msg, index) => (
          <div key={index} className={msg.sender}>
            {msg.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} className="chat-input">
        <input 
          type="text" 
          value={input} 
          onChange={handleInputChange} 
          placeholder="Type your problem..." 
          required 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbox;
