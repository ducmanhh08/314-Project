import React from "react";
import "./FinanceReport.module.css";
import NavbarUser from '../../components/Navbar/NavbarUser';
import { Attendee } from '../attendee/Attendee';

// Original attendee data
const initialAttendees = [
  { id: '982543', name: 'John Doe', email: 'john@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '991235', name: 'Jane Smith', email: 'jane@example.com', date: 'March 15, 2025', ticket: 'VIP', status: 'Pending' },
  { id: '991412', name: 'Alice Cooper', email: 'alice@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '998546', name: 'Robert King', email: 'robert@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Pending' },
  { id: '011002', name: 'Kaite Beo', email: 'katie@example.com', date: 'March 15, 2025', ticket: 'VIP', status: 'Approve' },
  { id: '991245', name: 'Liam N.', email: 'liam@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '991874', name: 'Emma B.', email: 'emma@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Pending' },
  { id: '991675', name: 'Noah W.', email: 'noah@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '991442', name: 'Ava M.', email: 'ava@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '991411', name: 'Ethan J.', email: 'ethan@example.com', date: 'March 15, 2025', ticket: 'VIP', status: 'Pending' },
  { id: '991244', name: 'Olivia C.', email: 'olivia@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '991473', name: 'Isla R.', email: 'isla@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Pending' },
  { id: '991599', name: 'Mason T.', email: 'mason@example.com', date: 'March 15, 2025', ticket: 'VIP', status: 'Approve' },
  { id: '991600', name: 'Sophia L.', email: 'sophia@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '991601', name: 'James P.', email: 'james@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Pending' },
  { id: '991602', name: 'Amelia R.', email: 'amelia@example.com', date: 'March 15, 2025', ticket: 'VIP', status: 'Approve' },
  { id: '991603', name: 'Lucas K.', email: 'lucas@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '991604', name: 'Mia V.', email: 'mia@example.com', date: 'March 15, 2025', ticket: 'VIP', status: 'Pending' },
  { id: '991605', name: 'Benjamin F.', email: 'benjamin@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Approve' },
  { id: '991606', name: 'Charlotte G.', email: 'charlotte@example.com', date: 'March 15, 2025', ticket: 'General', status: 'Approve' }
];
const paymentMethods = ["Credit Card", "PayPal", "AfterPay"];
// Add financial mock data
const participantsData = initialAttendees.map((attendee, index) => ({
  id: attendee.id,
  name: attendee.name,
  email: attendee.email,
  date: attendee.date,
  type: attendee.ticket,
  status: attendee.status === "Approve" ? "Paid" : "Pending",
  amount: attendee.ticket === "VIP" ? "$1000" : "$500",
  method: paymentMethods[index % 3],
  txn: `TXN${10000 + index}`
}));

// Calculate total revenue
const totalRevenue = participantsData
  .filter((p) => p.status === "Paid")
  .reduce((sum, p) => sum + parseFloat(p.amount.replace('$', '')), 0);

const Finance = () => {
  return (
    <div className="page-wrapper">
      <NavbarUser />
      <div className="card">
        <button className="back-button">&larr; Back</button>
        <h1 className="main-title">FINANCE MANAGEMENT - PAYMENT DATA</h1>
        <div className="event-details">
          <p>Event Name: Annual Tech Conference 2025</p>
          <p>Date: 20 November 2025</p>
          <p>Location: Sydney Convention Center</p>
        </div>
        <hr style={{ margin: "20px 0", marginLeft: "auto", marginRight: "auto", width: "95%", borderTop: "2px solid #272725" }} />
        <h3>Payment Overview</h3>
        <div className="overview">
          <p>Total Participants: {participantsData.length}</p>
          <p>Total Registered: {participantsData.length}</p>
          <p>Total Payment Pending: {participantsData.filter((p) => p.status === "Pending").length}</p>
          <p>Total Revenue: ${totalRevenue.toFixed(2)}</p>
        </div>
        <hr style={{ margin: "20px 0", marginLeft: "auto", marginRight: "auto", width: "95%", borderTop: "2px solid #272725" }} />
        <h4>Registered Participants</h4>
        <div className="table-wrapper">
          <table className="participants-table">
            <thead>
              <tr>
                {[
                  "ID", "Name", "Email", "Registration Date", "Ticket Type",
                  "Payment Status", "Amount", "Payment Method", "Transaction ID"
                ].map((header) => (
                  <th key={header}>{header}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {participantsData.map((p) => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td>{p.name}</td>
                  <td>{p.email}</td>
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
        <hr style={{ margin: "20px 0", marginLeft: "auto", marginRight: "auto", width: "95%", borderTop: "2px solid #272725" }} />
        <div className="footer-info">
          Total Participants: {participantsData.length}
        </div>
      </div>
    </div>
  );
};

export default Finance;