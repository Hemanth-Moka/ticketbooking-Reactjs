import { useState } from 'react';
import axios from 'axios';
import config from '../config';
import './Styles/AddManager.css'; // Assuming you have a CSS file for styling

export default function AddManager() {
  const [formData, setFormData] = useState({
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    company_name: '',
    company_location: ''
  });

  // message state variable
  const [message, setMessage] = useState('');
  // error state variable
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${config.url}/admin/addeventmanager`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setFormData({
          name: '',
          gender: '',
          dob: '',
          email: '',
          username: '',
          password: '',
          mobileno: '',
          company_name: '',
          company_location: ''
        });
      }
    } catch (error) {
      if (error.response) {
        setMessage('');
        setError(error.response.data);
      } else {
        setMessage('');
        setError('An unexpected error occurred.');
      }
    }
  };

  return (
    <div className="unique-manager-form-container">
      <h3 className="unique-manager-form-title">Add Event Manager</h3>
      {
        message ?
          <p className="unique-success-message">{message}</p> :
          <p className="unique-error-message">{error}</p>
      }
      <form onSubmit={handleSubmit} className="unique-manager-form">
        <div className="unique-form-group">
          <label className="unique-form-label">Full Name</label>
          <input
            type="text"
            id="name"
            value={formData.name}
            onChange={handleChange}
            className="unique-form-input"
            required
          />
        </div>
        <div className="unique-form-group">
          <label className="unique-form-label">Gender</label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            className="unique-form-input"
            required
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>
        <div className="unique-form-group">
          <label className="unique-form-label">Date of Birth</label>
          <input
            type="date"
            id="dob"
            value={formData.dob}
            onChange={handleChange}
            className="unique-form-input"
            required
          />
        </div>
        <div className="unique-form-group">
          <label className="unique-form-label">Email</label>
          <input
            type="email"
            id="email"
            value={formData.email}
            onChange={handleChange}
            className="unique-form-input"
            required
          />
        </div>
        <div className="unique-form-group">
          <label className="unique-form-label">Username</label>
          <input
            type="text"
            id="username"
            value={formData.username}
            onChange={handleChange}
            className="unique-form-input"
            required
          />
        </div>
        <div className="unique-form-group">
          <label className="unique-form-label">Password</label>
          <input
            type="password"
            id="password"
            value={formData.password}
            onChange={handleChange}
            className="unique-form-input"
            required
          />
        </div>
        <div className="unique-form-group">
          <label className="unique-form-label">Mobile No</label>
          <input
            type="number"
            id="mobileno"
            value={formData.mobileno}
            onChange={handleChange}
            className="unique-form-input"
            required
          />
        </div>
        <div className="unique-form-group">
          <label className="unique-form-label">Company Name</label>
          <input
            type="text"
            id="company_name"
            value={formData.company_name}
            onChange={handleChange}
            className="unique-form-input"
            required
          />
        </div>
        <div className="unique-form-group">
          <label className="unique-form-label">Company Location</label>
          <input
            type="text"
            id="company_location"
            value={formData.company_location}
            onChange={handleChange}
            className="unique-form-input"
            required
          />
        </div>
        <button type="submit" className="unique-submit-btn">Add</button>
      </form>
    </div>
  );
}
