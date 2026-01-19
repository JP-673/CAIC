
import React, { useState, useMemo } from 'react';
import { 
  Calculator, 
  Trash2, 
  Plus, 
  Target, 
  FlaskConical, 
  Database, 
  TrendingDown, 
  TrendingUp, 
  Wind, 
  Package, 
  BarChart3, 
  BoxSelect,
  Shield,
  Activity,
  Cpu,
  Settings,
  CircleDot,
  Handshake,
  ArrowRightLeft,
  Coins
} from 'lucide-react';
import { ResponsiveContainer, Tooltip as RechartsTooltip, BarChart, Bar, XAxis, YAxis, CartesianGrid, LabelList, Cell } from 'recharts';
import { MiningRow, SkillSettings, MineralType } from './types';
import { ORE_LIST, MINERAL_ORDER } from './constants';

const InfoTooltip = ({ text }: { text: string }) => (
  <div className="absolute bottom-full mb-2 left-1/2 -translate-x-1/2 w-48 p-2 bg-slate-950 border border-violet-500/40 rounded text-[10px] text-violet-100 leading-tight shadow-2xl opacity-0 group-hover/tip:opacity-100 transition-opacity pointer-events-none z-[100] backdrop-blur-xl text-center">
    {text}
    <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-slate-950"></div>
  </div>
);

