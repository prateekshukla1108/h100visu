import { UnitInfo, UnitKey } from '../types';

export const unitInfoData: Record<string, UnitInfo> = {
  'l0-cache': {
    title: 'L0 Instruction Cache',
    description: 'The fastest instruction cache in the GPU memory hierarchy',
    sections: [
      {
        title: 'Functionality',
        content: [
          'Stores recently fetched instructions for immediate reuse',
          'Reduces instruction fetch latency to ~1 cycle',
          'Per-warp cache organization for optimal efficiency',
          'Direct interface with Warp Scheduler'
        ]
      },
      {
        title: 'Performance Benefits',
        content: [
          'Eliminates memory bandwidth bottlenecks for instruction fetch',
          'Enables rapid warp switching and context changes',
          'Critical for maintaining high SM utilization',
          'Supports up to 64 concurrent warps per SM'
        ]
      }
    ],
    specs: [
      {label: 'Latency', value: '~1 cycle'},
      {label: 'Scope', value: 'Per SM'},
      {label: 'Organization', value: 'Per-warp'}
    ]
  },
  'warp-scheduler': {
    title: 'Warp Scheduler',
    description: 'Advanced instruction scheduling unit for managing thread warps',
    sections: [
      {
        title: 'Core Responsibilities',
        content: [
          'Manages up to 64 concurrent warps per SM',
          'Selects ready warps for instruction issue each cycle',
          'Handles warp-level branching and divergence',
          'Optimizes instruction-level parallelism'
        ]
      },
      {
        title: 'Scheduling Logic',
        content: [
          'Round-robin and priority-based scheduling',
          'Stall-free warp switching capabilities',
          'Support for independent thread scheduling',
          'Handles memory latency hiding through warp rotation'
        ]
      }
    ],
    specs: [
      {label: 'Max Warps', value: '64 per SM'},
      {label: 'Threads/Warp', value: '32'},
      {label: 'Issue Rate', value: '32 threads/cycle'}
    ]
  },
  'dispatch-unit': {
    title: 'Dispatch Unit',
    description: 'High-throughput instruction dispatch and issue unit',
    sections: [
      {
        title: 'Dispatch Operations',
        content: [
          'Issues up to 2 instructions per warp per cycle',
          'Handles instruction decoding and operand fetch',
          'Manages register file port allocation',
          'Coordinates with execution units'
        ]
      },
      {
        title: 'Performance Features',
        content: [
          'Dual-issue capability for instruction-level parallelism',
          'Out-of-order execution support within warps',
          'Dynamic operand forwarding',
          'Pipeline optimization for maximum throughput'
        ]
      }
    ],
    specs: [
      {label: 'Dispatch Rate', value: '32 threads/cycle'},
      {label: 'Instructions/Cycle', value: '2 per warp'},
      {label: 'Pipeline Depth', value: 'Multiple stages'}
    ]
  },
  'register-file': {
    title: 'Register File',
    description: 'Large, fast register storage for thread data',
    sections: [
      {
        title: 'Storage Architecture',
        content: [
          '65,536 × 32-bit registers per SM',
          'Divided among active warps and threads',
          'Supports register-level parallelism',
          'Multi-banked for concurrent access'
        ]
      },
      {
        title: 'Access Patterns',
        content: [
          'High-speed read/write operations',
          'Register-level operand forwarding',
          'Supports register swapping and spilling',
          'Optimized for compute-intensive workloads'
        ]
      }
    ],
    specs: [
      {label: 'Total Registers', value: '65,536 × 32-bit'},
      {label: 'Per Thread', value: '255 max'},
      {label: 'Access Latency', value: '1 cycle'}
    ]
  },
  'int32': {
    title: 'INT32 Execution Units',
    description: 'Integer arithmetic and logic processing units',
    sections: [
      {
        title: 'Computational Capabilities',
        content: [
          '32-bit integer arithmetic operations',
          'Logical operations (AND, OR, XOR, NOT)',
          'Bit manipulation and shift operations',
          'Comparison and branch instructions'
        ]
      },
      {
        title: 'AI/ML Applications',
        content: [
          'Index calculations and address generation',
          'Loop control and counter operations',
          'Quantized integer inference (INT8, INT16)',
          'Memory access pattern calculations'
        ]
      }
    ],
    specs: [
      {label: 'Precision', value: '32-bit integer'},
      {label: 'Throughput', value: '1 operation/cycle'},
      {label: 'Units per SM', value: '64 total'}
    ]
  },
  'fp32': {
    title: 'FP32 Execution Units',
    description: 'Single-precision floating-point arithmetic processors',
    sections: [
      {
        title: 'Floating-Point Operations',
        content: [
          'IEEE 754 compliant single-precision arithmetic',
          'Add, multiply, multiply-add operations',
          'Transcendental functions (exp, log, trig)',
          'Division and square root operations'
        ]
      },
      {
        title: 'Scientific Computing',
        content: [
          'General-purpose scientific computing',
          'Graphics and rendering calculations',
          'Traditional machine learning training',
          'Signal processing applications'
        ]
      }
    ],
    specs: [
      {label: 'Precision', value: '32-bit IEEE 754'},
      {label: 'Throughput', value: '1 operation/cycle'},
      {label: 'Units per SM', value: '64 total'}
    ]
  },
  'fp64': {
    title: 'FP64 Execution Units',
    description: 'Double-precision floating-point arithmetic processors',
    sections: [
      {
        title: 'High-Precision Computing',
        content: [
          'IEEE 754 compliant double-precision arithmetic',
          'Extended range and precision for scientific accuracy',
          'Complex numerical simulations',
          'Financial and engineering calculations'
        ]
      },
      {
        title: 'Use Cases',
        content: [
          'Computational fluid dynamics',
          'Weather and climate modeling',
          'Quantum chemistry simulations',
          'High-precision linear algebra'
        ]
      }
    ],
    specs: [
      {label: 'Precision', value: '64-bit IEEE 754'},
      {label: 'Throughput', value: '1 operation/cycle'},
      {label: 'Units per SM', value: '16 total'}
    ]
  },
  'tensor-core': {
    title: '4th Generation Tensor Core',
    description: 'Specialized matrix multiplication acceleration units',
    sections: [
      {
        title: 'Matrix Operations',
        content: [
          'Accelerated matrix multiply-accumulate operations',
          'Support for mixed-precision computing',
          'FP8, FP16, BF16, TF32, FP64 precision support',
          'Sparsity acceleration for AI workloads'
        ]
      },
      {
        title: 'AI/ML Performance',
        content: [
          'Transformer Engine for dynamic precision',
          'Up to 4x faster than previous generation',
          'Optimized for large language models',
          'Support for attention mechanism acceleration'
        ]
      }
    ],
    specs: [
      {label: 'Generation', value: '4th Gen'},
      {label: 'Matrix Size', value: 'Up to 256×256'},
      {label: 'Precision Support', value: 'FP8 to FP64'}
    ]
  },
  'sfu': {
    title: 'Special Function Unit (SFU)',
    description: 'Specialized mathematical function processor',
    sections: [
      {
        title: 'Mathematical Functions',
        content: [
          'Transcendental functions (sin, cos, exp, log)',
          'Reciprocal and reciprocal square-root',
          'Power and root operations',
          'Hardware-accelerated approximations'
        ]
      },
      {
        title: 'Applications',
        content: [
          'Graphics rendering calculations',
          'Scientific computing functions',
          'Neural network activation functions',
          'Signal processing algorithms'
        ]
      }
    ],
    specs: [
      {label: 'Function Types', value: 'Transcendental'},
      {label: 'Precision', value: 'Single-precision'},
      {label: 'Units per SM', value: '4'}
    ]
  },
  'ldst': {
    title: 'Load/Store Units',
    description: 'Memory access and data movement units',
    sections: [
      {
        title: 'Memory Operations',
        content: [
          'Load and store operations to/from memory',
          'Address calculation and generation',
          'Cache coherency management',
          'Memory access pattern optimization'
        ]
      },
      {
        title: 'Data Movement',
        content: [
          'Shared memory access coordination',
          'Global memory request handling',
          'Memory latency hiding techniques',
          'Vectorized memory operations'
        ]
      }
    ],
    specs: [
      {label: 'Function', value: 'Memory access'},
      {label: 'Units per SM', value: '16'},
      {label: 'Bandwidth', value: 'High throughput'}
    ]
  },
  'smsp-l1-cache': {
    title: 'SMSP L1 Instruction Cache',
    description: 'Shared instruction cache for 4-SM cluster',
    sections: [
      {
        title: 'Shared Architecture',
        content: [
          'Shared among 4 Streaming Multiprocessors',
          'Reduces instruction duplication across SMs',
          'Improved cache hit rates for shared code',
          'Coordinated instruction prefetching'
        ]
      },
      {
        title: 'Efficiency Benefits',
        content: [
          'Lower memory bandwidth requirements',
          'Reduced instruction fetch latency',
          'Better utilization of cache resources',
          'Optimized for multi-SM workloads'
        ]
      }
    ],
    specs: [
      {label: 'Scope', value: '4 SM cluster'},
      {label: 'Organization', value: 'Shared'},
      {label: 'Efficiency', value: 'High utilization'}
    ]
  },
  'tma': {
    title: 'Tensor Memory Accelerator',
    description: 'Specialized memory engine for tensor operations',
    sections: [
      {
        title: 'Tensor Operations',
        content: [
          'Hardware-accelerated tensor reshaping',
          'Broadcast and gather operations',
          'Tensor transpose and permutation',
          'Memory layout optimization'
        ]
      },
      {
        title: 'Performance Benefits',
        content: [
          'Reduces memory traffic for tensor operations',
          'Accelerates data preprocessing',
          'Optimizes memory access patterns',
          'Supports complex tensor manipulations'
        ]
      }
    ],
    specs: [
      {label: 'Function', value: 'Tensor memory ops'},
      {label: 'Acceleration', value: 'Hardware'},
      {label: 'Use Cases', value: 'AI/ML workloads'}
        ]
  },
  'shared-memory': {
    title: 'L1 Data Cache / Shared Memory',
    description: 'Configurable on-chip memory for data sharing',
    sections: [
      {
        title: 'Memory Organization',
        content: [
          '256 KB total per SM (configurable split)',
          'L1 cache and shared memory can be dynamically partitioned',
          'Software-managed shared memory for programmer control',
          'Hardware-managed L1 cache for automatic caching'
        ]
      },
      {
        title: 'Programming Model',
        content: [
          '__shared__ memory for inter-thread communication',
          'Low-latency data sharing within thread blocks',
          'Barrier synchronization support',
          'Banked architecture for parallel access'
        ]
      }
    ],
    specs: [
      {label: 'Total Size', value: '256 KB'},
      {label: 'Configurable', value: 'L1/Shared split'},
      {label: 'Latency', value: '~30 cycles'}
    ]
  },
  'texture-unit': {
    title: 'Texture Units',
    description: 'Specialized texture sampling and filtering units',
    sections: [
      {
        title: 'Texture Operations',
        content: [
          'Hardware-accelerated texture sampling',
          'Bilinear and trilinear filtering',
          'Mipmap generation and sampling',
          'Texture coordinate calculations'
        ]
      },
      {
        title: 'Modern Applications',
        content: [
          'Graphics rendering and visualization',
          'Spatial data interpolation in scientific computing',
          'Memory access pattern optimization',
          'Data structure acceleration'
        ]
      }
    ],
    specs: [
      {label: 'Function', value: 'Texture sampling'},
      {label: 'Units per ISM', value: '4'},
      {label: 'Filtering', value: 'Hardware accelerated'}
        ]
  },
  'pcie-interface': {
    title: 'PCI Express 5.0 Host Interface',
    description: 'High-speed external communication interface for GPU connectivity',
    sections: [
      {
        title: 'Interface Capabilities',
        content: [
          'PCI Express 5.0 x16 interface providing 128 GB/s bandwidth',
          'Backward compatible with PCIe 4.0 and 3.0 systems',
          'Supports multiple GPU configurations via NVLink',
          'Enables high-speed data transfer between CPU and GPU'
        ]
      },
      {
        title: 'System Integration',
        content: [
          'Primary communication channel with host system',
          'Handles command submission and data retrieval',
          'Supports peer-to-peer GPU communication',
          'Critical for multi-GPU scaling and clustering'
        ]
      }
    ],
    specs: [
      {label: 'Generation', value: 'PCIe 5.0'},
      {label: 'Lanes', value: 'x16'},
      {label: 'Bandwidth', value: '128 GB/s'}
    ]
  },
  'gigathread-engine': {
    title: 'GigaThread Engine with Work Distributor',
    description: 'Advanced thread scheduling and workload distribution system',
    sections: [
      {
        title: 'Thread Management',
        content: [
          'Manages thousands of concurrent thread blocks across all SMs',
          'Intelligent work distribution for optimal GPU utilization',
          'Dynamic load balancing between Streaming Multiprocessors',
          'Handles context switching and task prioritization'
        ]
      },
      {
        title: 'Performance Optimization',
        content: [
          'Maximizes parallel execution across 132 SMs',
          'Reduces idle time and improves throughput',
          'Adaptive scheduling based on workload characteristics',
          'Critical for maintaining high GPU efficiency'
        ]
      }
    ],
    specs: [
      {label: 'SM Support', value: '132 SMs'},
      {label: 'Thread Capacity', value: 'Thousands'},
      {label: 'Load Balancing', value: 'Dynamic'}
    ]
  },
  'nvlink-switch': {
    title: 'NVLink Switch Fabric',
    description: 'High-bandwidth GPU-to-GPU interconnect technology',
    sections: [
      {
        title: 'Interconnect Architecture',
        content: [
          'Fourth-generation NVLink providing 900 GB/s total bandwidth',
          'Direct GPU-to-GPU communication bypassing PCIe',
          'Supports up to 8-way GPU connectivity in single node',
          'Enables coherent memory access across multiple GPUs'
        ]
      },
      {
        title: 'Multi-GPU Benefits',
        content: [
          'Essential for large model training and inference',
          'Enables memory pooling and scaling',
          'Reduces communication overhead in distributed computing',
          'Critical for HPC and AI workloads'
        ]
      }
    ],
    specs: [
      {label: 'Generation', value: '4th Gen'},
      {label: 'Total Bandwidth', value: '900 GB/s'},
      {label: 'GPU Support', value: 'Up to 8 GPUs'}
    ]
  },
  'memory-controller': {
    title: 'Memory Controller',
    description: 'High-speed memory interface controller for HBM3 subsystem',
    sections: [
      {
        title: 'Memory Management',
        content: [
          'Controls HBM3 memory stacks with 3 TB/s total bandwidth',
          'Handles memory requests from all SMs and cache slices',
          'Implements advanced memory scheduling and arbitration',
          'Supports error correction and memory reliability features'
        ]
      },
      {
        title: 'Performance Features',
        content: [
          'Optimized for high-bandwidth, low-latency memory access',
          'Supports simultaneous read/write operations',
          'Implements memory coherency protocols',
          'Critical for feeding data to 132 SMs efficiently'
        ]
      }
    ],
    specs: [
      {label: 'Memory Type', value: 'HBM3'},
      {label: 'Total Bandwidth', value: '3 TB/s'},
      {label: 'Controllers', value: '12 total'}
    ]
  },
  'hbm3': {
    title: 'HBM3 Memory',
    description: 'High-Bandwidth Memory 3rd generation for massive data throughput',
    sections: [
      {
        title: 'Memory Technology',
        content: [
          '80 GB HBM3 memory stacks with unprecedented bandwidth',
          '3.35 TB/s aggregate memory bandwidth',
          'Stacked die architecture for improved density',
          'Lower power consumption per bit transferred'
        ]
      },
      {
        title: 'AI/ML Impact',
        content: [
          'Enables training of massive models with billions of parameters',
          'Supports high-throughput inference workloads',
          'Critical for large language models and generative AI',
          'Provides memory bandwidth for data-intensive applications'
        ]
      }
    ],
    specs: [
      {label: 'Total Capacity', value: '80 GB'},
      {label: 'Bandwidth', value: '3.35 TB/s'},
      {label: 'Generation', value: 'HBM3'}
    ]
  },
  'gpc': {
    title: 'Graphics Processing Cluster (GPC)',
    description: 'Major organizational unit containing multiple SMs and shared resources',
    sections: [
      {
        title: 'Cluster Architecture',
        content: [
          'Contains 16-18 Streaming Multiprocessors per GPC',
          'Shared raster engines and polymorph engines',
          'Dedicated L2 cache slice and crossbar interface',
          'Independent work distribution and scheduling'
        ]
      },
      {
        title: 'Resource Management',
        content: [
          'Manages execution resources within cluster',
          'Handles work distribution to constituent SMs',
          'Provides shared graphics and compute resources',
          'Optimizes resource utilization and power efficiency'
        ]
      }
    ],
    specs: [
      {label: 'SMs per GPC', value: '16-18'},
      {label: 'Total GPCs', value: '8'},
      {label: 'Shared Resources', value: 'Raster/Polymorph engines'}
        ]
  },
  'tpc': {
    title: 'Texture Processing Cluster (TPC)',
    description: 'Contains 2 Streaming Multiprocessors with shared texture resources',
    sections: [
      {
        title: 'TPC Organization',
        content: [
          'Contains 2 Streaming Multiprocessors (2×SM)',
          'Shared texture units and L1 cache',
          'Dedicated rasterization and render output units',
          'Optimized for graphics and compute workloads'
        ]
      },
      {
        title: 'Functionality',
        content: [
          'Handles both graphics and compute tasks',
          'Provides texture sampling and filtering capabilities',
          'Supports advanced rendering techniques',
          'Balances workload between constituent SMs'
        ]
      }
    ],
    specs: [
      {label: 'SMs per TPC', value: '2'},
      {label: 'Total TPCs', value: '72'},
      {label: 'Shared Resources', value: 'Texture units, L1 cache'}
        ]
  },
  'sm': {
    title: 'Streaming Multiprocessor (SM)',
    description: 'The fundamental compute unit of the GPU',
    sections: [
      {
        title: 'Architecture',
        content: [
          '128 CUDA Cores (FP32/INT32)',
          '4 Tensor Cores (4th Gen)',
          'Ray Tracing Core (3rd Gen)',
          'Highly configurable shared memory/L1 cache'
        ]
      }
    ],
    specs: [
      {label: 'CUDA Cores', value: '128'},
      {label: 'Tensor Cores', value: '4'},
      {label: 'Register File', value: '64K 32-bit'}
    ]
  },
  'l2-cache': {
    title: 'L2 Cache Slice',
    description: 'Large unified L2 cache providing high-bandwidth data sharing',
    sections: [
      {
        title: 'Cache Architecture',
        content: [
          '50 MB total L2 cache divided into slices',
          '25 MB crossbar providing high-bandwidth interconnect',
          'Unified cache for all SMs in the GPU',
          'Supports both data and instruction caching'
        ]
      },
      {
        title: 'Performance Benefits',
        content: [
          'Reduces memory access latency for frequently used data',
          'Provides high-bandwidth data sharing between SMs',
          'Improves overall memory system efficiency',
          'Critical for maintaining high compute utilization'
        ]
      }
    ],
    specs: [
      {label: 'Total Size', value: '50 MB'},
      {label: 'Per Slice', value: '25 MB'},
      {label: 'Crossbar', value: 'High-bandwidth'}
    ]
  },
  'nvlink-hub': {
    title: 'High-Speed NVLink Hub',
    description: 'Central hub managing NVLink interconnect communications',
    sections: [
      {
        title: 'Hub Operations',
        content: [
          'Manages 900 GB/s of NVLink interconnect bandwidth',
          'Routes data between multiple GPUs efficiently',
          'Handles NVLink topology and connection management',
          'Provides coherent memory access across GPUs'
        ]
      },
      {
        title: 'Multi-GPU Coordination',
        content: [
          'Enables seamless GPU-to-GPU communication',
          'Manages memory consistency across GPU cluster',
          'Optimizes data placement and access patterns',
          'Critical for large-scale AI training workloads'
        ]
      }
    ],
    specs: [
      {label: 'Total Bandwidth', value: '900 GB/s'},
      {label: 'Connected GPUs', value: 'Up to 8'},
      {label: 'Topology', value: 'Mesh/Hub'}
    ]
  },
  'nvlink-port': {
    title: 'NVLink Port',
    description: 'Individual high-speed connection point for GPU interconnect',
    sections: [
      {
        title: 'Port Specifications',
        content: [
          'Individual NVLink 4.0 connection providing high bandwidth',
          'Part of 18-port NVLink interconnect system',
          'Supports bidirectional data transfer',
          'Hot-plug capable and error-resilient'
        ]
      },
      {
        title: 'Connection Management',
        content: [
          'Establishes and maintains GPU-to-GPU links',
          'Handles link training and error recovery',
          'Provides quality of service for different traffic types',
          'Essential for scaling multi-GPU configurations'
        ]
      }
    ],
    specs: [
      {label: 'Generation', value: 'NVLink 4.0'},
      {label: 'Total Ports', value: '18'},
      {label: 'Direction', value: 'Bidirectional'}
    ]
  }
};