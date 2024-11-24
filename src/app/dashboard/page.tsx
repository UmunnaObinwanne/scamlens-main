// app/dashboard/page.tsx
"use client"

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Search, HeartHandshake, Globe, Share2, ShoppingBag, AlertTriangle, Clock } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Link from 'next/link';

interface Report {
 _id: string;
 type: 'romance' | 'platform' | 'social-media' | 'vendor';
 reportedName: string;
 date: string;
 riskLevel: 'Low' | 'Medium' | 'High' | 'Critical';
 status: 'pending' | 'in-review' | 'completed';
 location: string;
}

interface ColorMap {
 [key: string]: string;
}

export default function DashboardPage() {
 const [searchTerm, setSearchTerm] = useState('');
 const [filterStatus, setFilterStatus] = useState('all');
 const [reports, setReports] = useState<Report[]>([]);
 const [loading, setLoading] = useState(true);

 useEffect(() => {
   async function fetchReports() {
     try {
       const response = await fetch('/api/reports');
       const data = await response.json();
       if (data.success) {
         const transformedReports = Object.values(data.reports).flat().map((report: any) => ({
           _id: report._id,
           type: report.type || determineReportType(report),
           reportedName: report.fullName || report.name || report.vendorName,
           date: report.submissionDate,
           riskLevel: report.riskAssessment?.riskLevel || 'Low',
           status: report.status || 'pending',
           location: report.locationOfPartner || report.location || 'Unknown'
         }));
         setReports(transformedReports);
       }
     } catch (error) {
       console.error('Error fetching reports:', error);
     } finally {
       setLoading(false);
     }
   }

   fetchReports();
 }, []);

 const getRiskLevelColor = (level: string) => {
   const colors: ColorMap = {
     'Critical': 'bg-red-100 text-red-800 border-red-200',
     'High': 'bg-orange-100 text-orange-800 border-orange-200',
     'Medium': 'bg-yellow-100 text-yellow-800 border-yellow-200',
     'Low': 'bg-green-100 text-green-800 border-green-200'
   };
   return colors[level] || 'bg-gray-100 text-gray-800';
    };
    
    
    // app/dashboard/page.tsx
const handleStatusUpdate = async (
  reportId: string, 
  newStatus: 'pending' | 'in-review' | 'completed',
  type: string
) => {
  try {
    const response = await fetch(`/api/reports/${reportId}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ status: newStatus, type })
    });
    
    if (response.ok) {
      setReports(currentReports => 
        currentReports.map(report => 
          report._id === reportId 
            ? { ...report, status: newStatus as 'pending' | 'in-review' | 'completed' }
            : report
        )
      );
    }
  } catch (error) {
    console.error('Error updating status:', error);
  }
};

 const getStatusColor = (status: string) => {
   const colors: ColorMap = {
     'pending': 'bg-yellow-100 text-yellow-800',
     'in-review': 'bg-blue-100 text-blue-800',
     'completed': 'bg-green-100 text-green-800'
   };
   return colors[status] || 'bg-gray-100 text-gray-800';
 };

 function determineReportType(report: any): Report['type'] {
   if (report.fullName) return 'romance';
   if (report.platform) return 'platform';
   if (report.vendorName) return 'vendor';
   return 'social-media';
 }

const ReportCard = ({ report }: { report: Report }) => (
  <Link href={`/reports/${report._id}`}>
    <Card className="hover:shadow-lg transition-shadow cursor-pointer" onClick={() => console.log('Clicked report:', report._id)}>
      <CardContent className="pt-6">
        <div className="flex justify-between items-start mb-4">
          <div>
            <h3 className="font-semibold text-lg">{report.reportedName}</h3>
            <p className="text-sm text-gray-500">{report.location}</p>
          </div>
          <Badge className={getRiskLevelColor(report.riskLevel)}>
            {report.riskLevel} Risk
          </Badge>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-sm text-gray-500">
            {new Date(report.date).toLocaleDateString()}
          </span>
          <Badge variant="outline" className={getStatusColor(report.status)}>
            {report.status.charAt(0).toUpperCase() + report.status.slice(1)}
          </Badge>
        </div>
      </CardContent>
    </Card>
  </Link>
);

 if (loading) {
   return <div className="flex justify-center items-center min-h-screen">
     <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
   </div>;
 }

 const filteredReports = reports.filter(report => {
   const matchesSearch = report.reportedName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                        report.location.toLowerCase().includes(searchTerm.toLowerCase());
   const matchesStatus = filterStatus === 'all' || report.status === filterStatus;
   return matchesSearch && matchesStatus;
 });

 return (
   <div className="container mx-auto p-6">
     <div className="flex justify-between items-center mb-6">
       <h1 className="text-3xl font-bold">Report Analysis Dashboard</h1>
       <div className="flex gap-4">
         <div className="relative">
           <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-500" />
           <Input
             placeholder="Search reports..."
             className="pl-8"
             value={searchTerm}
             onChange={(e) => setSearchTerm(e.target.value)}
           />
         </div>
         <Select value={filterStatus} onValueChange={setFilterStatus}>
           <SelectTrigger className="w-[180px]">
             <SelectValue placeholder="Filter by status" />
           </SelectTrigger>
           <SelectContent>
             <SelectItem value="all">All Status</SelectItem>
             <SelectItem value="pending">Pending</SelectItem>
             <SelectItem value="in-review">In Review</SelectItem>
             <SelectItem value="completed">Completed</SelectItem>
           </SelectContent>
         </Select>
       </div>
     </div>

     <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
       <Card>
         <CardHeader className="flex flex-row items-center justify-between pb-2">
           <CardTitle className="text-sm font-medium">Total Reports</CardTitle>
           <AlertTriangle className="h-4 w-4 text-gray-500" />
         </CardHeader>
         <CardContent>
           <div className="text-2xl font-bold">{filteredReports.length}</div>
           <p className="text-xs text-gray-500">+12% from last month</p>
         </CardContent>
       </Card>
     </div>

     <Tabs defaultValue="all" className="w-full">
       <TabsList className="mb-4">
         <TabsTrigger value="all">All Reports</TabsTrigger>
         <TabsTrigger value="romance">Romance</TabsTrigger>
         <TabsTrigger value="platform">Platform</TabsTrigger>
         <TabsTrigger value="social">Social Media</TabsTrigger>
         <TabsTrigger value="vendor">Vendor</TabsTrigger>
       </TabsList>

       {['all', 'romance', 'platform', 'social', 'vendor'].map((tab) => (
         <TabsContent key={tab} value={tab}>
           <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
             {filteredReports
               .filter((report) => tab === 'all' || report.type === tab)
               .map((report) => (
                 <ReportCard key={report._id} report={report} />
               ))}
           </div>
         </TabsContent>
       ))}
     </Tabs>
   </div>
 );
}