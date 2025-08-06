import React, { useState } from 'react';
import axios from 'axios';

const API_URL = 'http://localhost:5000';

const VulgarTest = () => {
  const [text, setText] = useState('');
  const [warning, setWarning] = useState('');
  const [success, setSuccess] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleTextChange = (e) => {
    setText(e.target.value);
    setWarning('');
    setSuccess('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setWarning('');
    setSuccess('');
    setIsLoading(true);

    if (!text.trim()) {
      setWarning('⚠️ Text is required.');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_URL}/api/Content`, { text });

      if (response.data && response.data.success) {
        setSuccess('✅ Text submitted successfully! No inappropriate content detected.');
        setText('');
      } else {
        setWarning('❌ Unexpected response from server.');
      }
    } catch (err) {
      if (err.response?.data?.error) {
        setWarning(`❌ ${err.response.data.error}`);
      } else {
        setWarning('❌ Submission failed. Try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto p-4 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Profanity Detection</h2>
      <div className="mb-4">
        <label htmlFor="text" className="block text-sm font-medium text-gray-700 mb-2">
          Description
        </label>
        <textarea
          id="text"
          rows="5"
          placeholder="Enter text to check for inappropriate content..."
          value={text}
          onChange={handleTextChange}
          className={`w-full p-3 border rounded-md focus:ring-2 focus:ring-blue-500 focus:outline-none ${
            warning ? 'border-red-500' : 'border-gray-300'
          }`}
          aria-invalid={!!warning}
          aria-describedby={warning ? 'warning-message' : undefined}
        />
      </div>
      {warning && (
        <p id="warning-message" className="text-red-600 mt-2" role="alert">
          {warning}
        </p>
      )}
      {success && (
        <p className="text-green-600 mt-2" role="status">
          {success}
        </p>
      )}
      <button
        type="submit"
        disabled={isLoading}
        className={`w-full py-2 px-4 rounded-md text-white font-medium ${
          isLoading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2'
        }`}
      >
        {isLoading ? 'Submitting...' : 'Check Text'}
      </button>
    </form>
  );
};

export default VulgarTest;