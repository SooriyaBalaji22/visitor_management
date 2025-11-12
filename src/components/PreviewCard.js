import React, { useRef } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import html2canvas from 'html2canvas';
import jsPDF from 'jspdf';
import { encodeVisitorData } from '../utils/dataEncoder';
import KaynesLogo from '../assets/kaynes-logo.svg';
import './PreviewCard.css';

const PreviewCard = ({ visitorData }) => {
  const previewRef = useRef(null);

  const downloadPreview = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true
    });
    
    const imgData = canvas.toDataURL('image/png');
    const pdf = new jsPDF('p', 'mm', 'a4');
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;
    let position = 0;

    pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    pdf.save(`${visitorData.employeeName || 'visitor'}-preview.pdf`);
  };

  const downloadPreviewImage = async () => {
    const element = previewRef.current;
    const canvas = await html2canvas(element, {
      scale: 2,
      backgroundColor: '#ffffff',
      useCORS: true
    });
    
    const link = document.createElement('a');
    link.download = `${visitorData.employeeName || 'visitor'}-preview.png`;
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  if (!visitorData) return null;

  // Generate QR code URL with encoded visitor data
  const getQRCodeURL = () => {
    const encodedData = encodeVisitorData(visitorData);
    if (!encodedData) return '';
    const origin = window.location.origin;
    return `${origin}/card?data=${encodedData}`;
  };

  const qrValue = getQRCodeURL();

  return (
    <div className="preview-container">
      <div className="preview-actions">
        <button onClick={downloadPreview} className="download-btn">
          Download as PDF
        </button>
        <button onClick={downloadPreviewImage} className="download-btn">
          Download as Image
        </button>
      </div>
      
      <div className="preview-card" ref={previewRef}>
        <div className="preview-header">
          <div className="company-logo-section">
            <div className="logo-container">
              <img 
                src={KaynesLogo} 
                alt="Kaynes Technology Logo" 
                className="company-logo"
              />
            </div>
            <h1 className="company-name">{visitorData.companyName || 'Kaynes Technology'}</h1>
          </div>
        </div>

        <div className="preview-body">
          <div className="preview-left">
            {visitorData.profileImagePreview && (
              <div className="profile-image-container">
                <img 
                  src={visitorData.profileImagePreview} 
                  alt={visitorData.employeeName}
                  className="profile-image"
                />
              </div>
            )}
            <div className="qr-code-container">
              {qrValue && (
                <QRCodeSVG 
                  value={qrValue}
                  size={150}
                  level="M"
                  includeMargin={true}
                  bgColor="#FFFFFF"
                  fgColor="#000000"
                />
              )}
            </div>
          </div>

          <div className="preview-right">
            <div className="employee-info">
              <h2 className="employee-name">{visitorData.employeeName || 'Employee Name'}</h2>
              <p className="employee-title">{visitorData.title || 'Title'}</p>
            </div>

            <div className="contact-info">
              {visitorData.phone1 && (
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>{visitorData.phone1}</span>
                </div>
              )}
              
              {visitorData.phone2 && (
                <div className="contact-item">
                  <span className="contact-icon">📞</span>
                  <span>{visitorData.phone2}</span>
                </div>
              )}

              {visitorData.email && (
                <div className="contact-item">
                  <span className="contact-icon">✉️</span>
                  <span>{visitorData.email}</span>
                </div>
              )}

              {visitorData.website && (
                <div className="contact-item">
                  <span className="contact-icon">🌐</span>
                  <span>{visitorData.website}</span>
                </div>
              )}
            </div>

            {visitorData.department && (
              <div className="department-info">
                <p>{visitorData.companyName}, {visitorData.department}</p>
              </div>
            )}

            {visitorData.address && (
              <div className="address-info">
                <p>{visitorData.address}</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PreviewCard;

