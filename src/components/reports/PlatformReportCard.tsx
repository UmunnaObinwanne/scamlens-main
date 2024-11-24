import { PlatformReport } from "../../../Types/reports";
import { InfoField } from "./InfoField";

// components/reports/PlatformReportCard.tsx
export const PlatformReportCard = ({ report }: { report: PlatformReport }) => (
 <div className="grid grid-cols-2 gap-6">
   <div className="bg-white rounded-lg p-6 shadow-sm">
     <h2 className="text-xl font-semibold mb-4">Platform Details</h2>
     <div className="space-y-3">
       <InfoField label="Full Name" value={report.fullName} />
       <InfoField label="Email" value={report.email} />
       <InfoField label="Website URL" value={report.websiteURL} />
       <InfoField label="Platform Type" value={report.platformType} />
     </div>
   </div>

   <div className="bg-white rounded-lg p-6 shadow-sm">
     <h2 className="text-xl font-semibold mb-4">Financial Information</h2>
     <div className="space-y-3">
       <InfoField label="Money Involved" value={report.moneyInvolved} />
       {report.investmentAmount && <InfoField label="Investment Amount" value={`$${report.investmentAmount}`} />}
       <InfoField label="Contact Methods" value={report.contactMethods} />
       <InfoField label="Suspicious Features" value={report.suspiciousFeatures} />
     </div>
   </div>

   {report.screenshot && (
     <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
       <h2 className="text-xl font-semibold mb-4">Screenshot Evidence</h2>
       <img src={report.screenshot.url} alt="Platform screenshot" className="rounded-lg shadow-md max-h-96 object-contain" />
     </div>
   )}
 </div>
);