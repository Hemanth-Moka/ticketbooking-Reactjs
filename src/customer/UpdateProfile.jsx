import { useState, useEffect } from 'react';
import axios from 'axios';
import config from '../config';
import './customer.css';

export default function UpdateProfile() {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    gender: '',
    dob: '',
    email: '',
    username: '',
    password: '',
    mobileno: '',
    location: ''
  });

  const [message, setMessage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const storedCustomer = sessionStorage.getItem('customer');
    if (storedCustomer) {
      setFormData(JSON.parse(storedCustomer));
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.put(`${config.url}/customer/updateprofile`, formData);
      if (response.status === 200) {
        setMessage(response.data);
        setError('');
        sessionStorage.setItem('customer', JSON.stringify(formData));
      }
    } catch (error) {
      setMessage('');
      setError(error.response ? error.response.data : "An unexpected error occurred.");
    }
  };

  return (
    <div className="update-container">
      <h3 className="form-title">Update Profile</h3>

      {message && <p className="form-message success">{message}</p>}
      {error && <p className="form-message error">{error}</p>}

      <form onSubmit={handleSubmit} className="update-form">
        {[
          { label: 'Full Name', id: 'name', type: 'text' },
          { label: 'Date of Birth', id: 'dob', type: 'date' },
          { label: 'Email', id: 'email', type: 'email' },
          { label: 'Username', id: 'username', type: 'text', disabled: true },
          { label: 'Password', id: 'password', type: 'password' },
          { label: 'Mobile No', id: 'mobileno', type: 'tel' },
          { label: 'Location', id: 'location', type: 'text' }
        ].map(({ label, id, type, disabled }) => (
          <div className="form-group" key={id}>
            <label htmlFor={id}>{label}</label>
            <input
              type={type}
              id={id}
              value={formData[id]}
              onChange={handleChange}
              disabled={disabled}
              required={!disabled}
            />
          </div>
        ))}

        <div className="form-group">
          <label htmlFor="gender">Gender</label>
          <select
            id="gender"
            value={formData.gender}
            onChange={handleChange}
            disabled
          >
            <option value="">Select Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div className="form-group text-center">
          <button type="submit" className="btn-submit">Update</button>
        </div>
      </form>
    </div>
  );
}
