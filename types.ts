export interface UnitSection {
  title: string;
  content: string[];
}

export interface UnitSpec {
  label: string;
  value: string;
}

export interface UnitInfo {
  title: string;
  description: string;
  sections: UnitSection[];
  specs: UnitSpec[];
}

export type UnitKey =
  | 'l0-cache'
  | 'warp-scheduler'
  | 'dispatch-unit'
  | 'register-file'
  | 'int32'
  | 'fp32'
  | 'fp64'
  | 'tensor-core'
  | 'sfu'
  | 'ldst'
  | 'smsp-l1-cache'
  | 'tma'
  | 'shared-memory'
  | 'texture-unit'
  | 'pcie-interface'
  | 'gigathread-engine'
  | 'nvlink-switch'
  | 'memory-controller'
  | 'hbm3'
  | 'gpc'
  | 'tpc'
  | 'sm'
  | 'l2-cache'
  | 'nvlink-hub'
  | 'nvlink-port'
  | 'tmem'
  | 'default';

export type Architecture = 'H100' | 'B200';

export enum ViewType {
  SMSP = 'ism',
  FULL_DIE = 'full-die',
  SINGLE_SM = 'single-sm',
  SPECS = 'specs'
}