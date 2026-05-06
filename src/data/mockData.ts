import { Tender, Vendor, AuditLog, DashboardStats, FraudFlag, EligibilityCriterion } from '../types';

export const generateMockVendors = (tenderId: string): Vendor[] => {
  const vendors: Vendor[] = [
    {
      id: `${tenderId}-v1`,
      name: 'ABC Infrastructure Pvt Ltd',
      turnover: 12.5,
      experience: 8,
      hasCertification: true,
      technicalScore: 85,
      financialScore: 90,
      finalScore: 87.5,
      status: 'Pass',
      fraudFlags: [],
      eligibilityCriteria: [
        { name: 'Minimum Turnover', required: '₹10Cr', actual: '₹12.5Cr', passed: true },
        { name: 'Experience', required: '5 years', actual: '8 years', passed: true },
        { name: 'ISO Certification', required: 'Yes', actual: 'Yes', passed: true },
      ],
      documentHash: 'a3f5c8d9e1b2...',
      submittedAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000),
    },
    {
      id: `${tenderId}-v2`,
      name: 'BuildCorp Solutions',
      turnover: 8.0,
      experience: 6,
      hasCertification: false,
      technicalScore: 70,
      financialScore: 60,
      finalScore: 65,
      status: 'Fail',
      fraudFlags: [
        {
          type: 'Low Turnover',
          severity: 'High',
          description: 'Turnover ₹8Cr is below required ₹10Cr',
          detectedAt: new Date(),
        },
        {
          type: 'Missing Certification',
          severity: 'High',
          description: 'ISO certification not provided',
          detectedAt: new Date(),
        },
      ],
      eligibilityCriteria: [
        { name: 'Minimum Turnover', required: '₹10Cr', actual: '₹8Cr', passed: false },
        { name: 'Experience', required: '5 years', actual: '6 years', passed: true },
        { name: 'ISO Certification', required: 'Yes', actual: 'No', passed: false },
      ],
      documentHash: 'b4e7d2f8c3a1...',
      submittedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    },
    {
      id: `${tenderId}-v3`,
      name: 'TechBuild Enterprises',
      turnover: 15.0,
      experience: 10,
      hasCertification: true,
      technicalScore: 92,
      financialScore: 88,
      finalScore: 90,
      status: 'Pass',
      fraudFlags: [],
      eligibilityCriteria: [
        { name: 'Minimum Turnover', required: '₹10Cr', actual: '₹15Cr', passed: true },
        { name: 'Experience', required: '5 years', actual: '10 years', passed: true },
        { name: 'ISO Certification', required: 'Yes', actual: 'Yes', passed: true },
      ],
      documentHash: 'c5f8e3a9d4b2...',
      submittedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    },
    {
      id: `${tenderId}-v4`,
      name: 'QuickBuild Co.',
      turnover: 11.0,
      experience: 7,
      hasCertification: true,
      technicalScore: 78,
      financialScore: 82,
      finalScore: 80,
      status: 'Review',
      fraudFlags: [
        {
          type: 'Duplicate PAN',
          severity: 'High',
          description: 'PAN number matches another vendor in system',
          detectedAt: new Date(),
        },
        {
          type: 'Suspicious Pattern',
          severity: 'Medium',
          description: 'Similar bid values to another vendor (variation <2%)',
          detectedAt: new Date(),
        },
      ],
      eligibilityCriteria: [
        { name: 'Minimum Turnover', required: '₹10Cr', actual: '₹11Cr', passed: true },
        { name: 'Experience', required: '5 years', actual: '7 years', passed: true },
        { name: 'ISO Certification', required: 'Yes', actual: 'Yes', passed: true },
      ],
      documentHash: 'd6a9f4b2e5c3...',
      submittedAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000),
    },
    {
      id: `${tenderId}-v5`,
      name: 'MegaProjects India',
      turnover: 9.5,
      experience: 4,
      hasCertification: true,
      technicalScore: 65,
      financialScore: 68,
      finalScore: 66.5,
      status: 'Fail',
      fraudFlags: [
        {
          type: 'Insufficient Experience',
          severity: 'High',
          description: 'Experience of 4 years is below required 5 years',
          detectedAt: new Date(),
        },
        {
          type: 'Low Turnover',
          severity: 'Medium',
          description: 'Turnover ₹9.5Cr is marginally below required ₹10Cr',
          detectedAt: new Date(),
        },
      ],
      eligibilityCriteria: [
        { name: 'Minimum Turnover', required: '₹10Cr', actual: '₹9.5Cr', passed: false },
        { name: 'Experience', required: '5 years', actual: '4 years', passed: false },
        { name: 'ISO Certification', required: 'Yes', actual: 'Yes', passed: true },
      ],
      documentHash: 'e7b2c5d8f3a4...',
      submittedAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
    },
  ];

  return vendors;
};

