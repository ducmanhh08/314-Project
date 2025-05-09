function loadUserList(users) {
  const userListDiv = document.getElementById("contact-list");
  userListDiv.innerHTML = `
      <h2>Users</h2>
      <table>
          <thead>
              <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Role</th>
                  <th>Actions</th>
              </tr>
          </thead>
          <tbody id="user-table-body"></tbody>
      </table>
  `;

  const tableBody = document.getElementById("user-table-body");

  users.forEach(user => {
    const row = document.createElement("tr");

    row.innerHTML = `
          <td>${user.name}</td>
          <td>${user.email}</td>
          <td>${user.role}</td>
          <td>
              <button onclick='editUser(${JSON.stringify(user)})'>Update</button>
              <button onclick='deleteUser(${user.id})'>Delete</button>
          </td>
      `;

    tableBody.appendChild(row);
  });
}

function fetchUsers() {
  fetch("http://127.0.0.1:5000/users")
    .then(response => response.json())
    .then(data => {
      loadUserList(data.users); 
    })
    .catch(error => console.error("Error fetching users:", error));
}

function deleteUser(id) {
  fetch(`http://127.0.0.1:5000/delete_user/${id}`, { method: "DELETE" })
    .then(response => {
      if (response.status === 200) {
        fetchUsers(); 
      } else {
        console.error("Failed to delete user");
      }
    })
    .catch(error => alert("Error: " + error));
}

document.addEventListener("DOMContentLoaded", fetchUsers);
