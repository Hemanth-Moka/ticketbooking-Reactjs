import React, { useState, useEffect } from 'react';

// Sample data to simulate ticket bookings (can be replaced by real data from an API)
const sampleBookings = [
  { id: 1, customer: 'John Doe', event: 'Concert A', date: '2025-05-01', status: 'Booked' },
  { id: 2, customer: 'Jane Smith', event: 'Movie B', date: '2025-05-03', status: 'Booked' },
  { id: 3, customer: 'Alice Brown', event: 'Concert C', date: '2025-05-05', status: 'Pending' },
];

export default function ManagerHome() {
  const [bookings, setBookings] = useState([]);
  const [events, setEvents] = useState([]);
  
  // Fetch bookings and events (you can replace this with an API call)
  useEffect(() => {
    setBookings(sampleBookings);
    // Replace with real event data fetching
    setEvents(['Concert A', 'Movie B', 'Concert C']);
  }, []);

  const handleBookingStatusChange = (id, status) => {
    setBookings(prevBookings => 
      prevBookings.map(booking => 
        booking.id === id ? { ...booking, status } : booking
      )
    );
  };

  return (
    <div className="manager-home p-4">
      <h1 className="text-2xl font-bold mb-4">Manager Dashboard</h1>

      <div className="my-6">
        <h2 className="text-xl font-semibold">Manage Bookings</h2>
        <table className="min-w-full border-collapse border border-gray-300 mt-4">
          <thead>
            <tr>
              <th className="border border-gray-300 p-2">Booking ID</th>
              <th className="border border-gray-300 p-2">Customer</th>
              <th className="border border-gray-300 p-2">Event</th>
              <th className="border border-gray-300 p-2">Date</th>
              <th className="border border-gray-300 p-2">Status</th>
              <th className="border border-gray-300 p-2">Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map(booking => (
              <tr key={booking.id}>
                <td className="border border-gray-300 p-2">{booking.id}</td>
                <td className="border border-gray-300 p-2">{booking.customer}</td>
                <td className="border border-gray-300 p-2">{booking.event}</td>
                <td className="border border-gray-300 p-2">{booking.date}</td>
                <td className="border border-gray-300 p-2">{booking.status}</td>
                <td className="border border-gray-300 p-2">
                  <button 
                    className="bg-green-500 text-white px-2 py-1 rounded" 
                    onClick={() => handleBookingStatusChange(booking.id, 'Confirmed')}>
                    Confirm
                  </button>
                  <button 
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2" 
                    onClick={() => handleBookingStatusChange(booking.id, 'Cancelled')}>
                    Cancel
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="my-6">
        <h2 className="text-xl font-semibold">Manage Events</h2>
        <ul className="list-disc pl-6">
          {events.map((event, index) => (
            <li key={index} className="my-2">{event}</li>
          ))}
        </ul>
        <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded">
          Add New Event
        </button>
      </div>

      <div className="my-6">
        <h2 className="text-xl font-semibold">Add New Ticket</h2>
        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700">Event Name</label>
            <input type="text" className="mt-1 block w-full p-2 border border-gray-300 rounded" />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">Ticket Price</label>
            <input type="number" className="mt-1 block w-full p-2 border border-gray-300 rounded" />
          </div>
          <button type="submit" className="mt-4 bg-green-500 text-white px-4 py-2 rounded">
            Add Ticket
          </button>
        </form>
      </div>
    </div>
  );
}
