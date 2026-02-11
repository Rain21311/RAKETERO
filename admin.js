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

function showSection(id) {
  document.querySelectorAll(".section").forEach(s => s.classList.remove("active"));
  document.getElementById(id).classList.add("active");
}

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

function loadFlags() {
  const list = document.getElementById("flagList");
  if (!list) return;   // prevents error if element missing

  list.innerHTML = "";

  flags.forEach(f => {
    list.innerHTML += `<li>${f} <button>Resolve</button></li>`;
  });
}

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

function loadChart() {
  const ctx = document.getElementById("growthChart").getContext("2d");

  new Chart(ctx, {
    type: "line",
    data: {
      labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
      datasets: [{
        label: "User Growth",
        data: [5, 10, 18, 30],
        borderColor: "#5aa2e6",
        borderWidth: 2,
        tension: 0.3,
        fill: false,
        pointRadius: 3,
        pointBackgroundColor: "#5aa2e6"
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: "top",
          align: "center",
          labels: {
            boxWidth: 40,
            color: "#444",
            font: {
              size: 12,
              weight: "normal"
            }
          }
        }
      },
      scales: {
        x: {
          grid: {
            color: "rgba(0,0,0,0.05)"
          },
          ticks: {
            color: "#666"
          }
        },
        y: {
          beginAtZero: true,
          grid: {
            color: "rgba(0,0,0,0.05)"
          },
          ticks: {
            color: "#666"
          }
        }
      }
    }
  });
}

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
