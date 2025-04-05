function loadContactList(contacts) {
  const contactListDiv = document.getElementById("contact-list");
  contactListDiv.innerHTML = `
      <h2>Attendee</h2>
      <table>
          <thead>
              <tr>
                  <th>First Name</th>
                  <th>Last Name</th>
                  <th>Email</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody id="contact-table-body"></tbody>
      </table>
  `;

  const tableBody = document.getElementById("contact-table-body");

  contacts.forEach(contact => {
    const row = document.createElement("tr");

    row.innerHTML = `
          <td>${contact.firstName}</td>
          <td>${contact.lastName}</td>
          <td>${contact.email}</td>
          <td>
              <button onclick='editContact(${JSON.stringify(contact)})'>Update</button>
              <button onclick='deleteContact(${contact.id})'>Delete</button>
          </td>
      `;

    tableBody.appendChild(row);
  });
}

function fetchContacts() {
  fetch("http://127.0.0.1:5000/contacts")
    .then(response => response.json())
    .then(data => {
      loadContactList(data.contacts);
    })
    .catch(error => console.error("Error fetching contacts:", error));
}

function deleteContact(id) {
  fetch(`http://127.0.0.1:5000/delete_contact/${id}`, { method: "DELETE" })
    .then(response => {
      if (response.status === 200) {
        fetchContacts();
      } else {
        console.error("Failed to delete contact");
      }
    })
    .catch(error => alert("Error: " + error));
}

document.addEventListener("DOMContentLoaded", fetchContacts);
