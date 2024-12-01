// types/reports.ts
export interface BaseReport {
  _id: string;
  submissionDate: string;
  status: 'pending' | 'in-review' | 'completed';
}

// Types/reports.ts
export interface RomanceReport extends BaseReport {
  fullName: string;
  email: string;
  locationOfPartner: string;
  country: string;
  personName: string;
  contactDuration: string;
  meetingPlace: string;
  otherMeetingPlace?: string;
  metInRealLife: string;
  whyNotMet?: string;
  communicationFrequency: string;
  discussionTopics: string;
  sharedPhotosVideos: string;
  photosAuthentic?: string;
  photoUpload?: {
    url: string;
    publicId: string;
  };
  askedForMoney: string;
  moneyAmount?: number;
  moneyPurpose?: string;
  personalInfoShared: string;
  suspiciousBehavior: string;
  submissionDate: string;
  status: 'pending' | 'in-review' | 'completed';
  riskAssessment: {
        riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
        riskFactors: string[];
        recommendations: string[];
        score: number;
    };
}

export interface PlatformReport extends BaseReport {
  // Existing fields
  name: string;
  platform: string;
  status: 'pending' | 'in-review' | 'completed';
  
  // New fields to match component usage
  fullName: string;
  email: string;
  websiteURL: string;
  platformType: string;
  moneyInvolved: string | number;
  investmentAmount?: number;
  contactMethods: string;
  suspiciousFeatures: string;
  screenshot?: {
    url: string;
    publicId?: string;
  };
  riskAssessment: {
        riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
        riskFactors: string[];
        recommendations: string[];
        score: number;
    };
}

export interface VendorReport extends BaseReport {
  // Basic Information
  fullName: string;
  email: string;
  
  // Vendor Details
  socialMediaPlatform: 'facebook' | 'instagram' | 'tiktok' | 'whatsapp' | 'telegram' | 'other';
  accountUsername: string;
  accountURL: string;
  
  // Business Information
  businessType: 'retail' | 'investment' | 'services' | 'dropshipping' | 'other';
  businessCategory: string;
  priceRange: string;
  
  // Payment & Delivery
  paymentMethods: string[];
  deliveryMethod: string[];
  
  // Account Verification
  accountAge: string;
  followersCount: string;
  hasBusinessProfile: boolean;
  verifiedAccount: boolean;
  
  // Customer Protection
  hasRefundPolicy: boolean;
  refundPolicyDetails?: string;
  
  // Risk Indicators
  urgencyTactics: boolean;
  limitedTimeOffers: boolean;
  requestsPersonalBanking: boolean;
  prePaymentRequired: boolean;
  suspiciousFeatures: string;
  
  // Evidence
  screenshots: {
    url: string;
    publicId: string;
  }[];
  
  // Assessment
  riskAssessment: {
    riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
    score: number;
    riskFactors: string[];
    recommendations: string[];
    summary: string;
  };
}