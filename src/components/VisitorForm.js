import React, { useState } from 'react';
import './VisitorForm.css';

const VisitorForm = ({ onFormSubmit }) => {
  const [formData, setFormData] = useState({
    companyName: '',
    employeeName: '',
    title: '',
    phone1: '',
    phone2: '',
    email: '',
    address: '',
    website: '',
    department: '',
    profileImage: null,
    profileImagePreview: null
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData(prev => ({
          ...prev,
          profileImage: file,
          profileImagePreview: reader.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onFormSubmit(formData);
  };

  return (
    <div className="visitor-form-container">
      <h2>Visitor Information Form</h2>
      <form onSubmit={handleSubmit} className="visitor-form">
        <div className="form-group">
          <label>Company Name *</label>
          <input
            type="text"
            name="companyName"
            value={formData.companyName}
            onChange={handleChange}
            required
            placeholder="e.g., Kaynes Technology"
          />
        </div>

        <div className="form-group">
          <label>Employee Name *</label>
          <input
            type="text"
            name="employeeName"
            value={formData.employeeName}
            onChange={handleChange}
            required
            placeholder="e.g., Dattukrishna M"
          />
        </div>

        <div className="form-group">
          <label>Title/Designation *</label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            required
            placeholder="e.g., Executive - MES Engineer"
          />
        </div>

        <div className="form-row">
          <div className="form-group">
            <label>Phone Number 1 *</label>
            <input
              type="tel"
              name="phone1"
              value={formData.phone1}
              onChange={handleChange}
              required
              placeholder="e.g., +91 22 6718 6718"
            />
          </div>

          <div className="form-group">
            <label>Phone Number 2</label>
            <input
              type="tel"
              name="phone2"
              value={formData.phone2}
              onChange={handleChange}
              placeholder="e.g., +91 98765 43210"
            />
          </div>
        </div>

        <div className="form-group">
          <label>Email Address *</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="e.g., m.dattukrishna@kaynestechnology.net"
          />
        </div>

        <div className="form-group">
          <label>Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            placeholder="e.g., www.kaynestechnology.co.in"
          />
        </div>

        <div className="form-group">
          <label>Department</label>
          <input
            type="text"
            name="department"
            value={formData.department}
            onChange={handleChange}
            placeholder="e.g., KT-01"
          />
        </div>

        <div className="form-group">
          <label>Address *</label>
          <textarea
            name="address"
            value={formData.address}
            onChange={handleChange}
            required
            rows="3"
            placeholder="e.g., 23-25 Belagola Food Industrial Estate Metagalli PO, Mysore 570016 Karnataka India"
          />
        </div>

        <div className="form-group">
          <label>Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageChange}
            className="file-input"
          />
          {formData.profileImagePreview && (
            <div className="image-preview">
              <img src={formData.profileImagePreview} alt="Preview" />
            </div>
          )}
        </div>

        <button type="submit" className="submit-btn">
          Generate Preview & Card
        </button>
      </form>
    </div>
  );
};

export default VisitorForm;

