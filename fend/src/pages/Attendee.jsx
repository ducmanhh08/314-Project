import React, { useState } from 'react';
import './Attendee.css';
import NavbarUser from '../components/Navbar/NavbarUser';

const initialAttendees = [
  { id: '982543', name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '991235', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', date: 'March 15, 2025', ticket: 'VIP', status: 'Pending' },
  { id: '991412', name: 'Alice Cooper', email: 'alice@example.com', phone: '3216549870', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '998546', name: 'Robert King', email: 'robert@example.com', phone: '4561237890', date: 'March 15, 2025', ticket: 'General', status: 'Pending' },
  { id: '011002', name: 'Kaite Beo', email: 'katie@example.com', phone: '7890123456', date: 'March 15, 2025', ticket: 'VIP', status: 'Approve' },
  { id: '991245', name: 'Liam N.', email: 'liam@example.com', phone: '4567891230', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '991874', name: 'Emma B.', email: 'emma@example.com', phone: '8901234567', date: 'March 15, 2025', ticket: 'General', status: 'Pending' },
  { id: '991675', name: 'Noah W.', email: 'noah@example.com', phone: '3214560987', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '991442', name: 'Ava M.', email: 'ava@example.com', phone: '1237894560', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '991411', name: 'Ethan J.', email: 'ethan@example.com', phone: '2348901234', date: 'March 15, 2025', ticket: 'VIP', status: 'Pending' },
  { id: '991244', name: 'Olivia C.', email: 'olivia@example.com', phone: '4560127893', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '991473', name: 'Isla R.', email: 'isla@example.com', phone: '6789012345', date: 'March 15, 2025', ticket: 'General', status: 'Pending' },
];

const Attendee = () => {
  const [attendeeList, setAttendeeList] = useState(initialAttendees);
  const [searchTerm, setSearchTerm] = useState('');

  const handleStatusChange = (id, newStatus) => {
    const attendee = attendeeList.find((a) => a.id === id);

    if (attendee.status === 'Pending') {
      const confirmed = window.confirm(`Are you sure you want to change the status to "${newStatus}"? This action cannot be undone.`);
      if (!confirmed) return;
    }

    const updatedList = attendeeList.map((a) =>
      a.id === id ? { ...a, status: newStatus } : a
    );
    setAttendeeList(updatedList);
  };

  const filteredAttendees = attendeeList.filter((attendee) =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="container">
      <NavbarUser />
      <button className="back-button">&larr; Back</button>
      <h1>REGISTERED ATTENDEES</h1>
      <div className="event-info">
        <p><strong>Event Name:</strong> Annual Tech Conference 2025</p>
        <p><strong>Date:</strong> 20 November 2025</p>
        <p><strong>Location:</strong> Sydney Convention Center</p>
      </div>
      <hr style={{ margin: "20px 0",marginLeft: "auto", marginRight: "auto" ,
             width: "95%", borderTop: "2px solid #272725" }} />
      <h2>Search Attendees</h2>
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Search by Name or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>
      <hr style={{ margin: "20px 0",marginLeft: "auto", marginRight: "auto" ,
             width: "95%", borderTop: "2px solid #272725" }} />
      <h3>Registered Participants</h3>  
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Registration Date</th>
              <th>Ticket Type</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendees.length > 0 ? (
              filteredAttendees.map((a) => (
                <tr key={a.id}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>{a.phone}</td>
                  <td>{a.date}</td>
                  <td>{a.ticket}</td>
                  <td className={a.status.toLowerCase()}>
                    {a.status === 'Pending' ? (
                      <select
                        value={a.status}
                        onChange={(e) => handleStatusChange(a.id, e.target.value)}
                      >
                        <option value="Pending">Pending</option>
                        <option value="Approve">Approve</option>
                        <option value="Reject">Reject</option>
                      </select>
                    ) : (
                      a.status
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="7" style={{ textAlign: 'center' }}>No matching attendees found.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <hr style={{ margin: "20px 0",marginLeft: "auto", marginRight: "auto" ,
             width: "95%", borderTop: "2px solid #272725" }} />      
      <div className="total">
        <strong>Total Attendees:</strong> {filteredAttendees.length}
      </div>
    </div>
  );
};

export default Attendee;
