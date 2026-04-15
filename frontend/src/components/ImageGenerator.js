import React, { useState } from 'react';
import api from '../utils/api';
import './components.css';

function ImageGenerator() {
  const [prompt, setPrompt] = useState('');
  const [generatedImage, setGeneratedImage] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [variations, setVariations] = useState([]);
  const [generatingVariations, setGeneratingVariations] = useState(false);
  const [selectedStyle, setSelectedStyle] = useState('');

  const styles = ['Oil Painting', 'Watercolor', 'Digital Art', 'Photography', 'Sculpture', 'Cartoon'];

  const handleGenerate = async () => {
    if (!prompt.trim()) {
      setError('Please enter a prompt');
      return;
    }

    setLoading(true);
    setError('');
    setGeneratedImage('');

    try {
      const response = await api.post('/api/image/generate', {
        prompt: prompt,
      });
      setGeneratedImage(response.data.imageUrl);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate image');
    } finally {
      setLoading(false);
    }
  };

  const handleGenerateVariations = async () => {
    if (!generatedImage) {
      return;
    }

    setGeneratingVariations(true);
    setError('');

    try {
      const response = await api.post('/api/image/variations', {
        prompt: prompt,
        style: selectedStyle,
      });
      setVariations([...variations, response.data]);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to generate variations');
    } finally {
      setGeneratingVariations(false);
    }
  };

  const handleReset = () => {
    setPrompt('');
    setGeneratedImage('');
    setVariations([]);
    setError('');
    setSelectedStyle('');
  };

  return (
    <div className="component-container">
      <div className="workflow-step">
        <h2>🎨 Image Generation from Text</h2>
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Enter your image prompt... e.g., 'A futuristic city with flying cars at sunset'"
          className="text-input"
          rows="4"
        />
        <div className="button-group">
          <button
            onClick={handleGenerate}
            disabled={loading || !prompt.trim()}
            className="btn btn-primary"
          >
            {loading ? 'Generating...' : '🎨 Generate Image'}
          </button>
          {prompt && <button onClick={() => setPrompt('')} className="btn btn-secondary">Clear</button>}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {generatedImage && (
        <div className="workflow-step">
          <h2>Generated Image</h2>
          <div className="image-container">
            <img src={generatedImage} alt="Generated" className="generated-image" />
          </div>

          <div className="workflow-step">
            <h3>Generate Variations</h3>
            <div className="style-selector">
              <label>Select Art Style:</label>
              <select
                value={selectedStyle}
                onChange={(e) => setSelectedStyle(e.target.value)}
                className="select-input"
              >
                <option value="">Default</option>
                {styles.map((style) => (
                  <option key={style} value={style}>
                    {style}
                  </option>
                ))}
              </select>
            </div>
            <button
              onClick={handleGenerateVariations}
              disabled={generatingVariations}
              className="btn btn-primary"
            >
              {generatingVariations ? 'Generating...' : '🔄 Generate Variation'}
            </button>
          </div>

          <button onClick={handleReset} className="btn btn-secondary">
            Try New Prompt
          </button>
        </div>
      )}

      {variations.length > 0 && (
        <div className="workflow-step">
          <h2>Generated Variations</h2>
          <div className="variations-grid">
            {variations.map((variation, index) => (
              <div key={index} className="variation-item">
                <img
                  src={variation.imageBase64}
                  alt={`Variation ${index + 1}`}
                  className="variation-image"
                />
                <p className="variation-style">{variation.style}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default ImageGenerator;
