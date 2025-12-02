import React, { useState } from 'react';
import Tabs from './components/Tabs';
import SMSPQuadrant from './components/views/SMSPQuadrant';
import FullGPUDie from './components/views/FullGPUDie';
import SingleSM from './components/views/SingleSM';
import Specs from './components/views/Specs';
import Modal from './components/Modal';
import { UnitKey, ViewType, Architecture } from './types';
import { unitInfoData } from './data/unitInfo';
import { b200UnitInfoData } from './data/b200UnitInfo';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewType>(ViewType.FULL_DIE);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<UnitKey | null>(null);
  const [architecture, setArchitecture] = useState<Architecture>('H100');

  const currentUnitInfo = architecture === 'H100' ? unitInfoData : b200UnitInfoData;

  const handleUnitClick = (key: UnitKey) => {
    if (currentUnitInfo[key]) {
      setSelectedUnit(key);
      setModalOpen(true);
    } else {
      console.warn(`No data for unit: ${key}`);
    }
  };

  const closeModal = () => {
    setModalOpen(false);
    setSelectedUnit(null);
  };

  const renderView = () => {
    switch (activeTab) {
      case ViewType.SMSP:
        return <SMSPQuadrant onUnitClick={handleUnitClick} architecture={architecture} />;
      case ViewType.FULL_DIE:
        return <FullGPUDie onUnitClick={handleUnitClick} architecture={architecture} />;
      case ViewType.SINGLE_SM:
        return <SingleSM onUnitClick={handleUnitClick} architecture={architecture} />;
      case ViewType.SPECS:
        return <Specs architecture={architecture} />;
      default:
        return null;
    }
  };

  return (
    <div className="relative z-10 max-w-[1800px] mx-auto p-4 md:p-8">

      {/* Header */}
      <div className="mb-10 border-b border-cyan-900/50 pb-8 relative">
        <div className="absolute -bottom-px left-0 w-1/3 h-px bg-gradient-to-r from-transparent via-cyan-500 to-transparent"></div>

        <div className="flex flex-col md:flex-row justify-between items-end gap-6">
          <div>
            <div className="flex items-center gap-4 mb-2">
              <button
                onClick={() => setArchitecture('H100')}
                className={`px-3 py-1 text-sm font-bold rounded transition-all ${architecture === 'H100' ? 'bg-cyan-500 text-black shadow-[0_0_10px_rgba(6,182,212,0.5)]' : 'bg-slate-800 text-slate-400 hover:text-cyan-400'}`}
              >
                H100 HOPPER
              </button>
              <button
                onClick={() => setArchitecture('B200')}
                className={`px-3 py-1 text-sm font-bold rounded transition-all ${architecture === 'B200' ? 'bg-green-500 text-black shadow-[0_0_10px_rgba(34,197,94,0.5)]' : 'bg-slate-800 text-slate-400 hover:text-green-400'}`}
              >
                B200 BLACKWELL
              </button>
            </div>
            <h1 className={`text-4xl md:text-5xl font-black text-transparent bg-clip-text font-tech tracking-tight neon-text drop-shadow-lg ${architecture === 'H100' ? 'bg-gradient-to-r from-cyan-400 to-blue-500' : 'bg-gradient-to-r from-green-400 to-emerald-500'}`}>
              NVIDIA {architecture}
            </h1>
            <p className={`mt-2 text-lg font-light tracking-wide border-l-2 pl-3 ${architecture === 'H100' ? 'text-cyan-100/70 border-cyan-500' : 'text-green-100/70 border-green-500'}`}>
              {architecture === 'H100' ? 'HOPPER' : 'BLACKWELL'} ARCHITECTURE VISUALIZER
            </p>
          </div>
          <div className="text-right flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span className={`w-2 h-2 rounded-full animate-pulse shadow-[0_0_8px] ${architecture === 'H100' ? 'bg-green-500 shadow-green-500' : 'bg-emerald-400 shadow-emerald-400'}`}></span>
              <div className={`text-sm font-bold font-tech tracking-wider ${architecture === 'H100' ? 'text-cyan-400' : 'text-green-400'}`}>SYSTEM ONLINE</div>
            </div>
            <div className="text-xs text-slate-400 font-mono">
              {architecture === 'H100' ? 'TSMC 4N // 80B TRANSISTORS' : 'TSMC 4NP // 208B TRANSISTORS'}
            </div>
          </div>
        </div>
      </div>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="relative z-10 min-h-[600px]">
        {renderView()}
      </div>

      <footer className="text-center mt-20 p-8 border-t border-cyan-900/30 text-slate-500 text-xs font-mono uppercase tracking-widest">
        <p className="mb-2">Neural Processing Matrix // {architecture === 'H100' ? '4th' : '5th'} Gen Tensor Core Technology</p>
        <p className="text-slate-600">Interactive Architecture Schematic</p>
      </footer>

      <Modal
        isOpen={modalOpen}
        onClose={closeModal}
        info={selectedUnit ? currentUnitInfo[selectedUnit] : null}
      />
    </div>
  );
};

export default App;