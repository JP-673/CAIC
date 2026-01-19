import { OreData } from './types';

export const ORE_LIST: OreData[] = [
  // --- PRIME WORMHOLE & NULL ORES ---
  { name: "Arkonor", volume: 16.0, baseUnits: 100, category: 'Wormhole', minerals: [{ mineral: 'Tritanium', amount: 22000 }, { mineral: 'Mexallon', amount: 2500 }, { mineral: 'Megacyte', amount: 320 }] },
  { name: "Bistot", volume: 16.0, baseUnits: 100, category: 'Wormhole', minerals: [{ mineral: 'Pyerite', amount: 12000 }, { mineral: 'Zydrine', amount: 450 }, { mineral: 'Megacyte', amount: 100 }] },
  { name: "Crokite", volume: 16.0, baseUnits: 100, category: 'Wormhole', minerals: [{ mineral: 'Tritanium', amount: 21000 }, { mineral: 'Nocxium', amount: 760 }, { mineral: 'Zydrine', amount: 135 }] },
  { name: "Gneiss", volume: 5.0, baseUnits: 100, category: 'Wormhole', minerals: [{ mineral: 'Tritanium', amount: 2200 }, { mineral: 'Mexallon', amount: 2400 }, { mineral: 'Isogen', amount: 300 }] },
  { name: "Dark Ochre", volume: 8.0, baseUnits: 100, category: 'Wormhole', minerals: [{ mineral: 'Tritanium', amount: 10000 }, { mineral: 'Isogen', amount: 1600 }, { mineral: 'Nocxium', amount: 120 }] },
  { name: "Spodumain", volume: 16.0, baseUnits: 100, category: 'Null-Sec', minerals: [{ mineral: 'Tritanium', amount: 56000 }, { mineral: 'Pyerite', amount: 12050 }, { mineral: 'Mexallon', amount: 2100 }, { mineral: 'Isogen', amount: 450 }] },

  // --- COMMON WORMHOLE & LOW-SEC ORES ---
  { name: "Hedbergite", volume: 3.0, baseUnits: 100, category: 'Low-Sec', minerals: [{ mineral: 'Isogen', amount: 700 }, { mineral: 'Nocxium', amount: 190 }, { mineral: 'Zydrine', amount: 32 }] },
  { name: "Hemorphite", volume: 3.0, baseUnits: 100, category: 'Low-Sec', minerals: [{ mineral: 'Tritanium', amount: 2200 }, { mineral: 'Isogen', amount: 213 }, { mineral: 'Nocxium', amount: 107 }, { mineral: 'Zydrine', amount: 15 }] },
  { name: "Jaspet", volume: 2.0, baseUnits: 100, category: 'Low-Sec', minerals: [{ mineral: 'Tritanium', amount: 350 }, { mineral: 'Mexallon', amount: 350 }, { mineral: 'Nocxium', amount: 75 }] },
  { name: "Kernite", volume: 1.2, baseUnits: 100, category: 'Low-Sec', minerals: [{ mineral: 'Tritanium', amount: 134 }, { mineral: 'Mexallon', amount: 267 }, { mineral: 'Isogen', amount: 134 }] },
  { name: "Omber", volume: 0.6, baseUnits: 100, category: 'Low-Sec', minerals: [{ mineral: 'Tritanium', amount: 307 }, { mineral: 'Pyerite', amount: 123 }, { mineral: 'Isogen', amount: 307 }] },
  { name: "Pyroxeres", volume: 0.3, baseUnits: 100, category: 'Low-Sec', minerals: [{ mineral: 'Tritanium', amount: 351 }, { mineral: 'Pyerite', amount: 25 }, { mineral: 'Mexallon', amount: 50 }, { mineral: 'Nocxium', amount: 5 }] },

  // --- MOON ORES (Athanor Extraction) ---
  { name: "Bitumens", volume: 10.0, baseUnits: 100, category: 'Moon', minerals: [{ mineral: 'Tritanium', amount: 12000 }, { mineral: 'Mexallon', amount: 450 }, { mineral: 'Pyerite', amount: 2200 }] },
  { name: "Coersite", volume: 10.0, baseUnits: 100, category: 'Moon', minerals: [{ mineral: 'Tritanium', amount: 8000 }, { mineral: 'Isogen', amount: 200 }, { mineral: 'Pyerite', amount: 1500 }] },
  { name: "Sylvite", volume: 10.0, baseUnits: 100, category: 'Moon', minerals: [{ mineral: 'Tritanium', amount: 5000 }, { mineral: 'Mexallon', amount: 1200 }, { mineral: 'Pyerite', amount: 3000 }] },
  { name: "Zeolites", volume: 10.0, baseUnits: 100, category: 'Moon', minerals: [{ mineral: 'Tritanium', amount: 6000 }, { mineral: 'Mexallon', amount: 800 }, { mineral: 'Pyerite', amount: 2000 }] },

  // --- HIGH-SEC ORES ---
  { name: "Veldspar", volume: 0.1, baseUnits: 100, category: 'High-Sec', minerals: [{ mineral: 'Tritanium', amount: 415 }] },
  { name: "Scordite", volume: 0.15, baseUnits: 100, category: 'High-Sec', minerals: [{ mineral: 'Tritanium', amount: 346 }, { mineral: 'Pyerite', amount: 173 }] },
  { name: "Plagioclase", volume: 0.35, baseUnits: 100, category: 'High-Sec', minerals: [{ mineral: 'Tritanium', amount: 107 }, { mineral: 'Pyerite', amount: 213 }, { mineral: 'Mexallon', amount: 107 }] },

  // --- GASES (Fullerite Set) ---
  { name: "Fullerite-C28", volume: 2.0, baseUnits: 1, category: 'Wormhole', minerals: [] },
  { name: "Fullerite-C32", volume: 5.0, baseUnits: 1, category: 'Wormhole', minerals: [] },
  { name: "Fullerite-C50", volume: 1.0, baseUnits: 1, category: 'Wormhole', minerals: [] },
  { name: "Fullerite-C60", volume: 1.0, baseUnits: 1, category: 'Wormhole', minerals: [] },
  { name: "Fullerite-C70", volume: 1.0, baseUnits: 1, category: 'Wormhole', minerals: [] },
  { name: "Fullerite-C72", volume: 2.0, baseUnits: 1, category: 'Wormhole', minerals: [] },
  { name: "Fullerite-C84", volume: 2.0, baseUnits: 1, category: 'Wormhole', minerals: [] },
  { name: "Fullerite-C320", volume: 5.0, baseUnits: 1, category: 'Wormhole', minerals: [] },
  { name: "Fullerite-C540", volume: 10.0, baseUnits: 1, category: 'Wormhole', minerals: [] },
];

export const MINERAL_ORDER: string[] = [
  'Tritanium', 'Pyerite', 'Mexallon', 'Isogen', 'Nocxium', 'Zydrine', 'Megacyte', 'Morphite'
];