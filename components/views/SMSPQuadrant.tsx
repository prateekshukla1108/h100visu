import React from 'react';
import { UnitKey, Architecture } from '../../types';

interface SMSPQuadrantProps {
  onUnitClick: (key: UnitKey) => void;
  architecture?: Architecture;
}

const SMSPQuadrant: React.FC<SMSPQuadrantProps> = ({ onUnitClick, architecture = 'H100' }) => {
  const isB200 = architecture === 'B200';

  const renderComputeColumn = (type: 'int32' | 'fp32' | 'fp64', count: number) => {
    const items = [];
    for (let i = 0; i < count; i++) {
      let styles = '';

      if (type === 'int32') {
        styles = 'bg-emerald-950/40 border-emerald-700/50 text-emerald-400 hover:bg-emerald-900/80 hover:border-emerald-400 hover:text-emerald-100 hover:shadow-[0_0_10px_rgba(52,211,153,0.4)]';
      } else if (type === 'fp32') {
        styles = 'bg-cyan-950/40 border-cyan-700/50 text-cyan-400 hover:bg-cyan-900/80 hover:border-cyan-400 hover:text-cyan-100 hover:shadow-[0_0_10px_rgba(34,211,238,0.4)]';
      } else if (type === 'fp64') {
        styles = 'bg-purple-950/40 border-purple-700/50 text-purple-400 hover:bg-purple-900/80 hover:border-purple-400 hover:text-purple-100 hover:shadow-[0_0_10px_rgba(168,85,247,0.4)]';
      }

      items.push(
        <div
          key={i}
          className={`
            flex items-center justify-center py-2 text-[10px] md:text-[11px] font-bold font-mono border-b border-slate-900/60 last:border-b-0 cursor-pointer transition-all duration-150
            ${styles}
          `}
          onClick={() => onUnitClick(type as UnitKey)}
        >
          {type.toUpperCase()}
        </div>
      );
    }
    return <div className="flex flex-col border-r border-slate-800 last:border-r-0">{items}</div>;
  };

  return (
    <div className="fade-in w-full pb-12">
      <h2 className={`text-center font-tech font-bold mb-8 text-2xl tracking-widest border-b border-slate-800 pb-4 mx-auto max-w-3xl uppercase drop-shadow-[0_0_5px_rgba(0,255,65,0.5)] ${isB200 ? 'text-green-400' : 'text-neon-green'}`}>
        <span className={isB200 ? 'text-green-400' : 'text-cyan-400'}>SMSP Quadrant</span> <span className="text-sm text-slate-500 align-middle ml-2 normal-case font-sans font-normal tracking-normal block md:inline mt-1 md:mt-0">(Processing Block Structure)</span>
      </h2>

      <div className={`max-w-[800px] mx-auto bg-slate-950/80 backdrop-blur border-2 ${isB200 ? 'border-green-900/50' : 'border-slate-800'} rounded-xl overflow-hidden p-4 shadow-[0_0_40px_rgba(0,243,255,0.1)]`}>

        {/* Pipeline Stages */}
        <div className="flex flex-col gap-2 mb-2">
          <div
            className="py-3 text-center font-bold text-sm font-tech uppercase tracking-wider bg-blue-950/30 border border-blue-700/50 text-blue-300 cursor-pointer hover:bg-blue-900/60 hover:border-blue-400 hover:text-blue-100 transition-all rounded-sm"
            onClick={() => onUnitClick('l0-cache')}
          >
            L0 Instruction Cache
          </div>

          <div
            className="py-3 text-center font-bold text-sm font-tech uppercase bg-orange-950/30 border border-orange-700/50 text-orange-300 cursor-pointer hover:bg-orange-900/60 hover:border-orange-400 hover:text-orange-100 transition-all rounded-sm"
            onClick={() => onUnitClick('warp-scheduler')}
          >
            Warp Scheduler <span className="text-[10px] opacity-70 font-sans normal-case ml-1 font-medium text-orange-200/70">({isB200 ? '16 warps' : '12 warps'}, 32 thread/clk)</span>
          </div>

          <div
            className="py-3 text-center font-bold text-sm font-tech uppercase bg-orange-900/20 border border-orange-700/50 text-orange-300 cursor-pointer hover:bg-orange-900/60 hover:border-orange-400 hover:text-orange-100 transition-all rounded-sm"
            onClick={() => onUnitClick('dispatch-unit')}
          >
            Dispatch Unit <span className="text-[10px] opacity-70 font-sans normal-case ml-1 font-medium text-orange-200/70">(32 thread/clk)</span>
          </div>

          <div
            className="py-5 text-center font-bold text-sm font-tech uppercase bg-cyan-950/20 border border-cyan-700/50 text-cyan-300 cursor-pointer hover:bg-cyan-900/60 hover:border-cyan-400 hover:text-white transition-all rounded-sm"
            onClick={() => onUnitClick('register-file')}
          >
            Register File <span className="text-cyan-500/70 ml-2 font-sans normal-case font-mono text-xs">(16,384 × 32-bit)</span>
          </div>
        </div>

        {/* Compute Grid */}
        <div className="grid grid-cols-[1fr_1fr_1fr_1fr_1.8fr] border border-slate-800 bg-slate-900 rounded-sm overflow-hidden">
          {renderComputeColumn('int32', 16)}
          {renderComputeColumn('fp32', 16)}
          {renderComputeColumn('fp32', 16)}
          {renderComputeColumn('fp64', 16)}

          {/* Tensor Core */}
          <div className="flex flex-col h-full border-l border-slate-800">
            <div
              className={`flex-1 bg-gradient-to-br from-green-950/40 to-emerald-950/40 text-green-400 text-center flex flex-col items-center justify-center p-4 cursor-pointer hover:from-green-900/60 hover:to-emerald-900/60 hover:text-green-100 transition-all group ${isB200 ? 'h-3/4' : 'h-full'}`}
              onClick={() => onUnitClick('tensor-core')}
            >
              <div className="font-black text-2xl md:text-3xl font-tech tracking-tighter drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] group-hover:scale-105 transition-transform">TENSOR</div>
              <div className="font-black text-2xl md:text-3xl font-tech tracking-tighter drop-shadow-[0_0_8px_rgba(34,197,94,0.6)] group-hover:scale-105 transition-transform">CORE</div>
              <div className="text-[10px] font-bold mt-4 text-green-500 border border-green-800/50 px-3 py-1 rounded bg-black/40 backdrop-blur-sm">
                {isB200 ? <span>5<sup>th</sup> GEN (FP4/FP6)</span> : <span>4<sup>th</sup> GENERATION</span>}
              </div>
            </div>
            {isB200 && (
              <div
                className="h-1/4 bg-emerald-900/30 text-emerald-300 flex items-center justify-center text-xs font-bold border-t border-emerald-800/50 cursor-pointer hover:bg-emerald-800/50 transition-colors font-tech tracking-wider"
                onClick={() => onUnitClick('tmem')}
              >
                TMEM (TENSOR MEMORY)
              </div>
            )}
          </div>
        </div>

        {/* LD/ST and SFU */}
        <div className="flex gap-2 mt-2">
          {/* LD/ST Group */}
          <div className="flex-1 relative border border-pink-700/40 rounded-sm p-1.5 bg-pink-950/10">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-900 text-[10px] font-bold text-pink-500 px-2 border border-pink-700/40 rounded font-tech tracking-wider whitespace-nowrap z-10">LD/ST UNITS (8x)</div>
            <div className="flex gap-[2px] mt-2">
              {Array.from({ length: 8 }).map((_, i) => (
                <div
                  key={i}
                  className="flex-1 bg-pink-900/20 border border-pink-700/30 text-pink-400 text-center text-[8px] font-bold py-4 cursor-pointer hover:bg-pink-600/80 hover:border-pink-400 hover:text-white transition-all writing-mode-vertical rounded-sm"
                  onClick={() => onUnitClick('ldst')}
                >
                  LD/ST
                </div>
              ))}
            </div>
          </div>

          {/* SFU Group */}
          <div className="flex-[0.3] relative border border-indigo-700/40 rounded-sm p-1.5 bg-indigo-950/10">
            <div className="absolute -top-2.5 left-1/2 -translate-x-1/2 bg-slate-900 text-[10px] font-bold text-indigo-500 px-2 border border-indigo-700/40 rounded font-tech tracking-wider whitespace-nowrap z-10">SFU (4x)</div>
            <div
              className="h-full mt-2 flex items-center justify-center bg-indigo-900/20 border border-indigo-700/30 text-indigo-400 font-bold text-lg font-tech cursor-pointer hover:bg-indigo-600/80 hover:border-indigo-400 hover:text-white transition-all rounded-sm"
              onClick={() => onUnitClick('sfu')}
            >
              SFU
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default SMSPQuadrant;