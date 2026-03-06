import { initializeAuth, authState, subscribeToAuthChanges, signOut } from './auth.js';
import { createAuthModal, openAuthModal, closeAuthModal } from './auth-modal.js';

const jobs = [
  {
    id: 1,
    title: 'Senior Frontend Engineer',
    company: 'TechCorp',
    location: 'San Francisco, CA',
    type: 'remote',
    salary: '$120k - $180k',
    description: 'Build scalable web applications with React and TypeScript. Lead a team of talented engineers.'
  },
  {
    id: 2,
    title: 'Product Designer',
    company: 'DesignHub',
    location: 'New York, NY',
    type: 'hybrid',
    salary: '$90k - $140k',
    description: 'Design beautiful user experiences for millions of users. Shape the future of digital products.'
  },
  {
    id: 3,
    title: 'Backend Developer',
    company: 'CloudSystems',
    location: 'Remote',
    type: 'remote',
    salary: '$100k - $160k',
    description: 'Work with microservices and cloud infrastructure. Build APIs that power modern applications.'
  },
  {
    id: 4,
    title: 'Data Scientist',
    company: 'Analytics Inc',
    location: 'Boston, MA',
    type: 'onsite',
    salary: '$110k - $170k',
    description: 'Unlock insights from complex datasets. Build ML models that drive business decisions.'
  },
  {
    id: 5,
    title: 'DevOps Engineer',
    company: 'Infrastructure Co',
    location: 'Seattle, WA',
    type: 'hybrid',
    salary: '$105k - $165k',
    description: 'Manage cloud infrastructure and CI/CD pipelines. Ensure system reliability and performance.'
  },
  {
    id: 6,
    title: 'Full Stack Developer',
    company: 'StartupXYZ',
    location: 'Remote',
    type: 'remote',
    salary: '$80k - $130k',
    description: 'Build end-to-end features with modern tech stack. Wear multiple hats in a fast-paced startup.'
  }
];

function renderJobs(jobsList = jobs) {
  const container = document.getElementById('jobs-container');
  if (!container) return;

  container.innerHTML = jobsList.map(job => `
    <div class="job-card" onclick="handleJobClick(${job.id})">
      <div class="job-header">
        <div class="company-logo">${job.company[0]}</div>
        <span class="job-type ${job.type}">${job.type}</span>
      </div>
      <h3 class="job-title">${job.title}</h3>
      <p class="job-company">${job.company}</p>
      <p class="job-description">${job.description}</p>
      <div class="job-meta">
        <div class="job-salary">${job.salary}</div>
        <div class="job-location">
          <span>📍</span>
          <span>${job.location}</span>
        </div>
      </div>
    </div>
  `).join('');
}

function handleJobClick(jobId) {
  const job = jobs.find(j => j.id === jobId);
  if (job) {
    if (!authState.user) {
      openAuthModal('signup');
      return;
    }

    if (authState.profile?.role === 'employer') {
      alert('Employers cannot apply for jobs');
      return;
    }

    alert(`Applied to: ${job.title} at ${job.company}\n\nWe'll notify you when the employer responds.`);
  }
}

function handleSearch(e) {
  e.preventDefault();
  const searchInput = document.getElementById('search-input');
  const locationInput = document.getElementById('location-input');
  const typeSelect = document.getElementById('type-select');

  const search = searchInput?.value.toLowerCase() || '';
  const location = locationInput?.value.toLowerCase() || '';
  const type = typeSelect?.value || '';

  const filtered = jobs.filter(job => {
    const matchesSearch = !search ||
      job.title.toLowerCase().includes(search) ||
      job.company.toLowerCase().includes(search) ||
      job.description.toLowerCase().includes(search);

    const matchesLocation = !location ||
      job.location.toLowerCase().includes(location);

    const matchesType = !type || job.type === type;

    return matchesSearch && matchesLocation && matchesType;
  });

  renderJobs(filtered);

  if (filtered.length === 0) {
    const container = document.getElementById('jobs-container');
    if (container) {
      container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 3rem; color: var(--neutral-500);">No jobs found matching your criteria. Try different search terms.</div>';
    }
  }
}

function updateAuthUI() {
  const authButtons = document.getElementById('auth-buttons');
  if (!authButtons) return;

  if (authState.user && authState.profile) {
    authButtons.innerHTML = `
      <div class="user-menu">
        <span class="user-name">${authState.profile.full_name}</span>
        <span class="user-role">${authState.profile.role === 'freelancer' ? 'Job Hunter' : 'Employer'}</span>
        <button class="btn-logout" onclick="handleLogout()">Logout</button>
      </div>
    `;
  } else {
    authButtons.innerHTML = `
      <button class="btn btn-primary" onclick="handleLoginClick()">Sign In</button>
      <button class="btn btn-outline" onclick="handleSignUpClick()">Sign Up</button>
    `;
  }
}

