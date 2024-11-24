// components/reports/InfoField.tsx
export const InfoField = ({ label, value }: { label: string, value: string | number }) => (
 <div>
   <p className="text-sm text-gray-500">{label}</p>
   <p className="font-medium">{value}</p>
 </div>
);