export default function App() {
  const [activeTab, setActiveTab] = useState<'calculator' | 'minerals' | 'buyback'>('calculator');
  const [buybackRate, setBuybackRate] = useState<number>(80);
  const [skills, setSkills] = useState<SkillSettings>({
    reprocessing: 5,
    reprocessingEfficiency: 5,
    oreSpecialization: 5,
    stationTax: 1.0, 
    stationYield: 56, 
    implantBonus: 1.0,
  });

  const [mineralPrices, setMineralPrices] = useState<Record<MineralType, number>>({
    Tritanium: 5.5,
    Pyerite: 13.0,
    Mexallon: 48.0,
    Isogen: 135.0,
    Nocxium: 860.0,
    Zydrine: 1850.0,
    Megacyte: 2600.0,
    Morphite: 14800.0,
  });

  const [rows, setRows] = useState<MiningRow[]>([
    { id: '1', oreName: 'Arkonor', quantity: 500, unitPrice: 2200.0 },
    { id: '2', oreName: 'Fullerite-C320', quantity: 1500, unitPrice: 42000.0 },
    { id: '3', oreName: 'Bitumens', quantity: 2000, unitPrice: 150.0 },
  ]);

  const oreRows = useMemo(() => rows.filter(r => (ORE_LIST.find(o => o.name === r.oreName)?.minerals.length || 0) > 0), [rows]);
  const gasRows = useMemo(() => rows.filter(r => (ORE_LIST.find(o => o.name === r.oreName)?.minerals.length || 0) === 0), [rows]);

  const totalRawRevenue = useMemo(() => rows.reduce((acc, row) => acc + (row.quantity * row.unitPrice), 0), [rows]);
  const totalVolume = useMemo(() => rows.reduce((acc, row) => acc + (row.quantity * (ORE_LIST.find(o => o.name === row.oreName)?.volume || 0)), 0), [rows]);

  const buybackPayout = useMemo(() => totalRawRevenue * (buybackRate / 100), [totalRawRevenue, buybackRate]);
  const buybackLoss = useMemo(() => totalRawRevenue - buybackPayout, [totalRawRevenue, buybackPayout]);

  const oreStats = useMemo(() => {
    const val = oreRows.reduce((acc, r) => acc + (r.quantity * r.unitPrice), 0);
    const vol = oreRows.reduce((acc, r) => acc + (r.quantity * (ORE_LIST.find(o => o.name === r.oreName)?.volume || 0)), 0);
    return { value: val, volume: vol, iskPerM3: vol > 0 ? val / vol : 0 };
  }, [oreRows]);

  const gasStats = useMemo(() => {
    const val = gasRows.reduce((acc, r) => acc + (r.quantity * r.unitPrice), 0);
    const vol = gasRows.reduce((acc, r) => acc + (r.quantity * (ORE_LIST.find(o => o.name === r.oreName)?.volume || 0)), 0);
    return { value: val, volume: vol, iskPerM3: vol > 0 ? val / vol : 0 };
  }, [gasRows]);

  const calculatedYield = useMemo(() => {
    const r = 1 + skills.reprocessing * 0.03;
    const e = 1 + skills.reprocessingEfficiency * 0.02;
    const s = 1 + skills.oreSpecialization * 0.02;
    return (skills.stationYield / 100) * r * e * s * skills.implantBonus;
  }, [skills]);

  const mineralBreakdown = useMemo(() => {
    const totals: Record<string, number> = {};
    const taxFactor = (100 - skills.stationTax) / 100;
    oreRows.forEach(row => {
      const ore = ORE_LIST.find(o => o.name === row.oreName);
      if (ore) {
        const batchCount = Math.floor(row.quantity / ore.baseUnits);
        ore.minerals.forEach(min => {
          totals[min.mineral] = (totals[min.mineral] || 0) + Math.floor(batchCount * min.amount * calculatedYield * taxFactor);
        });
      }
    });
    return Object.entries(totals)
      .map(([name, amount]) => ({ name, value: amount }))
      .sort((a, b) => MINERAL_ORDER.indexOf(a.name) - MINERAL_ORDER.indexOf(b.name));
  }, [oreRows, calculatedYield, skills.stationTax]);

  const totalReprocessedMineralValue = useMemo(() => 
    mineralBreakdown.reduce((acc, item) => acc + (item.value * (mineralPrices[item.name as MineralType] || 0)), 0), 
    [mineralBreakdown, mineralPrices]
  );
  const reprocessedIskPerM3 = oreStats.volume > 0 ? totalReprocessedMineralValue / oreStats.volume : 0;

  const efficiencyComparisonData = useMemo(() => {
    const data = [];
    if (oreStats.volume > 0) {
      data.push({ name: 'Raw WH Ore', iskPerM3: Math.round(oreStats.iskPerM3), color: '#8b5cf6' });
      data.push({ name: 'Refined WH', iskPerM3: Math.round(reprocessedIskPerM3), color: '#d946ef' });
    }
    if (gasStats.volume > 0) {
      data.push({ name: 'Raw Fullerite', iskPerM3: Math.round(gasStats.iskPerM3), color: '#f59e0b' });
    }
    return data;
  }, [oreStats, reprocessedIskPerM3, gasStats]);

  const totalReprocessedValue = totalReprocessedMineralValue + gasStats.value;
  const profitLoss = totalReprocessedValue - totalRawRevenue;
  const isProfitable = profitLoss > 0;

  const addRow = () => setRows([...rows, { id: Math.random().toString(36).substr(2, 9), oreName: ORE_LIST[0].name, quantity: 0, unitPrice: 0 }]);
  const removeRow = (id: string) => setRows(rows.filter(r => r.id !== id));
  const updateRow = (id: string, field: keyof MiningRow, value: any) => setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  const updateMineralPrice = (m: MineralType, p: number) => setMineralPrices(prev => ({ ...prev, [m]: p }));

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b border-violet-500/20 bg-slate-950/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div className="w-10 h-10 bg-violet-500/10 rounded flex items-center justify-center border border-violet-500/30 shadow-[0_0_15px_rgba(139,92,246,0.2)]">
              <CircleDot className="w-6 h-6 text-violet-400" />
            </div>
            <div>
              <h1 className="text-xl font-extrabold text-white uppercase leading-none mb-1 tracking-tight">Astraea Deep-Space</h1>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <p className="text-[9px] text-zinc-400 uppercase tracking-widest font-bold">Static Terminal Online</p>
              </div>
            </div>
          </div>

          <nav className="hidden lg:flex items-center bg-slate-900/60 rounded-lg p-1 border border-white/5">
            {[
              { id: 'calculator', label: 'Cargo Deck', icon: Calculator, desc: 'Manifest of raw ores and gases.' },
              { id: 'minerals', label: 'Moon Matrix', icon: Activity, desc: 'Mineral prices and Athanor yields.' },
              { id: 'buyback', label: 'Buyback Hub', icon: Handshake, desc: 'Corporation buyback calculations.' },
            ].map(tab => (
              <button 
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`relative group/tip flex items-center gap-2 px-6 py-2 rounded-md text-[10px] font-black uppercase tracking-widest transition-all ${activeTab === tab.id ? 'bg-violet-600 text-white shadow-[0_0_20px_rgba(139,92,246,0.3)]' : 'text-zinc-500 hover:text-zinc-300'}`}
              >
                <tab.icon className="w-3.5 h-3.5" /> {tab.label}
                <InfoTooltip text={tab.desc} />
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-6">
             <div className="hidden xl:flex flex-col items-end border-r border-white/5 pr-6 group/tip relative">
                <span className="text-[9px] text-zinc-500 uppercase font-bold tracking-tighter">Cargo Mass</span>
                <span className="text-sm font-bold text-white mono">{totalVolume.toLocaleString()} m³</span>
                <InfoTooltip text="Total volume. Essential for mass-limited wormhole transitions." />
             </div>
             <div className="flex flex-col items-end group/tip relative">
                <span className="text-[9px] text-amber-500 uppercase font-bold tracking-tighter">Manifest Value</span>
                <span className="text-lg font-black text-white mono tracking-tight">{totalRawRevenue.toLocaleString()} <span className="text-[10px] text-zinc-500">ISK</span></span>
                <InfoTooltip text="Total market value of all resources in the manifest." />
             </div>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-7xl mx-auto w-full p-6 lg:p-10 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div className="lg:col-span-8 space-y-8">
          {activeTab === 'calculator' && (
            <div className="space-y-8 animate-in fade-in duration-500">
              <div className="glass-card rounded-2xl overflow-hidden border border-violet-500/10">
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-white/5">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-violet-400" />
                    <h2 className="font-extrabold text-sm uppercase tracking-widest text-white">Cargo Manifest</h2>
                  </div>
                  <button onClick={addRow} className="group/tip relative flex items-center gap-2 text-[10px] font-black bg-violet-600 hover:bg-violet-500 text-white px-5 py-2 rounded uppercase tracking-widest transition-all">
                    <Plus className="w-3.5 h-3.5" /> Log discovery
                    <InfoTooltip text="Add new entry to the manifest." />
                  </button>
                </div>
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse">
                    <thead className="bg-slate-950/60 text-[9px] uppercase tracking-[0.2em] text-zinc-500 font-black">
                      <tr>
                        <th className="px-6 py-4">Resource ID</th>
                        <th className="px-6 py-4">Quantity</th>
                        <th className="px-6 py-4">Unit Value</th>
                        <th className="px-6 py-4">Total ISK</th>
                        <th className="px-6 py-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-white/5">
                      {rows.map((row) => (
                        <tr key={row.id} className="hover:bg-violet-500/[0.03] transition-colors">
                          <td className="px-6 py-4 relative group/tip">
                            <select 
                              value={row.oreName}
                              onChange={(e) => updateRow(row.id, 'oreName', e.target.value)}
                              className="bg-slate-900/50 border border-white/10 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-violet-500/50 w-full text-zinc-100 neon-border-violet"
                            >
                              {['Wormhole', 'Low-Sec', 'Moon', 'Null-Sec', 'High-Sec'].map(cat => (
                                <optgroup key={cat} label={cat === 'Low-Sec' ? 'Common J-Space Ores' : `${cat} Resources`} className="bg-slate-950 text-zinc-500">
                                  {ORE_LIST.filter(o => o.category === cat).map(o => <option key={o.name} value={o.name}>{o.name}</option>)}
                                </optgroup>
                              ))}
                            </select>
                          </td>
                          <td className="px-6 py-4">
                            <input type="number" value={row.quantity} onChange={(e) => updateRow(row.id, 'quantity', Math.max(0, Number(e.target.value)))} className="bg-slate-900/50 border border-white/10 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-violet-500/50 w-full mono text-white neon-border-violet" />
                          </td>
                          <td className="px-6 py-4">
                            <input type="number" value={row.unitPrice} onChange={(e) => updateRow(row.id, 'unitPrice', Math.max(0, Number(e.target.value)))} className="bg-slate-900/50 border border-white/10 rounded px-3 py-1.5 text-xs focus:outline-none focus:border-violet-500/50 w-full mono text-white neon-border-violet" />
                          </td>
                          <td className="px-6 py-4 text-sm font-bold text-violet-400 mono">{(row.quantity * row.unitPrice).toLocaleString()}</td>
                          <td className="px-6 py-4 text-right">
                            <button onClick={() => removeRow(row.id)} className="group/tip relative text-zinc-600 hover:text-rose-400 transition-all p-2">
                              <Trash2 className="w-4 h-4" />
                              <InfoTooltip text="Remove from manifest." />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="glass-card rounded-2xl p-8 border border-amber-500/10">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <BarChart3 className="w-5 h-5 text-amber-400" />
                    <h2 className="font-extrabold text-sm uppercase tracking-widest text-white">Logistical Density (ISK/m³)</h2>
                  </div>
                </div>
                <div className="grid grid-cols-1 xl:grid-cols-3 gap-10">
                  <div className="xl:col-span-2 h-[260px] bg-slate-950/40 rounded-xl p-6 border border-white/5">
                    <ResponsiveContainer width="100%" height="100%">
                      <BarChart data={efficiencyComparisonData} layout="vertical" margin={{ left: 10, right: 60, top: 0, bottom: 0 }}>
                        <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" horizontal={false} />
                        <XAxis type="number" hide />
                        <YAxis dataKey="name" type="category" stroke="#71717a" fontSize={10} tickLine={false} axisLine={false} width={110} />
                        <RechartsTooltip cursor={{ fill: 'rgba(255,255,255,0.02)' }} contentStyle={{ backgroundColor: '#020617', border: '1px solid rgba(255,255,255,0.1)', borderRadius: '8px', fontSize: '10px' }} />
                        <Bar dataKey="iskPerM3" radius={[0, 4, 4, 0]} barSize={36}>
                          {efficiencyComparisonData.map((entry, index) => <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.8} />)}
                          <LabelList dataKey="iskPerM3" position="right" fill="#fafafa" fontSize={10} className="mono font-bold" formatter={(v: number) => `${v.toLocaleString()}`} />
                        </Bar>
                      </BarChart>
                    </ResponsiveContainer>
                  </div>
                  <div className="flex flex-col gap-6">
                    <div className="bg-slate-900/40 border border-white/5 p-6 rounded-xl flex-1 flex flex-col justify-center relative overflow-hidden group/tip">
                      <div className="absolute -right-4 -top-4 opacity-[0.03]"><BoxSelect className="w-24 h-24 text-amber-400" /></div>
                      <div className="flex items-center gap-2 mb-4">
                        <Target className="w-4 h-4 text-amber-400" />
                        <span className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Density Priority</span>
                      </div>
                      {efficiencyComparisonData.length > 0 ? (() => {
                        const leader = [...efficiencyComparisonData].sort((a, b) => b.iskPerM3 - a.iskPerM3)[0];
                        return (
                          <div>
                            <div className="text-xs font-bold text-zinc-400 mb-2 uppercase tracking-wide">{leader.name}</div>
                            <div className="text-3xl font-black text-white tracking-tighter mono leading-none mb-4">
                              {leader.iskPerM3.toLocaleString()} <span className="text-xs text-zinc-500">ISK/m³</span>
                            </div>
                          </div>
                        );
                      })() : <div className="text-zinc-700 text-[11px] italic text-center py-4">Manifest empty...</div>}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'minerals' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="glass-card rounded-2xl p-8 border border-indigo-500/10">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <FlaskConical className="w-6 h-6 text-indigo-400" />
                    <h2 className="font-extrabold text-lg uppercase tracking-widest text-white">Athanor Refining Core</h2>
                  </div>
                  <div className="group/tip relative bg-indigo-500/10 border border-indigo-500/20 px-4 py-2 rounded-lg flex items-center gap-3">
                    <Cpu className="w-4 h-4 text-indigo-400" />
                    <span className="text-[10px] font-black text-indigo-300 uppercase tracking-widest">Yield Index: {(calculatedYield * 100).toFixed(2)}%</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-10">
                  {MINERAL_ORDER.map((name) => (
                    <div key={name} className="bg-slate-900/60 border border-white/5 p-4 rounded-xl group/tip transition-all hover:border-indigo-500/30 relative">
                      <label className="block text-[9px] text-zinc-500 font-black uppercase mb-2 tracking-widest">{name}</label>
                      <div className="flex items-baseline gap-2">
                        <input type="number" value={mineralPrices[name as MineralType]} onChange={(e) => updateMineralPrice(name as MineralType, Number(e.target.value))} className="bg-transparent text-sm font-bold text-white mono focus:outline-none w-full" />
                        <span className="text-[9px] text-zinc-600 font-bold">ISK</span>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {mineralBreakdown.map((item) => (
                    <div key={item.name} className="bg-indigo-500/5 border border-indigo-500/10 p-5 rounded-xl text-center group/tip transition-all hover:bg-indigo-500/10 relative">
                      <span className="text-[9px] text-indigo-400 font-black uppercase mb-2 block tracking-[0.2em]">{item.name}</span>
                      <span className="text-xl font-extrabold text-white mono leading-none">{item.value.toLocaleString()}</span>
                      <div className="mt-3 text-[10px] text-zinc-500 mono">≈ {(item.value * (mineralPrices[item.name as MineralType] || 0)).toLocaleString()} ISK</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'buyback' && (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              <div className="glass-card rounded-2xl p-8 border border-emerald-500/10">
                <div className="flex items-center justify-between mb-10">
                  <div className="flex items-center gap-3">
                    <Handshake className="w-6 h-6 text-emerald-400" />
                    <h2 className="font-extrabold text-lg uppercase tracking-widest text-white">Corporation Buyback Hub</h2>
                  </div>
                  <div className="flex items-center gap-4 bg-emerald-500/10 border border-emerald-500/20 px-6 py-3 rounded-xl group/tip relative">
                    <Coins className="w-5 h-5 text-emerald-400" />
                    <div>
                      <span className="text-[9px] font-black text-emerald-300 uppercase block tracking-widest mb-1">Buyback Rate</span>
                      <div className="flex items-center gap-2">
                         <input type="number" value={buybackRate} onChange={(e) => setBuybackRate(Number(e.target.value))} className="bg-transparent border-none focus:outline-none text-white font-black mono text-lg w-12" />
                         <span className="text-white font-black text-lg">%</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
                   <div className="bg-slate-900/60 p-6 rounded-2xl border border-white/5 relative group/tip">
                      <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Total Contract Value</div>
                      <div className="text-3xl font-black text-white mono tracking-tighter">{buybackPayout.toLocaleString()} <span className="text-xs text-emerald-400">ISK</span></div>
                   </div>
                   <div className="bg-slate-900/60 p-6 rounded-2xl border border-white/5 relative group/tip">
                      <div className="text-[9px] font-black text-zinc-500 uppercase tracking-widest mb-2">Corporate Contribution</div>
                      <div className="text-3xl font-black text-white mono tracking-tighter text-zinc-400">{buybackLoss.toLocaleString()} <span className="text-xs text-zinc-600">ISK</span></div>
                   </div>
                </div>

                <div className="bg-slate-950/40 rounded-xl overflow-hidden border border-white/5">
                   <table className="w-full text-left">
                      <thead className="bg-slate-900/60 text-[9px] font-black uppercase text-zinc-500 tracking-widest">
                         <tr>
                            <th className="px-6 py-4">Resource</th>
                            <th className="px-6 py-4">Market Unit</th>
                            <th className="px-6 py-4">Adjusted Unit</th>
                            <th className="px-6 py-4 text-right">Payout</th>
                         </tr>
                      </thead>
                      <tbody className="divide-y divide-white/5">
                         {rows.map(row => (
                            <tr key={row.id} className="text-xs font-bold text-zinc-300">
                               <td className="px-6 py-4">{row.oreName}</td>
                               <td className="px-6 py-4 mono">{row.unitPrice.toLocaleString()}</td>
                               <td className="px-6 py-4 mono text-emerald-400">{(row.unitPrice * (buybackRate/100)).toLocaleString()}</td>
                               <td className="px-6 py-4 text-right mono text-white">{(row.quantity * row.unitPrice * (buybackRate/100)).toLocaleString()}</td>
                            </tr>
                         ))}
                      </tbody>
                   </table>
                </div>

                <div className="mt-10 bg-emerald-500/5 border border-emerald-500/10 p-6 rounded-2xl flex items-center gap-6">
                   <ArrowRightLeft className="w-8 h-8 text-emerald-500 opacity-50" />
                   <div className="flex-1">
                      <h4 className="text-xs font-black text-white uppercase tracking-widest mb-1">Corporate Logistics Benefit</h4>
                      <p className="text-[10px] text-zinc-500 leading-relaxed italic">Selling via buyback eliminates market taxes, broker fees, and the high-risk logistics of hauling through contested J-Space pipelines.</p>
                   </div>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="lg:col-span-4 space-y-8">
          <div className="glass-card rounded-2xl p-8 border-t-2 border-t-violet-500/40 relative overflow-hidden">
            <h3 className="text-[10px] font-black text-zinc-500 uppercase tracking-[0.3em] mb-8">Efficiency Overview</h3>
            <div className="space-y-8">
              <div className="relative group/tip">
                <div className="flex justify-between items-center mb-2"><span className="text-[10px] text-zinc-500 uppercase font-black tracking-widest">Gross Manifest</span></div>
                <div className="text-3xl font-black text-white tracking-tighter mono">{totalRawRevenue.toLocaleString()} <span className="text-xs text-zinc-500 font-bold">ISK</span></div>
                <InfoTooltip text="Total market value of raw assets." />
              </div>
              <div className="pt-8 border-t border-white/5 relative group/tip">
                <div className="flex justify-between items-center mb-2"><span className="text-[10px] text-violet-400 uppercase font-black tracking-widest">Refined Output</span></div>
                <div className="text-3xl font-black text-white tracking-tighter mono">{totalReprocessedValue.toLocaleString()} <span className="text-xs text-zinc-500 font-bold">ISK</span></div>
                <InfoTooltip text="Value of minerals post-refinement." />
              </div>
              <div className={`mt-8 p-6 rounded-2xl flex items-center justify-between border-2 ${isProfitable ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-rose-500/5 border-rose-500/20'} shadow-lg relative group/tip`}>
                <div className="flex items-center gap-4">
                   <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${isProfitable ? 'bg-emerald-500/20 border-emerald-500/30' : 'bg-rose-500/20 border-rose-500/30'} border`}>
                      {isProfitable ? <TrendingUp className="w-6 h-6 text-emerald-400" /> : <TrendingDown className="w-6 h-6 text-rose-400" />}
                   </div>
                   <div>
                      <div className="text-[9px] font-black uppercase text-zinc-500 leading-none mb-1 tracking-widest">Refinement ROI</div>
                      <div className={`text-xl font-black mono leading-none ${isProfitable ? 'text-emerald-400' : 'text-rose-400'}`}>{profitLoss > 0 ? '+' : ''}{profitLoss.toLocaleString()}</div>
                   </div>
                </div>
                <InfoTooltip text="Total value delta from refinement process." />
              </div>
            </div>
          </div>

          <div className="glass-card rounded-2xl p-8">
            <div className="flex items-center gap-3 mb-8"><Settings className="w-4 h-4 text-zinc-500" /><h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-zinc-400">Structure Calibration</h3></div>
            <div className="space-y-8">
              <div className="relative group/tip">
                <div className="flex justify-between items-center mb-3"><label className="text-[10px] font-black text-zinc-500 uppercase tracking-widest">Structure Yield %</label><span className="text-xs font-bold text-violet-400 mono">{skills.stationYield}%</span></div>
                <input type="range" min="0" max="100" value={skills.stationYield} onChange={(e) => setSkills({...skills, stationYield: Number(e.target.value)})} className="w-full accent-violet-600 h-1.5 bg-zinc-800 rounded-lg appearance-none cursor-pointer" />
                <InfoTooltip text="Structure base yield. J-Space structures provide significant bonuses." />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2 relative group/tip">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Reprocessing</label>
                  <select value={skills.reprocessing} onChange={(e) => setSkills({...skills, reprocessing: Number(e.target.value)})} className="w-full bg-slate-900/80 border border-white/5 rounded-lg px-3 py-2 text-xs text-white font-bold outline-none focus:border-violet-500/50">
                    {[0,1,2,3,4,5].map(v => <option key={v} value={v}>Level {v}</option>)}
                  </select>
                  <InfoTooltip text="Fundamental skill level." />
                </div>
                <div className="space-y-2 relative group/tip">
                  <label className="text-[9px] font-black text-zinc-500 uppercase tracking-widest">Efficiency</label>
                  <select value={skills.reprocessingEfficiency} onChange={(e) => setSkills({...skills, reprocessingEfficiency: Number(e.target.value)})} className="w-full bg-slate-900/80 border border-white/5 rounded-lg px-3 py-2 text-xs text-white font-bold outline-none focus:border-violet-500/50">
                    {[0,1,2,3,4,5].map(v => <option key={v} value={v}>Level {v}</option>)}
                  </select>
                  <InfoTooltip text="Advanced skill level." />
                </div>
              </div>
            </div>
            <div className="mt-10 pt-6 border-t border-white/5 flex items-start gap-4"><Shield className="w-5 h-5 text-violet-600 opacity-40" /><p className="text-[9px] text-zinc-600 font-medium italic">Terminal operating in stand-alone mode.</p></div>
          </div>
        </div>
      </main>

      <footer className="border-t border-white/5 p-10 bg-slate-950/90">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-4"><div className="w-3 h-3 rounded-full bg-violet-500/20 border border-violet-500 animate-pulse" /><p className="text-zinc-600 text-[9px] font-black uppercase tracking-[0.3em]">ASTRAEA TERMINAL v4.0.0 (Static)</p></div>
          <div className="flex gap-10"><span className="text-zinc-700 text-[10px] uppercase font-black">Zero-Key Access</span><span className="text-zinc-700 text-[10px] uppercase font-black">Open Source Industrial Utility</span></div>
        </div>
      </footer>
    </div>
  );
}
