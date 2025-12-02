import { UnitInfo } from '../types';

export const b200UnitInfoData: Record<string, UnitInfo> = {
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
            { label: 'Latency', value: '~1 cycle' },
            { label: 'Scope', value: 'Per SM' },
            { label: 'Organization', value: 'Per-warp' }
        ]
    },
    'warp-scheduler': {
        title: 'Warp Scheduler',
        description: 'Advanced instruction scheduling unit for managing thread warps',
        sections: [
            {
                title: 'Core Responsibilities',
                content: [
                    'Manages up to 64 concurrent warps per SM (16 per SMSP)',
                    'Selects ready warps for instruction issue each cycle',
                    'Handles warp-level branching and divergence',
                    'Optimizes instruction-level parallelism'
                ]
            },
            {
                title: 'B200 Enhancements',
                content: [
                    'Increased warp tracking capacity (16 per SMSP vs 12 in H100)',
                    'Higher occupancy potential to hide HBM3e latency',
                    'Improved latency hiding for massive 192GB memory pool',
                    'Critical for keeping 5th Gen Tensor Cores fed'
                ]
            }
        ],
        specs: [
            { label: 'Max Warps', value: '64 per SM' },
            { label: 'Per SMSP', value: '16 Warps' },
            { label: 'Issue Rate', value: '32 threads/cycle' }
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
            { label: 'Dispatch Rate', value: '32 threads/cycle' },
            { label: 'Instructions/Cycle', value: '2 per warp' },
            { label: 'Pipeline Depth', value: 'Multiple stages' }
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
                title: 'B200 Considerations',
                content: [
                    'Same 256KB total size as H100',
                    'Higher pressure due to increased warp count (64 vs 48)',
                    'Requires careful register usage to achieve full occupancy',
                    'Critical resource for hiding memory latency'
                ]
            }
        ],
        specs: [
            { label: 'Total Registers', value: '65,536 × 32-bit' },
            { label: 'Per SMSP', value: '64 KB' },
            { label: 'Access Latency', value: '1 cycle' }
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
            { label: 'Precision', value: '32-bit integer' },
            { label: 'Throughput', value: '1 operation/cycle' },
            { label: 'Units per SM', value: '64 total' }
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
            { label: 'Precision', value: '32-bit IEEE 754' },
            { label: 'Throughput', value: '1 operation/cycle' },
            { label: 'Units per SM', value: '64 total' }
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
                title: 'B200 Context',
                content: [
                    'Maintains strong FP64 support for HPC',
                    'Prioritizes silicon area for Tensor Cores (FP4/FP8)',
                    '45 TFLOPS HPC performance vs 20 PFLOPS AI performance',
                    'Essential for scientific workloads'
                ]
            }
        ],
        specs: [
            { label: 'Precision', value: '64-bit IEEE 754' },
            { label: 'Throughput', value: '1 operation/cycle' },
            { label: 'Units per SM', value: '16 total' }
        ]
    },
    'tensor-core': {
        title: '5th Generation Tensor Core',
        description: 'Specialized matrix multiplication acceleration units with FP4 support',
        sections: [
            {
                title: 'Blackwell Innovations',
                content: [
                    'Introduces native FP4 and FP6 precision support',
                    'Doubles performance over Hopper H100',
                    'Micro-tensor scaling support',
                    'Optimized for massive LLM inference'
                ]
            },
            {
                title: 'Matrix Operations',
                content: [
                    'Accelerated matrix multiply-accumulate operations',
                    'Support for mixed-precision computing',
                    'FP4, FP6, FP8, FP16, BF16, TF32, FP64 precision support',
                    'Sparsity acceleration for AI workloads'
                ]
            }
        ],
        specs: [
            { label: 'Generation', value: '5th Gen' },
            { label: 'New Precisions', value: 'FP4, FP6' },
            { label: 'Performance', value: '2x H100' }
        ]
    },
    'tmem': {
        title: 'Tensor Memory (TMEM)',
        description: 'Dedicated on-chip memory for Tensor Cores',
        sections: [
            {
                title: 'Architecture',
                content: [
                    'Dedicated scratchpad memory residing within the SM',
                    'Distinct from L1 Cache and Shared Memory',
                    'Allows Tensor Cores to fetch matrix tiles efficiently',
                    'Prevents pollution of general-purpose L1 cache'
                ]
            },
            {
                title: 'Impact',
                content: [
                    'Significantly increases effective bandwidth for matrix multiplies',
                    'Reduces contention for Shared Memory',
                    'Enables sustained high utilization of 5th Gen Tensor Cores',
                    'Key enabler for FP4/FP6 inference performance'
                ]
            }
        ],
        specs: [
            { label: 'Type', value: 'Dedicated Scratchpad' },
            { label: 'Location', value: 'In-SM' },
            { label: 'Benefit', value: 'Bandwidth Isolation' }
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
            { label: 'Function Types', value: 'Transcendental' },
            { label: 'Precision', value: 'Single-precision' },
            { label: 'Units per SM', value: '4' }
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
            { label: 'Function', value: 'Memory access' },
            { label: 'Units per SM', value: '16' },
            { label: 'Bandwidth', value: 'High throughput' }
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
            { label: 'Scope', value: '4 SM cluster' },
            { label: 'Organization', value: 'Shared' },
            { label: 'Efficiency', value: 'High utilization' }
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
            { label: 'Function', value: 'Tensor memory ops' },
            { label: 'Acceleration', value: 'Hardware' },
            { label: 'Use Cases', value: 'AI/ML workloads' }
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
            { label: 'Total Size', value: '256 KB' },
            { label: 'Configurable', value: 'L1/Shared split' },
            { label: 'Latency', value: '~30 cycles' }
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
            { label: 'Function', value: 'Texture sampling' },
            { label: 'Units per ISM', value: '4' },
            { label: 'Filtering', value: 'Hardware accelerated' }
        ]
    },
    'pcie-interface': {
        title: 'PCI Express Host Interface',
        description: 'High-speed external communication interface for GPU connectivity',
        sections: [
            {
                title: 'Interface Capabilities',
                content: [
                    'High-speed interface for host communication',
                    'Backward compatible with previous PCIe generations',
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
            { label: 'Generation', value: 'PCIe Gen 6 (Likely)' },
            { label: 'Lanes', value: 'x16' },
            { label: 'Bandwidth', value: 'High Speed' }
        ]
    },
    'gigathread-engine': {
        title: 'GigaThread Engine',
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
                title: 'Dual-Die Scaling',
                content: [
                    'Orchestrates work across two compute dies',
                    'Maximizes parallel execution across ~264 SMs',
                    'Reduces idle time and improves throughput',
                    'Adaptive scheduling based on workload characteristics'
                ]
            }
        ],
        specs: [
            { label: 'SM Support', value: '~264 SMs' },
            { label: 'Thread Capacity', value: 'Massive' },
            { label: 'Load Balancing', value: 'Cross-Die' }
        ]
    },
    'nvlink-switch': {
        title: 'NVLink Switch Fabric',
        description: 'High-bandwidth GPU-to-GPU interconnect technology',
        sections: [
            {
                title: 'Interconnect Architecture',
                content: [
                    'Next-generation NVLink providing massive bandwidth',
                    'Direct GPU-to-GPU communication bypassing PCIe',
                    'Supports multi-GPU connectivity in single node',
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
            { label: 'Generation', value: '5th Gen' },
            { label: 'Bandwidth', value: '1.8 TB/s (GB200)' },
            { label: 'Topology', value: 'Switch Fabric' }
        ]
    },
    'memory-controller': {
        title: 'Memory Controller',
        description: 'High-speed memory interface controller for HBM3e subsystem',
        sections: [
            {
                title: 'Memory Management',
                content: [
                    'Controls HBM3e memory stacks with 8 TB/s total bandwidth',
                    'Handles memory requests from all SMs and cache slices',
                    'Implements advanced memory scheduling and arbitration',
                    'Supports error correction and memory reliability features'
                ]
            },
            {
                title: 'Dual-Die Integration',
                content: [
                    'Each die has its own memory controllers',
                    'Aggregates to a massive bus width across the package',
                    'Ensures minimal latency penalty via chip-to-chip interconnect',
                    'Critical for feeding data to ~264 SMs efficiently'
                ]
            }
        ],
        specs: [
            { label: 'Memory Type', value: 'HBM3e' },
            { label: 'Total Bandwidth', value: '8.0 TB/s' },
            { label: 'Bus Width', value: '8192-bit' }
        ]
    },
    'hbm3': {
        title: 'HBM3e Memory',
        description: 'High-Bandwidth Memory 3e (Extended) for massive data throughput',
        sections: [
            {
                title: 'Memory Technology',
                content: [
                    '192 GB HBM3e memory capacity',
                    '8.0 TB/s aggregate memory bandwidth',
                    '8 stacks (4 per die) of 24GB HBM3e dies',
                    'Drastically increases "fast memory" pool'
                ]
            },
            {
                title: 'AI/ML Impact',
                content: [
                    'Relieves memory bottlenecks in LLM inference (KV cache)',
                    'Enables training of massive models with billions of parameters',
                    'Supports high-throughput inference workloads',
                    'Critical for large language models and generative AI'
                ]
            }
        ],
        specs: [
            { label: 'Total Capacity', value: '192 GB' },
            { label: 'Bandwidth', value: '8.0 TB/s' },
            { label: 'Generation', value: 'HBM3e' }
        ]
    },
    'gpc': {
        title: 'Graphics Processing Cluster (GPC)',
        description: 'Major organizational unit containing multiple SMs and shared resources',
        sections: [
            {
                title: 'Cluster Architecture',
                content: [
                    'Contains multiple Streaming Multiprocessors per GPC',
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
            { label: 'SMs per GPC', value: 'Varies' },
            { label: 'Total GPCs', value: 'Multiple' },
            { label: 'Shared Resources', value: 'Raster/Polymorph engines' }
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
            { label: 'SMs per TPC', value: '2' },
            { label: 'Total TPCs', value: 'Many' },
            { label: 'Shared Resources', value: 'Texture units, L1 cache' }
        ]
    },
    'sm': {
        title: 'Streaming Multiprocessor (SM)',
        description: 'The fundamental compute unit of the GPU (Blackwell)',
        sections: [
            {
                title: 'Architecture',
                content: [
                    '128 CUDA Cores (FP32/INT32)',
                    '4 Tensor Cores (5th Gen)',
                    'Dedicated Tensor Memory (TMEM)',
                    'Highly configurable shared memory/L1 cache'
                ]
            }
        ],
        specs: [
            { label: 'CUDA Cores', value: '128' },
            { label: 'Tensor Cores', value: '4 (5th Gen)' },
            { label: 'Register File', value: '64K 32-bit' }
        ]
    },
    'l2-cache': {
        title: 'L2 Cache Slice',
        description: 'Massive unified L2 cache providing high-bandwidth data sharing',
        sections: [
            {
                title: 'Cache Architecture',
                content: [
                    '126 MB total L2 cache (vs 50MB in H100)',
                    'Physically distributed across two dies but fully coherent',
                    '~10+ TB/s internal bandwidth',
                    'Supports both data and instruction caching'
                ]
            },
            {
                title: 'Performance Benefits',
                content: [
                    'Massive increase to reduce HBM trips',
                    'Minimizes data movement energy costs',
                    'L2 Cache Residency Control for pinning critical data',
                    'Scales to match increased SM count'
                ]
            }
        ],
        specs: [
            { label: 'Total Size', value: '126 MB' },
            { label: 'Architecture', value: 'Shared (Distributed)' },
            { label: 'Bandwidth', value: '~10+ TB/s' }
        ]
    },
    'nvlink-hub': {
        title: 'High-Speed NVLink Hub',
        description: 'Central hub managing NVLink interconnect communications',
        sections: [
            {
                title: 'Hub Operations',
                content: [
                    'Manages massive NVLink interconnect bandwidth',
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
            { label: 'Total Bandwidth', value: 'High' },
            { label: 'Connected GPUs', value: 'Up to 8/16' },
            { label: 'Topology', value: 'Mesh/Hub' }
        ]
    },
    'nvlink-port': {
        title: 'NVLink Port',
        description: 'Individual high-speed connection point for GPU interconnect',
        sections: [
            {
                title: 'Port Specifications',
                content: [
                    'Individual NVLink connection providing high bandwidth',
                    'Part of multi-port NVLink interconnect system',
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
            { label: 'Generation', value: 'NVLink 5.0' },
            { label: 'Total Ports', value: 'Many' },
            { label: 'Direction', value: 'Bidirectional' }
        ]
    }
};
