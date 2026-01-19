
// --- CONSTANTS & DATABASE ---
const ORE_LIST = [
  // --- NULL-SEC / WORMHOLE ORES ---
  { name: "Arkonor", volume: 16.0, baseUnits: 100, category: 'Wormhole', minerals: [{ mineral: 'Tritanium', amount: 22000 }, { mineral: 'Mexallon', amount: 2500 }, { mineral: 'Megacyte', amount: 320 }] },
  { name: "Bistot", volume: 16.0, baseUnits: 100, category: 'Wormhole', minerals: [{ mineral: 'Pyerite', amount: 12000 }, { mineral: 'Zydrine', amount: 450 }, { mineral: 'Megacyte', amount: 100 }] },
  { name: "Crokite", volume: 16.0, baseUnits: 100, category: 'Wormhole', minerals: [{ mineral: 'Tritanium', amount: 21000 }, { mineral: 'Nocxium', amount: 760 }, { mineral: 'Zydrine', amount: 135 }] },
  { name: "Dark Ochre", volume: 8.0, baseUnits: 100, category: 'Wormhole', minerals: [{ mineral: 'Tritanium', amount: 10000 }, { mineral: 'Isogen', amount: 1600 }, { mineral: 'Nocxium', amount: 120 }] },
  { name: "Gneiss", volume: 5.0, baseUnits: 100, category: 'Wormhole', minerals: [{ mineral: 'Tritanium', amount: 2200 }, { mineral: 'Mexallon', amount: 2400 }, { mineral: 'Isogen', amount: 300 }] },
  { name: "Spodumain", volume: 16.0, baseUnits: 100, category: 'Null-Sec', minerals: [{ mineral: 'Tritanium', amount: 56000 }, { mineral: 'Pyerite', amount: 12050 }, { mineral: 'Mexallon', amount: 2100 }, { mineral: 'Isogen', amount: 450 }] },
  { name: "Mercoxit", volume: 40.0, baseUnits: 100, category: 'Null-Sec', minerals: [{ mineral: 'Morphite', amount: 300 }] },

  // --- LOW-SEC ORES ---
  { name: "Hedbergite", volume: 3.0, baseUnits: 100, category: 'Low-Sec', minerals: [{ mineral: 'Isogen', amount: 700 }, { mineral: 'Nocxium', amount: 190 }, { mineral: 'Zydrine', amount: 32 }] },
  { name: "Hemorphite", volume: 3.0, baseUnits: 100, category: 'Low-Sec', minerals: [{ mineral: 'Tritanium', amount: 2200 }, { mineral: 'Isogen', amount: 213 }, { mineral: 'Nocxium', amount: 107 }, { mineral: 'Zydrine', amount: 15 }] },
  { name: "Jaspet", volume: 2.0, baseUnits: 100, category: 'Low-Sec', minerals: [{ mineral: 'Tritanium', amount: 350 }, { mineral: 'Mexallon', amount: 350 }, { mineral: 'Nocxium', amount: 75 }] },
  { name: "Kernite", volume: 1.2, baseUnits: 100, category: 'Low-Sec', minerals: [{ mineral: 'Tritanium', amount: 134 }, { mineral: 'Mexallon', amount: 267 }, { mineral: 'Isogen', amount: 134 }] },
  { name: "Omber", volume: 0.6, baseUnits: 100, category: 'Low-Sec', minerals: [{ mineral: 'Tritanium', amount: 307 }, { mineral: 'Pyerite', amount: 123 }, { mineral: 'Isogen', amount: 307 }] },
  { name: "Pyroxeres", volume: 0.3, baseUnits: 100, category: 'Low-Sec', minerals: [{ mineral: 'Tritanium', amount: 351 }, { mineral: 'Pyerite', amount: 25 }, { mineral: 'Mexallon', amount: 50 }, { mineral: 'Nocxium', amount: 5 }] },

  // --- HIGH-SEC ORES ---
  { name: "Veldspar", volume: 0.1, baseUnits: 100, category: 'High-Sec', minerals: [{ mineral: 'Tritanium', amount: 415 }] },
  { name: "Scordite", volume: 0.15, baseUnits: 100, category: 'High-Sec', minerals: [{ mineral: 'Tritanium', amount: 346 }, { mineral: 'Pyerite', amount: 173 }] },
  { name: "Plagioclase", volume: 0.35, baseUnits: 100, category: 'High-Sec', minerals: [{ mineral: 'Tritanium', amount: 107 }, { mineral: 'Pyerite', amount: 213 }, { mineral: 'Mexallon', amount: 107 }] },

  // --- MOON ORES (R4-R64) ---
  { name: "Bitumens", volume: 10.0, baseUnits: 100, category: 'Moon', minerals: [{ mineral: 'Tritanium', amount: 12000 }, { mineral: 'Mexallon', amount: 450 }, { mineral: 'Pyerite', amount: 2200 }] },
  { name: "Coersite", volume: 10.0, baseUnits: 100, category: 'Moon', minerals: [{ mineral: 'Tritanium', amount: 8000 }, { mineral: 'Isogen', amount: 200 }, { mineral: 'Pyerite', amount: 1500 }] },
  { name: "Sylvite", volume: 10.0, baseUnits: 100, category: 'Moon', minerals: [{ mineral: 'Tritanium', amount: 5000 }, { mineral: 'Mexallon', amount: 1200 }, { mineral: 'Pyerite', amount: 3000 }] },
  { name: "Zeolites", volume: 10.0, baseUnits: 100, category: 'Moon', minerals: [{ mineral: 'Tritanium', amount: 6000 }, { mineral: 'Mexallon', amount: 800 }, { mineral: 'Pyerite', amount: 2000 }] },
  { name: "Cobaltite", volume: 10.0, baseUnits: 100, category: 'Moon', minerals: [{ mineral: 'Tritanium', amount: 4000 }, { mineral: 'Isogen', amount: 150 }, { mineral: 'Nocxium', amount: 20 }] },
  { name: "Xenotime", volume: 10.0, baseUnits: 100, category: 'Moon', minerals: [{ mineral: 'Tritanium', amount: 2000 }, { mineral: 'Zydrine', amount: 80 }, { mineral: 'Megacyte', amount: 40 }] },

  // --- GASES (FULLERITES) ---
  { name: "Fullerite-C28", volume: 2.0, baseUnits: 1, category: 'Gas', minerals: [] },
  { name: "Fullerite-C32", volume: 5.0, baseUnits: 1, category: 'Gas', minerals: [] },
  { name: "Fullerite-C50", volume: 1.0, baseUnits: 1, category: 'Gas', minerals: [] },
  { name: "Fullerite-C60", volume: 1.0, baseUnits: 1, category: 'Gas', minerals: [] },
  { name: "Fullerite-C70", volume: 1.0, baseUnits: 1, category: 'Gas', minerals: [] },
  { name: "Fullerite-C72", volume: 2.0, baseUnits: 1, category: 'Gas', minerals: [] },
  { name: "Fullerite-C84", volume: 2.0, baseUnits: 1, category: 'Gas', minerals: [] },
  { name: "Fullerite-C320", volume: 5.0, baseUnits: 1, category: 'Gas', minerals: [] },
  { name: "Fullerite-C540", volume: 10.0, baseUnits: 1, category: 'Gas', minerals: [] },
];

