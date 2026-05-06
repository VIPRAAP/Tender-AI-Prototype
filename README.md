# TenderIQ - AI-Powered Tender Evaluation Platform

A modern SaaS web application for government procurement that uses AI to evaluate tender documents and vendor bids, detect fraud, and provide transparent, explainable results.

## 🎯 Features

### Core Functionality
- **AI-Powered Evaluation**: Automated tender and vendor bid analysis
- **Fraud Detection**: Real-time fraud pattern detection with severity levels
- **Transparent Scoring**: Explainable AI results with detailed breakdowns
- **Audit-Ready Reports**: Generate comprehensive evaluation reports
- **Complete Audit Trail**: Full activity logging for compliance

### Pages & Modules

#### 1. **Dashboard**
- Real-time statistics (Total Tenders, Active Evaluations, Fraud Alerts, Avg Time)
- Interactive charts (Vendor Scores Bar Chart, Status Distribution Pie Chart)
- Recent activity feed
- Quick access to upload new tenders

#### 2. **Upload Tender**
- Drag & drop file upload
- Upload tender documents (PDF)
- Upload multiple vendor bids
- Real-time upload progress
- File preview and management

#### 3. **AI Processing**
- Live processing pipeline visualization
- Step-by-step progress tracking:
  - Parsing tender document
  - Extracting eligibility criteria
  - Checking vendor documents
  - Running fraud detection
  - Scoring vendors
- Auto-redirect to results

#### 4. **Evaluations**
- Split-screen vendor comparison
- Detailed vendor information:
  - Technical, Financial, and Final Scores
  - Eligibility checklist with pass/fail status
  - Fraud alerts and flags
  - AI-generated explanations
- Interactive vendor selection
- Status badges (Pass/Fail/Review)

#### 5. **Fraud Alerts**
- Comprehensive fraud monitoring dashboard
- Filterable alerts by severity (High/Medium/Low)
- Detailed fraud flag information:
  - Duplicate PAN detection
  - Suspicious patterns
  - Low turnover/experience alerts
- Statistics breakdown

#### 6. **Reports**
- Multiple report templates:
  - Full Evaluation Report
  - Vendor Comparison Report
  - Fraud Detection Report
- Download PDF reports
- Print functionality
- Share reports

#### 7. **Audit Logs**
- Complete activity tracking
- Search and filter capabilities
- User and system action logs
- IP address tracking
- Timestamp information
- Statistics dashboard

#### 8. **Settings**
- Profile management
- Security settings (password change, 2FA)
- Notification preferences
- Theme toggle (Dark mode - coming soon)

### Authentication
- **Login/Signup**: Secure authentication flow
- **Role-based Access**: Officer and Admin roles
- **Session Management**: Persistent login state
- **Protected Routes**: Automatic redirection

## 🎨 Design

### Color Palette
- **Primary**: Deep Blue (#1E3A8A)
- **Secondary**: Indigo (#4F46E5)
- **Accent**: Emerald Green (#10B981)
- **Danger**: Red (#EF4444)
- **Background**: Light Gray (#F9FAFB)

### Typography
- **Headings**: Inter/System UI (Bold)
- **Body**: Inter/System UI (Regular)
- **Clear visual hierarchy**

### UI/UX Principles
- Clean, modern government-tech dashboard
- Data-heavy but minimal interface
- Rounded cards with soft shadows
- Smooth transitions and animations
- Status badges for quick recognition
- Responsive design (Desktop-first)

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd tenderiq
```

2. Install dependencies
```bash
npm install
```

3. Start development server
```bash
npm run dev
```

4. Build for production
```bash
npm run build
```

### Demo Credentials
For testing purposes, any email/password combination will work in the login form.

## 🛠️ Technology Stack

- **Frontend Framework**: React 19.2.3 with TypeScript
- **Build Tool**: Vite 7.3.2
- **Styling**: Tailwind CSS 4.1.17
- **Routing**: React Router DOM
- **Charts**: Recharts
- **Icons**: Lucide React
- **Date Formatting**: date-fns

## 📊 Mock Data

The application uses simulated data for demonstration:

- **Vendors**: Pre-configured with varying scores and statuses
- **Fraud Detection**: Mock fraud flags (Duplicate PAN, Suspicious Patterns, etc.)
- **Eligibility Criteria**: Turnover, Experience, Certifications
- **Evaluation Logic**: 
  - Turnover < Required → Fail
  - Missing Certification → Fail
  - Fraud Flags → Review
  - All criteria met → Pass

## 🔒 Security Features

- **Document Verification**: Hash-based document integrity
- **Audit Logging**: Complete activity trail
- **Role-based Access**: Officer/Admin permissions
- **Secure Upload**: Validated file uploads
- **2FA Ready**: Two-factor authentication support

## 📱 Responsive Design

- **Desktop**: Full-featured experience (1024px+)
- **Tablet**: Optimized layout (768px - 1023px)
- **Mobile**: Basic viewing support (< 768px)

## 🎯 Key Interactions

- **Click vendor** → Updates details panel
- **Hover elements** → Shows tooltips
- **Filter alerts** → Real-time updates
- **Smooth transitions** → Enhanced UX
- **Empty states** → Clear messaging

## 📈 Future Enhancements

- [ ] Dark mode theme
- [ ] Voice note explanations
- [ ] Risk score gauge meter
- [ ] Real API integration
- [ ] Advanced analytics
- [ ] Export to Excel
- [ ] Multi-language support
- [ ] Mobile app

## 🏛️ Government Compliance

- Audit-ready reporting
- Complete transparency
- Bias elimination
- Full traceability
- Secure data handling

## 📄 License

This is a prototype/demo application built for demonstration purposes.

## 👥 Support

For issues, questions, or feedback, please contact the development team.

---

**TenderIQ** - Making government procurement transparent, efficient, and corruption-free through AI.
