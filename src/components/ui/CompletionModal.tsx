'use client';

import { motion } from 'framer-motion';
import { Mail, Clock, CheckCircle, AlertTriangle, Shield, Info } from 'lucide-react';

interface RiskAssessment {
  riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
  score: number;
  riskFactors: string[];
  recommendations: string[];
}

interface DetailedReport {
  reportId: string;
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
}

interface CompletionModalProps {
  isOpen: boolean;
  onClose: () => void;
  riskData?: {
    riskAssessment: RiskAssessment;
    detailedReport: DetailedReport;
  };
}



export function CompletionModal({ isOpen, onClose, riskData }: CompletionModalProps) {
  if (!isOpen) return null;

  const getRiskLevelColor = (level: string) => {
    const colors = {
      'Critical': 'bg-red-100 text-red-600',
      'High': 'bg-orange-100 text-orange-600',
      'Medium': 'bg-yellow-100 text-yellow-600',
      'Low': 'bg-green-100 text-green-600'
    };
    return colors[level] || 'bg-gray-100 text-gray-600';
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4"
    >
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.95, opacity: 0 }}
        className="bg-white dark:bg-gray-800 rounded-lg shadow-xl max-w-2xl w-full p-6 max-h-[90vh] overflow-y-auto"
      >
        <div className="flex flex-col items-center text-center">
          {/* Success Icon */}
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-6">
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>

          {/* Title */}
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Analysis Complete
          </h2>

          {riskData && (
            <div className="w-full space-y-6 mb-6">
              {/* Risk Assessment Section */}
              <div className="bg-gray-50 dark:bg-gray-700 rounded-lg p-4">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-lg font-semibold">Risk Assessment</h3>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${getRiskLevelColor(riskData.riskAssessment.riskLevel)}`}>
                    {riskData.riskAssessment.riskLevel} Risk
                  </span>
                </div>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <AlertTriangle className="w-4 h-4" />
                      Risk Factors Identified
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-left">
                      {riskData.riskAssessment.riskFactors.map((factor, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-300">{factor}</li>
                      ))}
                    </ul>
                  </div>
                  <div>
                    <h4 className="font-medium mb-2 flex items-center gap-2">
                      <Shield className="w-4 h-4" />
                      Recommendations
                    </h4>
                    <ul className="list-disc pl-5 space-y-1 text-left">
                      {riskData.riskAssessment.recommendations.map((rec, index) => (
                        <li key={index} className="text-gray-600 dark:text-gray-300">{rec}</li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Instructions */}
          <div className="space-y-6 w-full text-left">
            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100">
                <span className="text-indigo-600 font-semibold">1</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Review Analysis</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  Please carefully review the risk assessment and recommendations provided above.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center rounded-full bg-indigo-100">
                <span className="text-indigo-600 font-semibold">2</span>
              </div>
              <div>
                <h3 className="font-semibold text-gray-900 dark:text-white">Check Your Email</h3>
                <p className="text-gray-600 dark:text-gray-300">
                  You will receive a detailed report at <span className="font-medium">support@scamlens.com</span> within 24-48 hours.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4">
              <Mail className="w-6 h-6 text-indigo-600 mt-1" />
              <div className="text-sm text-gray-500 dark:text-gray-400">
                Please check your spam folder if you don't see our email in your inbox.
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            onClick={onClose}
            className="mt-8 w-full bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors duration-200 font-medium"
          >
            Understood
          </button>
        </div>
      </motion.div>
    </motion.div>
  );
}