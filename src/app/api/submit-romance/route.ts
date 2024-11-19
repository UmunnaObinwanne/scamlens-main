import { NextRequest, NextResponse } from "next/server";
import { connectToMongoDB } from '../../../../Lib/db';
import RomanceScamReport from "../../../../Models/RomanceFormSchema";
import { v2 as cloudinary } from 'cloudinary';
import { UploadApiResponse } from 'cloudinary';


interface FormFields {
  fullName: string;
  email: string;
  country: string;
  address: string;
  locationOfPartner: string;
  personName: string;
  contactDuration: string;
  meetingPlace: string;
  otherMeetingPlace: string;
  metInRealLife: string;
  whyNotMet: string;
  communicationFrequency: string;
  discussionTopics: string;
  sharedPhotosVideos: string;
  photosAuthentic: string;
  askedForMoney: string;
  moneyAmount: string;
  moneyPurpose: string;
  personalInfoShared: string;
  suspiciousBehavior: string;
  photoUpload: {
    url: string;
    publicId: string;
  } | null;
}

interface RiskIndicators {
  timelineRisk: string;
  locationRisk: string;
  behavioralRisk: string;
  financialRisk: string;
  identityRisk: string;
}

interface DetailedReport {
  reportId: string;
  submissionDate: Date;
  victimProfile: {
    location: string;
    exposureLevel: string;
    financialRisk: boolean;
  };
  scammerProfile: {
    reportedLocation: string;
    communicationPattern: string;
    identityVerification: string;
    financialRequests: boolean;
    requestedAmount?: number;
    statedPurpose?: string;
  };
  riskIndicators: RiskIndicators;
  analysisDetails: {
    suspiciousPatterns: string[];
    redFlags: string[];
    vulnerabilityFactors: string[];
  };
  recommendedActions: {
    immediate: string[];
    preventive: string[];
    supportResources: string[];
  };
  evidenceAttached: {
    hasPhotos: boolean;
    photoAnalysis?: string;
    photoURL?: string;
  };
}

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Utility function to generate unique report IDs
function generateReportId(): string {
  const prefix = 'RSC'; // Romance Scam Case
  const timestamp = Date.now().toString(36);
  const random = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}

interface RiskAssessment {
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  riskFactors: string[];
  recommendations: string[];
  score: number;
}

function evaluateRomanceScamRisk(formData: any): RiskAssessment {
  let riskScore = 0;
  const riskFactors: string[] = [];

  // Helper function to add risk factor
  const addRiskFactor = (score: number, reason: string) => {
    riskScore += score;
    riskFactors.push(reason);
  };

  // 1. Contact Duration Risk
  const durationRiskMap: { [key: string]: number } = {
    'less-than-week': 100,
    '1-4-weeks': 80,
    '1-3-months': 60,
    '3-6-months': 40,
    'more-than-6-months': 20
  };

  if (durationRiskMap[formData.contactDuration]) {
    addRiskFactor(
      durationRiskMap[formData.contactDuration],
      `Contact duration: ${formData.contactDuration}`
    );
  }

  // 2. Meeting Place Risk
  const highRiskMeetingPlaces = [
    'dating-website',
    'social-media',
    'chat-room',
    'messaging-app',
    'other'
  ];

  if (highRiskMeetingPlaces.includes(formData.meetingPlace)) {
    addRiskFactor(80, `Met through ${formData.meetingPlace}`);
  }

  // 3. Location Risk Analysis
  const highRiskLocations = [
    'iraq', 'afghanistan', 'nigeria', 'ghana',
    'united states', 'us', 'usa', 'syria'
  ];

  if (formData.locationOfPartner && 
      highRiskLocations.some(loc => 
        formData.locationOfPartner.toLowerCase().includes(loc))) {
    addRiskFactor(85, `High-risk location: ${formData.locationOfPartner}`);
  }

  // 4. Communication Pattern Risk
  if (formData.communicationFrequency === 'daily') {
    addRiskFactor(60, "Intensive daily communication pattern");
  }

  // 5. Real Life Meeting Analysis
  if (formData.metInRealLife === 'no') {
    addRiskFactor(90, "No real-life meeting");
    
    if (formData.whyNotMet) {
      const suspiciousExcuses = ['busy', 'work', 'travel', 'covid', 'virus', 'cant', 'cannot'];
      if (suspiciousExcuses.some(excuse => 
          formData.whyNotMet.toLowerCase().includes(excuse))) {
        addRiskFactor(70, "Suspicious reasons for not meeting");
      }
    }
  }

  // 6. Photo/Identity Verification Risk
  if (formData.sharedPhotosVideos === 'yes') {
    if (formData.photosAuthentic === 'no') {
      addRiskFactor(90, "Potentially fake photos shared");
    } else if (!formData.photoUpload) {
      addRiskFactor(50, "Photos shared but not provided for verification");
    }
  }

  // 7. Financial Risk Assessment
  if (formData.askedForMoney === 'yes') {
    addRiskFactor(100, "Requested money");
    
    if (formData.moneyAmount && parseInt(formData.moneyAmount) > 1000) {
      addRiskFactor(50, `Large amount requested: ${formData.moneyAmount}`);
    }

    if (formData.moneyPurpose) {
      const suspiciousPurposes = ['emergency', 'medical', 'business', 'investment', 'travel'];
      if (suspiciousPurposes.some(purpose => 
          formData.moneyPurpose.toLowerCase().includes(purpose))) {
        addRiskFactor(40, "Suspicious purpose for money request");
      }
    }
  }

  // 8. Personal Information Risk
  if (formData.personalInfoShared === 'yes') {
    addRiskFactor(75, "Personal information already shared");
  }

  // Calculate final risk metrics
  const normalizedScore = Math.min(100, Math.round(riskScore / 5));
  let riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  
  if (normalizedScore >= 80) riskLevel = 'Critical';
  else if (normalizedScore >= 60) riskLevel = 'High';
  else if (normalizedScore >= 40) riskLevel = 'Medium';
  else riskLevel = 'Low';

  const recommendations = generateRecommendations(riskLevel);

  return {
    riskLevel,
    riskFactors,
    recommendations,
    score: normalizedScore
  };
}

