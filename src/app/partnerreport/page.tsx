"use client"

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Share2, AlertTriangle, Clock, ShieldAlert, BadgeAlert, CheckCircle2, XCircle, User, MapPin, Calendar, MessageCircle } from 'lucide-react';

interface RiskAssessment {
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  score: number;
  riskFactors: string[];
  recommendations: string[];
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
  evidenceProvided: {
    hasPhotos: boolean;
    photoAnalysis?: string;
    photoURL?: string;
  };
}

interface RomanceScamReport {
  fullName: string;
  email: string;
  country: string;
  personName: string;
  contactDuration: string;
  meetingPlace: string;
  otherMeetingPlace?: string;
  metInRealLife: string;
  whyNotMet?: string;
  communicationFrequency: string;
  locationOfPartner: string;
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
  riskAssessment: RiskAssessment;
  detailedReport: DetailedReport;
}

const ReportSummary = () => {
  const router = useRouter();
  const [report, setReport] = useState<RomanceScamReport | null>(null);

  useEffect(() => {
  const reportData = localStorage.getItem('romanceScamReport');

  if (!reportData) {
    router.push('/romance-form');
    return;
  }

  // Parse the JSON and get the nested report object
  const parsedData = JSON.parse(reportData);
  
  if (parsedData && parsedData.report) {
    setReport(parsedData.report);  // Set just the report object as the state
    console.log('Report data:', parsedData.report);
  } else {
    console.log('Invalid data structure:', parsedData);
    router.push('/romance-form');
  }
}, [router]);

  if (!report) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  const getRiskLevelColor = (level: string) => {
    switch (level.toLowerCase()) {
      case 'low':
        return 'bg-green-100 text-green-800 border-green-500';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-500';
      case 'high':
        return 'bg-orange-100 text-orange-800 border-orange-500';
      case 'critical':
        return 'bg-red-100 text-red-800 border-red-500';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-500';
    }
  };

  const getBehaviorIcon = (isPresent: boolean) => {
    return isPresent ? 
      <XCircle className="h-5 w-5 text-red-500" /> : 
      <CheckCircle2 className="h-5 w-5 text-green-500" />;
  };

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      {/* Alert Banner */}
      <div className={`p-4 rounded-lg border-l-4 ${getRiskLevelColor(report.riskAssessment.riskLevel)}`}>
        <div className="flex items-center">
          <AlertTriangle className="h-6 w-6 mr-3" />
          <div>
            <h2 className="text-lg font-semibold">Risk Level: {report.riskAssessment.riskLevel}</h2>
            <p className="mt-1">Risk Score: {report.riskAssessment.score}/100</p>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Information */}
        <div className="lg:col-span-2 space-y-6">
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <BadgeAlert className="h-6 w-6 mr-2" />
              Suspect Profile Details
            </h2>
            <div className="grid grid-cols-2 gap-4">
              <div>
                <p className="text-sm text-gray-600">Reported Name</p>
                <p className="font-medium">{report.fullName}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Meeting Platform</p>
                <p className="font-medium capitalize">{report.meetingPlace}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Claimed Location</p>
                <p className="font-medium">{report.locationOfPartner}</p>
              </div>
              <div>
                <p className="text-sm text-gray-600">Contact Duration</p>
                <p className="font-medium">{report.contactDuration}</p>
              </div>
            </div>
          </section>

          {/* Risk Factors */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4 flex items-center">
              <ShieldAlert className="h-6 w-6 mr-2" />
              Identified Risk Factors
            </h2>
            <ul className="space-y-3">
              {report.riskAssessment.riskFactors.map((factor, index) => (
                <li key={index} className="flex items-center text-red-700 bg-red-50 p-3 rounded">
                  <AlertTriangle className="h-5 w-5 mr-2 flex-shrink-0" />
                  {factor}
                </li>
              ))}
            </ul>
          </section>

          {/* Evidence */}
          {report.photoUpload && (
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Evidence Submitted</h2>
              <div className="relative aspect-video w-full max-w-md">
                <Image
                  src={report.photoUpload.url}
                  alt="Submitted evidence"
                  fill
                  className="object-cover rounded"
                />
              </div>
              {report.photosAuthentic === 'no' && (
                <p className="mt-4 text-red-600 bg-red-50 p-3 rounded">
                  ⚠️ Photos reported as potentially inauthentic
                </p>
              )}
            </section>
          )}
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          {/* Behavior Analysis */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Risk Indicators</h2>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Met in Real Life</span>
                {getBehaviorIcon(report.metInRealLife === 'no')}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Requested Money</span>
                {getBehaviorIcon(report.askedForMoney === 'yes')}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Shared Personal Info</span>
                {getBehaviorIcon(report.personalInfoShared === 'yes')}
              </div>
              <div className="flex items-center justify-between">
                <span className="text-gray-600">Daily Communication</span>
                {getBehaviorIcon(report.communicationFrequency === 'daily')}
              </div>
            </div>
          </section>

          {/* Financial Details */}
          {report.askedForMoney === 'yes' && (
            <section className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-4">Financial Details</h2>
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-gray-600">Requested Amount</p>
                  <p className="font-medium">${report.moneyAmount?.toLocaleString()}</p>
                </div>
                {report.moneyPurpose && (
                  <div>
                    <p className="text-sm text-gray-600">Stated Purpose</p>
                    <p className="font-medium">{report.moneyPurpose}</p>
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Recommendations */}
          <section className="bg-white rounded-lg shadow-md p-6">
            <h2 className="text-xl font-semibold mb-4">Safety Recommendations</h2>
            <ul className="space-y-3">
              {report.riskAssessment.recommendations.map((rec, index) => (
                <li key={index} className="flex items-start">
                  <span className="h-6 w-6 rounded-full bg-blue-100 text-blue-600 flex items-center justify-center flex-shrink-0 mt-0.5">
                    {index + 1}
                  </span>
                  <span className="ml-3">{rec}</span>
                </li>
              ))}
            </ul>
          </section>

          {/* Share Report */}
          <button className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 flex items-center justify-center">
            <Share2 className="h-5 w-5 mr-2" />
            Share Report
          </button>
        </div>
      </div>

      <div className="text-center text-sm text-gray-500 mt-8">
        <p>This is an initial assessment. Our analysts will conduct a thorough investigation and update this report.</p>
        <p>Report ID: {report.detailedReport.reportId}</p>
        <p>Submitted: {new Date(report.detailedReport.submissionDate).toLocaleString()}</p>
      </div>
    </div>
  );
};

export default ReportSummary;