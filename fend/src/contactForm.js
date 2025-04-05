function loadContactForm(existingContact = {}) {
  const form = document.createElement("form");
  form.innerHTML = `
      <input type="hidden" id="contact-id" value="${existingContact.id || ''}">
      <div>
          <label for="firstName">First Name:</label>
          <input type="text" id="firstName" value="${existingContact.firstName || ''}">
      </div>
      <div>
          <label for="lastName">Last Name:</label>
          <input type="text" id="lastName" value="${existingContact.lastName || ''}">
      </div>
      <div>
          <label for="email">Email:</label>
          <input type="text" id="email" value="${existingContact.email || ''}">
      </div>
      <button type="submit">${existingContact.id ? "Update" : "Create"}</button>
  `;

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const contactId = document.getElementById("contact-id").value;
    const contactData = {
      firstName: document.getElementById("firstName").value,
      lastName: document.getElementById("lastName").value,
      email: document.getElementById("email").value,
    };

    const url = `http://127.0.0.1:5000/${contactId ? `update_contact/${contactId}` : "create_contact"}`;
    const method = contactId ? "PATCH" : "POST";

    fetch(url, {
      method: method,
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contactData),
    })
      .then(response => response.json())
      .then(() => {
        document.getElementById("modal").style.display = "none";
        fetchContacts();
      })
      .catch(error => alert("Error: " + error));
  });

  document.getElementById("contact-form-container").appendChild(form);
}
