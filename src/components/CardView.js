import React, { useState, useEffect } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { decodeVisitorData } from '../utils/dataEncoder';
import VisitingCard from './VisitingCard';
import './CardView.css';

const CardView = () => {
  const [searchParams] = useSearchParams();
  const [visitorData, setVisitorData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const dataParam = searchParams.get('data');
    
    if (!dataParam) {
      setError('No data provided in URL');
      setLoading(false);
      return;
    }

    try {
      const decodedData = decodeVisitorData(dataParam);
      
      if (!decodedData) {
        setError('Invalid or corrupted data');
        setLoading(false);
        return;
      }

      setVisitorData(decodedData);
      setLoading(false);
    } catch (err) {
      console.error('Error decoding visitor data:', err);
      setError('Failed to decode visitor data');
      setLoading(false);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="card-view-container">
        <div className="loading-state">
          <div className="spinner"></div>
          <p>Loading visiting card...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="card-view-container">
        <div className="error-state">
          <h2>Error</h2>
          <p>{error}</p>
          <Link to="/" className="home-link">Go to Home</Link>
        </div>
      </div>
    );
  }

  if (!visitorData) {
    return (
      <div className="card-view-container">
        <div className="error-state">
          <h2>No Data Found</h2>
          <p>Unable to load visitor information.</p>
          <Link to="/" className="home-link">Go to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="card-view-container">
      <div className="card-view-content">
        <VisitingCard visitorData={visitorData} />
      </div>
    </div>
  );
};

export default CardView;

