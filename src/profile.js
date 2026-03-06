import { authState, updateProfile } from './auth.js';

export function createProfileDropdown() {
  const dropdown = document.createElement('div');
  dropdown.id = 'profile-dropdown';
  dropdown.className = 'profile-dropdown';
  dropdown.innerHTML = `
    <div class="profile-dropdown-content">
      <div class="profile-header">
        <div class="profile-avatar">
          <span id="avatar-initial">?</span>
        </div>
        <div class="profile-info">
          <div id="dropdown-name" class="profile-name">User</div>
          <div id="dropdown-role" class="profile-role">Role</div>
          <div id="dropdown-email" class="profile-email">email@example.com</div>
        </div>
      </div>

      <div class="profile-details">
        <div class="detail-item">
          <span class="detail-label">Location:</span>
          <span id="detail-location" class="detail-value">Not set</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Phone:</span>
          <span id="detail-phone" class="detail-value">Not set</span>
        </div>
        <div class="detail-item">
          <span class="detail-label">Bio:</span>
          <span id="detail-bio" class="detail-value">No bio</span>
        </div>
      </div>

      <div class="profile-actions">
        <button id="edit-profile-btn" class="dropdown-btn">Edit Profile</button>
        <button id="logout-btn" class="dropdown-btn danger">Logout</button>
      </div>
    </div>
  `;

  document.body.appendChild(dropdown);
  attachProfileDropdownListeners(dropdown);
  return dropdown;
}

export function getProfileDropdown() {
  return document.getElementById('profile-dropdown') || createProfileDropdown();
}

export function updateProfileDropdown() {
  const dropdown = getProfileDropdown();

  const avatarInitial = dropdown.querySelector('#avatar-initial');
  const dropdownName = dropdown.querySelector('#dropdown-name');
  const dropdownRole = dropdown.querySelector('#dropdown-role');
  const dropdownEmail = dropdown.querySelector('#dropdown-email');
  const detailLocation = dropdown.querySelector('#detail-location');
  const detailPhone = dropdown.querySelector('#detail-phone');
  const detailBio = dropdown.querySelector('#detail-bio');

  if (authState.profile) {
    const initial = (authState.profile.full_name || 'U')[0].toUpperCase();
    avatarInitial.textContent = initial;
    dropdownName.textContent = authState.profile.full_name || 'User';
    dropdownRole.textContent = authState.profile.role === 'freelancer' ? 'Job Hunter' : 'Employer';
    dropdownEmail.textContent = authState.user?.email || '';
    detailLocation.textContent = authState.profile.location || 'Not set';
    detailPhone.textContent = authState.profile.phone || 'Not set';
    detailBio.textContent = authState.profile.bio || 'No bio';
  }
}

export function openProfileDropdown(element) {
  const dropdown = getProfileDropdown();
  updateProfileDropdown();

  const rect = element.getBoundingClientRect();
  dropdown.style.display = 'block';
  dropdown.style.top = (rect.bottom + 10) + 'px';
  dropdown.style.left = (rect.right - 320) + 'px';
}

export function closeProfileDropdown() {
  const dropdown = getProfileDropdown();
  dropdown.style.display = 'none';
}

function attachProfileDropdownListeners(dropdown) {
  const editBtn = dropdown.querySelector('#edit-profile-btn');
  const logoutBtn = dropdown.querySelector('#logout-btn');

  editBtn.addEventListener('click', () => {
    closeProfileDropdown();
    openEditProfileModal();
  });

  logoutBtn.addEventListener('click', () => {
    closeProfileDropdown();
    window.handleLogout();
  });
}

export function createEditProfileModal() {
  const modal = document.createElement('div');
  modal.id = 'edit-profile-modal';
  modal.className = 'edit-profile-modal';
  modal.style.display = 'none';

  modal.innerHTML = `
    <div class="edit-profile-content">
      <div class="modal-header">
        <h2>Edit Profile</h2>
        <button class="modal-close" aria-label="Close">&times;</button>
      </div>

      <form id="edit-profile-form" class="edit-profile-form">
        <div class="form-group">
          <label for="edit-full-name">Full Name</label>
          <input type="text" id="edit-full-name" required />
        </div>

        <div class="form-group">
          <label for="edit-location">Location</label>
          <input type="text" id="edit-location" placeholder="e.g. San Francisco, CA" />
        </div>

        <div class="form-group">
          <label for="edit-phone">Phone</label>
          <input type="tel" id="edit-phone" placeholder="e.g. +1 (555) 123-4567" />
        </div>

        <div class="form-group">
          <label for="edit-bio">Bio</label>
          <textarea id="edit-bio" placeholder="Tell us about yourself" rows="4"></textarea>
        </div>

        <div class="form-actions">
          <button type="button" class="btn btn-outline" id="cancel-edit-btn">Cancel</button>
          <button type="submit" class="btn btn-primary">Save Changes</button>
        </div>

        <p class="profile-error" id="profile-error" style="display: none;"></p>
        <p class="profile-success" id="profile-success" style="display: none;"></p>
      </form>
    </div>
  `;

  document.body.appendChild(modal);
  attachEditProfileListeners(modal);
  return modal;
}

export function getEditProfileModal() {
  return document.getElementById('edit-profile-modal') || createEditProfileModal();
}

export function openEditProfileModal() {
  const modal = getEditProfileModal();
  modal.style.display = 'flex';

  const fullNameInput = modal.querySelector('#edit-full-name');
  const locationInput = modal.querySelector('#edit-location');
  const phoneInput = modal.querySelector('#edit-phone');
  const bioInput = modal.querySelector('#edit-bio');

  fullNameInput.value = authState.profile?.full_name || '';
  locationInput.value = authState.profile?.location || '';
  phoneInput.value = authState.profile?.phone || '';
  bioInput.value = authState.profile?.bio || '';
}

export function closeEditProfileModal() {
  const modal = getEditProfileModal();
  modal.style.display = 'none';
}

function attachEditProfileListeners(modal) {
  const closeBtn = modal.querySelector('.modal-close');
  const cancelBtn = modal.querySelector('#cancel-edit-btn');
  const form = modal.querySelector('#edit-profile-form');
  const errorEl = modal.querySelector('#profile-error');
  const successEl = modal.querySelector('#profile-success');

  closeBtn.addEventListener('click', closeEditProfileModal);
  cancelBtn.addEventListener('click', closeEditProfileModal);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeEditProfileModal();
  });

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const fullName = modal.querySelector('#edit-full-name').value;
    const location = modal.querySelector('#edit-location').value;
    const phone = modal.querySelector('#edit-phone').value;
    const bio = modal.querySelector('#edit-bio').value;

    errorEl.style.display = 'none';
    successEl.style.display = 'none';

    const { error } = await updateProfile({
      full_name: fullName,
      location: location || null,
      phone: phone || null,
      bio: bio || null
    });

    if (error) {
      errorEl.textContent = error;
      errorEl.style.display = 'block';
    } else {
      successEl.textContent = 'Profile updated successfully!';
      successEl.style.display = 'block';
      setTimeout(() => {
        closeEditProfileModal();
        successEl.style.display = 'none';
      }, 1500);
    }
  });
}