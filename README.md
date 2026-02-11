# RAKETERO - Employer & Admin Dashboard Documentation

## 📋 Overview

This documentation covers the **Employer Dashboard** and **Admin Dashboard** for the RAKETERO web-based job portal system. Both dashboards are fully responsive, modern, and built with clean code architecture.

---

## 🎯 Key Features

### **EMPLOYER DASHBOARD**

#### 1. **Dashboard Overview**
- Current subscription plan display (Free, Standard, Premium)
- Plan status indicator (Active, Expired, Pending Verification)
- Key statistics:
  - Total jobs posted
  - Active job posts
  - Total applicants
  - New applicants today
- Recent activity feed

#### 2. **Post Job Module**
- Comprehensive job posting form with validation
- Required fields:
  - Job Title
  - Company/Employer Name
  - Location
  - Category (dropdown with 5 categories)
  - Job Description (with rich text editor toolbar)
  - Closing Date
  - Verification Document Upload
- Optional fields:
  - Job Tags (multiple)
  - Website
  - Tagline
- Real-time form validation
- Drag-and-drop file upload support

#### 3. **Job Management**
- List of all job posts with status badges:
  - Pending Approval
  - Active
  - Closed
  - Rejected
- Action buttons per job:
  - View job
  - Edit job
  - Close job
  - Delete job
- Status filter tabs

#### 4. **Applicant Management**
- View all applicants with applicant cards
- Applicant information displayed:
  - Name with avatar
  - Applied position
  - Application date
  - Profile summary
  - Document links (Resume, Portfolio)
- Actions per applicant:
  - Accept
  - Reject
  - Message
- Application status tracking (New, Reviewing, Accepted)

#### 5. **Messaging**
- Inbox with list of conversations
- Message counter and last message preview
- Chat interface with message history
- Subscription-based messaging limits
- Send message functionality

#### 6. **Subscription & Billing**
- Current plan details with status
- Plan features display
- Available plans comparison
- Payment history table
- Plan upgrade/downgrade options
- Invoice access

#### 7. **Account Settings**
- Company profile management
- Company information editing
- Verification document upload
- Document status tracking
- Two-factor authentication option
- Password change with security requirements

---

### **ADMIN DASHBOARD**

#### 1. **Admin Overview**
Dashboard metrics:
- Total users count
- Total employers count
- Active job posts
- Pending approvals (with alert)
- Total revenue from subscriptions
- Active subscriptions count

Additional sections:
- Subscription distribution chart
- Platform activity summary
- Admin actions audit log

#### 2. **User Management**
- View all registered users in data table
- User details:
  - Name
  - Email
  - Role (Regular User, Employer, Admin)
  - Join date
  - Account status (Active, Suspended)
- Filters:
  - By role
  - By status
  - Search functionality
- Actions per user:
  - View profile
  - Promote to Employer
  - Suspend/Activate account

#### 3. **Employer Management**
- Employer cards with verification status
- Employer information:
  - Company name
  - Contact email
  - Current subscription plan
  - Join date
  - Active jobs count
  - Total applicants
- Verification badges (Verified, Pending, Rejected)
- Actions:
  - View profile
  - View/Review verification documents
  - Change subscription plan
  - Approve/Re-review employer

#### 4. **Job Post Management**
- Data table of all job posts
- Job details:
  - Title
  - Employer
  - Category
  - Posted date
  - Status
- Status filters (Pending, Active, Closed)
- Actions:
  - View job details
  - Approve job post
  - Reject job post (with reason)
  - Remove job post
  - Archive closed jobs

#### 5. **Subscription & Payments**
- Revenue overview:
  - Monthly revenue
  - Yearly revenue
  - Average transaction value
- Payment history table with columns:
  - Date
  - Employer
  - Plan type
  - Amount
  - Payment method
  - Status
  - Invoice link
- Subscription plan management:
  - Plan names and pricing
  - Active users per plan
  - Edit feature options

#### 6. **System Settings**
- **Job Categories Management:**
  - List of all categories
  - Active jobs count per category
  - Edit/Remove functionality
  - Add new category option

- **Platform Content:**
  - Terms & Conditions
  - Privacy Policy
  - FAQ
  - Help Center
  - Last updated dates
  - Edit functionality

- **System Configuration:**
  - Enable/Disable user registration
  - Enable/Disable employer signups
  - Email verification requirement toggle
  - Maintenance mode toggle
  - Admin email notifications setting

---

## 📁 File Structure

```
RAKETERO/
├── employer-dashboard.html
├── employer-dashboard.css
├── employer-dashboard.js
├── admin-dashboard.html
├── admin-dashboard.css
├── admin-dashboard.js
├── global.css
└── README.md (this file)
```

---

## 🎨 Design & Branding

