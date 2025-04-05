document.addEventListener("DOMContentLoaded", () => {
  const contactList = document.getElementById("contact-list");
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("close-modal");
  const createContactBtn = document.getElementById("create-contact-btn");
  const contactFormContainer = document.getElementById("contact-form-container");

  function fetchContacts() {
    fetch("http://127.0.0.1:5000/contacts")
      .then(response => response.json())
      .then(data => {
        contactList.innerHTML = "";
        data.contacts.forEach(contact => {
          const contactDiv = document.createElement("div");
          contactDiv.innerHTML = `<p>${contact.firstName} ${contact.lastName} - ${contact.email}</p>
                      <button onclick='editContact(${JSON.stringify(contact)})'>Edit</button>`;
          contactList.appendChild(contactDiv);
        });
      });
  }

  function openModal(contact = {}) {
    contactFormContainer.innerHTML = "";
    loadContactForm(contact);
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
    contactFormContainer.innerHTML = "";
  }

  window.editContact = (contact) => {
    openModal(contact);
  };

  closeModalBtn.addEventListener("click", closeModal);
  createContactBtn.addEventListener("click", () => openModal());

  fetchContacts();
});
