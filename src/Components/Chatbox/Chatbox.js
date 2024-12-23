// import React, { useState } from 'react';
// import './Chatbox.css'; // Create a CSS file for styling

// const Chatbox = () => {
//   const [messages, setMessages] = useState([]);
//   const [input, setInput] = useState('');

//   const handleInputChange = (e) => {
//     setInput(e.target.value);
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     if (input.trim() === '') return; // Prevent empty messages

//     // Add user message to chat
//     setMessages((prev) => [...prev, { text: input, sender: 'user' }]);
    
//     // Simulated response (you can replace this with your recommendation logic)
//     const response = input.includes('network') 
//       ? 'Try resetting your router.' 
//       : 'Please consult the manual for troubleshooting.';
      
//     // Add bot response to chat after a brief delay
//     setTimeout(() => {
//       setMessages((prev) => [...prev, { text: response, sender: 'bot' }]);
//     }, 1000);

//     setInput(''); // Clear input field
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
//           onChange={handleInputChange} 
//           placeholder="Type your problem..." 
//           required 
//         />
//         <button type="submit">Send</button>
//       </form>
//     </div>
//   );
// };

// export default Chatbox;





import Papa from 'papaparse';
import React, { useState, useEffect } from 'react';
import './Chatbox.css';

const Chatbox = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState('');
  const [faqData, setFaqData] = useState([]);

  useEffect(() => {
    // Load and parse CSV file
    Papa.parse('C:\\ProgramData\\MySQL\\MySQL Server 8.0\\Uploads\\incident_report_preprocessed_final.csv', {
      download: true,
      header: true,
      complete: (result) => {
        setFaqData(result.data); // Store parsed CSV data in state
      },
      error: (error) => {
        console.error('Error loading CSV:', error);
      }
    });
  }, []);

  const findAnswer = (inputText) => {
    // Perform partial matching
    const matchedEntry = faqData.find((entry) =>
      inputText.toLowerCase().includes(entry.question.toLowerCase())
    );

    return matchedEntry ? matchedEntry.answer : "Sorry, I couldn't find an answer to that.";
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    // Add user message to chat
    setMessages((prev) => [...prev, { text: input, sender: 'user' }]);

    // Find answer from CSV data
    const answer = findAnswer(input);

    // Add bot response to chat
    setTimeout(() => {
      setMessages((prev) => [...prev, { text: answer, sender: 'bot' }]);
    }, 1000);

    setInput(''); // Clear input
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
          onChange={(e) => setInput(e.target.value)} 
          placeholder="Type your problem..." 
          required 
        />
        <button type="submit">Send</button>
      </form>
    </div>
  );
};

export default Chatbox;