### **Color Scheme**
- **Primary Dark:** `#0d2959` (Navy Blue)
- **Primary Accent:** `#deb531` (Gold/Yellow)
- **Success:** `#28a745` (Green)
- **Warning:** `#ffc107` (Yellow)
- **Danger:** `#dc3545` (Red)
- **Background Light:** `#f8f9fa` (Light Gray)

### **Typography**
- Font Family: Montserrat (with system fallback)
- Fast and modern appearance
- Clear hierarchy with multiple font weights

### **Layout**
- Responsive sidebar navigation
- Fixed header with actions
- Card-based content organization
- Grid layouts for data display
- Mobile-first responsive design

---

## 🚀 Getting Started

### **Setup Instructions**

1. **Extract files** to your web server or local development environment
2. **Update image paths** in the HTML files to match your assets (currently using placeholder images)
3. **Configure backend APIs** - All functionality currently simulates data. Connect to your backend:
   - Form submissions
   - User authentication
   - Data fetching
   - File uploads

### **File Linking**

Both dashboards use these stylesheets:
```html
<link rel="stylesheet" href="global.css">
<link rel="stylesheet" href="employer-dashboard.css">
<!-- OR -->
<link rel="stylesheet" href="admin-dashboard.css">
```

Link the corresponding JavaScript files:
```html
<script src="employer-dashboard.js"></script>
<!-- OR -->
<script src="admin-dashboard.js"></script>
```

---

## 💻 Features Implementation

### **Navigation System**
- Click sidebar menu items to switch between sections
- Active section is highlighted
- Smooth fade-in animations

### **Form Handling**
- **Validation:** Required fields check before submission
- **Date validation:** Closing dates must be in the future
- **File uploads:** Drag-and-drop and click-to-select support
- **Error display:** Field-level error messages

### **Table Interactions**
- Search functionality across rows
- Filter by status/role/category
- Action buttons with confirmations
- Inline status updates

### **User Feedback**
- Toast notifications (bottom-right)
- Color-coded alerts (success, error, warning, info)
- Modal confirmations for important actions

---

## 📱 Responsive Breakpoints

- **Desktop:** 1200px and above (full layout)
- **Tablet:** 900px - 1199px (2-column grids)
- **Mobile:** Below 900px (single column, collapsed sidebar)

---

## 🔒 Security Considerations

### **Frontend Security**
1. Form validation on client-side (submit to backend for real validation)
2. Password field masking
3. Confirmation dialogs for destructive actions
4. Secure logout button

### **Backend Requirements Checklist**
- [ ] User authentication and JWT tokens
- [ ] Role-based access control (RBAC)
- [ ] Password hashing and verification
- [ ] Rate limiting on API endpoints
- [ ] File upload restrictions and virus scanning
- [ ] Audit logging for admin actions
- [ ] Data encryption in transit (HTTPS)
- [ ] CSRF protection tokens
- [ ] Input sanitization
- [ ] SQL injection prevention

---

## 🔌 API Integration Points

The following APIs need to be implemented on your backend:

### **Employer Dashboard**
```javascript
// Job Management
POST /api/jobs/create                    // Create new job
GET /api/jobs/list                       // Fetch employer's jobs
PUT /api/jobs/{jobId}                    // Update job
DELETE /api/jobs/{jobId}                 // Delete job

// Applicants
GET /api/jobs/{jobId}/applicants         // Get applicants for a job
POST /api/applicants/{appId}/accept      // Accept applicant
POST /api/applicants/{appId}/reject      // Reject applicant

// Messaging
GET /api/messages/inbox                  // Get inbox
POST /api/messages/send                  // Send message
GET /api/messages/{conversationId}       // Get conversation

// Subscription
GET /api/subscription/current             // Current plan
PUT /api/subscription/upgrade            // Upgrade plan
GET /api/payments/history                // Payment history

// Profile
PUT /api/employer/profile                // Update profile
POST /api/employer/documents/upload      // Upload documents
```

### **Admin Dashboard**
```javascript
// Metrics
GET /api/admin/metrics                   // Dashboard overview stats

// Users
GET /api/admin/users/list                // List all users
POST /api/admin/users/{userId}/promote   // Promote to employer
POST /api/admin/users/{userId}/suspend   // Suspend user

// Employers
GET /api/admin/employers/list            // List employers
GET /api/admin/employers/{empId}/verify  // Get verification status
POST /api/admin/employers/{empId}/approve // Approve employer

// Jobs
GET /api/admin/jobs/list                 // List all jobs
POST /api/admin/jobs/{jobId}/approve     // Approve job
POST /api/admin/jobs/{jobId}/reject      // Reject job

// Payments
GET /api/admin/payments/list             // List payments
GET /api/admin/revenue/stats             // Revenue statistics

// Settings
GET /api/admin/categories/list           // List categories
POST /api/admin/categories               // Create category
PUT /api/admin/categories/{catId}        // Update category
DELETE /api/admin/categories/{catId}     // Delete category
```

