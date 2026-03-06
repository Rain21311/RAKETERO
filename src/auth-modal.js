import { signUp, signIn, signOut, authState } from './auth.js';

export function createAuthModal() {
  const modal = document.createElement('div');
  modal.id = 'auth-modal';
  modal.className = 'auth-modal';
  modal.style.display = 'none';

  modal.innerHTML = `
    <div class="auth-modal-content">
      <div class="auth-modal-header">
        <h2 id="auth-modal-title">Sign In</h2>
        <button class="auth-modal-close" aria-label="Close">&times;</button>
      </div>

      <div class="auth-tabs">
        <button class="auth-tab active" data-tab="signin">Sign In</button>
        <button class="auth-tab" data-tab="signup">Sign Up</button>
      </div>

      <!-- Sign In Form -->
      <form id="signin-form" class="auth-form active">
        <div class="form-group">
          <label for="signin-email">Email</label>
          <input type="email" id="signin-email" placeholder="your@email.com" required />
        </div>
        <div class="form-group">
          <label for="signin-password">Password</label>
          <input type="password" id="signin-password" placeholder="••••••••" required />
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Sign In</button>
        <p class="auth-error" id="signin-error" style="display: none;"></p>
      </form>

      <!-- Sign Up Form -->
      <form id="signup-form" class="auth-form">
        <div class="form-group">
          <label for="signup-name">Full Name</label>
          <input type="text" id="signup-name" placeholder="John Doe" required />
        </div>
        <div class="form-group">
          <label for="signup-email">Email</label>
          <input type="email" id="signup-email" placeholder="your@email.com" required />
        </div>
        <div class="form-group">
          <label for="signup-password">Password</label>
          <input type="password" id="signup-password" placeholder="••••••••" required />
        </div>
        <div class="form-group">
          <label for="signup-role">I am a:</label>
          <select id="signup-role" required>
            <option value="">Select your role</option>
            <option value="freelancer">Job Hunter (Freelancer)</option>
            <option value="employer">Employer</option>
          </select>
        </div>
        <button type="submit" class="btn btn-primary" style="width: 100%;">Create Account</button>
        <p class="auth-error" id="signup-error" style="display: none;"></p>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
  attachAuthModalListeners(modal);
  return modal;
}

export function getAuthModal() {
  return document.getElementById('auth-modal') || createAuthModal();
}

export function openAuthModal(tab = 'signin') {
  const modal = getAuthModal();
  modal.style.display = 'flex';
  switchAuthTab(tab);
}

export function closeAuthModal() {
  const modal = getAuthModal();
  modal.style.display = 'none';
}

function switchAuthTab(tab) {
  document.querySelectorAll('.auth-tab').forEach(t => t.classList.remove('active'));
  document.querySelectorAll('.auth-form').forEach(f => f.classList.remove('active'));

  document.querySelector(`.auth-tab[data-tab="${tab}"]`)?.classList.add('active');
  document.getElementById(`${tab}-form`)?.classList.add('active');
}

function attachAuthModalListeners(modal) {
  const closeBtn = modal.querySelector('.auth-modal-close');
  closeBtn.addEventListener('click', closeAuthModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeAuthModal();
  });

  document.querySelectorAll('.auth-tab').forEach(tab => {
    tab.addEventListener('click', (e) => {
      switchAuthTab(e.target.dataset.tab);
    });
  });

  const signInForm = document.getElementById('signin-form');
  signInForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;
    const errorEl = document.getElementById('signin-error');

    const { error } = await signIn(email, password);
    if (error) {
      errorEl.textContent = error;
      errorEl.style.display = 'block';
    } else {
      closeAuthModal();
      signInForm.reset();
    }
  });

  const signUpForm = document.getElementById('signup-form');
  signUpForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const fullName = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const role = document.getElementById('signup-role').value;
    const errorEl = document.getElementById('signup-error');

    if (!role) {
      errorEl.textContent = 'Please select your role';
      errorEl.style.display = 'block';
      return;
    }

    const { error } = await signUp(email, password, fullName, role);
    if (error) {
      errorEl.textContent = error;
      errorEl.style.display = 'block';
    } else {
      errorEl.textContent = '';
      errorEl.style.display = 'none';
      alert('Account created! Check your email to confirm.');
      closeAuthModal();
      signUpForm.reset();
    }
  });
}