const MINERAL_ORDER = ['Tritanium', 'Pyerite', 'Mexallon', 'Isogen', 'Nocxium', 'Zydrine', 'Megacyte', 'Morphite'];

// --- STATE ---
let state = {
  activeTab: 'calculator',
  buybackRate: 90,
  skills: {
    reprocessing: 5,
    reprocessingEfficiency: 5,
    oreSpecialization: 5,
    stationTax: 1.0,
    stationYield: 56, // Base for Athanor in High-Sec, higher in WH/Null
    implantBonus: 1.04, // Default to a 4% yield implant for pros
  },
  mineralPrices: {
    Tritanium: 5.8,
    Pyerite: 14.2,
    Mexallon: 46.5,
    Isogen: 138.0,
    Nocxium: 840.0,
    Zydrine: 1820.0,
    Megacyte: 2550.0,
    Morphite: 15200.0,
  },
  rows: [
    { id: '1', oreName: 'Arkonor', quantity: 500, unitPrice: 2200.0 },
    { id: '2', oreName: 'Fullerite-C320', quantity: 2500, unitPrice: 48000.0 },
    { id: '3', oreName: 'Mercoxit', quantity: 1000, unitPrice: 4200.0 },
  ]
};

// --- CALCULATIONS ---
function calculateEverything() {
  const { rows, skills, mineralPrices, buybackRate } = state;
  
  const totalRawRevenue = rows.reduce((acc, r) => acc + (r.quantity * r.unitPrice), 0);
  const totalVolume = rows.reduce((acc, r) => {
    const ore = ORE_LIST.find(o => o.name === r.oreName);
    return acc + (r.quantity * (ore?.volume || 0));
  }, 0);

  const oreRows = rows.filter(r => (ORE_LIST.find(o => o.name === r.oreName)?.minerals.length || 0) > 0);
  const gasRows = rows.filter(r => (ORE_LIST.find(o => o.name === r.oreName)?.minerals.length || 0) === 0);

  const oreVal = oreRows.reduce((acc, r) => acc + (r.quantity * r.unitPrice), 0);
  const oreVol = oreRows.reduce((acc, r) => acc + (r.quantity * (ORE_LIST.find(o => o.name === r.oreName)?.volume || 0)), 0);
  const oreIskPerM3 = oreVol > 0 ? oreVal / oreVol : 0;

  const gasVal = gasRows.reduce((acc, r) => acc + (r.quantity * r.unitPrice), 0);
  const gasVol = gasRows.reduce((acc, r) => acc + (r.quantity * (ORE_LIST.find(o => o.name === r.oreName)?.volume || 0)), 0);
  const gasIskPerM3 = gasVol > 0 ? gasVal / gasVol : 0;

  // Reprocessing Formula: StationYield * (1 + Repro*0.03) * (1 + Efficiency*0.02) * (1 + Specialization*0.02) * Implant
  const calcYield = (skills.stationYield / 100) * 
                    (1 + skills.reprocessing * 0.03) * 
                    (1 + skills.reprocessingEfficiency * 0.02) * 
                    (1 + skills.oreSpecialization * 0.02) * 
                    skills.implantBonus;

  const minerals = {};
  const taxFactor = (100 - skills.stationTax) / 100;
  
  oreRows.forEach(row => {
    const ore = ORE_LIST.find(o => o.name === row.oreName);
    if (ore) {
      const batchCount = Math.floor(row.quantity / ore.baseUnits);
      ore.minerals.forEach(min => {
        // Multiplicative yield stack applied to batch output
        minerals[min.mineral] = (minerals[min.mineral] || 0) + Math.floor(batchCount * min.amount * calcYield * taxFactor);
      });
    }
  });

  const refinedValue = Object.entries(minerals).reduce((acc, [name, amt]) => acc + (amt * (mineralPrices[name] || 0)), 0);
  const totalRefinedValue = refinedValue + gasVal;
  const refinedIskPerM3 = oreVol > 0 ? refinedValue / oreVol : 0;

  return {
    totalRawRevenue,
    totalVolume,
    oreIskPerM3,
    gasIskPerM3,
    refinedIskPerM3,
    totalRefinedValue,
    minerals,
    calcYield,
    buybackPayout: totalRawRevenue * (buybackRate / 100),
    buybackLoss: totalRawRevenue * (1 - buybackRate / 100)
  };
}

