import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import styles from "./FinanceReport.module.css";
import NavbarUser from '../../components/Navbar/NavbarUser';

const participantsData = [
  {
    id: "2025001",
    name: "John Doe",
    email: "john@example.com",
    phone: "+61 412 345 678",
    date: "March 15, 2025",
    type: "VIP",
    status: "Paid",
    amount: "$100",
    method: "Credit Card",
    txn: "TXN10001",
  },
  {
    id: "2025002",
    name: "Jane Smith",
    email: "jane@example.com",
    phone: "+61 400 111 222",
    date: "March 15, 2025",
    type: "General",
    status: "Pending",
    amount: "$50",
    method: "PayPal",
    txn: "TXN10002",
  },
  {
    id: "01102002",
    name: "Katie Beo",
    email: "beotron@example.com",
    phone: "+61 400 111 222",
    date: "March 15, 2025",
    type: "Vip",
    status: "Paid",
    amount: "$150",
    method: "PayPal",
    txn: "TXN10003",
  },
];

const FinanceReport = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    setLoading(true);
    const token = localStorage.getItem('token') || sessionStorage.getItem('token');
    fetch(`http://localhost:5000/event/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
      }
    })
      .then(res => res.json())
      .then(data => {
        setEvent(data);
        setLoading(false);
      })
      .catch(() => {
        setEvent(null);
        setLoading(false);
      });
  }, [id]);

  const filteredParticipants = participantsData.filter(
    (p) =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    // #region Code before CSS Module
    // <div className="page-wrapper">
    //   <NavbarUser />  
    //   <div className="card">
    //     <button className="back-button" onClick={() => navigate('/homepage')}>&larr; Back</button>
    //     <h1 className="main-title">FINANCE MANAGEMENT - PAYMENT DATA</h1>
    //     <div className="event-details">
    //       <p>Event Name: Annual Tech Conference 2025</p>
    //       <p>Date: 20 November 2025</p>
    //       <p>Location: Sydney Convention Center</p>
    //     </div>
    //     <hr style={{ margin: "20px 0",marginLeft: "auto", marginRight: "auto" ,
    //          width: "95%", borderTop: "2px solid #272725" }} />
    //     <h2>Search Participants</h2>    
    //     <div className="search-section">
    //       <input
    //         type="text"
    //         placeholder="Search by Name or Email"
    //         value={searchTerm}
    //         onChange={(e) => setSearchTerm(e.target.value)}
    //         className="search-input"
    //       />
    //     </div>
    //     <hr style={{ margin: "20px 0",marginLeft: "auto", marginRight: "auto" ,
    //          width: "95%", borderTop: "2px solid #272725" }} />
    //     <h3>Payment Overview</h3>     
    //     <div className="overview">
    //       <p>Total Participants: {participantsData.length}</p>
    //       <p>Total Registered: {participantsData.length}</p>
    //       <p>
    //         Total Payment Pending:{" "}
    //         {participantsData.filter((p) => p.status === "Pending").length}
    //       </p>
    //     </div>
    //     <hr style={{ margin: "20px 0",marginLeft: "auto", marginRight: "auto" ,
    //          width: "95%", borderTop: "2px solid #272725" }} />
    //     <h4>Registered Participants</h4>     
    //     <div className="table-wrapper">
    //       <table className="participants-table">
    //         <thead>
    //           <tr>
    //             {[
    //               "ID",
    //               "Name",
    //               "Email",
    //               "Phone Number",
    //               "Registration Date",
    //               "Ticket Type",
    //               "payment Status",
    //               "Amount",
    //               "payment Method",
    //               "Transaction ID",
    //             ].map((header) => (
    //               <th key={header}>{header}</th>
    //             ))}
    //           </tr>
    //         </thead>
    //         <tbody>
    //           {filteredParticipants.map((p) => (
    //             <tr key={p.id}>
    //               <td>{p.id}</td>
    //               <td>{p.name}</td>
    //               <td>{p.email}</td>
    //               <td>{p.phone}</td>
    //               <td>{p.date}</td>
    //               <td>{p.type}</td>
    //               <td>{p.status}</td>
    //               <td>{p.amount}</td>
    //               <td>{p.method}</td>
    //               <td>{p.txn}</td>
    //             </tr>
    //           ))}
    //         </tbody>
    //       </table>
    //     </div>

    //     <div className="footer-info">
    //       Total Participants: {filteredParticipants.length}
    //     </div>
    //   </div>
    // </div>
    // #endregion
    <div className={styles['page-wrapper']}>
      <div className="card"> {/* Assuming .card is a global or parent style not in module */}
        <button className={styles['back-button']} onClick={() => navigate('/homepage/my-events')}>&larr; Back</button>
        <h1 className={styles['main-title']}>FINANCE MANAGEMENT - PAYMENT DATA</h1>
        <div className={styles['event-details']}>
          <p>Event Name: {loading ? 'Loading...' : event ? event.title : 'Not found'}</p>
          <p>Date: {loading ? 'Loading...' : event ? event.date : 'Not found'}</p>
          <p>Location: {loading ? 'Loading...' : event ? (event.location || 'TBA') : 'Not found'}</p>
        </div>
        <hr style={{
          margin: "20px 0", marginLeft: "auto", marginRight: "auto",
          width: "95%", borderTop: "2px solid #272725"
        }} />
        <h2>Search Participants</h2>
        <div className={styles['search-section']}>
          <input
            type="text"
            placeholder="Search by Name or Email"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className={styles['search-input']}
          />
        </div>
        <hr style={{
          margin: "20px 0", marginLeft: "auto", marginRight: "auto",
          width: "95%", borderTop: "2px solid #272725"
        }} />
        <h3 className={styles['h3']}>Payment Overview</h3> {/* h3 also has a class name in the CSS module */}
        <div className={styles['overview']}>
          <p>Total Participants: {participantsData.length}</p>
          <p>Total Registered: {participantsData.length}</p>
          <p>
            Total Payment Pending:{" "}
            {participantsData.filter((p) => p.status === "Pending").length}
          </p>
        </div>
        <hr style={{
          margin: "20px 0", marginLeft: "auto", marginRight: "auto",
          width: "95%", borderTop: "2px solid #272725"
        }} />
        <h4 className={styles['h4']}>Registered Participants</h4> {/* h4 also has a class name in the CSS module */}
        <div className={styles['table-wrapper']}>
          <table className={styles['participants-table']}>
            <thead>
              <tr>
                {[
                  "ID",
                  "Name",
                  "Email",
                  "Phone Number",
                  "Registration Date",
                  "Ticket Type",
                  "payment Status",
                  "Amount",
                  "payment Method",
                  "Transaction ID",
                ].map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {filteredParticipants.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
                  <td>{p.phone}</td>
                  <td>{p.date}</td>
                  <td>{p.type}</td>
                  <td>{p.status}</td>
                  <td>{p.amount}</td>
                  <td>{p.method}</td>
                  <td>{p.txn}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className={styles['footer-info']}>
          Total Participants: {filteredParticipants.length}
        </div>
      </div>
    </div>
  );
};

export default FinanceReport;
