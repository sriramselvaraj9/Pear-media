import React, { useState } from 'react';
import axios from 'axios';
import './components.css';

function TextEnhancer() {
  const [inputText, setInputText] = useState('');
  const [enhancedText, setEnhancedText] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [approved, setApproved] = useState(false);
  const [generatedImage, setGeneratedImage] = useState('');
  const [generatingImage, setGeneratingImage] = useState(false);

  const handleEnhance = async () => {
    if (!inputText.trim()) {
      setError('Please enter some text');
      return;
    }

    setLoading(true);
    setError('');
    setEnhancedText('');
    setApproved(false);

    try {
      const response = await axios.post('/api/text/enhance', {
        text: inputText,
      });
      setEnhancedText(response.data.enhanced);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to enhance text');
    } finally {
      setLoading(false);
    }
  };

  const handleApprove = async () => {
    if (!enhancedText.trim()) {
      return;
    }

    setApproved(true);
    setGeneratingImage(true);

    try {
      const response = await axios.post('/api/image/generate', {
        prompt: enhancedText,
      });
      setGeneratedImage(response.data.imageUrl);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate image');
    } finally {
      setGeneratingImage(false);
    }
  };

  const handleReset = () => {
    setInputText('');
    setEnhancedText('');
    setGeneratedImage('');
    setApproved(false);
    setError('');
  };

  return (
    <div className="component-container">
      <div className="workflow-step">
        <h2>Step 1: Enter Your Text Prompt</h2>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter your text prompt here... e.g., 'A sunset over mountains'"
          className="text-input"
          rows="4"
          disabled={approved}
        />
        <div className="button-group">
          <button
            onClick={handleEnhance}
            disabled={loading || !inputText.trim()}
            className="btn btn-primary"
          >
            {loading ? 'Enhancing...' : '✨ Enhance Text'}
          </button>
          {inputText && <button onClick={() => setInputText('')} className="btn btn-secondary">Clear</button>}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {enhancedText && (
        <div className="workflow-step">
          <h2>Step 2: Review Enhanced Prompt</h2>
          <div className="comparison">
            <div className="comparison-item">
              <h3>Original</h3>
              <p className="original-text">{inputText}</p>
            </div>
            <div className="comparison-item">
              <h3>Enhanced</h3>
              <p className="enhanced-text">{enhancedText}</p>
            </div>
          </div>
          <div className="button-group">
            <button
              onClick={handleApprove}
              disabled={generatingImage}
              className="btn btn-primary"
            >
              {generatingImage ? 'Generating Image...' : '👍 Approve & Generate Image'}
            </button>
            <button
              onClick={handleReset}
              className="btn btn-secondary"
            >
              Start Over
            </button>
          </div>
        </div>
      )}

      {generatedImage && (
        <div className="workflow-step">
          <h2>Step 3: Generated Image</h2>
          <div className="image-container">
            <img src={generatedImage} alt="Generated" className="generated-image" />
          </div>
          <p className="image-prompt">Used prompt: {enhancedText}</p>
          <button onClick={handleReset} className="btn btn-primary">
            Try Another Prompt
          </button>
        </div>
      )}
    </div>
  );
}

export default TextEnhancer;