function generateRecommendations(riskLevel: string): string[] {
  const recommendations: string[] = [];

  if (riskLevel === 'Critical' || riskLevel === 'High') {
    recommendations.push(
      'IMMEDIATE ACTIONS REQUIRED:',
      '• Cease all contact immediately',
      '• Do not send any money or personal information',
      '• Report to local law enforcement',
      '• Contact your bank if any financial information was shared',
      '• Document and save all communications',
      '• Report to the relevant dating platform or website',
      '• Consider filing a report with national fraud center'
    );
  } else if (riskLevel === 'Medium') {
    recommendations.push(
      'PROCEED WITH EXTREME CAUTION:',
      '• Do not share any financial information',
      '• Verify identity through video chat',
      '• Meet in public places only',
      '• Be wary of urgent requests',
      '• Document suspicious behavior',
      '• Consider requesting local references'
    );
  } else {
    recommendations.push(
      'GENERAL SAFETY GUIDELINES:',
      '• Continue normal online dating precautions',
      '• Meet in public places',
      '• Keep personal information private',
      '• Trust your instincts',
      '• Maintain awareness of common scam tactics'
    );
  }

  return recommendations;
}

// This is the start. First add these helper functions after your generateRecommendations function:
function evaluateTimelineRisk(duration: string): string {
  const highRiskDurations = ['less-than-week', '1-4-weeks'];
  return highRiskDurations.includes(duration) ? 'High' : 'Moderate';
}

function evaluateLocationRisk(location: string): string {
  const highRiskLocations = ['iraq', 'afghanistan', 'nigeria', 'ghana', 'united states', 'us', 'usa'];
  return highRiskLocations.some(loc => location.toLowerCase().includes(loc)) ? 'High' : 'Moderate';
}

function evaluateBehavioralRisk(formData: any): string {
  let riskFactors = 0;
  if (formData.communicationFrequency === 'daily') riskFactors++;
  if (formData.metInRealLife === 'no') riskFactors++;
  if (formData.askedForMoney === 'yes') riskFactors++;
  return riskFactors >= 2 ? 'High' : 'Moderate';
}

function evaluateFinancialRisk(formData: any): string {
  if (formData.askedForMoney === 'yes' && parseInt(formData.moneyAmount) > 1000) return 'Critical';
  if (formData.askedForMoney === 'yes') return 'High';
  return 'Low';
}

