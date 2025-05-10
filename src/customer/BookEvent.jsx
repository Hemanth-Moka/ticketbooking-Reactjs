import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import config from '../config';
import './customer.css';

export default function BookEvent() {
  const location = useLocation();
  const navigate = useNavigate();

  const queryParams = new URLSearchParams(location.search);
  const eventId = queryParams.get('eventid');

  const [customer, setCustomer] = useState(null);
  const [formData, setFormData] = useState({
    startdate: '',
    enddate: '',
    bookedcapacity: 1
  });

  useEffect(() => {
    const storedCustomer = sessionStorage.getItem("customer");
    if (storedCustomer) {
      setCustomer(JSON.parse(storedCustomer));
    } else {
      alert("Customer not logged in!");
      navigate('/customerlogin');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({...formData, [name]: value});
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const bookingData = {
      event: { id: eventId },
      customer: { id: customer.id },
      ...formData,
      status: 1
    };

    try {
      const response = await fetch(`${config.url}/customer/bookevent`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      if (response.ok) {
        alert("Event booked successfully!");
        navigate('/bookedevents');
      } else {
        alert("Failed to book event.");
      }
    } catch (error) {
      console.error("Booking error:", error);
      alert("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="unique-booking-container">
      <h3 className="unique-booking-title">Book Event</h3>
      <form onSubmit={handleSubmit} className="unique-booking-form">
        <div className="unique-form-group">
          <label>Start Date: </label>
          <input
            type="date"
            name="startdate"
            value={formData.startdate}
            onChange={handleChange}
            className="unique-booking-input"
            required
          />
        </div>
        <div className="unique-form-group">
          <label>End Date: </label>
          <input
            type="date"
            name="enddate"
            value={formData.enddate}
            onChange={handleChange}
            className="unique-booking-input"
            required
          />
        </div>
        <div className="unique-form-group">
          <label>Capacity: </label>
          <input
            type="number"
            name="bookedcapacity"
            min="1"
            value={formData.bookedcapacity}
            onChange={handleChange}
            className="unique-booking-input"
            required
          />
        </div>
<div className="unique-submit-container">
  <a href="https://payments-test.cashfree.com/links?code=U8hj8m139t9g" target="_blank" rel="noopener noreferrer">
    <button type="button" className="unique-booking-submit-btn">Confirm Booking</button>
  </a>
</div>

      </form>
    </div>
  );
}
