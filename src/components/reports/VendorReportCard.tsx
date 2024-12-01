//import { InfoField } from "./InfoField";
import { ReactNode } from "react";
// Types
interface ScreenshotType {
  url: string;
  publicId: string;
}

interface InfoFieldProps {
  label: string;
  value: ReactNode;
  className?: string;
}

interface RiskAssessment {
  riskLevel: "Low" | "Medium" | "High" | "Critical";
  score: number;
  summary: string;
  riskFactors: string[];
  recommendations: string[];
}

interface VendorReportProps {
  report: {
    _id: string;
    fullName: string;
    email: string;
    socialMediaPlatform: string;
    accountUsername: string;
    accountURL: string;
    businessType: string;
    businessCategory: string;
    priceRange: string;
    accountAge: string;
    followersCount: string;
    paymentMethods: string[];
    deliveryMethod: string[];
    hasBusinessProfile: boolean;
    verifiedAccount: boolean;
    hasRefundPolicy: boolean;
    urgencyTactics: boolean;
    limitedTimeOffers: boolean;
    requestsPersonalBanking: boolean;
    prePaymentRequired: boolean;
    suspiciousFeatures: string;
    screenshots: ScreenshotType[];
    riskAssessment: RiskAssessment;
    submissionDate: string;
  };
}



 const InfoField = ({ label, value, className = '' }: InfoFieldProps) => (
  <div className={`flex justify-between items-center ${className}`}>
    <span className="text-gray-600">{label}</span>
    <span className="font-medium">{value}</span>
  </div>
);

export const VendorReportCard = ({ report }: VendorReportProps) => {
  const getRiskLevelColor = (level: string) => {
    switch (level) {
      case "Low":
        return "bg-green-100 text-green-800";
      case "Medium":
        return "bg-yellow-100 text-yellow-800";
      case "High":
        return "bg-orange-100 text-orange-800";
      case "Critical":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const renderSectionTitle = (title: string) => (
    <h2 className="text-2xl font-semibold mb-4 text-transparent bg-clip-text bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {title}
    </h2>
  );

  const renderBasicInformation = () => (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      {renderSectionTitle("Account Information")}
      <div className="space-y-3">
        <InfoField label="Business Name" value={<strong>{report.fullName}</strong>} />
        <InfoField
          label="Platform"
          value={<strong>{report.socialMediaPlatform}</strong>}
        />
        <InfoField
          label="Username"
          value={<strong>{report.accountUsername}</strong>}
        />
        <InfoField
          label="Account URL"
          value={<strong>{report.accountURL}</strong>}
        />
        <InfoField
          label="Account Age"
          value={<strong>{report.accountAge.replace("_", " ")}</strong>}
        />
        <InfoField
          label="Followers"
          value={<strong>{report.followersCount}</strong>}
        />
      </div>
    </div>
  );

  const renderBusinessDetails = () => (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      {renderSectionTitle("Business Details")}
      <div className="space-y-3">
        <InfoField label="Business Type" value={<strong>{report.businessType}</strong>} />
        <InfoField
          label="Category"
          value={<strong>{report.businessCategory}</strong>}
        />
        <InfoField label="Price Range" value={<strong>{report.priceRange}</strong>} />
        <InfoField
          label="Payment Methods"
          value={<strong>{report.paymentMethods.join(", ")}</strong>}
        />
        <InfoField
          label="Delivery Methods"
          value={<strong>{report.deliveryMethod.join(", ")}</strong>}
        />
      </div>
    </div>
  );

  const renderRiskAssessment = () => (
    <div className="bg-white rounded-lg p-6 shadow-lg md:col-span-2">
      {renderSectionTitle("Risk Assessment")}
      <div
        className={`inline-block px-4 py-2 rounded-full text-sm font-medium mb-4 ${getRiskLevelColor(
          report.riskAssessment.riskLevel
        )}`}
      >
        {report.riskAssessment.riskLevel} Risk - Score:{" "}
        <strong>{report.riskAssessment.score}</strong>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <h3 className="font-medium mb-2">Risk Factors:</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {report.riskAssessment.riskFactors.map((factor, index) => (
              <li key={index}>
                <strong>{factor}</strong>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h3 className="font-medium mb-2">Recommendations:</h3>
          <ul className="list-disc pl-5 space-y-1 text-gray-700">
            {report.riskAssessment.recommendations.map((rec, index) => (
              <li key={index}>
                <strong>{rec}</strong>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );

  const renderWarningSignsPanel = () => (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      {renderSectionTitle("Warning Signs")}
      <div className="space-y-3">
        <InfoField
          label="Uses Urgency Tactics"
          value={
            <strong className={report.urgencyTactics ? "text-red-600" : ""}>
              {report.urgencyTactics ? "⚠️ Yes" : "No"}
            </strong>
          }
        />
        <InfoField
          label="Limited Time Offers"
          value={
            <strong className={report.limitedTimeOffers ? "text-red-600" : ""}>
              {report.limitedTimeOffers ? "⚠️ Yes" : "No"}
            </strong>
          }
        />
        <InfoField
          label="Requests Banking Info"
          value={
            <strong className={report.requestsPersonalBanking ? "text-red-600" : ""}>
              {report.requestsPersonalBanking ? "⚠️ Yes" : "No"}
            </strong>
          }
        />
        <InfoField
          label="Requires Pre-payment"
          value={
            <strong className={report.prePaymentRequired ? "text-red-600" : ""}>
              {report.prePaymentRequired ? "⚠️ Yes" : "No"}
            </strong>
          }
        />
      </div>
    </div>
  );

  const renderScreenshots = () => (
    <div className="bg-white rounded-lg p-6 shadow-lg">
      {renderSectionTitle("Evidence")}
      <div className="grid grid-cols-2 gap-4">
        {report.screenshots.map((screenshot, index) => (
          <div key={index} className="relative">
            <img
              src={screenshot.url}
              alt={`Evidence ${index + 1}`}
              className="rounded-lg shadow-sm w-full h-48 object-cover"
            />
          </div>
        ))}
      </div>
    </div>
  );

  //Here's the main render.
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="grid gap-6 md:grid-cols-2">
        {renderBasicInformation()}
        {renderBusinessDetails()}
        {renderRiskAssessment()}
        {renderWarningSignsPanel()}
        {renderScreenshots()}
      </div>
    </div>
  );
};