function evaluateIdentityRisk(formData: any): string {
  if (formData.metInRealLife === 'no' && formData.photosAuthentic === 'no') return 'Critical';
  if (formData.metInRealLife === 'no') return 'High';
  return 'Moderate';
}

function identifySuspiciousPatterns(formData: any): string[] {
  const patterns: string[] = [];
  
  if (formData.communicationFrequency === 'daily') {
    patterns.push('Intensive daily communication');
  }
  
  if (formData.askedForMoney === 'yes') {
    patterns.push('Financial requests present');
  }
  
  if (formData.metInRealLife === 'no') {
    patterns.push('Avoids in-person meetings');
  }

  return patterns;
}

function identifyRedFlags(formData: any): string[] {
  const redFlags: string[] = [];
  
  if (formData.askedForMoney === 'yes') {
    redFlags.push('Requests for money');
  }
  
  if (formData.photosAuthentic === 'no') {
    redFlags.push('Potentially fake photos');
  }
  
  if (formData.personalInfoShared === 'yes') {
    redFlags.push('Personal information compromised');
  }

  return redFlags;
}

function identifyVulnerabilityFactors(formData: any): string[] {
  const factors: string[] = [];
  
  if (formData.personalInfoShared === 'yes') {
    factors.push('Personal information exposed');
  }
  
  if (formData.askedForMoney === 'yes') {
    factors.push('Financial vulnerability');
  }
  
  if (formData.communicationFrequency === 'daily') {
    factors.push('Emotional dependency risk');
  }

  return factors;
}

function generatePreventiveActions(riskLevel: string): string[] {
  const baseActions = [
    'Keep all communication records',
    'Never share financial information',
    'Use reverse image search for photos',
    'Verify identity through video calls'
  ];

  if (riskLevel === 'Critical' || riskLevel === 'High') {
    return [
      ...baseActions,
      'Block all contact methods',
      'Report to dating platform',
      'Monitor credit reports',
      'Change shared passwords'
    ];
  }

  return baseActions;
}

function generateSupportResources(): string[] {
  return [
    'Contact local law enforcement',
    `Report to FBI's Internet Crime Complaint Center (IC3)`,
    'Seek support from romance scam victim groups',
    'Consider professional counseling'
  ];
}

// Then replace your existing generateDetailedReport function with this updated version:
function generateDetailedReport(formData: any, riskAssessment: RiskAssessment) {
  return {
    reportId: generateReportId(),
    submissionDate: new Date(),
    victimProfile: {
      location: formData.country,
      exposureLevel: formData.personalInfoShared === 'yes' ? 'High' : 'Low',
      financialRisk: formData.askedForMoney === 'yes'
    },
    scammerProfile: {
      reportedLocation: formData.locationOfPartner || 'Unknown',
      communicationPattern: formData.communicationFrequency,
      identityVerification: formData.metInRealLife === 'yes' ? 'Verified' : 'Unverified',
      financialRequests: formData.askedForMoney === 'yes',
      requestedAmount: formData.moneyAmount ? parseFloat(formData.moneyAmount) : undefined,
      statedPurpose: formData.moneyPurpose
    },
    riskIndicators: {
      timelineRisk: evaluateTimelineRisk(formData.contactDuration),
      locationRisk: evaluateLocationRisk(formData.locationOfPartner || ''),
      behavioralRisk: evaluateBehavioralRisk(formData),
      financialRisk: evaluateFinancialRisk(formData),
      identityRisk: evaluateIdentityRisk(formData)
    },
    analysisDetails: {
      suspiciousPatterns: identifySuspiciousPatterns(formData),
      redFlags: identifyRedFlags(formData),
      vulnerabilityFactors: identifyVulnerabilityFactors(formData)
    },
    recommendedActions: {
      immediate: riskAssessment.recommendations
        .filter(r => r.startsWith('•'))
        .map(r => r.substring(2)), // Remove bullet points
      preventive: generatePreventiveActions(riskAssessment.riskLevel),
      supportResources: generateSupportResources()
    },
    evidenceAttached: {
      hasPhotos: !!formData.photoUpload,
      photoAnalysis: formData.sharedPhotosVideos === 'yes' ? 
        (formData.photosAuthentic === 'no' ? 
          'Photos reported as potentially inauthentic' : 
          'Photos provided for verification'
        ) : 'No photos shared',
      photoURL: formData.photoUpload?.url
    }
  };
}

