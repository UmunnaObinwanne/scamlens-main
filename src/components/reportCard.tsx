"use client"

import { useState } from 'react';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RomanceReport, PlatformReport, VendorReport } from "../../Types/reports";
import Link from "next/link";

// Add the getRiskLevelColor function
const getRiskLevelColor = (riskLevel: string): string => {
  switch (riskLevel.toLowerCase()) {
    case 'high':
      return 'bg-red-500 hover:bg-red-600';
    case 'medium':
      return 'bg-yellow-500 hover:bg-yellow-600';
    case 'low':
      return 'bg-green-500 hover:bg-green-600';
    default:
      return 'bg-gray-500 hover:bg-gray-600';
  }
};

interface ReportCardProps {
  report: RomanceReport | PlatformReport | VendorReport;
  type: 'romance' | 'platform' | 'vendor';
  onStatusUpdate?: (id: string, newStatus: 'pending' | 'in-review' | 'completed') => void;
}

export function ReportCard({ report, type, onStatusUpdate }: ReportCardProps) {
  const [status, setStatus] = useState(report.status || 'pending');

  const handleStatusChange = (newStatus: 'pending' | 'in-review' | 'completed') => {
    setStatus(newStatus);
    onStatusUpdate?.(report._id, newStatus);
  };

  const StatusSelector = () => (
    <div onClick={(e) => e.stopPropagation()}>
      <Select value={status} onValueChange={handleStatusChange}>
        <SelectTrigger className="w-[140px]">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="pending">Pending</SelectItem>
          <SelectItem value="in-review">In Review</SelectItem>
          <SelectItem value="completed">Completed</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  const renderRomanceReport = (report: RomanceReport) => (
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{report.fullName || 'No Name'}</h3>
          <p className="text-sm text-gray-500">{report.locationOfPartner || 'Location Unknown'}</p>
        </div>
        {report.riskAssessment?.riskLevel && (
          <Badge className={getRiskLevelColor(report.riskAssessment.riskLevel)}>
            {report.riskAssessment.riskLevel} Risk
          </Badge>
        )}
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {report.submissionDate ? new Date(report.submissionDate).toLocaleDateString() : 'Date Unknown'}
        </span>
        <StatusSelector />
      </div>
    </CardContent>
  );

  const renderPlatformReport = (report: PlatformReport) => (
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{report.name || 'No Name'}</h3>
          <p className="text-sm text-gray-500">{report.platform || 'Platform Unknown'}</p>
        </div>
        <Badge variant="outline">{status}</Badge>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {report.submissionDate ? new Date(report.submissionDate).toLocaleDateString() : 'Date Unknown'}
        </span>
        <StatusSelector />
      </div>
    </CardContent>
  );

  const renderVendorReport = (report: VendorReport) => (
    <CardContent className="pt-6">
      <div className="flex justify-between items-start mb-4">
        <div>
          <h3 className="font-semibold text-lg">{report.vendorName || 'No Name'}</h3>
          <p className="text-sm text-gray-500">{report.platform || 'Platform Unknown'}</p>
        </div>
        <Badge variant="outline">{status}</Badge>
      </div>
      <div className="flex justify-between items-center">
        <span className="text-sm text-gray-500">
          {report.submissionDate ? new Date(report.submissionDate).toLocaleDateString() : 'Date Unknown'}
        </span>
        <StatusSelector />
      </div>
    </CardContent>
  );

  return (
    <Link href={`/reports/${report._id}`} onClick={() => console.log('Clicked report:', report._id)}>
      <Card className="cursor-pointer hover:shadow-lg transition-shadow">
        {type === 'romance' && renderRomanceReport(report as RomanceReport)}
        {type === 'platform' && renderPlatformReport(report as PlatformReport)}
        {type === 'vendor' && renderVendorReport(report as VendorReport)}
      </Card>
    </Link>
  );
}