// --- CONTROLLERS ---
window.changeTab = (tab) => {
  state.activeTab = tab;
  render();
};

window.updateSkill = (skill, val) => {
  state.skills[skill] = Number(val);
  render();
};

window.updateRow = (id, field, val) => {
  const row = state.rows.find(r => r.id === id);
  if (row) {
    row[field] = (field === 'oreName') ? val : Number(val);
    render();
  }
};

window.addRow = () => {
  state.rows.push({
    id: Math.random().toString(36).substr(2, 9),
    oreName: ORE_LIST[0].name,
    quantity: 0,
    unitPrice: 0
  });
  render();
};

window.removeRow = (id) => {
  state.rows = state.rows.filter(r => r.id !== id);
  render();
};

window.updateMineralPrice = (m, val) => {
  state.mineralPrices[m] = Number(val);
  render();
};

window.updateBuybackRate = (val) => {
  state.buybackRate = Number(val);
  render();
};

// --- VIEW ---
function render() {
  const root = document.getElementById('app-root');
  if (!root) return;

  const data = calculateEverything();

  root.innerHTML = `
    <div class="min-h-screen flex flex-col">
      <header class="border-b border-violet-500/20 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div class="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div class="flex items-center gap-4">
            <div class="w-10 h-10 bg-violet-500/10 rounded flex items-center justify-center border border-violet-500/30">
               <i data-lucide="orbit" class="w-6 h-6 text-violet-400"></i>
            </div>
            <div>
              <h1 class="text-xl font-extrabold text-white uppercase tracking-tight leading-none mb-1">Astraea Deep-Space</h1>
              <p class="text-[9px] text-zinc-500 uppercase tracking-widest font-black">Industrial Terminal v7.2.0 • J-Space Standard</p>
            </div>
          </div>

          <nav class="hidden lg:flex items-center bg-slate-900/60 rounded-lg p-1 border border-white/5">
            <button onclick="changeTab('calculator')" class="tab-btn ${state.activeTab === 'calculator' ? 'active' : ''} px-6 py-2 rounded-md text-[10px] font-black uppercase transition-all text-zinc-500 hover:text-zinc-300">Cargo Deck</button>
            <button onclick="changeTab('buyback')" class="tab-btn ${state.activeTab === 'buyback' ? 'active' : ''} px-6 py-2 rounded-md text-[10px] font-black uppercase transition-all text-zinc-500 hover:text-zinc-300">Buyback Hub</button>
          </nav>

          <div class="flex items-center gap-8">
             <div class="hidden md:flex flex-col items-end border-r border-white/5 pr-6">
                <span class="text-[9px] text-zinc-500 uppercase font-black">Manifest Mass</span>
                <span class="text-sm font-bold text-white mono">${Math.round(data.totalVolume).toLocaleString()} m³</span>
             </div>
             <div class="flex flex-col items-end">
                <span class="text-[9px] text-amber-500 uppercase font-black">Gross ISK</span>
                <span class="text-lg font-black text-white mono">${Math.round(data.totalRawRevenue).toLocaleString()}</span>
             </div>
          </div>
        </div>
      </header>

      <main class="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-8 space-y-8">
          ${renderActiveTab(data)}
        </div>

        <div class="lg:col-span-4 space-y-8">
          <div class="glass-card rounded-2xl p-8 border-t-2 border-t-violet-500/40 relative overflow-hidden">
            <div class="absolute -right-8 -top-8 opacity-[0.05]">
               <i data-lucide="bar-chart-3" class="w-32 h-32 text-violet-500"></i>
            </div>
            <h3 class="text-[10px] font-black text-zinc-500 uppercase tracking-widest mb-8 flex items-center gap-2">
              <i data-lucide="trending-up" class="w-3.5 h-3.5"></i> Density Analysis
            </h3>
            <div class="space-y-6">
              ${renderDensityChart(data)}
              <div class="pt-6 border-t border-white/5">
                <div class="text-[9px] text-zinc-500 uppercase font-black mb-1">Total Refined Potential</div>
                <div class="text-2xl font-black ${data.totalRefinedValue > data.totalRawRevenue ? 'text-emerald-400' : 'text-rose-400'} mono">
                  ${Math.round(data.totalRefinedValue).toLocaleString()} ISK
                </div>
                <div class="text-[10px] ${data.totalRefinedValue > data.totalRawRevenue ? 'text-emerald-500/60' : 'text-rose-500/60'} font-bold mt-1 uppercase tracking-tighter">
                  ROI Delta: ${Math.round(data.totalRefinedValue - data.totalRawRevenue).toLocaleString()} ISK
                </div>
              </div>
            </div>
          </div>

          <div class="glass-card rounded-2xl p-8">
            <h3 class="text-[10px] font-black uppercase tracking-widest text-zinc-400 mb-8 flex items-center gap-2">
              <i data-lucide="settings" class="w-3.5 h-3.5"></i> Structure Core
            </h3>
            <div class="space-y-6">
              <div>
                <div class="flex justify-between text-[10px] font-black text-zinc-500 uppercase mb-2">
                  <span>Facility Efficiency</span>
                  <span class="text-violet-400">${state.skills.stationYield}%</span>
                </div>
                <input type="range" min="0" max="100" value="${state.skills.stationYield}" 
                  oninput="updateSkill('stationYield', this.value)" 
                  class="w-full accent-violet-600 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer">
              </div>
              <div class="grid grid-cols-2 gap-4">
                <div>
                  <label class="text-[9px] font-black text-zinc-500 uppercase mb-2 block">Reprocessing</label>
                  <select onchange="updateSkill('reprocessing', this.value)" class="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white">
                    ${[0,1,2,3,4,5].map(v => `<option value="${v}" ${state.skills.reprocessing == v ? 'selected' : ''}>Lvl ${v}</option>`).join('')}
                  </select>
                </div>
                <div>
                  <label class="text-[9px] font-black text-zinc-500 uppercase mb-2 block">Efficiency</label>
                  <select onchange="updateSkill('reprocessingEfficiency', this.value)" class="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white">
                    ${[0,1,2,3,4,5].map(v => `<option value="${v}" ${state.skills.reprocessingEfficiency == v ? 'selected' : ''}>Lvl ${v}</option>`).join('')}
                  </select>
                </div>
              </div>
              <div>
                <label class="text-[9px] font-black text-zinc-500 uppercase mb-2 block">Specialization Bonus</label>
                <select onchange="updateSkill('oreSpecialization', this.value)" class="w-full bg-slate-900 border border-white/10 rounded-lg px-3 py-2 text-xs text-white">
                  ${[0,1,2,3,4,5].map(v => `<option value="${v}" ${state.skills.oreSpecialization == v ? 'selected' : ''}>Level ${v} (+${v*2}%)</option>`).join('')}
                </select>
              </div>
            </div>
            <div class="mt-8 pt-6 border-t border-white/5 flex items-center gap-3">
               <i data-lucide="shield-check" class="w-4 h-4 text-emerald-500/50"></i>
               <span class="text-[9px] text-zinc-600 uppercase font-black italic">Calculation Matrix Validated</span>
            </div>
          </div>
        </div>
      </main>

      <footer class="border-t border-white/5 p-10 bg-slate-950/90 text-center">
        <div class="flex flex-col items-center gap-4">
           <div class="w-8 h-1 bg-violet-500/20 rounded-full"></div>
           <p class="text-zinc-700 text-[10px] uppercase font-black tracking-widest">Astraea Utility Terminal • J-Space Standard • Stand-Alone Calculations</p>
        </div>
      </footer>
    </div>
  `;

  lucide.createIcons();
}

