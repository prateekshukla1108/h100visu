import React, { useState } from 'react';
import Tabs from './components/Tabs';
import SMSPQuadrant from './components/views/SMSPQuadrant';
import FullGPUDie from './components/views/FullGPUDie';
import SingleSM from './components/views/SingleSM';
import Specs from './components/views/Specs';
import Modal from './components/Modal';
import { UnitKey, ViewType } from './types';
import { unitInfoData } from './data/unitInfo';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState<ViewType>(ViewType.FULL_DIE);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedUnit, setSelectedUnit] = useState<UnitKey | null>(null);

  const handleUnitClick = (key: UnitKey) => {
    if (unitInfoData[key]) {
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
        return <SMSPQuadrant onUnitClick={handleUnitClick} />;
      case ViewType.FULL_DIE:
        return <FullGPUDie onUnitClick={handleUnitClick} />;
      case ViewType.SINGLE_SM:
        return <SingleSM onUnitClick={handleUnitClick} />;
      case ViewType.SPECS:
        return <Specs />;
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
            <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-blue-500 font-tech tracking-tight neon-text drop-shadow-lg">
              NVIDIA H100
            </h1>
            <p className="text-cyan-100/70 mt-2 text-lg font-light tracking-wide border-l-2 border-cyan-500 pl-3">
              HOPPER ARCHITECTURE VISUALIZER
            </p>
          </div>
          <div className="text-right flex flex-col items-end gap-1">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_8px_#22c55e]"></span>
              <div className="text-sm font-bold text-cyan-400 font-tech tracking-wider">SYSTEM ONLINE</div>
            </div>
            <div className="text-xs text-slate-400 font-mono">TSMC 4N // 80B TRANSISTORS</div>
          </div>
        </div>
      </div>

      <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

      <div className="relative z-10 min-h-[600px]">
        {renderView()}
      </div>

      <footer className="text-center mt-20 p-8 border-t border-cyan-900/30 text-slate-500 text-xs font-mono uppercase tracking-widest">
        <p className="mb-2">Neural Processing Matrix // 4th Gen Tensor Core Technology</p>
        <p className="text-slate-600">Interactive Architecture Schematic</p>
      </footer>

      <Modal 
        isOpen={modalOpen} 
        onClose={closeModal} 
        info={selectedUnit ? unitInfoData[selectedUnit] : null} 
      />
    </div>
  );
};

export default App;