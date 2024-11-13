import React, { useState, useEffect } from 'react';
import { GoogleGenerativeAI } from '@google/generative-ai';

export default function Body() {
  // State to manage the AI response, loading status, and user input
  const [response, setResponse] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [userInput, setUserInput] = useState('');
  const [isDarkMode, setIsDarkMode] = useState(false); // Add state for dark mode

  // Initialize the AI model with your API key (remember to secure it)
  const genAI = new GoogleGenerativeAI("AIzaSyB1xUix_1zDjcuOUda37Hf8WY0C_BZ8tjo");

  // Initialize the model
  const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

  // Function to run the AI model and get the response
  const run = async () => {
    if (!userInput.trim()) {
      alert("Please enter some text before submitting.");
      return;
    }

    setIsLoading(true); // Set loading to true when the request starts
    setResponse(''); // Reset response before generating new content

    try {
      // Generate content using the model, using the user input as the prompt
      const result = await model.generateContent(userInput); // Use userInput as the prompt
      setResponse(result?.response?.text || 'No valid response received'); // Ensure correct handling of the response
    } catch (error) {
      setResponse('Error generating AI response. Please try again.');
    } finally {
      setIsLoading(false); // Reset loading state after request is complete
    }
  };

  // Function to render bold text in blue using <b> and style
  const formatResponse = (text) => {
    // Replace **bold text** with <b style="color: blue;">bold text</b>
    return text.replace(/\*\*(.*?)\*\*/g, '<b style="color: #1E90FF;">$1</b>');
  };

  // Toggle dark mode on and off
  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Use useEffect to apply dark mode to the body element
  useEffect(() => {
    if (isDarkMode) {
      document.body.style.backgroundColor = '#333';
      document.body.style.color = '#fff';
    } else {
      document.body.style.backgroundColor = '#fff';
      document.body.style.color = '#000';
    }
  }, [isDarkMode]);

  return (
    <section className="body">
      <div id="body-section">
        <div className="input-container">
          {/* Theme Text and Toggle Switch */}
          <div className="theme-container">
            <span className={`theme-label ${isDarkMode ? 'dark-theme' : 'light-theme'}`}>
              {isDarkMode ? 'Dark Theme' : 'Light Theme'}
            </span>

            <label className="theme-switch">
              <input
                type="checkbox"
                checked={isDarkMode}
                onChange={toggleTheme}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <label htmlFor="userInput">Enter your ticket:</label>
          <textarea
            id="userInput"
            value={userInput} // Bind textarea value to state
            onChange={(e) => setUserInput(e.target.value)} // Update state when user types
            placeholder="Type or paste something here..."
            rows="10"
            cols="50"
            maxLength="32768" // Set the maxLength to 32,768 characters
          />
          <button
            type="button"
            className="submit-btn"
            onClick={run}
            disabled={isLoading || !userInput.trim()} // Disable button if input is empty or while loading
          >
            {isLoading ? 'Generating...' : 'Submit'}
          </button>

          <h2>AI Solution:</h2>
          {isLoading ? (
            <div className="loading-spinner"></div> // Show loading spinner
          ) : (
            <div
              style={{ whiteSpace: 'pre-wrap' }}
              dangerouslySetInnerHTML={{ __html: formatResponse(response) }} // Render formatted HTML response
            />
          )}
        </div>
      </div>
    </section>
  );
}

