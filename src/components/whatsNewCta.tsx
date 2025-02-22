
import React from 'react';

const WhatsNewCta: React.FC = () => {
  return (
    <div className="relative flex space-x-4 items-center z-10 rounded-full bg-zinc-950 py-1 px-4 ring-1 ring-white/10 hover:bg-zinc-900 transition ease-in-out duration-300">
      <span className="text-emerald-300">
        What&apos;s new?
      </span>
      <span className="text-white">
        New training on risk management
      </span>
      <svg
        fill="none"
        height="16"
        viewBox="0 0 24 24"
        width="16"
        xmlns="http://www.w3.org/2000/svg"
        className="transition-transform duration-300 ease-in-out group-hover:translate-x-0.5"
      >
        <path
          d="M10.75 8.75L14.25 12L10.75 15.25"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
        />
      </svg>
    </div>
  );
};

export default WhatsNewCta;
