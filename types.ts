export type MineralType = 'Tritanium' | 'Pyerite' | 'Mexallon' | 'Isogen' | 'Nocxium' | 'Zydrine' | 'Megacyte' | 'Morphite';

export interface MineralComposition {
  mineral: MineralType;
  amount: number;
}

export interface OreData {
  name: string;
  volume: number; // m3 per unit
  baseUnits: number; // usually 100 for reprocessing
  minerals: MineralComposition[];
  category: 'High-Sec' | 'Low-Sec' | 'Null-Sec' | 'Abyssal' | 'Moon' | 'Wormhole';
}

export interface SkillSettings {
  reprocessing: number; // 0-5
  reprocessingEfficiency: number; // 0-5
  oreSpecialization: number; // 0-5
  stationTax: number; // percentage
  stationYield: number; // percentage
  implantBonus: number; // percentage
}

export interface MiningRow {
  id: string;
  oreName: string;
  quantity: number;
  unitPrice: number;
}