---

## 🧪 Testing Checklist

### **Employer Dashboard**
- [ ] Navigation between sections works
- [ ] Form validation displays errors
- [ ] File uploads work (drag-and-drop and click)
- [ ] Applicant actions update UI
- [ ] Messages send and display
- [ ] Notifications appear and disappear
- [ ] Responsive design works on mobile
- [ ] Plan information displays correctly
- [ ] Filter tabs work for jobs
- [ ] Search functionality works

### **Admin Dashboard**
- [ ] All metrics display correctly
- [ ] User management table filters work
- [ ] Employer cards display correctly
- [ ] Job approval/rejection works
- [ ] Plan upgrade modal shows options
- [ ] Category management works
- [ ] Settings form saves
- [ ] Search in tables works
- [ ] Responsive design works on mobile
- [ ] Audit log updates with actions

---

## 🐛 Troubleshooting

### **Common Issues**

**Issue:** Sidebar doesn't appear on mobile
- **Solution:** Check CSS media queries, ensure viewport meta tag is present

**Issue:** Form validations not working
- **Solution:** Verify required attributes on form fields, check JavaScript console for errors

**Issue:** Notifications not showing
- **Solution:** Ensure JavaScript is enabled, check z-index conflicts with other elements

**Issue:** Tables not responsive
- **Solution:** Check CSS is loaded, clear browser cache, test in different browser

---

## 📈 Performance Optimization

### **Frontend Optimizations**
1. **Lazy loading** for images (add to production)
2. **CSS minification** (for production)
3. **JavaScript minification** (for production)
4. **Reduce file transfers** with pagination on tables
5. **Cache API responses** where appropriate

### **Backend Optimizations**
1. Database indexing on frequently queried fields
2. Pagination for large data sets
3. Caching strategies for metrics
4. Query optimization
5. CDN for static assets

---

## 📊 Data Structure Examples

### **Job Post Structure**
```javascript
{
  id: "job_123",
  title: "Senior React Developer",
  companyName: "TechCorp Inc.",
  location: "Metro Manila",
  category: "digital",
  tags: ["React", "Remote", "Full-time"],
  description: "...",
  closingDate: "2026-02-20",
  website: "https://techinnovations.com",
  tagline: "Join our innovative team",
  status: "active",
  postedDate: "2026-02-05",
  employerId: "emp_456",
  applicants: 12
}
```

### **Applicant Structure**
```javascript
{
  id: "app_789",
  jobId: "job_123",
  name: "Sarah Johnson",
  email: "sarah@example.com",
  profileSummary: "Full-stack developer with 5+ years experience",
  resume: "/files/sarah_resume.pdf",
  appliedDate: "2026-02-08",
  status: "new" // new, reviewing, accepted, rejected
}
```

### **Subscription Structure**
```javascript
{
  plan: "premium",
  price: 99.00,
  currency: "USD",
  billingCycle: "monthly",
  features: {
    jobPostings: "unlimited",
    messaging: "unlimited",
    analytics: true,
    featuredListings: true,
    supportLevel: "priority"
  },
  status: "active",
  renewalDate: "2026-03-09"
}
```

---

## 📞 Support & Maintenance

### **Regular Maintenance Tasks**
1. Update category list as needed
2. Review and remove spam job posts
3. Monitor payment processing
4. Review admin action logs
5. Update terms and policies
6. Test dashboard functionality

### **Security Audits**
- Perform quarterly security reviews
- Update dependencies regularly
- Test for XSS vulnerabilities
- Review access logs
- Test CSRF protections

---

## 📝 Customization Guide

### **Adding New Metrics to Admin Dashboard**
1. Add metric card HTML in `admin-dashboard.html`
2. Update `metrics-grid` CSS in `admin-dashboard.css`
3. Fetch data via API in `admin-dashboard.js`

### **Adding New Job Categories**
1. Update category dropdown in `employer-dashboard.html`
2. Add category to admin settings
3. Update category list in admin dashboard

### **Changing Color Scheme**
1. Update CSS variables in `:root` of both CSS files
2. Test all components for contrast and accessibility

---

## 📄 License & Usage

This dashboard system is part of the RAKETERO job portal platform. Ensure all usage complies with your organization's policies and applicable laws.

---

## 🎓 Additional Resources

- **Font Used:** Montserrat (Google Fonts)
- **Icons:** Unicode & Emoji
- **Best Practices:** Follows modern web standards
- **Accessibility:** WCAG 2.1 compliant (with ARIA labels)

---

## ✅ Changelog

### Version 1.0 (Current)
- Initial release of Employer Dashboard
- Initial release of Admin Dashboard
- Full feature implementation
- Responsive design across all devices
- Comprehensive documentation

---

**Last Updated:** February 9, 2026

For questions or issues, please contact the development team.

