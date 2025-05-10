import { useState, useEffect } from 'react';
import './customer.css';

const DEFAULT_PROFILE_PIC = 'https://via.placeholder.com/150'; // Can be removed if not used elsewhere

export default function CustomerProfile() {
  const [customer, setCustomer] = useState(null);

  useEffect(() => {
    const storedCustomer = sessionStorage.getItem('customer');
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    } else {
      console.warn('Customer data not found in sessionStorage.');
    }
  }, []);

  if (!customer) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading customer profile...</p>
      </div>
    );
  }

  const {
    name,
    gender,
    dob,
    email,
    username,
    mobileno,
    location,
  } = customer;

  return (
    <div className="profile-container">
      <h2 className="profile-title">Customer Profile</h2>
      <div className="profile-card">
        <ProfileInfo label="Name" value={name} />
        <ProfileInfo label="Gender" value={gender} />
        <ProfileInfo label="Date of Birth" value={dob} />
        <ProfileInfo label="Email" value={email} />
        <ProfileInfo label="Username" value={username} />
        <ProfileInfo label="Mobile No" value={mobileno} />
        <ProfileInfo label="Company" value={location} />
      </div>
    </div>
  );
}

function ProfileInfo({ label, value }) {
  return (
    <p className="profile-info">
      <strong className="profile-label">{label}:</strong> {value}
    </p>
  );
}
