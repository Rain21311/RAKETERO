/* ====================================
   EMPLOYER DASHBOARD JAVASCRIPT
   ==================================== */

document.addEventListener('DOMContentLoaded', function() {
    // Initialize dashboard
    setupNavigation();
    setupFormHandling();
    setupEventListeners();
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
   POST JOB FORM
   ======================== */

function setupFormHandling() {
    const postJobForm = document.getElementById('postJobForm');
    if (postJobForm) {
        postJobForm.addEventListener('submit', handlePostJobSubmit);
    }

    const companySettingsForm = document.getElementById('companySettingsForm');
    if (companySettingsForm) {
        companySettingsForm.addEventListener('submit', handleFormSubmit);
    }

    const securityForm = document.getElementById('securityForm');
    if (securityForm) {
        securityForm.addEventListener('submit', handleSecuritySubmit);
    }

    // File upload handling
    const fileUploadArea = document.querySelector('.file-upload-area');
    if (fileUploadArea) {
        setupFileUpload(fileUploadArea);
    }

    // Document upload area
    const uploadArea = document.querySelector('.upload-area');
    if (uploadArea) {
        setupDocumentUpload(uploadArea);
    }
}

function handlePostJobSubmit(e) {
    e.preventDefault();
    
    if (validatePostJobForm()) {
        // Show success message
        showNotification('Job posted successfully! Awaiting admin approval.', 'success');
        this.reset();
        
        // Redirect to job management after 2 seconds
        setTimeout(() => {
            document.querySelector('[data-section="job-management"]').click();
        }, 2000);
    }
}

function validatePostJobForm() {
    const form = document.getElementById('postJobForm');
    const requiredFields = form.querySelectorAll('[required]');
    let isValid = true;

    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            showFieldError(field, 'This field is required');
            isValid = false;
        } else {
            clearFieldError(field);
        }
    });

    // Validate closing date is in future
    const closingDate = new Date(document.getElementById('closingDate').value);
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (closingDate < today) {
        showFieldError(document.getElementById('closingDate'), 'Closing date must be in the future');
        isValid = false;
    }

    return isValid;
}

function handleFormSubmit(e) {
    e.preventDefault();
    showNotification('Changes saved successfully!', 'success');
}

function handleSecuritySubmit(e) {
    e.preventDefault();
    
    const newPassword = document.getElementById('newPassword').value;
    const confirmPassword = document.getElementById('confirmPassword').value;

    if (newPassword !== confirmPassword) {
        showNotification('Passwords do not match!', 'error');
        return;
    }

    if (newPassword.length < 8) {
        showNotification('Password must be at least 8 characters long!', 'error');
        return;
    }

    showNotification('Password changed successfully!', 'success');
    this.reset();
}

/* ========================
   FILE UPLOAD
   ======================== */

function setupFileUpload(uploadArea) {
    const fileInput = uploadArea.closest('.file-upload').querySelector('input[type="file"]');

    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#deb531';
        uploadArea.style.backgroundColor = 'rgba(222, 181, 49, 0.1)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '';
        uploadArea.style.backgroundColor = '';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '';
        uploadArea.style.backgroundColor = '';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            updateFileDisplay(uploadArea, files[0]);
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            updateFileDisplay(uploadArea, fileInput.files[0]);
        }
    });
}

function setupDocumentUpload(uploadArea) {
    const fileInput = uploadArea.closest('.documents-section').querySelector('#additionalDoc');

    uploadArea.addEventListener('click', () => fileInput.click());

    uploadArea.addEventListener('dragover', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '#deb531';
        uploadArea.style.backgroundColor = 'rgba(222, 181, 49, 0.1)';
    });

    uploadArea.addEventListener('dragleave', () => {
        uploadArea.style.borderColor = '';
        uploadArea.style.backgroundColor = '';
    });

    uploadArea.addEventListener('drop', (e) => {
        e.preventDefault();
        uploadArea.style.borderColor = '';
        uploadArea.style.backgroundColor = '';
        
        const files = e.dataTransfer.files;
        if (files.length > 0) {
            fileInput.files = files;
            showNotification(`Document "${files[0].name}" uploaded successfully!`, 'success');
        }
    });

    fileInput.addEventListener('change', () => {
        if (fileInput.files.length > 0) {
            showNotification(`Document "${fileInput.files[0].name}" uploaded successfully!`, 'success');
        }
    });
}

function updateFileDisplay(uploadArea, file) {
    uploadArea.innerHTML = `
        <p class="upload-icon">✓</p>
        <p class="upload-text">${file.name}</p>
        <p class="upload-hint">File ready to upload</p>
    `;
}

/* ========================
   FILTER TABS
   ======================== */

