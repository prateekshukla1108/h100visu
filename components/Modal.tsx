import React, { useEffect } from 'react';
import { UnitInfo } from '../types';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  info: UnitInfo | null;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, info }) => {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, onClose]);

  if (!isOpen || !info) return null;

  return (
    <div 
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div 
        className="bg-slate-900 border border-cyan-500/30 rounded-xl shadow-[0_0_50px_rgba(0,243,255,0.15)] max-w-2xl w-full max-h-[85vh] overflow-y-auto relative animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex justify-between items-start p-6 border-b border-slate-800 sticky top-0 bg-slate-900/95 backdrop-blur z-10">
          <div>
            <h3 className="text-2xl font-black text-cyan-400 pr-8 font-tech tracking-wide uppercase drop-shadow-[0_0_5px_rgba(6,182,212,0.5)]">
              {info.title}
            </h3>
            <p className="text-slate-400 mt-2 text-sm font-light border-l-2 border-purple-500 pl-3">{info.description}</p>
          </div>
          <button 
            onClick={onClose}
            className="text-slate-500 hover:text-white p-2 hover:bg-slate-800 rounded-full transition-colors"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="space-y-8">
            {info.sections.map((section, idx) => (
              <div key={idx}>
                <h4 className="text-sm font-bold text-pink-500 uppercase tracking-widest mb-4 font-tech flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-pink-500 rounded-full shadow-[0_0_5px_#ec4899]"></span>
                  {section.title}
                </h4>
                <ul className="space-y-3">
                  {section.content.map((item, i) => (
                    <li key={i} className="text-slate-300 flex gap-3 text-sm leading-relaxed pl-1">
                      <span className="text-cyan-500/50 font-mono">▹</span>
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            {info.specs.length > 0 && (
              <div className="bg-slate-950/50 rounded-lg p-6 border border-slate-800 mt-6">
                <h4 className="text-xs font-bold text-green-500 uppercase tracking-widest mb-4 font-tech">
                  Technical Specifications
                </h4>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                  {info.specs.map((spec, i) => (
                    <div key={i} className="bg-slate-900 p-3 rounded border border-slate-800 hover:border-slate-600 transition-colors">
                      <div className="text-[10px] text-slate-500 mb-1 uppercase tracking-wider font-bold">{spec.label}</div>
                      <div className="font-semibold text-cyan-100 text-sm font-mono">
                        {spec.value}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;