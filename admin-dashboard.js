/* ====================================
   ADMIN DASHBOARD JAVASCRIPT
   ==================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize admin dashboard
    setupNavigation();
    setupEventListeners();
    setupTableInteractions();
});

/* ========================
   NAVIGATION
   ======================== */

function setupNavigation() {
    const navLinks = document.querySelectorAll('.nav-link');
    const sections = document.querySelectorAll('.section');

    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get section ID from data attribute
            const sectionId = this.getAttribute('data-section');
            
            // Remove active class from all nav items
            document.querySelectorAll('.nav-item').forEach(item => {
                item.classList.remove('active');
            });
            
            // Add active class to current nav item
            this.closest('.nav-item').classList.add('active');
            
            // Hide all sections
            sections.forEach(section => {
                section.classList.remove('active');
            });
            
            // Show selected section
            const selectedSection = document.getElementById(sectionId);
            if (selectedSection) {
                selectedSection.classList.add('active');
            }
        });
    });
}

/* ========================
   EVENT LISTENERS SETUP
   ======================== */

function setupEventListeners() {
    // Filter badges
    const filterBadges = document.querySelectorAll('.badge-filter');
    filterBadges.forEach(badge => {
        badge.addEventListener('click', function() {
            const parent = this.parentElement;
            parent.querySelectorAll('.badge-filter').forEach(b => b.classList.remove('active'));
            this.classList.add('active');
        });
    });

    // Settings form submit
    const settingsForm = document.querySelector('.settings-form');
    if (settingsForm) {
        const saveBtn = settingsForm.querySelector('.btn-primary');
        if (saveBtn) {
            saveBtn.addEventListener('click', handleSettingsSave);
        }
    }

    // Search functionality
    const searchInput = document.querySelector('.search-bar input');
    if (searchInput) {
        searchInput.addEventListener('input', handleSearch);
    }
}

/* ========================
   TABLE INTERACTIONS
   ======================== */

function setupTableInteractions() {
    // User Management actions
    const userActionBtns = document.querySelectorAll('table .btn');
    userActionBtns.forEach(btn => {
        btn.addEventListener('click', handleTableAction);
    });

    // Employer card actions
    const employerActionBtns = document.querySelectorAll('.employer-actions .btn');
    employerActionBtns.forEach(btn => {
        btn.addEventListener('click', handleEmployerAction);
    });

    // Filter select dropdowns
    const filterSelects = document.querySelectorAll('.filter-select');
    filterSelects.forEach(select => {
        select.addEventListener('change', handleFilterChange);
    });
}

function handleTableAction(e) {
    const btnText = this.textContent.trim();
    const row = this.closest('tr');
    
    switch(btnText) {
        case 'View':
            showNotification('Opening user profile...', 'info');
            break;
        case 'Promote':
            if (confirm('Promote this user to Employer?')) {
                row.innerHTML = row.innerHTML.replace('Regular User', 'Employer');
                showNotification('User promoted to Employer successfully!', 'success');
            }
            break;
        case 'Downgrade':
            if (confirm('Downgrade this employer account?')) {
                showNotification('Employer downgraded successfully!', 'success');
            }
            break;
        case 'Suspend':
            if (confirm('Suspend this account?')) {
                row.style.opacity = '0.5';
                showNotification('Account suspended!', 'warning');
            }
            break;
        case 'Activate':
            row.style.opacity = '1';
            showNotification('Account activated!', 'success');
            break;
        case 'Approve':
            showNotification('Job post approved!', 'success');
            break;
        case 'Reject':
            showRejectModal('job');
            break;
        case 'Remove':
            if (confirm('Are you sure you want to remove this item?')) {
                row.style.display = 'none';
                showNotification('Item removed!', 'warning');
            }
            break;
        case 'Archive':
            if (confirm('Archive this job post?')) {
                showNotification('Job post archived!', 'success');
            }
            break;
    }
}

function handleEmployerAction(e) {
    const btnText = this.textContent.trim();
    const card = this.closest('.employer-card');
    
    switch(btnText) {
        case 'View Profile':
            showNotification('Opening employer profile...', 'info');
            break;
        case 'View Documents':
            showNotification('Opening verification documents...', 'info');
            break;
        case 'Review Documents':
            showNotification('Opening verification documents for review...', 'info');
            break;
        case 'Change Plan':
            showPlanChangeModal(card);
            break;
        case 'Approve':
            if (confirm('Approve this employer?')) {
                const badge = card.querySelector('.verification-badge');
                badge.className = 'verification-badge verified';
                badge.textContent = '✓ Verified';
                showNotification('Employer approved and verified!', 'success');
            }
            break;
        case 'Re-review':
            showNotification('Re-opening verification review...', 'info');
            break;
    }
}

function handleFilterChange(e) {
    const filterValue = e.target.value;
    showNotification(`Filtering by: ${filterValue || 'All'}`, 'info');
}

/* ========================
   MODALS
   ======================== */

function showRejectModal(type) {
    const reason = prompt('Please provide a reason for rejection:');
    if (reason) {
        showNotification(`${type} rejected. Reason: ${reason}`, 'warning');
    }
}

