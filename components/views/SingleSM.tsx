import React from 'react';
import { UnitKey } from '../../types';

interface SingleSMProps {
  onUnitClick: (key: UnitKey) => void;
}

const SingleSM: React.FC<SingleSMProps> = ({ onUnitClick }) => {
  const renderComputeColumn = (type: 'int32' | 'fp32' | 'fp64', count: number) => {
    const items = [];
    for (let i = 0; i < count; i++) {
      let styles = '';

      if (type === 'int32') {
        styles = 'bg-emerald-950/30 text-emerald-500 hover:bg-emerald-500 hover:text-black border-b border-emerald-900/30';
      } else if (type === 'fp32') {
        styles = 'bg-cyan-950/30 text-cyan-500 hover:bg-cyan-500 hover:text-black border-b border-cyan-900/30';
      } else if (type === 'fp64') {
        styles = 'bg-purple-950/30 text-purple-500 hover:bg-purple-500 hover:text-black border-b border-purple-900/30';
      }

      items.push(
        <div
          key={i}
          className={`h-[22px] text-[10px] leading-none font-bold cursor-pointer transition-all text-center flex items-center justify-center ${styles} last:border-b-0`}
          onClick={() => onUnitClick(type as UnitKey)}
        >
          {type.toUpperCase()}
        </div>
      );
    }
    return <div className="flex flex-col border-r border-slate-800 last:border-r-0 min-w-[36px]">{items}</div>;
  };

  const renderSMBlock = (index: number) => (
    <div className="bg-slate-950/80 border border-slate-700/50 p-3 rounded-sm overflow-hidden flex flex-col h-full hover:border-cyan-500/50 hover:shadow-[0_0_15px_rgba(6,182,212,0.15)] transition-all group relative min-w-[260px]">
      <div className="absolute top-1 right-2 text-[10px] font-tech text-slate-600 font-bold opacity-50 group-hover:text-cyan-500 group-hover:opacity-100 z-10 bg-slate-950 px-2 rounded">SMSP {index}</div>

      {/* Top Units Pipeline */}
      <div className="flex flex-col gap-[2px] mb-2">
        <div className="py-2 text-[10px] font-bold text-center border border-blue-900/40 bg-blue-950/20 text-blue-400 rounded-[2px] cursor-pointer hover:bg-blue-900/60 transition-colors" onClick={() => onUnitClick('l0-cache')}>L0 Cache</div>
        <div className="py-2 text-[10px] font-bold text-center border border-orange-900/40 bg-orange-950/20 text-orange-400 rounded-[2px] cursor-pointer hover:bg-orange-900/60 transition-colors" onClick={() => onUnitClick('warp-scheduler')}>Warp Scheduler</div>
        <div className="py-2 text-[10px] font-bold text-center border border-orange-900/40 bg-orange-950/20 text-orange-400 rounded-[2px] cursor-pointer hover:bg-orange-900/60 transition-colors" onClick={() => onUnitClick('dispatch-unit')}>Dispatch</div>
        <div className="py-2 text-[10px] font-bold text-center border border-cyan-900/40 bg-cyan-950/20 text-cyan-400 rounded-[2px] cursor-pointer hover:bg-cyan-900/60 transition-colors" onClick={() => onUnitClick('register-file')}>Register File</div>
      </div>

      {/* Compute Grid */}
      <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1.5fr] border border-slate-800 bg-slate-900 rounded-[2px] overflow-hidden mb-2">
        {renderComputeColumn('int32', 16)}
        {renderComputeColumn('fp32', 16)}
        {renderComputeColumn('fp32', 16)}
        {renderComputeColumn('fp64', 16)}
        <div
          className="bg-green-950/20 text-green-500 flex flex-col items-center justify-center p-1 cursor-pointer hover:bg-green-900/40 hover:text-green-300 transition-all border-l border-slate-800"
          onClick={() => onUnitClick('tensor-core')}
        >
          <span className="font-tech font-bold text-lg leading-none">TC</span>
          <span className="text-[9px] opacity-70 mt-1">4th Gen</span>
        </div>
      </div>

      {/* Footer Units (LD/ST + SFU) */}
      <div className="flex gap-1 mt-auto">
        <div className="flex-1 grid grid-cols-8 gap-[1px] bg-pink-950/10 border border-pink-900/30 p-[2px] rounded-[2px]">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="bg-pink-900/30 h-6 text-[8px] flex items-center justify-center text-pink-400 cursor-pointer hover:bg-pink-500 hover:text-white transition-colors" onClick={() => onUnitClick('ldst')}>LD</div>
          ))}
        </div>
        <div className="w-1/4 bg-indigo-950/20 border border-indigo-900/30 flex items-center justify-center text-[10px] font-bold text-indigo-400 cursor-pointer hover:bg-indigo-600 hover:text-white rounded-[2px] transition-colors" onClick={() => onUnitClick('sfu')}>
          SFU
        </div>
      </div>
    </div>
  );

  return (
    <div className="fade-in pb-12 w-full overflow-x-auto">
      <div className="min-w-[600px] max-w-[1400px] mx-auto">
        <h2 className="text-center text-neon-pink font-tech font-bold mb-8 text-2xl tracking-widest uppercase drop-shadow-[0_0_10px_rgba(255,0,255,0.5)]">
          Streaming Multiprocessor <span className="text-sm text-slate-500 align-middle ml-2 font-sans font-normal normal-case tracking-normal">(Detailed View)</span>
        </h2>

        <div className="bg-slate-950 border-2 border-slate-800 rounded-xl p-6 shadow-2xl">

          {/* SM Header */}
          <div className="bg-blue-950/30 border border-blue-800/50 p-4 rounded mb-4 text-center cursor-pointer hover:bg-blue-900/40 hover:border-blue-500 hover:shadow-[0_0_15px_rgba(59,130,246,0.3)] transition-all group" onClick={() => onUnitClick('smsp-l1-cache')}>
            <h3 className="text-blue-400 font-tech font-bold text-lg tracking-widest group-hover:text-blue-300">L1 INSTRUCTION CACHE</h3>
          </div>

          {/* 2x2 SMSP Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            {renderSMBlock(0)}
            {renderSMBlock(1)}
            {renderSMBlock(2)}
            {renderSMBlock(3)}
          </div>

          {/* SM Footer Sections */}
          <div className="space-y-3">
            <div className="bg-purple-950/20 border border-purple-800/50 p-4 rounded text-center cursor-pointer hover:bg-purple-900/40 hover:border-purple-500 transition-all" onClick={() => onUnitClick('tma')}>
              <div className="text-purple-400 font-tech font-bold tracking-wider text-sm">TENSOR MEMORY ACCELERATOR</div>
            </div>

            <div className="bg-cyan-950/20 border border-cyan-800/50 p-6 rounded text-center cursor-pointer hover:bg-cyan-900/40 hover:border-cyan-500 transition-all" onClick={() => onUnitClick('shared-memory')}>
              <div className="text-cyan-400 font-tech font-bold tracking-wider text-lg">256 KB L1 DATA CACHE / SHARED MEMORY</div>
            </div>

            <div className="grid grid-cols-4 gap-3">
              {Array.from({ length: 4 }).map((_, i) => (
                <div key={i} className="bg-slate-900 border border-slate-700 p-3 rounded text-center cursor-pointer hover:bg-slate-800 hover:border-slate-500 hover:text-white text-slate-400 font-bold text-xs font-tech" onClick={() => onUnitClick('texture-unit')}>
                  TEX UNIT
                </div>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default SingleSM;