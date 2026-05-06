export interface User {
  id: string;
  email: string;
  name: string;
  role: 'Officer' | 'Admin';
}

export interface Vendor {
  id: string;
  name: string;
  turnover: number; // in crores
  experience: number; // in years
  hasCertification: boolean;
  technicalScore: number;
  financialScore: number;
  finalScore: number;
  status: 'Pass' | 'Fail' | 'Review';
  fraudFlags: FraudFlag[];
  eligibilityCriteria: EligibilityCriterion[];
  documentHash?: string;
  submittedAt: Date;
}

export interface FraudFlag {
  type: string;
  severity: 'High' | 'Medium' | 'Low';
  description: string;
  detectedAt: Date;
}

export interface EligibilityCriterion {
  name: string;
  required: string | number;
  actual: string | number;
  passed: boolean;
}

export interface Tender {
  id: string;
  name: string;
  uploadedAt: Date;
  status: 'Processing' | 'Completed' | 'Draft';
  vendorCount: number;
  vendors: Vendor[];
  requirements: {
    minTurnover: number;
    minExperience: number;
    certificationsRequired: string[];
  };
  evaluatedAt?: Date;
  documentHash?: string;
}

export interface AuditLog {
  id: string;
  action: string;
  user: string;
  timestamp: Date;
  ipAddress: string;
  details?: string;
}

export interface DashboardStats {
  totalTenders: number;
  activeEvaluations: number;
  fraudAlerts: number;
  avgEvaluationTime: string;
}

export interface ProcessingStep {
  id: string;
  label: string;
  status: 'pending' | 'processing' | 'completed';
}
