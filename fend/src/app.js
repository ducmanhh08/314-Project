document.addEventListener("DOMContentLoaded", () => {
  const userList = document.getElementById("contact-list");
  const modal = document.getElementById("modal");
  const closeModalBtn = document.getElementById("close-modal");
  const createContactBtn = document.getElementById("create-contact-btn");
  const userFormContainer = document.getElementById("contact-form-container");

  function fetchUsers() {
    fetch("http://127.0.0.1:5000/users")
      .then(response => response.json())
      .then(data => {
        userList.innerHTML = "";
        data.users.forEach(user => {
          const userDiv = document.createElement("div");
          contactDiv.innerHTML = `<p>${user.name} ${user.role} - ${user.email}</p>
                      <button onclick='editUser(${JSON.stringify(user)})'>Edit</button>`;
          userList.appendChild(userDiv);
        });
      });
  }

  function openModal(user = {}) {
    userFormContainer.innerHTML = "";
    loadContactForm(user);
    modal.style.display = "block";
  }

  function closeModal() {
    modal.style.display = "none";
    userFormContainer.innerHTML = "";
  }

  window.editUser = (user) => {
    openModal(user);
  };

  closeModalBtn.addEventListener("click", closeModal);
  createContactBtn.addEventListener("click", () => openModal());

  fetchUsers();
});