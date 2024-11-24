import { RomanceReport } from "../../../Types/reports";
import { InfoField } from "./InfoField";


// components/reports/RomanceReportCard.tsx
export const RomanceReportCard = ({ report }: { report: RomanceReport }) => (
 <div className="grid grid-cols-2 gap-6">
   <div className="bg-white rounded-lg p-6 shadow-sm">
     <h2 className="text-xl font-semibold mb-4">Personal Information</h2>
     <div className="space-y-3">
       <InfoField label="Full Name" value={report.fullName} />
       <InfoField label="Email" value={report.email} />
       <InfoField label="Location of Partner" value={report.locationOfPartner} />
       <InfoField label="Country" value={report.country} />
     </div>
   </div>

   <div className="bg-white rounded-lg p-6 shadow-sm">
     <h2 className="text-xl font-semibold mb-4">Contact Information</h2>
     <div className="space-y-3">
       <InfoField label="Person Name" value={report.personName} />
       <InfoField label="Contact Duration" value={report.contactDuration} />
       <InfoField label="Meeting Place" value={report.meetingPlace} />
       <InfoField label="Met In Real Life" value={report.metInRealLife} />
       {report.whyNotMet && <InfoField label="Reason Not Met" value={report.whyNotMet} />}
     </div>
   </div>

   <div className="bg-white rounded-lg p-6 shadow-sm">
     <h2 className="text-xl font-semibold mb-4">Communication Details</h2>
     <div className="space-y-3">
       <InfoField label="Communication Frequency" value={report.communicationFrequency} />
       <InfoField label="Discussion Topics" value={report.discussionTopics} />
       <InfoField label="Shared Photos/Videos" value={report.sharedPhotosVideos} />
       <InfoField label="Photos Authentic" value={report.photosAuthentic || 'Not specified'} />
     </div>
   </div>

   <div className="bg-white rounded-lg p-6 shadow-sm">
     <h2 className="text-xl font-semibold mb-4">Financial Information</h2>
     <div className="space-y-3">
       <InfoField label="Asked for Money" value={report.askedForMoney} />
       {report.moneyAmount && <InfoField label="Amount Requested" value={`$${report.moneyAmount.toLocaleString()}`} />}
       {report.moneyPurpose && <InfoField label="Purpose of Money" value={report.moneyPurpose} />}
       <InfoField label="Personal Info Shared" value={report.personalInfoShared} />
       <InfoField label="Suspicious Behavior" value={report.suspiciousBehavior} />
     </div>
   </div>

   {report.photoUpload && (
     <div className="col-span-2 bg-white rounded-lg p-6 shadow-sm">
       <h2 className="text-xl font-semibold mb-4">Submitted Photo</h2>
       <img src={report.photoUpload.url} alt="Evidence" className="rounded-lg shadow-md max-h-96 object-contain" />
     </div>
   )}
 </div>
);