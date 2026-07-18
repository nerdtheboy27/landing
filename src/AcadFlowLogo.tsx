import { useId } from 'react';

export const AcadFlowLogo = ({ className }: { className?: string }) => {
  const id = useId();
  return (
    <svg viewBox="0 0 100 100" className={className} xmlns="http://www.w3.org/2000/svg">
      <defs>
        <linearGradient id={`flow-grad-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#3b82f6" />
          <stop offset="100%" stopColor="#06b6d4" />
        </linearGradient>
        <linearGradient id={`flow-grad-2-${id}`} x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#2563eb" />
          <stop offset="100%" stopColor="#0ea5e9" />
        </linearGradient>
      </defs>
      {/* Dynamic 'A' Structure */}
      <path d="M50 15 L25 80 L40 80 L46 62 L65 62" stroke={`url(#flow-grad-2-${id})`} strokeWidth="12" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      {/* Flowing Waves */}
      <path d="M50 15 C 65 35, 80 50, 60 80" stroke={`url(#flow-grad-${id})`} strokeWidth="10" strokeLinecap="round" strokeLinejoin="round" fill="none" />
      <path d="M55 25 C 75 45, 95 60, 75 80" stroke="#06b6d4" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" fill="none" opacity="0.6"/>
    </svg>
  );
};
