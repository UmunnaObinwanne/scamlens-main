"use client"

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { RomanceReport, PlatformReport, VendorReport } from "../../../../Types/reports";
import { RomanceReportCard } from '@/components/reports/RomanceReportCard';
import { PlatformReportCard } from '@/components/reports/PlatformReportCard';
import { VendorReportCard } from '@/components/reports/VendorReportCard';
import { InfoField } from '@/components/reports/InfoField';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';

export default function ReportDetails() {
    const { id } = useParams();
    const [report, setReport] = useState<RomanceReport | PlatformReport | VendorReport | null>(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchReport = async () => {
            try {
                const response = await fetch(`/api/reports/${id}`);
                const data = await response.json();
                if (data.success) {
                    setReport(data.report);
                }
            } catch (error) {
                console.error('Error fetching report:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchReport();
    }, [id]);

    const handleStatusChange = async (newStatus: 'pending' | 'in-review' | 'completed') => {
        try {
            const response = await fetch(`/api/reports/${id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    status: newStatus,
                    type: determineReportType(report)
                })
            });

            if (response.ok) {
                const data = await response.json();
                setReport(data.report);
            }
        } catch (error) {
            console.error('Error updating status:', error);
        }
    };

    const determineReportType = (report: any) => {
        if ('personName' in report) return 'romance';
        if ('websiteURL' in report) return 'platform';
        if ('accountUsername' in report) return 'vendor';
    };

    const renderContent = () => {
        if (loading) {
            return (
                <div className="flex items-center justify-center min-h-[600px]">
                    <div className="space-y-4 w-full max-w-3xl">
                        <div className="h-8 bg-gray-200 rounded animate-pulse" />
                        <div className="h-64 bg-gray-200 rounded animate-pulse" />
                        <div className="h-32 bg-gray-200 rounded animate-pulse" />
                    </div>
                </div>
            );
        }

        if (!report) {
            return (
                <div className="flex items-center justify-center min-h-[600px]">
                    <div className="text-center">
                        <h2 className="text-xl font-semibold text-gray-700">Report not found</h2>
                        <p className="text-gray-500 mt-2">The requested report could not be found.</p>
                    </div>
                </div>
            );
        }

        return (
            <Card>
                <CardHeader className="flex justify-between items-center">
                    <div>
                        <h1 className="text-2xl font-bold">
                            {(() => {
                                if ('personName' in report) return (report as RomanceReport).fullName;
                                if ('websiteURL' in report) return (report as PlatformReport).name;
                                if ('accountUsername' in report) return (report as VendorReport).accountUsername;
                                return 'Unknown Report';
                            })()}
                        </h1>
                        <p className="text-gray-500">
                            Submitted on {new Date(report.submissionDate).toLocaleDateString()}
                        </p>
                    </div>
                    <Select value={report.status} onValueChange={handleStatusChange}>
                        <SelectTrigger className="w-[180px]">
                            <SelectValue placeholder="Update status" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="pending">Pending</SelectItem>
                            <SelectItem value="in-review">In Review</SelectItem>
                            <SelectItem value="completed">Completed</SelectItem>
                        </SelectContent>
                    </Select>
                </CardHeader>

                <CardContent>
                    {(() => {
                        const reportType = determineReportType(report);
                        switch(reportType) {
                            case 'romance':
                                return <RomanceReportCard report={report as RomanceReport} />;
                            case 'platform':
                                return <PlatformReportCard report={report as PlatformReport} />;
                            case 'vendor':
                                return <VendorReportCard report={report as VendorReport} />;
                            default:
                                return <div>Unknown report type</div>;
                        }
                    })()}
                </CardContent>
            </Card>
        );
    };

    return (
        <div className="container mx-auto p-6 min-h-screen">
            <Link 
                href="/dashboard" 
                className="inline-flex items-center text-blue-600 hover:text-blue-700 mb-4"
            >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Dashboard
            </Link>
            {renderContent()}
        </div>
    );
}