function renderActiveTab(data) {
  if (state.activeTab === 'calculator') {
    return `
      <div class="glass-card rounded-2xl overflow-hidden border border-violet-500/10">
        <div class="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
          <div class="flex items-center gap-3">
             <i data-lucide="package" class="w-5 h-5 text-violet-400"></i>
             <h2 class="font-extrabold text-sm uppercase tracking-widest text-white">Resource Manifest</h2>
          </div>
          <button onclick="addRow()" class="bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded text-[10px] font-black uppercase transition-all shadow-[0_0_15px_rgba(139,92,246,0.3)] flex items-center gap-2">
            <i data-lucide="plus" class="w-3.5 h-3.5"></i> Log Discovery
          </button>
        </div>
        <div class="overflow-x-auto">
          <table class="w-full text-left">
            <thead class="bg-slate-950 text-[9px] uppercase tracking-widest text-zinc-500 font-black border-b border-white/5">
              <tr>
                <th class="px-6 py-4">Resource ID</th>
                <th class="px-6 py-4">Quantity</th>
                <th class="px-6 py-4">Unit Value (ISK)</th>
                <th class="px-6 py-4">Total ISK</th>
                <th class="px-6 py-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-white/5">
              ${state.rows.map(row => `
                <tr class="hover:bg-violet-500/5 transition-colors">
                  <td class="px-6 py-4">
                    <select onchange="updateRow('${row.id}', 'oreName', this.value)" class="bg-slate-900 border border-white/10 rounded px-3 py-1.5 text-xs text-white w-full outline-none focus:border-violet-500/50">
                      ${['Wormhole', 'Null-Sec', 'Low-Sec', 'High-Sec', 'Moon', 'Gas'].map(cat => `
                        <optgroup label="${cat}" class="bg-slate-950">
                          ${ORE_LIST.filter(o => o.category === cat).map(o => `<option value="${o.name}" ${row.oreName === o.name ? 'selected' : ''}>${o.name}</option>`).join('')}
                        </optgroup>
                      `).join('')}
                    </select>
                  </td>
                  <td class="px-6 py-4">
                    <input type="number" value="${row.quantity}" oninput="updateRow('${row.id}', 'quantity', this.value)" class="bg-slate-900 border border-white/10 rounded px-3 py-1.5 text-xs text-white w-full mono outline-none focus:border-violet-500/50">
                  </td>
                  <td class="px-6 py-4">
                    <input type="number" value="${row.unitPrice}" oninput="updateRow('${row.id}', 'unitPrice', this.value)" class="bg-slate-900 border border-white/10 rounded px-3 py-1.5 text-xs text-white w-full mono outline-none focus:border-violet-500/50">
                  </td>
                  <td class="px-6 py-4 text-xs font-bold text-violet-400 mono">${Math.round(row.quantity * row.unitPrice).toLocaleString()}</td>
                  <td class="px-6 py-4 text-right">
                    <button onclick="removeRow('${row.id}')" class="text-zinc-600 hover:text-rose-500 transition-colors">
                       <i data-lucide="trash-2" class="w-4 h-4"></i>
                    </button>
                  </td>
                </tr>
              `).join('')}
              ${state.rows.length === 0 ? `<tr><td colspan="5" class="px-6 py-10 text-center text-[10px] text-zinc-700 font-black uppercase tracking-widest italic">Manifest is empty... awaiting data input.</td></tr>` : ''}
            </tbody>
          </table>
        </div>
      </div>
    `;
  }

  return `
    <div class="glass-card rounded-2xl p-8 border border-emerald-500/10">
      <div class="flex items-center gap-3 mb-10">
         <i data-lucide="handshake" class="w-6 h-6 text-emerald-400"></i>
         <h2 class="font-extrabold text-lg uppercase tracking-widest text-white">Corporate Repossession Hub</h2>
      </div>
      <div class="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
        <div class="bg-slate-900/60 p-8 rounded-2xl border border-white/5 hover:bg-slate-900/80 transition-all">
          <div class="text-[9px] text-zinc-500 uppercase font-black mb-2 tracking-widest">Calculated Contract Payout</div>
          <div class="text-4xl font-black text-emerald-400 mono tracking-tighter">${Math.round(data.buybackPayout).toLocaleString()} <span class="text-sm">ISK</span></div>
        </div>
        <div class="bg-slate-900/60 p-8 rounded-2xl border border-white/5 hover:bg-slate-900/80 transition-all">
          <div class="text-[9px] text-zinc-500 uppercase font-black mb-2 tracking-widest">Logistical Service Contribution</div>
          <div class="text-4xl font-black text-zinc-500 mono tracking-tighter">${Math.round(data.buybackLoss).toLocaleString()} <span class="text-sm">ISK</span></div>
        </div>
      </div>
      <div class="flex items-center justify-between gap-6 bg-emerald-500/10 p-6 rounded-2xl border border-emerald-500/20">
        <div class="flex items-center gap-4">
           <i data-lucide="coins" class="w-8 h-8 text-emerald-500/40"></i>
           <div>
              <label class="text-[10px] font-black uppercase text-emerald-300 tracking-widest">Active Buyback Rate</label>
              <p class="text-[10px] text-emerald-600 font-bold uppercase">No Broker Fees Applied</p>
           </div>
        </div>
        <div class="flex items-center gap-2">
           <input type="number" value="${state.buybackRate}" oninput="updateBuybackRate(this.value)" class="bg-slate-950 border border-emerald-500/30 rounded-lg px-6 py-3 text-white mono font-black text-xl w-24 outline-none focus:border-emerald-500">
           <span class="text-xl font-black text-emerald-500">%</span>
        </div>
      </div>
    </div>
  `;
}

function renderDensityChart(data) {
  const points = [
    { label: 'Raw Ore Manifest', val: data.oreIskPerM3, color: 'bg-violet-500', icon: 'database' },
    { label: 'Compressed / Refined', val: data.refinedIskPerM3, color: 'bg-indigo-500', icon: 'zap' },
    { label: 'Fullerite Gas Streams', val: data.gasIskPerM3, color: 'bg-amber-500', icon: 'wind' }
  ].filter(p => p.val > 0);

  const maxVal = Math.max(...points.map(p => p.val), 1);

  return points.map(p => `
    <div class="space-y-2">
      <div class="flex justify-between text-[9px] uppercase font-black text-zinc-500 tracking-widest">
        <span class="flex items-center gap-1.5"><i data-lucide="${p.icon}" class="w-3 h-3 text-zinc-600"></i> ${p.label}</span>
        <span class="mono text-zinc-300">${Math.round(p.val).toLocaleString()} ISK/m³</span>
      </div>
      <div class="w-full bg-slate-900/50 h-2 rounded-full overflow-hidden border border-white/5">
        <div class="custom-bar ${p.color}" style="width: ${(p.val / maxVal) * 100}%"></div>
      </div>
    </div>
  `).join('');
}

// --- INITIALIZE ---
render();
