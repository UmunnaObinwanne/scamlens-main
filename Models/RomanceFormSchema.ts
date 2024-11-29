import mongoose, { Schema, Document } from "mongoose";

interface IImage {
    url: string;
    publicId: string;
}

export interface IRomanceScamReport extends Document {
    fullName: string;
    email: string;
    locationOfPartner?: string;
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
    photoUpload?: IImage;
    askedForMoney: string;
    moneyAmount?: number;
    moneyPurpose?: string;
    personalInfoShared: string;
    suspiciousBehavior: string;
    submissionDate: Date;
    riskAssessment: {
        riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
        riskFactors: string[];
        recommendations: string[];
        score: number;
    };
    detailedReport: {
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
        riskIndicators: {
            timelineRisk: string;
            locationRisk: string;
            behavioralRisk: string;
            financialRisk: string;
            identityRisk: string;
        };
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
    };
}

const ImageSchema: Schema = new Schema({
    url: { type: String, required: true },
    publicId: { type: String, required: true },
});

const RomanceFormSchema: Schema = new Schema({
    // Existing fields
    fullName: { type: String, required: true },
    email: { 
        type: String, 
        required: true,
        lowercase: true,
        trim: true,
        match: [/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/, 'Please enter a valid email']
    },
    locationOfPartner: { type: String },
    country: { type: String, required: true },
    personName: { type: String, required: true },
    contactDuration: { type: String, required: true },
    meetingPlace: { type: String, required: true },
    otherMeetingPlace: { type: String },
    metInRealLife: { type: String, required: true },
    whyNotMet: { type: String },
    communicationFrequency: { type: String, required: true },
    discussionTopics: { type: String, required: true },
    sharedPhotosVideos: { type: String, required: true },
    photosAuthentic: { type: String },
    photoUpload: { type: ImageSchema },
    askedForMoney: { type: String, required: true },
    moneyAmount: { type: Number },
    moneyPurpose: { type: String },
    personalInfoShared: { type: String, required: true },
    suspiciousBehavior: { type: String, required: true },
    submissionDate: { type: Date, default: Date.now },

    // New Risk Assessment Section
    riskAssessment: {
        riskLevel: {
            type: String,
            enum: ['Low', 'Medium', 'High', 'Critical'],
            required: true
        },
        riskFactors: [{ type: String }],
        recommendations: [{ type: String }],
        score: { type: Number, required: true }
    },

    // New Detailed Report Section
    detailedReport: {
        reportId: { 
            type: String, 
            required: true, 
            unique: true 
        },
        submissionDate: { 
            type: Date, 
            required: true 
        },
        victimProfile: {
            location: { type: String, required: true },
            exposureLevel: { type: String, required: true },
            financialRisk: { type: Boolean, required: true }
        },
        scammerProfile: {
            reportedLocation: { type: String, required: true },
            communicationPattern: { type: String, required: true },
            identityVerification: { type: String, required: true },
            financialRequests: { type: Boolean, required: true },
            requestedAmount: { type: Number },
            statedPurpose: { type: String }
        },
        riskIndicators: {
            timelineRisk: { type: String, required: true },
            locationRisk: { type: String, required: true },
            behavioralRisk: { type: String, required: true },
            financialRisk: { type: String, required: true },
            identityRisk: { type: String, required: true }
        },
        analysisDetails: {
            suspiciousPatterns: [{ type: String }],
            redFlags: [{ type: String }],
            vulnerabilityFactors: [{ type: String }]
        },
        recommendedActions: {
            immediate: [{ type: String }],
            preventive: [{ type: String }],
            supportResources: [{ type: String }]
        },
        evidenceAttached: {
            hasPhotos: { type: Boolean, required: true },
            photoAnalysis: { type: String },
            photoURL: { type: String }
        }
    }
},
{
    collection: 'romancescamreports' // Add this line to match your DB collection name
}
);

// Add indexes for better query performance
RomanceFormSchema.index({ email: 1 });
RomanceFormSchema.index({ submissionDate: -1 });
RomanceFormSchema.index({ 'detailedReport.reportId': 1 }, { unique: true });
RomanceFormSchema.index({ 'riskAssessment.riskLevel': 1 });

export default mongoose.models.RomanceScamReport || 
    mongoose.model<IRomanceScamReport>("RomanceScamReport", RomanceFormSchema);