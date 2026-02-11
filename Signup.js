document.addEventListener("DOMContentLoaded", function () {
  const registerBtn = document.getElementById("registerBtn");

  registerBtn.addEventListener("click", function () {
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const role = document.getElementById("role").value;
    const password = document.getElementById("password").value;
    const confirmPassword = document.getElementById("confirmPassword").value;

    // ===== VALIDATION =====
    if (!username || !email || !role || !password || !confirmPassword) {
      alert("Please fill in all fields.");
      return;
    }

    if (!validateEmail(email)) {
      alert("Invalid email format.");
      return;
    }

    if (password.length < 6) {
      alert("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    const user = { username, email, role, password };

    let users = JSON.parse(localStorage.getItem("users")) || [];

    const exists = users.some(u => u.email === email);
    if (exists) {
      alert("Email already registered.");
      return;
    }

    users.push(user);
    localStorage.setItem("users", JSON.stringify(users));

    alert("Registration successful!");
  });
});

// EMAIL CHECK
function validateEmail(email) {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
}
