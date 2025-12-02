import React from 'react';
import { Architecture } from '../../types';

interface SpecsProps {
  architecture?: Architecture;
}

const Specs: React.FC<SpecsProps> = ({ architecture = 'H100' }) => {
  const isB200 = architecture === 'B200';

  const h100Stats = [
    { label: 'Streaming Multiprocessors', value: '132', sub: '8 GPCs × 8-9 SMs' },
    { label: 'CUDA Cores', value: '16,896', sub: '128 FP32/INT32 per SM' },
    { label: 'Tensor Cores', value: '528', sub: '4th Generation' },
    { label: 'FP64 Performance', value: '67 TFLOPS', sub: 'Double Precision' },
    { label: 'FP32 Performance', value: '67 TFLOPS', sub: 'Single Precision' },
    { label: 'Tensor Performance', value: '3,958 TFLOPS', sub: 'FP8 with Sparsity' },
    { label: 'Memory Bandwidth', value: '3.35 TB/s', sub: 'HBM3' },
    { label: 'L2 Cache', value: '50 MB', sub: 'Unified' },
    { label: 'NVLink Bandwidth', value: '900 GB/s', sub: 'Bidirectional' },
    { label: 'TDP', value: '700W', sub: 'SXM5 Form Factor' },
    { label: 'Manufacturing Process', value: 'TSMC 4N', sub: 'Custom 4nm' },
    { label: 'Transistor Count', value: '80 Billion', sub: '' },
  ];

  const b200Stats = [
    { label: 'Streaming Multiprocessors', value: '~264', sub: 'Dual-Die Architecture' },
    { label: 'CUDA Cores', value: '~33,792', sub: '128 per SM' },
    { label: 'Tensor Cores', value: '~1,056', sub: '5th Gen (FP4/FP6)' },
    { label: 'FP64 Performance', value: '45 TFLOPS', sub: 'HPC Optimized' },
    { label: 'AI Performance', value: '20 PFLOPS', sub: 'FP4 Tensor Core' },
    { label: 'Memory Capacity', value: '192 GB', sub: 'HBM3e' },
    { label: 'Memory Bandwidth', value: '8.0 TB/s', sub: 'HBM3e' },
    { label: 'L2 Cache', value: '126 MB', sub: 'Distributed Coherent' },
    { label: 'Chip-to-Chip', value: '10 TB/s', sub: 'NV-HBI' },
    { label: 'NVLink Bandwidth', value: '1.8 TB/s', sub: '5th Gen Bidirectional' },
    { label: 'Manufacturing Process', value: 'TSMC 4NP', sub: 'Refined 4nm' },
    { label: 'Transistor Count', value: '208 Billion', sub: 'Multi-Die' },
  ];

  const h100Features = [
    { title: 'Transformer Engine', details: 'Accelerates AI training with mixed precision (FP8) and dynamic range management.' },
    { title: '2nd Gen MIG', details: 'Multi-Instance GPU technology allows partitioning into 7 isolated instances for optimal utilization.' },
    { title: 'Confidential Computing', details: 'Hardware-based TEE secures data and code during processing (inference/training).' },
    { title: '4th Gen NVLink', details: 'High-speed interconnect enables scaling to thousands of GPUs with linear performance growth.' },
  ];

  const b200Features = [
    { title: 'Blackwell Tensor Core', details: '5th Gen Tensor Cores with FP4/FP6 precision support, doubling performance for inference.' },
    { title: 'Dual-Die Architecture', details: 'Two compute dies connected by 10 TB/s NV-HBI, presenting as a single unified GPU.' },
    { title: 'Tensor Memory (TMEM)', details: 'Dedicated on-chip memory for Tensor Cores to increase bandwidth and reduce L1 pollution.' },
    { title: 'Second-Gen Transformer Engine', details: 'Automatically handles FP4 precision for massive LLM inference acceleration.' },
  ];

  const stats = isB200 ? b200Stats : h100Stats;
  const features = isB200 ? b200Features : h100Features;

  return (
    <div className="fade-in max-w-7xl mx-auto">
      <h2 className={`text-center font-tech font-bold mb-12 text-3xl tracking-widest uppercase drop-shadow-[0_0_10px_rgba(236,72,153,0.6)] ${isB200 ? 'text-green-500' : 'text-pink-500'}`}>
        {isB200 ? 'B200 Technical Specifications' : 'H100 Technical Specifications'}
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        {stats.map((stat, i) => (
          <div key={i} className={`bg-slate-900/60 border ${isB200 ? 'border-green-900/30' : 'border-slate-700'} rounded-lg p-6 shadow-lg hover:border-cyan-500/50 hover:shadow-[0_0_20px_rgba(6,182,212,0.2)] transition-all duration-300 group relative overflow-hidden`}>
            <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="text-cyan-500 text-xs font-bold uppercase tracking-widest mb-2 font-tech">{stat.label}</div>
            <div className="text-white text-3xl font-black mb-1 font-tech tracking-tight group-hover:text-cyan-300 transition-colors">{stat.value}</div>
            <div className="text-slate-500 text-sm font-mono">{stat.sub}</div>
          </div>
        ))}
      </div>

      <div className={`glass-panel rounded-xl overflow-hidden shadow-2xl border ${isB200 ? 'border-green-900/30' : 'border-slate-700'}`}>
        <div className={`bg-slate-900/80 px-8 py-6 border-b ${isB200 ? 'border-green-900/30' : 'border-slate-700'}`}>
          <h3 className="text-orange-400 font-bold text-xl font-tech uppercase tracking-widest">Key Architectural Features</h3>
        </div>
        <div className="divide-y divide-slate-800">
          {features.map((feat, i) => (
            <div key={i} className="p-8 flex flex-col md:flex-row gap-6 md:items-start hover:bg-slate-800/50 transition-colors group">
              <div className="md:w-1/4 font-bold text-white text-lg font-tech group-hover:text-orange-300 transition-colors">{feat.title}</div>
              <div className="md:w-3/4 text-slate-400 leading-relaxed font-light">{feat.details}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Specs;