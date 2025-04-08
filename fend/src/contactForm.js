function loadContactForm(existingUser = {}) {
  const form = document.createElement("form");
  form.innerHTML = `
      <input type="hidden" id="user-id" value="${existingUser.id || ''}">
      <div>
          <label for="name">Name:</label>
          <input type="text" id="name" value="${existingUser.name || ''}">
      </div>
      <div>
          <label for="email">Email:</label>
          <input type="text" id="email" value="${existingUser.email || ''}">
      </div>
      <div>
          <label for="password">Password:</label>
          <input type="password" id="password" value="">
      </div>
      <div>
          <label for="role">Role:</label>
          <select id="role">
              <option value="attendee" ${existingUser.role === "attendee" ? "selected" : ""}>Attendee</option>
              <option value="organizer" ${existingUser.role === "organizer" ? "selected" : ""}>Organizer</option>
          </select>
      </div>
      <button type="submit">${existingUser.id ? "Update" : "Create"}</button>
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const userId = document.getElementById("user-id").value;
    const userData = {
      name: document.getElementById("name").value,
      email: document.getElementById("email").value,
      password: document.getElementById("password").value,
      role: document.getElementById("role").value,
    };

    const url = `http://127.0.0.1:5000/${userId ? `update_user/${userId}` : "create_user"}`;
    const method = userId ? "PATCH" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    })
      .then(response => response.json())
      .then(() => {
        document.getElementById("modal").style.display = "none";
        fetchUsers();
      })
      .catch(error => alert("Error: " + error));
  });

  document.getElementById("contact-form-container").appendChild(form);
}