window.handleLoginClick = () => openAuthModal('signin');
window.handleSignUpClick = () => openAuthModal('signup');
window.handleLogout = async () => {
  await signOut();
  updateAuthUI();
  alert('You have been logged out');
};

function initializeApp() {
  const app = document.getElementById('app');

  const html = `
    <header>
      <nav>
        <div class="logo">
          <span>💼</span> JobBoard
        </div>
        <ul class="nav-links">
          <li><a href="#jobs">Browse Jobs</a></li>
          <li><a href="#companies">Companies</a></li>
          <li><a href="#about">About</a></li>
          <li><a href="#contact">Contact</a></li>
        </ul>
        <div id="auth-buttons"></div>
      </nav>
    </header>

    <section class="hero">
      <div class="hero-content">
        <h1>Find Your Dream Job</h1>
        <p>Discover thousands of opportunities from leading companies. Start your journey today.</p>
        <div class="hero-buttons">
          <button class="btn btn-secondary" onclick="handleSearchClick()">Browse Jobs</button>
          <button class="btn btn-outline" onclick="handlePostJobClick()">Post a Job</button>
        </div>
      </div>
    </section>

    <section class="search-section">
      <form class="search-box" onsubmit="handleSearch(event)">
        <div class="form-group">
          <label for="search-input">Job Title</label>
          <input type="text" id="search-input" placeholder="e.g. Engineer, Designer..." />
        </div>
        <div class="form-group">
          <label for="location-input">Location</label>
          <input type="text" id="location-input" placeholder="e.g. San Francisco..." />
        </div>
        <div class="form-group">
          <label for="type-select">Job Type</label>
          <select id="type-select">
            <option value="">All Types</option>
            <option value="remote">Remote</option>
            <option value="hybrid">Hybrid</option>
            <option value="onsite">On-site</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary">Search</button>
      </form>
    </section>

    <main>
      <h2 class="section-title" id="jobs">Latest Job Openings</h2>
      <div class="jobs-container" id="jobs-container"></div>

      <section class="stats-section">
        <div class="stats-grid">
          <div class="stat-item">
            <h3>10K+</h3>
            <p>Active Jobs</p>
          </div>
          <div class="stat-item">
            <h3>2.5K+</h3>
            <p>Companies</p>
          </div>
          <div class="stat-item">
            <h3>500K+</h3>
            <p>Job Seekers</p>
          </div>
          <div class="stat-item">
            <h3>95%</h3>
            <p>Success Rate</p>
          </div>
        </div>
      </section>
    </main>

    <footer>
      <div class="footer-content">
        <div class="footer-section">
          <h4>JobBoard</h4>
          <p>The best platform to find your next opportunity.</p>
        </div>
        <div class="footer-section">
          <h4>For Candidates</h4>
          <ul>
            <li><a href="#">Browse Jobs</a></li>
            <li><a href="#">My Applications</a></li>
            <li><a href="#">Saved Jobs</a></li>
            <li><a href="#">Profile</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>For Employers</h4>
          <ul>
            <li><a href="#">Post a Job</a></li>
            <li><a href="#">Find Candidates</a></li>
            <li><a href="#">Pricing</a></li>
            <li><a href="#">Resources</a></li>
          </ul>
        </div>
        <div class="footer-section">
          <h4>Legal</h4>
          <ul>
            <li><a href="#">Privacy Policy</a></li>
            <li><a href="#">Terms of Service</a></li>
            <li><a href="#">Cookie Policy</a></li>
          </ul>
        </div>
      </div>
      <div class="footer-bottom">
        <p>&copy; 2024 JobBoard. All rights reserved.</p>
      </div>
    </footer>
  `;

  app.innerHTML = html;
  createAuthModal();
  renderJobs();
}

window.handleJobClick = handleJobClick;
window.handleSearch = handleSearch;
window.handleSearchClick = () => document.querySelector('.search-box')?.scrollIntoView({ behavior: 'smooth' });
window.handlePostJobClick = () => {
  if (!authState.user) {
    openAuthModal('signup');
  } else if (authState.profile?.role === 'freelancer') {
    alert('Only employers can post jobs');
  } else {
    alert('Post job feature - Coming soon!');
  }
};

subscribeToAuthChanges(() => {
  updateAuthUI();
});

document.addEventListener('DOMContentLoaded', async () => {
  initializeApp();
  await initializeAuth();
  updateAuthUI();
});