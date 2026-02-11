const users = [
  {name: "Juan Dela Cruz", role: "Freelancer", status: "Active", verified: true},
  {name: "Maria Santos", role: "Employer", status: "Pending", verified: false}
];

const gigs = [
  {title: "Logo Design", category: "Design", status: "Pending", date: "2026-02-01"},
  {title: "Website Build", category: "Development", status: "Approved", date: "2026-02-03"}
];

const payments = [
  {user: "Maria Santos", amount: "$25", status: "Completed", date: "2026-02-05"}
];

const flags = [
  "User reported for spam",
  "Inappropriate gig content"
];

// Navigation
function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

// Load Users
function loadUsers() {
  const table = document.getElementById("userTable");
  table.innerHTML = "";

  users.forEach((u, i) => {
    table.innerHTML += `
      <tr>
        <td>${u.name}</td>
        <td>${u.role}</td>
        <td>${u.status}</td>
        <td>${u.verified ? "✔" : "✖"}</td>
        <td>
          <button onclick="toggleVerify(${i})">Verify</button>
          <button onclick="deleteUser(${i})">Delete</button>
        </td>
      </tr>`;
  });

  document.getElementById("totalUsers").innerText = users.length;
}

function toggleVerify(i) {
  users[i].verified = !users[i].verified;
  loadUsers();
}

function deleteUser(i) {
  users.splice(i, 1);
  loadUsers();
}

// Load Gigs
function loadGigs() {
  const table = document.getElementById("gigTable");
  table.innerHTML = "";

  gigs.forEach(g => {
    table.innerHTML += `
      <tr>
        <td>${g.title}</td>
        <td>${g.category}</td>
        <td>${g.status}</td>
        <td>${g.date}</td>
        <td><button>Approve</button><button>Reject</button></td>
      </tr>`;
  });

  document.getElementById("activeGigs").innerText = gigs.length;
  document.getElementById("popularCategory").innerText = "Design";
}

// Payments
function loadPayments() {
  const table = document.getElementById("paymentTable");
  table.innerHTML = "";

  payments.forEach(p => {
    table.innerHTML += `
      <tr>
        <td>${p.user}</td>
        <td>${p.amount}</td>
        <td>${p.status}</td>
        <td>${p.date}</td>
      </tr>`;
  });
}

// Flags
function loadFlags() {
  const list = document.getElementById("flagList");
  list.innerHTML = "";

  flags.forEach(f => {
    list.innerHTML += `<li>${f} <button>Resolve</button></li>`;
  });
}

// Export CSV
function exportCSV() {
  let csv = "User,Amount,Status,Date\n";

  payments.forEach(p => {
    csv += `${p.user},${p.amount},${p.status},${p.date}\n`;
  });

  const blob = new Blob([csv], {type: "text/csv"});
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");

  a.href = url;
  a.download = "transactions.csv";
  a.click();
}

// Chart
function loadChart() {
  const ctx = document.getElementById("growthChart");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Week 1","Week 2","Week 3","Week 4"],
      datasets: [{
        label: "User Growth",
        data: [5, 10, 18, 30]
      }]
    }
  });
}

// Init
window.onload = () => {
  loadUsers();
  loadGigs();
  loadPayments();
  loadFlags();
  loadChart();
  document.getElementById("applications").innerText = 42;
};

function rate(n) {
  const stars = document.querySelectorAll(".star");
  stars.forEach((s, i) => {
    if (i < n) s.classList.add("active");
    else s.classList.remove("active");
  });
}
