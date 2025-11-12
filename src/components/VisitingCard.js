import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { encodeVisitorData } from '../utils/dataEncoder';
import KaynesLogo from '../assets/kaynes-logo.svg';
import './VisitingCard.css';

const VisitingCard = ({ visitorData }) => {
  const cardRef = useRef(null);

  const downloadCard = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: null,
      useCORS: true,
      logging: false
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', [85, 55]); // Business card size
    const imgWidth = 85;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, 'PNG', 0, 0, imgWidth, imgHeight);
    pdf.save(`${visitorData.employeeName || 'visitor'}-card.pdf`);
  };

  const downloadCardImage = async () => {
    const element = cardRef.current;
    const canvas = await html2canvas(element, {
      scale: 3,
      backgroundColor: null,
      useCORS: true,
      logging: false
    });
    
    const link = document.createElement('a');
    link.download = `${visitorData.employeeName || 'visitor'}-card.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!visitorData) return null;

  // Generate QR code URL with encoded visitor data
  const getQRCodeURL = () => {
    const encodedData = encodeVisitorData(visitorData);
    if (!encodedData) return '';
    const origin = window.location.origin;
    const url = `${origin}/card?data=${encodedData}`;
    
    // Log for debugging
    console.log('QR Code URL length:', url.length);
    console.log('QR Code URL:', url.substring(0, 100) + '...');
    
    return url;
  };

  const qrValue = getQRCodeURL();

  return (
    <div className="visiting-card-container">
      <div className="card-actions">
        <button onClick={downloadCard} className="download-btn">
          Download Card as PDF
        </button>
        <button onClick={downloadCardImage} className="download-btn">
          Download Card as Image
        </button>
      </div>
      
      <div className="card-wrapper">
        <div className="visiting-card" ref={cardRef}>
          <div className="card-geometric-pattern">
            <div className="geometric-shape shape-1"></div>
            <div className="geometric-shape shape-2"></div>
            <div className="geometric-shape shape-3"></div>
            <div className="geometric-shape shape-4"></div>
          </div>
          
          <div className="card-content">
            <div className="card-header">
              <div className="card-name-title">
                <h2 className="card-name">{visitorData.employeeName || 'YOURNAME'}</h2>
                <p className="card-title">{visitorData.title || 'CREATIVE DIRECTOR'}</p>
              </div>
              
              <div className="card-qr-container">
                {qrValue && (
                  <QRCodeSVG 
                    value={qrValue}
                    size={80}
                    level="M"
                    includeMargin={true}
                    bgColor="#1a5f3f"
                    fgColor="#FFFFFF"
                  />
                )}
              </div>
            </div>

            <div className="card-contact-info">
              {visitorData.address && (
                <div className="card-contact-item">
                  <span className="card-icon">📍</span>
                  <span className="card-text">{visitorData.address}</span>
                </div>
              )}
              
              {visitorData.phone1 && (
                <div className="card-contact-item">
                  <span className="card-icon">📞</span>
                  <span className="card-text">{visitorData.phone1}</span>
                </div>
              )}

              {visitorData.email && (
                <div className="card-contact-item">
                  <span className="card-icon">✉️</span>
                  <span className="card-text">{visitorData.email}</span>
                </div>
              )}
            </div>

            <div className="card-footer">
              <div className="card-footer-logo">
                <div className="hexagon-logo">
                  <div className="hexagon-stripe"></div>
                  <div className="hexagon-stripe"></div>
                  <div className="hexagon-stripe"></div>
                </div>
              </div>
              <div className="card-footer-text">
                <div className="footer-company-name">{visitorData.companyName || 'COMPANY NAME'}</div>
                <div className="footer-tagline">{visitorData.department || 'TAGLINE SPACE'}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VisitingCard;

