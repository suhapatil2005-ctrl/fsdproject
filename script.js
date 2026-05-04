// ================= BASE URL =================
const BASE_URL = "http://localhost:3000";

// ================= REGISTER =================
function register() {
  const name = document.getElementById("name").value;
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  if (!name || !email || !password) {
    alert("Please fill all fields");
    return;
  }

  fetch(`${BASE_URL}/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ name, email, password })
  })
    .then(res => res.text())
    .then(data => {
      alert("Registered Successfully!");
      window.location = "login.html";
    })
    .catch(err => console.log(err));
}

// ================= LOGIN =================
function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  fetch(`${BASE_URL}/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email, password })
  })
    .then(res => res.json())
    .then(data => {
      if (data.status === "success") {
        localStorage.setItem("user", JSON.stringify(data.user));
        window.location = "dashboard.html";
      } else {
        alert("Invalid Email or Password");
      }
    })
    .catch(err => console.log(err));
}

// ================= LOGOUT =================
function logout() {
  localStorage.removeItem("user");
  window.location = "login.html";
}

// ================= ADD DOUBT =================
function addDoubt() {
  const doubt = document.getElementById("doubt").value;

  if (!doubt) {
    alert("Enter your doubt");
    return;
  }

  fetch(`${BASE_URL}/add-doubt`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ question: doubt })
  })
    .then(() => {
      document.getElementById("doubt").value = "";
      loadDoubts();
    })
    .catch(err => console.log(err));
}

// ================= LOAD DOUBTS =================
function loadDoubts() {
  fetch(`${BASE_URL}/doubts`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("doubtList");
      list.innerHTML = "";

      data.forEach(d => {
        const li = document.createElement("li");
        li.textContent = d.question;
        list.appendChild(li);
      });
    });
}

// ================= ADD NOTE =================
function addNote() {
  const note = document.getElementById("note").value;

  if (!note) {
    alert("Enter note title");
    return;
  }

  fetch(`${BASE_URL}/add-note`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ title: note })
  })
    .then(() => {
      document.getElementById("note").value = "";
      loadNotes();
    })
    .catch(err => console.log(err));
}

// ================= LOAD NOTES =================
function loadNotes() {
  fetch(`${BASE_URL}/notes`)
    .then(res => res.json())
    .then(data => {
      const list = document.getElementById("noteList");
      list.innerHTML = "";

      data.forEach(n => {
        const li = document.createElement("li");
        li.textContent = n.title;
        list.appendChild(li);
      });
    });
}

// ================= CHECK LOGIN =================
function checkLogin() {
  const user = localStorage.getItem("user");

  if (!user) {
    window.location = "login.html";
  }
}

// ================= AUTO LOAD (Dashboard) =================
window.onload = function () {
  if (document.getElementById("doubtList")) {
    checkLogin();
    loadDoubts();
    loadNotes();
  }
};