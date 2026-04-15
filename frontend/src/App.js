import React, { useState } from 'react';
import './App.css';
import TextEnhancer from './components/TextEnhancer';
import ImageGenerator from './components/ImageGenerator';
import ImageAnalyzer from './components/ImageAnalyzer';

function App() {
  const [activeTab, setActiveTab] = useState('text');

  return (
    <div className="App">
      <header className="header">
        <div className="container">
          <h1>🍐 Pear Media</h1>
          <p className="subtitle">AI-Powered Text Enhancement & Image Generation</p>
        </div>
      </header>

      <main className="main-content">
        <div className="container">
          <div className="tabs">
            <button
              className={`tab-button ${activeTab === 'text' ? 'active' : ''}`}
              onClick={() => setActiveTab('text')}
            >
              📝 Text Enhancement
            </button>
            <button
              className={`tab-button ${activeTab === 'image' ? 'active' : ''}`}
              onClick={() => setActiveTab('image')}
            >
              🎨 Image Generation
            </button>
            <button
              className={`tab-button ${activeTab === 'analyze' ? 'active' : ''}`}
              onClick={() => setActiveTab('analyze')}
            >
              🔍 Image Analysis
            </button>
          </div>

          <div className="tab-content">
            {activeTab === 'text' && <TextEnhancer />}
            {activeTab === 'image' && <ImageGenerator />}
            {activeTab === 'analyze' && <ImageAnalyzer />}
          </div>
        </div>
      </main>

      <footer className="footer">
        <p>&copy; 2026 Pear Media Assignment. Powered by OpenAI, DALL-E, and Hugging Face.</p>
      </footer>
    </div>
  );
}

export default App;
