import React, { useState } from 'react';
import api from '../utils/api';
import './components.css';

function ImageAnalyzer() {
  const [imageUrl, setImageUrl] = useState('');
  const [analysis, setAnalysis] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [uploadedImage, setUploadedImage] = useState('');

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      setUploadedImage(event.target.result);
      setImageUrl(event.target.result);
    };
    reader.readAsDataURL(file);
  };

  const handleAnalyze = async () => {
    if (!imageUrl.trim()) {
      setError('Please provide an image URL or upload an image');
      return;
    }

    setLoading(true);
    setError('');
    setAnalysis('');

    try {
      const response = await api.post('/api/image/analyze', {
        imageUrl: imageUrl,
      });
      setAnalysis(response.data.analysis);
    } catch (err) {
      setError(err.response?.data?.error || 'Failed to analyze image');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setImageUrl('');
    setAnalysis('');
    setUploadedImage('');
    setError('');
  };

  return (
    <div className="component-container">
      <div className="workflow-step">
        <h2>🔍 Image Analysis & Variations</h2>
        <p className="info-text">Upload an image or provide a URL for analysis</p>

        <div className="upload-section">
          <div className="upload-box">
            <label className="upload-label">
              📤 Upload Image
              <input
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="file-input"
              />
            </label>
          </div>

          <div className="url-section">
            <label>Or enter Image URL:</label>
            <input
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
              className="text-input"
            />
          </div>
        </div>

        {uploadedImage && (
          <div className="image-preview">
            <img src={uploadedImage} alt="Preview" className="preview-image" />
          </div>
        )}

        <div className="button-group">
          <button
            onClick={handleAnalyze}
            disabled={loading || !imageUrl.trim()}
            className="btn btn-primary"
          >
            {loading ? 'Analyzing...' : '🔍 Analyze Image'}
          </button>
          {imageUrl && <button onClick={() => setImageUrl('')} className="btn btn-secondary">Clear</button>}
        </div>
      </div>

      {error && <div className="error-message">{error}</div>}

      {analysis && (
        <div className="workflow-step">
          <h2>Analysis Results</h2>
          <div className="analysis-result">
            <h3>AI Analysis:</h3>
            <p className="analysis-text">{analysis}</p>
          </div>

          <button onClick={handleReset} className="btn btn-primary">
            Analyze Another Image
          </button>
        </div>
      )}
    </div>
  );
}

export default ImageAnalyzer;
