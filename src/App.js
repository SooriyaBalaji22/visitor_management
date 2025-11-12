import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import VisitorForm from './components/VisitorForm';
import PreviewCard from './components/PreviewCard';
import VisitingCard from './components/VisitingCard';
import CardView from './components/CardView';
import './App.css';

function MainApp() {
  const [visitorData, setVisitorData] = useState(null);
  const [activeTab, setActiveTab] = useState('form');

  const handleFormSubmit = (data) => {
    setVisitorData(data);
    setActiveTab('preview');
  };

  return (
    <div className="App">
      <header className="app-header">
        <h1>Visitor Management System</h1>
        <p>Create and download digital business cards</p>
      </header>

      <div className="app-container">
        {activeTab === 'form' && (
          <VisitorForm onFormSubmit={handleFormSubmit} />
        )}

        {visitorData && (
          <div className="tabs-container">
            <div className="tabs">
              <button
                className={`tab ${activeTab === 'preview' ? 'active' : ''}`}
                onClick={() => setActiveTab('preview')}
              >
                Preview Card
              </button>
              <button
                className={`tab ${activeTab === 'visiting' ? 'active' : ''}`}
                onClick={() => setActiveTab('visiting')}
              >
                Visiting Card
              </button>
              <button
                className={`tab ${activeTab === 'form' ? 'active' : ''}`}
                onClick={() => setActiveTab('form')}
              >
                Edit Form
              </button>
            </div>

            <div className="tab-content">
              {activeTab === 'preview' && <PreviewCard visitorData={visitorData} />}
              {activeTab === 'visiting' && <VisitingCard visitorData={visitorData} />}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainApp />} />
        <Route path="/card" element={<CardView />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