function showPlanChangeModal(card) {
    const plans = ['Free', 'Standard', 'Premium'];
    const currentPlan = card.querySelector('.plan-badge');
    
    let planOptions = 'Select new plan:\n';
    plans.forEach((plan, index) => {
        planOptions += `${index + 1}. ${plan}\n`;
    });
    
    const choice = prompt(planOptions);
    if (choice) {
        const planIndex = parseInt(choice) - 1;
        if (planIndex >= 0 && planIndex < plans.length) {
            const newPlan = plans[planIndex];
            const planClass = newPlan.toLowerCase();
            currentPlan.className = `plan-badge ${planClass}`;
            currentPlan.textContent = newPlan;
            showNotification(`Plan updated to ${newPlan}!`, 'success');
        }
    }
}

/* ========================
   SETTINGS
   ======================== */

function handleSettingsSave(e) {
    e.preventDefault();
    showNotification('System settings saved successfully!', 'success');
}

/* ========================
   SEARCH
   ======================== */

function handleSearch(e) {
    const searchTerm = e.target.value.toLowerCase();
    
    // Search in tables
    const userTableRows = document.querySelectorAll('#users table tbody tr');
    userTableRows.forEach(row => {
        const text = row.textContent.toLowerCase();
        if (text.includes(searchTerm) || searchTerm === '') {
            row.style.display = '';
        } else {
            row.style.display = 'none';
        }
    });

    // Search in employer cards
    const employerCards = document.querySelectorAll('.employer-card');
    employerCards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (text.includes(searchTerm) || searchTerm === '') {
            card.style.display = '';
        } else {
            card.style.display = 'none';
        }
    });
}

/* ========================
   EDIT FEATURES MODAL
   ======================== */

document.addEventListener('click', function(e) {
    if (e.target.textContent.includes('Edit Features')) {
        const card = e.target.closest('.plan-row');
        if (card) {
            const planName = card.querySelector('h4').textContent;
            showNotification(`Opening feature editor for ${planName}...`, 'info');
        }
    }

    if (e.target.textContent.includes('Edit') && e.target.textContent !== 'Edit Features') {
        const item = e.target.closest('.category-item');
        if (item) {
            const categoryName = item.querySelector('h4').textContent;
            const newName = prompt('Edit category name:', categoryName);
            if (newName) {
                item.querySelector('h4').textContent = newName;
                showNotification(`Category updated to "${newName}"!`, 'success');
            }
        }

        const contentItem = e.target.closest('.content-item');
        if (contentItem) {
            const contentTitle = contentItem.querySelector('h4').textContent;
            showNotification(`Opening editor for ${contentTitle}...`, 'info');
        }
    }

    if (e.target.textContent === 'Remove' && e.target.closest('.category-item')) {
        const item = e.target.closest('.category-item');
        const categoryName = item.querySelector('h4').textContent;
        if (confirm(`Are you sure you want to remove "${categoryName}"?`)) {
            item.style.display = 'none';
            showNotification(`Category "${categoryName}" removed!`, 'warning');
        }
    }
});

/* ========================
   ADD CATEGORY BUTTON
   ======================== */

document.addEventListener('click', function(e) {
    if (e.target.textContent === '+ Add New Category') {
        const categoryName = prompt('Enter new category name:');
        if (categoryName) {
            const categoriesList = e.target.previousElementSibling;
            const newItem = document.createElement('div');
            newItem.className = 'category-item';
            newItem.innerHTML = `
                <div class="category-info">
                    <h4>${categoryName}</h4>
                    <p>0 active jobs</p>
                </div>
                <button class="btn btn-sm btn-secondary">Edit</button>
                <button class="btn btn-sm btn-danger">Remove</button>
            `;
            categoriesList.appendChild(newItem);
            showNotification(`Category "${categoryName}" added!`, 'success');
        }
    }

    if (e.target.textContent === '+ Add User') {
        const userName = prompt('Enter new user email:');
        if (userName) {
            showNotification(`Opening new user creation form for ${userName}...`, 'info');
        }
    }
});

/* ========================
   UTILITY FUNCTIONS
   ======================== */

function showNotification(message, type = 'info') {
    // Create notification element
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.textContent = message;
    notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        padding: 15px 20px;
        border-radius: 8px;
        font-weight: 600;
        z-index: 10000;
        animation: slideIn 0.3s ease;
        max-width: 350px;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
    `;

    // Set colors based on type
    const colors = {
        success: '#28a745',
        error: '#dc3545',
        info: '#17a2b8',
        warning: '#ffc107'
    };

    notification.style.backgroundColor = colors[type];
    notification.style.color = type === 'warning' ? '#000' : '#fff';

    document.body.appendChild(notification);

    // Remove after 4 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease';
        setTimeout(() => notification.remove(), 300);
    }, 4000);
}

// Add CSS animations for notifications
const style = document.createElement('style');
style.textContent = `
    @keyframes slideIn {
        from {
            transform: translateX(400px);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }

    @keyframes slideOut {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(400px);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

/* ========================
   LOG ACTIONS (for audit trail)
   ======================== */

function logAdminAction(action) {
    const timestamp = new Date().toLocaleTimeString();
    console.log(`[${timestamp}] Admin Action: ${action}`);
    // In production, this would send data to the server for audit logging
}

