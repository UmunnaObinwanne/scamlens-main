// Types
interface RiskAssessment {
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  riskFactors: string[];
  recommendations: string[];
  score: number;
}

interface DetailedReport {
  reportId: string;
  submissionDate: Date;
  personDetails: {
    name: string;
    location: string;
  };
  relationshipDetails: {
    duration: string;
    meetingPlatform: string;
    communicationFrequency: string;
    hasMetInPerson: boolean;
    reasonsNotMet?: string;
  };
  financialInvolvement: {
    moneyRequested: boolean;
    amount?: number;
    purpose?: string;
  };
  identityVerification: {
    sharedPhotos: boolean;
    photosAuthentic?: boolean;
    photoEvidence?: {
      url: string;
      publicId: string;
    };
  };
  riskAssessment: RiskAssessment;
  personalInfoShared: string;
  suspiciousPatterns: string[];
  recommendationsImmediate: string[];
  recommendationsGeneral: string[];
}

// Risk Assessment Function
function analyzeRomanceScamRisk(formData: any): RiskAssessment {
  let riskScore = 0;
  const riskFactors: string[] = [];
  const recommendations: string[] = [];

  // Location-based risk
  if (formData.locationOfPartner) {
    const highRiskCountries = ['Nigeria', 'Ghana', 'Ivory Coast', 'Philippines'];
    if (highRiskCountries.some(country => 
        formData.locationOfPartner.toLowerCase().includes(country.toLowerCase()))) {
      riskScore += 20;
      riskFactors.push('Person located in high-risk region for romance scams');
      recommendations.push('Exercise extra caution with individuals from known scam hotspots');
    }
  }

  // Meeting in person
  if (formData.metInRealLife === 'no') {
    riskScore += 15;
    riskFactors.push('Never met in person');
    recommendations.push('Request video calls to verify identity');
    
    // Analyze excuses for not meeting
    if (formData.whyNotMet) {
      const suspiciousExcuses = ['work abroad', 'military', 'stuck', 'visa issues', 'accident'];
      if (suspiciousExcuses.some(excuse => 
          formData.whyNotMet.toLowerCase().includes(excuse))) {
        riskScore += 10;
        riskFactors.push('Common scammer excuses for not meeting detected');
      }
    }
  }

  // Financial requests
  if (formData.askedForMoney === 'yes') {
    riskScore += 30;
    riskFactors.push('Requested financial assistance');
    recommendations.push('Never send money to someone you haven\'t met in person');
    
    if (formData.moneyPurpose) {
      const suspiciousReasons = [
        'emergency', 'medical', 'ticket', 'visa', 'business', 
        'investment', 'family emergency', 'stuck'
      ];
      if (suspiciousReasons.some(reason => 
          formData.moneyPurpose.toLowerCase().includes(reason))) {
        riskScore += 15;
        riskFactors.push('Common scammer financial request patterns detected');
      }
    }
    
    const amount = parseFloat(formData.moneyAmount || '0');
    if (amount > 1000) {
      riskScore += 20;
      riskFactors.push('Large amount of money requested');
      recommendations.push('Large financial requests are a major red flag');
    }
  }

  // Photo verification
  if (formData.sharedPhotosVideos === 'yes') {
    if (formData.photosAuthentic === 'no') {
      riskScore += 25;
      riskFactors.push('Shared suspicious or unverifiable photos');
      recommendations.push('Perform reverse image searches on shared photos');
    }
  }

  // Communication patterns
  if (formData.communicationFrequency === 'excessive') {
    riskScore += 10;
    riskFactors.push('Excessive communication frequency');
    recommendations.push('Be wary of love-bombing and excessive attention');
  }

  // Suspicious behavior analysis
  const suspiciousPatterns = {
    'money': 15,
    'investment': 20,
    'urgent': 15,
    'secret': 10,
    'business opportunity': 20,
    'inheritance': 25,
    'gold': 20,
    'cryptocurrency': 20
  };

  const behavior = formData.suspiciousBehavior.toLowerCase();
  Object.entries(suspiciousPatterns).forEach(([pattern, score]) => {
    if (behavior.includes(pattern)) {
      riskScore += score;
      riskFactors.push(`Suspicious behavior pattern: ${pattern}`);
      recommendations.push(`Be cautious of discussions involving ${pattern}`);
    }
  });

  // Personal information shared
  if (formData.personalInfoShared) {
    const sensitiveInfo = ['bank', 'credit card', 'passport', 'social security', 'id'];
    if (sensitiveInfo.some(info => formData.personalInfoShared.toLowerCase().includes(info))) {
      riskScore += 25;
      riskFactors.push('Sensitive personal information requested');
      recommendations.push('Never share sensitive personal or financial information');
    }
  }

  // Determine risk level
  let riskLevel: RiskAssessment['riskLevel'];
  if (riskScore < 30) riskLevel = 'Low';
  else if (riskScore < 60) riskLevel = 'Medium';
  else if (riskScore < 90) riskLevel = 'High';
  else riskLevel = 'Critical';

  return {
    riskLevel,
    riskFactors,
    recommendations,
    score: riskScore
  };
}

export { analyzeRomanceScamRisk, type DetailedReport, type RiskAssessment };