export async function POST(request: NextRequest) {
  await connectToMongoDB();

  try {
    const formData = await request.formData();
    
    // Handle photo upload
    let photoUploadData = null;
    if (formData.get('sharedPhotosVideos') === 'yes' && formData.get('photosAuthentic') === 'yes') {
      const photoFile = formData.get('photoUpload');
      if (photoFile && typeof photoFile !== 'string') {
        try {
          const fileBuffer = Buffer.from(await (photoFile as Blob).arrayBuffer());
          const fileBase64 = fileBuffer.toString('base64');
          const dataURI = `data:${photoFile.type};base64,${fileBase64}`;

          const uploadResponse = await new Promise<UploadApiResponse>((resolve, reject) => {
            cloudinary.uploader.upload(
              dataURI,
              {
                folder: 'romance_scam_photos',
                resource_type: 'auto',
              },
              (error, result) => {
                if (error) reject(error);
                else resolve(result as UploadApiResponse);
              }
            );
          });

          photoUploadData = {
            url: uploadResponse.secure_url,
            publicId: uploadResponse.public_id,
          };
        } catch (uploadError) {
          console.error("Error uploading file:", uploadError);
        }
      }
    }

    // Extract form fields
    const formFields: FormFields = {
      fullName: formData.get('fullName') as string,
      email: formData.get('email') as string,
      country: formData.get('country') as string,
      address: formData.get('address') as string,
      locationOfPartner: formData.get('locationOfPartner') as string,
      personName: formData.get('personName') as string,
      contactDuration: formData.get('contactDuration') as string,
      meetingPlace: formData.get('meetingPlace') as string,
      otherMeetingPlace: formData.get('otherMeetingPlace') as string,
      metInRealLife: formData.get('metInRealLife') as string,
      whyNotMet: formData.get('whyNotMet') as string,
      communicationFrequency: formData.get('communicationFrequency') as string,
      discussionTopics: formData.get('discussionTopics') as string,
      sharedPhotosVideos: formData.get('sharedPhotosVideos') as string,
      photosAuthentic: formData.get('photosAuthentic') as string,
      askedForMoney: formData.get('askedForMoney') as string,
      moneyAmount: formData.get('moneyAmount') as string,
      moneyPurpose: formData.get('moneyPurpose') as string,
      personalInfoShared: formData.get('personalInfoShared') as string,
      suspiciousBehavior: formData.get('suspiciousBehavior') as string,
      photoUpload: photoUploadData
    };

    // Validate required fields
    const requiredFields: (keyof FormFields)[] = [
      'fullName', 'email', 'country', 'address', 'personName',
      'contactDuration', 'meetingPlace', 'metInRealLife',
      'communicationFrequency', 'discussionTopics', 'sharedPhotosVideos',
      'askedForMoney', 'personalInfoShared', 'suspiciousBehavior'
    ];

    const missingFields = requiredFields.filter(field => !formFields[field]);
    if (missingFields.length > 0) {
      return NextResponse.json({
        success: false,
        error: `Missing required fields: ${missingFields.join(', ')}`
      }, { status: 400 });
    }

    // Perform risk assessment and generate report
    const riskAssessment = evaluateRomanceScamRisk(formFields);
    const detailedReport = generateDetailedReport(formFields, riskAssessment);

    // Create new report object with all components
    const newReport = {
  ...formFields,
  moneyAmount: formFields.moneyAmount ? parseFloat(formFields.moneyAmount) : undefined,
  submissionDate: new Date(),
  riskAssessment: {
    riskLevel: riskAssessment.riskLevel,
    riskFactors: riskAssessment.riskFactors,
    recommendations: riskAssessment.recommendations,
    score: riskAssessment.score
  },
  detailedReport: detailedReport
};

    // Save to database
    const savedReport = await RomanceScamReport.create(newReport);

    return NextResponse.json({ 
      success: true, 
      report: savedReport,
      riskAssessment,
      detailedReport
    }, { status: 201 });

  } catch (error) {
    console.error("Error creating romance scam report:", error);
    return NextResponse.json(
      { success: false, error: 'Report submission failed' },
      { status: 500 }
    );
  }
}