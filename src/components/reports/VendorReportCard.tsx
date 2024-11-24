import { VendorReport } from "../../../Types/reports";
import { InfoField } from "./InfoField";

// components/reports/VendorReportCard.tsx
export const VendorReportCard = ({ report }: { report: VendorReport }) => (
 <div className="grid grid-cols-2 gap-6">
   <div className="bg-white rounded-lg p-6 shadow-sm">
     <h2 className="text-xl font-semibold mb-4">Vendor Details</h2>
     <div className="space-y-3">
       <InfoField label="Vendor Name" value={report.vendorName} />
       <InfoField label="Platform" value={report.platform} />
       {/* Add other vendor-specific fields */}
     </div>
   </div>
 </div>
);