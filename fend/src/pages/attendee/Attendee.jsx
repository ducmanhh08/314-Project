import React, { useState } from 'react';
import styles from './Attendee.module.css';
import NavbarUser from '../../components/Navbar/NavbarUser';

const attendees = [
  { id: '982543', name: 'John Doe', email: 'john@example.com', phone: '1234567890', date: 'March 15, 2025', ticket: 'General', status: 'Paid' },
  { id: '991235', name: 'Jane Smith', email: 'jane@example.com', phone: '0987654321', date: 'March 15, 2025', ticket: 'VIP', status: 'Pending' },
  { id: '991412', name: 'Alice Cooper', email: 'alice@example.com', phone: '3216549870', date: 'March 15, 2025', ticket: 'General', status: 'Paid' },
  { id: '998546', name: 'Robert King', email: 'robert@example.com', phone: '4561237890', date: 'March 15, 2025', ticket: 'General', status: 'Pending' },
  { id: '011002', name: 'Kaite Beo', email: 'katie@example.com', phone: '7890123456', date: 'March 15, 2025', ticket: 'VIP', status: 'Paid' },
  { id: '991245', name: 'Liam N.', email: 'liam@example.com', phone: '4567891230', date: 'March 15, 2025', ticket: 'General', status: 'Paid' },
  { id: '991874', name: 'Emma B.', email: 'emma@example.com', phone: '8901234567', date: 'March 15, 2025', ticket: 'General', status: 'Pending' },
  { id: '991675', name: 'Noah W.', email: 'noah@example.com', phone: '3214560987', date: 'March 15, 2025', ticket: 'General', status: 'Paid' },
  { id: '991442', name: 'Ava M.', email: 'ava@example.com', phone: '1237894560', date: 'March 15, 2025', ticket: 'General', status: 'Paid' },
  { id: '991411', name: 'Ethan J.', email: 'ethan@example.com', phone: '2348901234', date: 'March 15, 2025', ticket: 'VIP', status: 'Pending' },
  { id: '991244', name: 'Olivia C.', email: 'olivia@example.com', phone: '4560127893', date: 'March 15, 2025', ticket: 'General', status: 'Paid' },
  { id: '991473', name: 'Isla R.', email: 'isla@example.com', phone: '6789012345', date: 'March 15, 2025', ticket: 'General', status: 'Pending' },
];

const Attendee = () => {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredAttendees = attendees.filter((attendee) =>
    attendee.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    attendee.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // <div className="container">
    //   <NavbarUser />  
    //   <h1>REGISTERED ATTENDEES</h1>
    //   <div className="event-info">
    //     <p><strong>Event Name:</strong> Annual Tech Conference 2025</p>
    //     <p><strong>Date:</strong> 20 November 2025</p>
    //     <p><strong>Location:</strong> Sydney Convention Center</p>
    //   </div>

    //   <h2>Search Attendees</h2>
    //   <div className="search-bar">
    //     <input
    //       type="text"
    //       placeholder="🔍 Search by Name or Email"
    //       value={searchTerm}
    //       onChange={(e) => setSearchTerm(e.target.value)}
    //     />
    //   </div>

    //   <div className="table-container">
    //     <table>
    //       <thead>
    //         <tr>
    //           <th>ID</th>
    //           <th>Name</th>
    //           <th>Email</th>
    //           <th>Phone Number</th>
    //           <th>Registration Date</th>
    //           <th>Ticket Type</th>
    //           <th>Payment Status</th>
    //         </tr>
    //       </thead>
    //       <tbody>
    //         {filteredAttendees.length > 0 ? (
    //           filteredAttendees.map((a, index) => (
    //             <tr key={index}>
    //               <td>{a.id}</td>
    //               <td>{a.name}</td>
    //               <td>{a.email}</td>
    //               <td>{a.phone}</td>
    //               <td>{a.date}</td>
    //               <td>{a.ticket}</td>
    //               <td className={a.status.toLowerCase()}>{a.status}</td>
    //             </tr>
    //           ))
    //         ) : (
    //           <tr>
    //             <td colSpan="7" style={{ textAlign: 'center' }}>No matching attendees found.</td>
    //           </tr>
    //         )}
    //       </tbody>
    //     </table>
    //   </div>

    //   <div className="total">
    //     <strong>Total Attendees:</strong> {filteredAttendees.length}
    //   </div>
    // </div>
    <div className={styles.container}>
      <NavbarUser />
      <h1>Event Attendees</h1>

      <div className={styles['event-info']}>
        <p><strong>Event Name:</strong> Annual Tech Conference 2025</p>
        <p><strong>Date:</strong> May 10-12, 2025</p>
        <p><strong>Location:</strong> Convention Center, Cityville</p>
      </div>

      <div className={styles['search-bar']}> 
        <input
          type="text"
          placeholder="🔍 Search by Name or Email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className={styles['table-container']}>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Phone Number</th>
              <th>Registration Date</th>
              <th>Ticket Type</th>
              <th>Payment Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredAttendees.length > 0 ? (
              filteredAttendees.map((a, index) => (
                <tr key={index}>
                  <td>{a.id}</td>
                  <td>{a.name}</td>
                  <td>{a.email}</td>
                  <td>{a.phone}</td>
                  <td>{a.date}</td>
                  <td>{a.ticket}</td>
                  <td className={styles[a.status.toLowerCase()]}>{a.status}</td>
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

      <div className={styles.total}>
        <strong>Total Attendees:</strong> {filteredAttendees.length}
      </div>
    </div>
  );
};

export default Attendee;