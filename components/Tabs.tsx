import React from 'react';
import { ViewType } from '../types';

interface TabsProps {
  activeTab: ViewType;
  setActiveTab: (tab: ViewType) => void;
}

const Tabs: React.FC<TabsProps> = ({ activeTab, setActiveTab }) => {
  const tabs = [
    { id: ViewType.FULL_DIE, label: 'Full GPU Die' },
    { id: ViewType.SMSP, label: 'SMSP Quadrant' },
    { id: ViewType.SINGLE_SM, label: 'Single SM Detail' },
    { id: ViewType.SPECS, label: 'Specifications' },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-10 justify-center md:justify-start">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`
            relative px-8 py-3 font-tech font-bold text-sm tracking-wider uppercase clip-path-slant transition-all duration-300
            before:content-[''] before:absolute before:top-0 before:left-0 before:w-[2px] before:h-full before:transition-all
            ${activeTab === tab.id 
              ? 'bg-cyan-950/50 text-cyan-400 border-b-2 border-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.3)] before:bg-cyan-400' 
              : 'bg-slate-900/50 text-slate-500 border-b-2 border-slate-800 hover:text-cyan-200 hover:border-cyan-700 hover:bg-slate-800 before:bg-transparent'
            }
          `}
          style={{ clipPath: 'polygon(10px 0, 100% 0, 100% calc(100% - 10px), calc(100% - 10px) 100%, 0 100%, 0 10px)' }}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
};

export default Tabs;