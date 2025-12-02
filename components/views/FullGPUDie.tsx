import React from 'react';
import { UnitKey, Architecture } from '../../types';

interface FullGPUDieProps {
  onUnitClick: (key: UnitKey) => void;
  architecture?: Architecture;
}

const FullGPUDie: React.FC<FullGPUDieProps> = ({ onUnitClick, architecture = 'H100' }) => {
  const isB200 = architecture === 'B200';

  // Logic for Disabled SMs:
  // Total 144 SMs (8 GPCs * 9 TPCs * 2 SMs).
  // Target Active: 132 SMs.
  // Disabled: 12 SMs (6 TPCs).
  // Strategy: Disable the last TPC (2 SMs) in GPCs 0, 1, 2, 4, 5, 6. 

  const renderTPCGrid = (startSM: number, gpcIndex: number) => {
    const tpcs = [];
    let currentSM = startSM;

    // H100 Logic: Disable specific TPCs to reach 132 SMs
    // B200 Logic: 80 SMs per die -> 10 SMs per GPC -> 5 TPCs per GPC
    const tpcCount = isB200 ? 5 : 9;
    const hasDisabledTPC = !isB200 && [0, 1, 2, 4, 5, 6].includes(gpcIndex);

    for (let i = 0; i < (isB200 ? 5 : 9); i++) {
      const sm1 = currentSM;
      const sm2 = currentSM + 1;
      currentSM += 2;

      const isPoisoned = !isB200 && hasDisabledTPC && i === 8;

      tpcs.push(
        <div
          key={i}
          className={`
            group relative flex flex-col gap-[1px] p-[1px] rounded-[2px] transition-all duration-200 min-w-[28px] h-full flex-1 border
            ${isPoisoned
              ? 'opacity-30 cursor-not-allowed border-red-900/30 bg-red-950/10'
              : `cursor-pointer ${isB200 ? 'border-green-900/40 bg-green-950/5 hover:bg-green-900/30 hover:border-green-400' : 'border-green-900/40 bg-green-950/5 hover:bg-green-900/30 hover:border-green-400'} hover:shadow-[0_0_15px_rgba(34,197,94,0.2)] hover:z-10 hover:scale-[1.02]`
            }
          `}
          onClick={() => !isPoisoned && onUnitClick('tpc')}
          title={isPoisoned ? "Disabled TPC" : `TPC (SM ${sm1} & ${sm2})`}
        >
          {!isPoisoned && (
            <div className="absolute -top-8 left-1/2 -translate-x-1/2 bg-green-500 text-black text-[10px] font-bold px-1 py-0.5 rounded shadow-[0_0_10px_rgba(34,197,94,0.8)] opacity-0 group-hover:opacity-100 transition-opacity duration-150 z-30 pointer-events-none whitespace-nowrap font-tech border border-green-300">
              TPC ({sm1},{sm2})
            </div>
          )}

          <div className={`
             flex-1 flex flex-col items-center justify-center text-sm font-bold font-mono rounded-[1px] shadow-inner min-h-[20px]
             ${isPoisoned ? 'text-red-500/50' : `bg-green-500/10 text-green-400 border border-green-500/20 group-hover:text-green-100 group-hover:bg-green-500/40 group-hover:border-green-400/50`}
           `}>
            <span className="text-xs opacity-60 scale-75 origin-bottom">SM</span>
            {sm1}
          </div>

          <div className={`
             flex-1 flex flex-col items-center justify-center text-sm font-bold font-mono rounded-[1px] shadow-inner min-h-[20px]
             ${isPoisoned ? 'text-red-500/50' : `bg-green-500/10 text-green-400 border border-green-500/20 group-hover:text-green-100 group-hover:bg-green-500/40 group-hover:border-green-400/50`}
           `}>
            <span className="text-xs opacity-60 scale-75 origin-bottom">SM</span>
            {sm2}
          </div>

          {isPoisoned && (
            <div className="absolute inset-0 flex items-center justify-center z-20">
              <span className="text-red-600/60 text-lg font-bold select-none">×</span>
            </div>
          )}
        </div>
      );
    }
    return tpcs;
  };

  const renderDie = (dieIndex: number = 0) => {
    const smPerGPC = isB200 ? 10 : 18;
    const gpcOffset = dieIndex * 8;

    return (
      <div className={`bg-slate-950 border ${isB200 ? 'border-green-900/30' : 'border-slate-800'} rounded-xl p-4 shadow-[0_0_50px_rgba(0,0,0,0.8)] flex flex-col gap-4 relative overflow-hidden min-h-[600px]`}>

        {isB200 && (
          <div className="absolute top-2 left-2 text-green-500/50 font-tech font-bold text-xl uppercase tracking-widest pointer-events-none">
            COMPUTE DIE {dieIndex}
          </div>
        )}

        <div className="absolute inset-0 pointer-events-none opacity-10 bg-[linear-gradient(rgba(0,243,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,243,255,0.05)_1px,transparent_1px)] bg-[size:20px_20px]"></div>

        {/* Top Bar */}
        <div className="flex flex-col gap-2 relative z-10 shrink-0 px-6">
          <div
            className="bg-slate-900/90 border border-cyan-900/50 rounded p-2 text-center text-cyan-400 font-bold text-base font-tech tracking-widest uppercase hover:bg-cyan-950/50 hover:border-cyan-500 hover:text-cyan-300 transition-all cursor-pointer"
            onClick={() => onUnitClick('pcie-interface')}
          >
            {isB200 ? 'High-Speed Host Interface' : 'PCI Express 5.0 Host Interface'}
          </div>
          <div
            className="bg-slate-900/90 border border-orange-900/50 rounded p-2 text-center text-orange-400 font-bold text-base font-tech tracking-widest uppercase hover:bg-orange-950/50 hover:border-orange-500 hover:text-orange-300 transition-all cursor-pointer"
            onClick={() => onUnitClick('gigathread-engine')}
          >
            GigaThread Engine
          </div>
        </div>

        {/* Die Body */}
        <div className="grid grid-cols-[100px_1fr_100px] gap-4 items-stretch flex-1 w-full relative z-10">

          {/* Left Column */}
          <div className="flex flex-col gap-4 justify-between h-full min-w-0">
            <div className="h-[40px] shrink-0 bg-purple-950/20 border border-purple-500/30 rounded-lg p-2 flex items-center justify-center text-center text-purple-300 font-bold text-xs font-tech uppercase hover:bg-purple-900/40 hover:border-purple-400 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)] cursor-pointer transition-all" onClick={() => onUnitClick('nvlink-switch')}>NVLink<br />Switch</div>
            <div className="flex flex-col gap-2 flex-1 justify-end">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex gap-1 items-stretch flex-1">
                  <div className="flex-1 bg-slate-900 rounded-lg flex items-center justify-center text-cyan-300 font-bold text-base font-tech tracking-wide border border-cyan-900/60 cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all" onClick={() => onUnitClick('hbm3')}>
                    {isB200 ? 'HBM3e' : 'HBM3'}
                  </div>
                  <div className="flex flex-col gap-1 w-[20px]">
                    <div className="flex-1 bg-blue-950/40 border border-blue-800 rounded-[2px] text-blue-400 text-[8px] font-bold uppercase flex items-center justify-center [writing-mode:vertical-rl] cursor-pointer hover:bg-blue-900 hover:border-blue-500" onClick={() => onUnitClick('memory-controller')}>MC</div>
                    <div className="flex-1 bg-blue-950/40 border border-blue-800 rounded-[2px] text-blue-400 text-[8px] font-bold uppercase flex items-center justify-center [writing-mode:vertical-rl] cursor-pointer hover:bg-blue-900 hover:border-blue-500" onClick={() => onUnitClick('memory-controller')}>MC</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Center: Core Complex */}
          <div className="flex flex-col gap-4 w-full justify-between h-full flex-1 min-w-0">

            {/* Top GPC Row */}
            <div className="grid grid-cols-4 gap-2 flex-1 min-h-[240px]">
              {[0, 1, 2, 3].map(gpcId => (
                <div key={gpcId} className={`bg-slate-900/60 border border-slate-700/50 rounded-lg p-1.5 flex flex-col gap-1.5 shadow-inner relative group/gpc transition-all hover:border-slate-500 hover:bg-slate-900/80 h-full ${isB200 ? 'min-w-[140px]' : 'min-w-[240px]'}`}>
                  <div className="shrink-0 text-center text-slate-400 text-xs font-bold font-tech uppercase bg-slate-800/50 rounded py-1 cursor-pointer hover:text-white hover:bg-slate-700 transition-colors" onClick={() => onUnitClick('gpc')}>
                    GPC {gpcOffset + gpcId}
                  </div>
                  <div className={`grid ${isB200 ? 'grid-cols-5' : 'grid-cols-9'} gap-[2px] flex-1 h-full w-full`}>
                    {renderTPCGrid((gpcOffset + gpcId) * smPerGPC, gpcOffset + gpcId)}
                  </div>
                </div>
              ))}
            </div>

            {/* L2 Cache Strip */}
            <div className="shrink-0 flex gap-4 min-h-[80px]">
              {isB200 ? (
                // Unified L2 Cache for B200
                <div
                  className="flex-1 bg-blue-950/20 border border-blue-500/30 rounded-lg relative overflow-hidden group/l2 cursor-pointer hover:bg-blue-900/30 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all flex flex-col items-center justify-center gap-0.5"
                  onClick={() => onUnitClick('l2-cache')}
                >
                  {/* Tech Pattern Background */}
                  <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(0deg,transparent_24%,rgba(59,130,246,1)_25%,rgba(59,130,246,1)_26%,transparent_27%,transparent_74%,rgba(59,130,246,1)_75%,rgba(59,130,246,1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(59,130,246,1)_25%,rgba(59,130,246,1)_26%,transparent_27%,transparent_74%,rgba(59,130,246,1)_75%,rgba(59,130,246,1)_76%,transparent_77%,transparent)] bg-[length:30px_30px]"></div>
                  <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_100%)] opacity-0 group-hover/l2:opacity-100 transition-opacity duration-500"></div>

                  {/* Content */}
                  <div className="text-blue-400 font-bold text-xl font-tech tracking-[0.15em] uppercase z-10 group-hover/l2:text-blue-300 group-hover/l2:scale-105 transition-all duration-300 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
                    Unified L2 Cache
                  </div>
                  <div className="flex items-center gap-2 z-10 opacity-70 group-hover/l2:opacity-100 transition-opacity">
                    <div className="h-[1px] w-16 bg-blue-500/50"></div>
                    <div className="text-blue-300 font-mono text-xs font-bold uppercase tracking-wider">
                      128 MB
                    </div>
                    <div className="h-[1px] w-16 bg-blue-500/50"></div>
                  </div>
                </div>
              ) : (
                // Split L2 Cache for H100
                [0, 1].map((i) => (
                  <div
                    key={i}
                    className="flex-1 bg-blue-950/20 border border-blue-500/30 rounded-lg relative overflow-hidden group/l2 cursor-pointer hover:bg-blue-900/30 hover:border-blue-400 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] transition-all flex flex-col items-center justify-center gap-0.5"
                    onClick={() => onUnitClick('l2-cache')}
                  >
                    {/* Tech Pattern Background */}
                    <div className="absolute inset-0 opacity-[0.03] bg-[linear-gradient(0deg,transparent_24%,rgba(59,130,246,1)_25%,rgba(59,130,246,1)_26%,transparent_27%,transparent_74%,rgba(59,130,246,1)_75%,rgba(59,130,246,1)_76%,transparent_77%,transparent),linear-gradient(90deg,transparent_24%,rgba(59,130,246,1)_25%,rgba(59,130,246,1)_26%,transparent_27%,transparent_74%,rgba(59,130,246,1)_75%,rgba(59,130,246,1)_76%,transparent_77%,transparent)] bg-[length:30px_30px]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(59,130,246,0.1)_0%,transparent_100%)] opacity-0 group-hover/l2:opacity-100 transition-opacity duration-500"></div>

                    {/* Content */}
                    <div className="text-blue-400 font-bold text-xl font-tech tracking-[0.15em] uppercase z-10 group-hover/l2:text-blue-300 group-hover/l2:scale-105 transition-all duration-300 drop-shadow-[0_0_5px_rgba(59,130,246,0.5)]">
                      L2 Cache
                    </div>
                    <div className="flex items-center gap-2 z-10 opacity-70 group-hover/l2:opacity-100 transition-opacity">
                      <div className="h-[1px] w-8 bg-blue-500/50"></div>
                      <div className="text-blue-300 font-mono text-xs font-bold uppercase tracking-wider">
                        25 MB
                      </div>
                      <div className="h-[1px] w-8 bg-blue-500/50"></div>
                    </div>
                  </div>
                ))
              )}
            </div>

            {/* Bottom GPC Row */}
            <div className="grid grid-cols-4 gap-2 flex-1 min-h-[240px]">
              {[4, 5, 6, 7].map(gpcId => (
                <div key={gpcId} className={`bg-slate-900/60 border border-slate-700/50 rounded-lg p-1.5 flex flex-col gap-1.5 shadow-inner relative group/gpc transition-all hover:border-slate-500 hover:bg-slate-900/80 h-full ${isB200 ? 'min-w-[140px]' : 'min-w-[240px]'}`}>
                  <div className="shrink-0 text-center text-slate-400 text-xs font-bold font-tech uppercase bg-slate-800/50 rounded py-1 cursor-pointer hover:text-white hover:bg-slate-700 transition-colors" onClick={() => onUnitClick('gpc')}>
                    GPC {gpcOffset + gpcId}
                  </div>
                  <div className={`grid ${isB200 ? 'grid-cols-5' : 'grid-cols-9'} gap-[2px] flex-1 h-full w-full`}>
                    {renderTPCGrid((gpcOffset + gpcId) * smPerGPC, gpcOffset + gpcId)}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column */}
          <div className="flex flex-col gap-4 justify-between h-full min-w-0">
            <div className="h-[40px] shrink-0 bg-purple-950/20 border border-purple-500/30 rounded-lg p-2 flex items-center justify-center text-center text-purple-300 font-bold text-xs font-tech uppercase hover:bg-purple-900/40 hover:border-purple-400 hover:shadow-[0_0_10px_rgba(168,85,247,0.2)] cursor-pointer transition-all" onClick={() => onUnitClick('nvlink-switch')}>NVLink<br />Switch</div>
            <div className="flex flex-col gap-2 flex-1 justify-end">
              {[...Array(3)].map((_, i) => (
                <div key={i} className="flex flex-row-reverse gap-1 items-stretch flex-1">
                  <div className="flex-1 bg-slate-900 rounded-lg flex items-center justify-center text-cyan-300 font-bold text-base font-tech tracking-wide border border-cyan-900/60 cursor-pointer hover:border-cyan-400 hover:shadow-[0_0_10px_rgba(6,182,212,0.4)] transition-all" onClick={() => onUnitClick('hbm3')}>
                    {isB200 ? 'HBM3e' : 'HBM3'}
                  </div>
                  <div className="flex flex-col gap-1 w-[20px]">
                    <div className="flex-1 bg-blue-950/40 border border-blue-800 rounded-[2px] text-blue-400 text-[8px] font-bold uppercase flex items-center justify-center [writing-mode:vertical-lr] rotate-180 cursor-pointer hover:bg-blue-900 hover:border-blue-500" onClick={() => onUnitClick('memory-controller')}>MC</div>
                    <div className="flex-1 bg-blue-950/40 border border-blue-800 rounded-[2px] text-blue-400 text-[8px] font-bold uppercase flex items-center justify-center [writing-mode:vertical-lr] rotate-180 cursor-pointer hover:bg-blue-900 hover:border-blue-500" onClick={() => onUnitClick('memory-controller')}>MC</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="bg-slate-900/50 rounded-lg border border-green-900/30 p-3 flex flex-col gap-2 shadow-inner relative z-10 shrink-0">
          <div className="text-center text-green-500 font-bold text-base font-tech uppercase tracking-wider cursor-pointer hover:text-green-400 transition-all" onClick={() => onUnitClick('nvlink-hub')}>High-Speed NVLink Hub</div>
          <div className="grid grid-cols-[repeat(auto-fit,minmax(40px,1fr))] gap-2">
            {Array.from({ length: 18 }).map((_, i) => (
              <div key={i} className="bg-green-950/20 border border-green-800/50 rounded text-center py-2 text-green-500 font-bold text-[10px] font-mono uppercase cursor-pointer hover:bg-green-900/40 hover:border-green-500 hover:text-green-300 transition-all" onClick={() => onUnitClick('nvlink-port')}>Port {i + 1}</div>
            ))}
          </div>
        </div>

      </div>
    );
  };

  return (
    <div className="fade-in pb-12">
      <h2 className={`text-center font-tech font-bold mb-8 text-2xl tracking-wider uppercase drop-shadow-[0_0_10px_rgba(34,211,238,0.5)] ${isB200 ? 'text-green-400' : 'text-cyan-400'}`}>
        Full GPU Die Layout <span className="text-sm text-slate-500 align-middle ml-2 font-sans font-normal normal-case tracking-normal">({isB200 ? '160 Active SMs - Dual Die' : '132 Active SMs'})</span>
      </h2>

      <div className="w-full overflow-x-auto pb-8 px-2">
        {/* Rescaled container width to fit standard screens */}
        <div className="min-w-[1280px] mx-auto flex flex-col gap-8">

          {isB200 ? (
            <>
              {renderDie(0)}

              {/* NV-HBI Connector */}
              <div className="h-24 bg-slate-900/80 border-y-4 border-green-500/50 flex items-center justify-center relative overflow-hidden">
                <div className="absolute inset-0 bg-[repeating-linear-gradient(45deg,transparent,transparent_10px,rgba(34,197,94,0.1)_10px,rgba(34,197,94,0.1)_20px)] animate-pulse"></div>
                <div className="z-10 bg-slate-950 px-8 py-2 rounded-full border border-green-500 shadow-[0_0_20px_rgba(34,197,94,0.5)]">
                  <span className="text-2xl font-black font-tech text-green-400 tracking-widest">NV-HBI 10 TB/s INTERCONNECT</span>
                </div>
                {/* Data flow animation lines */}
                <div className="absolute top-0 left-1/4 w-[1px] h-full bg-green-500/30"></div>
                <div className="absolute top-0 right-1/4 w-[1px] h-full bg-green-500/30"></div>
                <div className="absolute top-0 left-1/3 w-[1px] h-full bg-green-500/30"></div>
                <div className="absolute top-0 right-1/3 w-[1px] h-full bg-green-500/30"></div>
              </div>

              {renderDie(1)}
            </>
          ) : (
            renderDie(0)
          )}

        </div>
      </div>
    </div>
  );
};

export default FullGPUDie;