export const generateMockTenders = (): Tender[] => {
  const tender1: Tender = {
    id: 't1',
    name: 'Highway Construction Project - NH44',
    uploadedAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    status: 'Completed',
    vendorCount: 5,
    vendors: generateMockVendors('t1'),
    requirements: {
      minTurnover: 10,
      minExperience: 5,
      certificationsRequired: ['ISO 9001', 'ISO 14001'],
    },
    evaluatedAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
    documentHash: 'f8c3d6a9e2b5...',
  };

  const tender2: Tender = {
    id: 't2',
    name: 'Smart City Infrastructure - Phase 2',
    uploadedAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
    status: 'Processing',
    vendorCount: 8,
    vendors: [],
    requirements: {
      minTurnover: 15,
      minExperience: 7,
      certificationsRequired: ['ISO 9001', 'ISO 27001'],
    },
    documentHash: 'g9d4e7b2f6c8...',
  };

  const tender3: Tender = {
    id: 't3',
    name: 'Metro Rail Extension Project',
    uploadedAt: new Date(Date.now() - 14 * 24 * 60 * 60 * 1000),
    status: 'Completed',
    vendorCount: 3,
    vendors: generateMockVendors('t3'),
    requirements: {
      minTurnover: 20,
      minExperience: 10,
      certificationsRequired: ['ISO 9001', 'ISO 45001'],
    },
    evaluatedAt: new Date(Date.now() - 10 * 24 * 60 * 60 * 1000),
    documentHash: 'h1e5f8c3a7d9...',
  };

  return [tender1, tender2, tender3];
};

export const generateMockAuditLogs = (): AuditLog[] => {
  return [
    {
      id: 'a1',
      action: 'Tender Uploaded',
      user: 'officer@gov.in',
      timestamp: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
      ipAddress: '192.168.1.100',
      details: 'Highway Construction Project - NH44',
    },
    {
      id: 'a2',
      action: 'Evaluation Started',
      user: 'officer@gov.in',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      ipAddress: '192.168.1.100',
      details: 'Tender ID: t1',
    },
    {
      id: 'a3',
      action: 'Fraud Alert Generated',
      user: 'system',
      timestamp: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000),
      ipAddress: '127.0.0.1',
      details: 'Duplicate PAN detected - QuickBuild Co.',
    },
    {
      id: 'a4',
      action: 'Report Downloaded',
      user: 'admin@gov.in',
      timestamp: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000),
      ipAddress: '192.168.1.105',
      details: 'Tender ID: t1',
    },
    {
      id: 'a5',
      action: 'Tender Uploaded',
      user: 'officer@gov.in',
      timestamp: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
      ipAddress: '192.168.1.100',
      details: 'Smart City Infrastructure - Phase 2',
    },
    {
      id: 'a6',
      action: 'User Login',
      user: 'officer@gov.in',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
      ipAddress: '192.168.1.100',
      details: 'Successful login',
    },
    {
      id: 'a7',
      action: 'Settings Updated',
      user: 'admin@gov.in',
      timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000),
      ipAddress: '192.168.1.105',
      details: 'Security settings modified',
    },
  ];
};

export const getDashboardStats = (): DashboardStats => {
  return {
    totalTenders: 24,
    activeEvaluations: 3,
    fraudAlerts: 8,
    avgEvaluationTime: '2.5 hrs',
  };
};