function setupEventListeners() {
    // Filter tabs for jobs
    const filterTabs = document.querySelectorAll('.filter-tab');
    filterTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            // Remove active from all tabs
            filterTabs.forEach(t => t.classList.remove('active'));
            // Add active to clicked tab
            this.classList.add('active');
            
            // Filter jobs based on status
            const status = this.getAttribute('data-status');
            filterJobs(status);
        });
    });

    // Applicant and message interactions
    setupApplicantActions();
    setupMessageInteraction();
    setupMessageActions();
}

function filterJobs(status) {
    const jobCards = document.querySelectorAll('.job-card');
    
    jobCards.forEach(card => {
        if (status === 'all') {
            card.style.display = '';
        } else {
            const cardStatus = card.className.split(' ').find(cls => cls.includes('status'));
            if (cardStatus && cardStatus.includes(status)) {
                card.style.display = '';
            } else {
                card.style.display = 'none';
            }
        }
    });
}

/* ========================
   APPLICANT ACTIONS
   ======================== */

function setupApplicantActions() {
    const acceptBtns = document.querySelectorAll('.applicant-actions .btn-primary');
    const rejectBtns = document.querySelectorAll('.applicant-actions .btn-danger');
    const messageBtns = document.querySelectorAll('.applicant-actions .btn-warning');

    acceptBtns.forEach(btn => {
        if (!btn.disabled) {
            btn.addEventListener('click', function() {
                const applicantName = this.closest('.applicant-card')
                    .querySelector('.applicant-name').textContent;
                
                showNotification(`${applicantName} has been accepted!`, 'success');
                
                // Disable button and update text
                this.disabled = true;
                this.textContent = 'Accepted';
                
                // Change status
                this.closest('.applicant-card')
                    .querySelector('.application-status').textContent = 'Accepted';
            });
        }
    });

    rejectBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const applicantName = this.closest('.applicant-card')
                .querySelector('.applicant-name').textContent;
            
            const confirmed = confirm(`Are you sure you want to reject ${applicantName}?`);
            if (confirmed) {
                showNotification(`${applicantName} has been rejected.`, 'info');
                this.closest('.applicant-card').style.opacity = '0.5';
                this.closest('.applicant-card').style.pointerEvents = 'none';
            }
        });
    });

    messageBtns.forEach(btn => {
        btn.addEventListener('click', function() {
            const applicantName = this.closest('.applicant-card')
                .querySelector('.applicant-name').textContent;
            
            document.querySelector('[data-section="messages"]').click();
            
            // Simulate clicking on the first inbox item
            const firstInbox = document.querySelector('.inbox-item');
            if (firstInbox) {
                firstInbox.click();
            }
            
            showNotification(`Opening messages for ${applicantName}...`, 'info');
        });
    });
}

/* ========================
   MESSAGES
   ======================== */

function setupMessageInteraction() {
    const inboxItems = document.querySelectorAll('.inbox-item');
    
    inboxItems.forEach(item => {
        item.addEventListener('click', function() {
            // Remove active from all items
            inboxItems.forEach(i => i.classList.remove('active'));
            // Add active to clicked item
            this.classList.add('active');
            
            // Remove unread badge if present
            const badge = this.querySelector('.inbox-badge');
            if (badge) {
                badge.remove();
            }
        });
    });
}

function setupMessageActions() {
    const sendBtn = document.querySelector('.chat-input .btn');
    const messageTextarea = document.querySelector('.chat-input textarea');

    if (sendBtn && messageTextarea) {
        sendBtn.addEventListener('click', sendMessage);
        messageTextarea.addEventListener('keypress', function(e) {
            if (e.key === 'Enter' && e.ctrlKey) {
                sendMessage();
            }
        });
    }
}

function sendMessage() {
    const textarea = document.querySelector('.chat-input textarea');
    const messageText = textarea.value.trim();

    if (!messageText) {
        showNotification('Please type a message!', 'warning');
        return;
    }

    const chatMessages = document.querySelector('.chat-messages');
    
    const messageDiv = document.createElement('div');
    messageDiv.className = 'message outgoing';
    messageDiv.innerHTML = `<p>${escapeHtml(messageText)}</p>`;
    
    chatMessages.appendChild(messageDiv);
    chatMessages.scrollTop = chatMessages.scrollHeight;
    
    textarea.value = '';
    
    // Simulate receiving a reply after 2 seconds
    setTimeout(() => {
        const replyDiv = document.createElement('div');
        replyDiv.className = 'message incoming';
        replyDiv.innerHTML = `<p>Thanks for your message! I'll get back to you soon.</p>`;
        chatMessages.appendChild(replyDiv);
        chatMessages.scrollTop = chatMessages.scrollHeight;
    }, 2000);
}

/* ========================
   UTILITY FUNCTIONS
   ======================== */

function showFieldError(field, message) {
    const errorElement = field.closest('.form-group').querySelector('.form-error');
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        field.style.borderColor = '#dc3545';
    }
}

function clearFieldError(field) {
    const errorElement = field.closest('.form-group').querySelector('.form-error');
    if (errorElement) {
        errorElement.style.display = 'none';
        field.style.borderColor = '';
    }
}

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

function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
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
