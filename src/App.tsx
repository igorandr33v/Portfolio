import React, { useState, useEffect } from 'react';
import {
  Grid,
  Printer,
  Crosshair,
  ArrowUpRight,
  Check,
  Activity,
  Terminal,
  Layers,
  Search
} from 'lucide-react';

interface Dispatch {
  id: string;
  num: string;
  title: string;
  readTime: string;
  category: string;
  abstract: string;
  clauseTitle: string;
  clauseSubtitle: string;
  clauseText: string;
  coordinates: string;
}

const DISPATCHES: Dispatch[] = [
  {
    id: 'disp-01',
    num: '01',
    title: 'The Death of the Floating Card Metaphor',
    readTime: '06 MIN READ',
    category: 'CLAUSE 01 // TECTONICS',
    abstract:
      'Why modern computing is shedding decorative skeuomorphism and floating drop-shadow cards in favor of rigid, uncompromising structural wireframe honesty.',
    clauseTitle: 'Honesty of the Exposed Wireframe',
    clauseSubtitle: 'STRUCTURAL RIGOR',
    clauseText: 'The structural line must remain exposed, sharp, and proud. A boundary is not merely an edge; it is where architectural reality begins.',
    coordinates: 'NODE[0,0,0]'
  },
  {
    id: 'disp-02',
    num: '02',
    title: 'Type as Architectural Monolith',
    readTime: '04 MIN READ',
    category: 'CLAUSE 02 // TYPOGRAPHY',
    abstract:
      'Treating condensed heavy letterforms as load-bearing structural beams rather than mere conveyors of passive sentence strings in the digital space.',
    clauseTitle: 'Monolithic Mass of Letterforms',
    clauseSubtitle: 'GRAVITATIONAL PITCH',
    clauseText: 'Display type is not ornamental script. It is stone, steel, and concrete poured directly into the viewport, exerting gravitational pull over secondary annotations.',
    coordinates: 'NODE[1,0,0]'
  },
  {
    id: 'disp-03',
    num: '03',
    title: 'The Geometric Paradox of Rigid Cells',
    readTime: '08 MIN READ',
    category: 'CLAUSE 03 // SPATIAL DENSITY',
    abstract:
      'Balancing monumental brutalist typography with generous interior cell margins to create serene visual equilibrium without visual clutter.',
    clauseTitle: 'Sovereignty of Internal Margin',
    clauseSubtitle: 'ORTHOGONAL RATIO',
    clauseText: 'A strict wireframe grid emerges solely when individual cells are rigorously proportioned and generously padded to balance heavy structural elements.',
    coordinates: 'NODE[0,1,0]'
  },
  {
    id: 'disp-04',
    num: '04',
    title: 'The Two-Tone Manifesto of Purity',
    readTime: '05 MIN READ',
    category: 'CLAUSE 04 // SYSTEM PHILOSOPHY',
    abstract:
      'Rejecting the rainbow gradient palette in favor of deep technical dark-matter canvas and resolute illuminated typography.',
    clauseTitle: 'Discipline of Technical Ink',
    clauseSubtitle: 'CHROMATIC ZERO',
    clauseText: 'Color in digital systems must be surgical, not decorative. One single resonant neon green accent against deep obsidian ink asserts definitive clarity.',
    coordinates: 'NODE[1,1,1]'
  }
];

interface SpecItem {
  module: string;
  status: 'ENFORCED' | 'RATIFIED' | 'BENCHMARK';
  tolerance: string;
}

const REGISTRY_SPECS: SpecItem[] = [
  { module: 'Cell Perimeter', status: 'ENFORCED', tolerance: '1.0px Solid' },
  { module: 'Corner Junction', status: 'ENFORCED', tolerance: '0px Vertex' },
  { module: 'Primary Display', status: 'RATIFIED', tolerance: 'Syne 800' },
  { module: 'Metadata', status: 'RATIFIED', tolerance: 'JB Mono 0.6rem' },
  { module: 'Cartesian Matrix', status: 'BENCHMARK', tolerance: '12-Column' },
  { module: 'Cell Inner Padding', status: 'ENFORCED', tolerance: '≥ 24px Base' }
];

export default function App() {
  const [activeDispatchIndex, setActiveDispatchIndex] = useState<number>(0);
  const [wireOverlay, setWireOverlay] = useState<boolean>(true);
  const [currentTime, setCurrentTime] = useState<string>('12:16:33 UTC');
  const [emailInput, setEmailInput] = useState<string>('');
  const [subscribed, setSubscribed] = useState<boolean>(false);
  const [hoverCoords, setHoverCoords] = useState<{ x: number; y: number }>({ x: 100, y: 60 });

  useEffect(() => {
    const updateTime = () => {
      const now = new Date();
      const timeStr = now.toISOString().substring(11, 19) + ' UTC';
      setCurrentTime(timeStr);
    };
    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const activeDispatch = DISPATCHES[activeDispatchIndex];

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!emailInput) return;
    setSubscribed(true);
    setTimeout(() => {
      setSubscribed(false);
      setEmailInput('');
    }, 4000);
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      id="gazette-root"
      className={`min-h-screen bg-[#111113] text-[#e2e2e4] font-['Inter'] relative selection:bg-[#50fa7b] selection:text-[#111113] flex flex-col ${
        wireOverlay ? 'wireframe-grid-dark' : ''
      }`}
    >
      {/* Complete App Shell Grid */}
      <div className="flex-1 flex flex-col h-full border border-[rgba(226,226,228,0.1)]">
        
        {/* ========================================================================= */}
        {/* 1. HEADER BAR */}
        {/* ========================================================================= */}
        <header className="sticky top-0 z-50 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-[rgba(226,226,228,0.1)] bg-[#111113]/90 backdrop-blur-md">
          {/* Brand / Edition Label */}
          <div className="flex items-center space-x-3">
            <span className="w-2 h-2 bg-[#50fa7b] inline-block animate-pulse"></span>
            <span className="font-['JetBrains_Mono'] text-xs font-extrabold tracking-widest text-[#e2e2e4] uppercase">
              GAZETTE // VOL. 44
            </span>
          </div>

          {/* Center Live Monospace Time and Rigidity Badge */}
          <div className="hidden md:flex items-center space-x-2 font-['JetBrains_Mono'] text-xs text-[rgba(226,226,228,0.8)]">
            <Activity className="w-3.5 h-3.5 text-[#50fa7b]" />
            <span>{currentTime} // RIGID GRID V4.1</span>
          </div>

          {/* Action Buttons */}
          <div className="flex items-center space-x-2.5">
            <button
              id="toggle-wire-overlay-btn"
              onClick={() => setWireOverlay(!wireOverlay)}
              className={`px-3 py-1.5 font-['JetBrains_Mono'] text-xs uppercase font-bold tracking-wider transition-all duration-150 border cursor-pointer ${
                wireOverlay
                  ? 'bg-[#50fa7b] text-[#111113] border-[#50fa7b]'
                  : 'bg-transparent text-[#e2e2e4] border-[#e2e2e4] hover:bg-[#e2e2e4] hover:text-[#111113]'
              }`}
            >
              {wireOverlay ? 'WIRE: ON' : 'WIRE: OFF'}
            </button>

            <button
              id="print-broadsheet-btn"
              onClick={handlePrint}
              className="px-3 py-1.5 font-['JetBrains_Mono'] text-xs uppercase tracking-wider transition-all duration-150 border border-[#e2e2e4] text-[#e2e2e4] hover:bg-[#e2e2e4] hover:text-[#111113] cursor-pointer flex items-center gap-1.5"
            >
              <Printer className="w-3 h-3" />
              <span>PRINT</span>
            </button>
          </div>
        </header>

        {/* ========================================================================= */}
        {/* 2. THREE-PANEL CORE SYSTEM (Responsive Grid) */}
        {/* ========================================================================= */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-[280px_1fr_320px] divide-y lg:divide-y-0 lg:divide-x divide-[rgba(226,226,228,0.1)]">
          
          {/* ----------------------------------------------------------------------- */}
          {/* LEFT PANEL: DISPATCH CATALOGUE (Sidebar) */}
          {/* ----------------------------------------------------------------------- */}
          <aside className="overflow-y-auto bg-[#111113] flex flex-col justify-between">
            <div>
              {/* Sidebar Header */}
              <div className="p-5 border-b border-[rgba(226,226,228,0.1)]">
                <div className="font-['JetBrains_Mono'] text-[10px] tracking-[0.15em] uppercase text-[rgba(226,226,228,0.6)] font-medium">
                  DISPATCH CATALOGUE
                </div>
              </div>

              {/* Dispatch List */}
              <div className="divide-y divide-[rgba(226,226,228,0.1)]">
                {DISPATCHES.map((item, index) => {
                  const isActive = activeDispatchIndex === index;
                  return (
                    <div
                      key={item.id}
                      onClick={() => setActiveDispatchIndex(index)}
                      className={`p-5 transition-colors cursor-pointer group ${
                        isActive
                          ? 'bg-[rgba(226,226,228,0.06)] border-l-[3px] border-[#50fa7b]'
                          : 'hover:bg-[rgba(226,226,228,0.02)]'
                      }`}
                    >
                      <div
                        className={`font-['JetBrains_Mono'] text-[10px] tracking-wider uppercase font-semibold mb-1.5 transition-colors ${
                          isActive ? 'text-[#50fa7b]' : 'text-[rgba(226,226,228,0.6)]'
                        }`}
                      >
                        [DISPATCH {item.num}]
                      </div>
                      
                      <h3 className="font-['Syne'] text-[1.1rem] leading-tight font-bold tracking-tight text-[#e2e2e4] mb-2 uppercase">
                        {item.title}
                      </h3>

                      <div className="flex items-center justify-between font-['JetBrains_Mono'] text-[10px] text-[rgba(226,226,228,0.6)]">
                        <span>{item.readTime}</span>
                        {isActive && (
                          <span className="text-[#50fa7b] font-bold text-[9px] flex items-center gap-1">
                            ACTIVE <ArrowUpRight className="w-2.5 h-2.5" />
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Sidebar Footnote */}
            <div className="p-5 border-t border-[rgba(226,226,228,0.1)] bg-[rgba(255,255,255,0.01)]">
              <div className="font-['JetBrains_Mono'] text-[10px] uppercase text-[rgba(226,226,228,0.5)]">
                SELECT A DISPATCH TO RECONFIGURE VIEWPORT
              </div>
            </div>
          </aside>

          {/* ----------------------------------------------------------------------- */}
          {/* MAIN PANEL: HERO + ARTICLE GRID */}
          {/* ----------------------------------------------------------------------- */}
          <main className="overflow-y-auto bg-[rgba(255,255,255,0.01)] flex flex-col justify-between">
            
            <div>
              {/* Hero Section */}
              <section className="px-6 py-10 sm:px-10 sm:py-12 border-b border-[rgba(226,226,228,0.1)] bg-[radial-gradient(ellipse_at_top_right,rgba(80,250,123,0.06),transparent_60%)]">
                <div className="font-['JetBrains_Mono'] text-[11px] tracking-[0.15em] uppercase font-bold text-[#50fa7b] mb-3">
                  [THE AUTUMN EDITION]
                </div>

                <h1 className="font-['Syne'] font-extrabold uppercase text-4xl sm:text-6xl md:text-7xl lg:text-8xl leading-[0.88] tracking-[-0.04em] text-[#e2e2e4] my-4">
                  THE STRUCTURAL GAZETTE
                </h1>

                <p className="font-['JetBrains_Mono'] text-xs sm:text-sm text-[rgba(226,226,228,0.75)] max-w-2xl leading-relaxed uppercase">
                  EXPOSING THE RIGID WIREFRAME SKELETAL GEOMETRY OF POST-DIGITAL PUBLISHING. PRICE: GRATIS / OPEN PROTOCOL
                </p>
              </section>

              {/* Two-Column Article & Technical Grid */}
              <section className="p-6 sm:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
                
                {/* Left Sub-Column: Article & Manifesto Clause */}
                <div className="space-y-6">
                  <div>
                    <span className="font-['JetBrains_Mono'] text-[10px] uppercase tracking-widest text-[#50fa7b] font-bold block mb-1">
                      CURRENT INVESTIGATION // {activeDispatch.num}
                    </span>
                    <h2 className="font-['Syne'] text-3xl sm:text-4xl font-extrabold uppercase leading-[0.92] tracking-tight text-[#e2e2e4] mb-4">
                      {activeDispatch.title}
                    </h2>
                    <p className="font-['Inter'] text-sm sm:text-base text-[rgba(226,226,228,0.7)] leading-relaxed">
                      {activeDispatch.abstract}
                    </p>
                  </div>

                  {/* Clause Box */}
                  <div className="border border-[rgba(226,226,228,0.15)] p-5 bg-[rgba(255,255,255,0.02)] relative">
                    <div className="font-['JetBrains_Mono'] text-[10px] tracking-wider uppercase text-[rgba(226,226,228,0.6)] font-semibold">
                      {activeDispatch.category}
                    </div>
                    <h4 className="font-['Syne'] text-xl font-bold uppercase tracking-tight text-[#e2e2e4] my-2">
                      {activeDispatch.clauseTitle}
                    </h4>
                    <p className="font-['Inter'] text-xs sm:text-sm text-[rgba(226,226,228,0.7)] leading-relaxed">
                      {activeDispatch.clauseText}
                    </p>
                    <div className="mt-3 pt-3 border-t border-[rgba(226,226,228,0.1)] flex items-center justify-between text-[10px] font-['JetBrains_Mono'] text-[rgba(226,226,228,0.5)]">
                      <span>STATUS: ENFORCED</span>
                      <span className="text-[#50fa7b] font-bold">{activeDispatch.clauseSubtitle}</span>
                    </div>
                  </div>
                </div>

                {/* Right Sub-Column: FIG. 01 Blueprint Mesh + Subscription Terminal */}
                <div className="p-6 bg-[rgba(226,226,228,0.03)] border border-[rgba(226,226,228,0.1)] space-y-6">
                  
                  {/* Schematic Box */}
                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase text-[rgba(226,226,228,0.6)] font-bold">
                        FIG. 01 // COORDINATE MESH
                      </span>
                      <span className="font-['JetBrains_Mono'] text-[9px] text-[#50fa7b] border border-[#50fa7b]/40 px-1.5 py-0.5">
                        X:{hoverCoords.x} Y:{hoverCoords.y}
                      </span>
                    </div>

                    <div
                      onMouseMove={(e) => {
                        const rect = e.currentTarget.getBoundingClientRect();
                        setHoverCoords({
                          x: Math.round(e.clientX - rect.left),
                          y: Math.round(e.clientY - rect.top)
                        });
                      }}
                      className="h-56 sm:h-60 border border-[rgba(226,226,228,0.1)] schematic-grid relative flex items-center justify-center cursor-crosshair overflow-hidden bg-[#111113]"
                    >
                      <svg
                        width="240"
                        height="160"
                        viewBox="0 0 200 150"
                        className="w-full h-full select-none p-4"
                      >
                        {/* Primary Axonometric Rhombus */}
                        <path
                          d="M100 15 L180 65 L100 115 L20 65 Z"
                          fill="none"
                          stroke="#50fa7b"
                          strokeWidth="1.2"
                        />
                        {/* Subdivided Plane */}
                        <path
                          d="M100 45 L160 85 L100 125 L40 85 Z"
                          fill="none"
                          stroke="#e2e2e4"
                          strokeWidth="0.8"
                          strokeDasharray="3 3"
                          opacity="0.6"
                        />
                        {/* Orthogonal Grid Lines */}
                        <line x1="100" y1="15" x2="100" y2="115" stroke="#50fa7b" strokeWidth="0.5" strokeDasharray="2 2" />
                        <line x1="20" y1="65" x2="180" y2="65" stroke="#e2e2e4" strokeWidth="0.5" opacity="0.4" />
                        
                        {/* Interactive Dynamic Node Marker */}
                        <circle cx="100" cy="65" r="4" fill="#50fa7b" />
                        <circle cx="100" cy="65" r="8" fill="none" stroke="#50fa7b" strokeWidth="0.5" className="animate-ping origin-center" />
                      </svg>

                      <div className="font-['JetBrains_Mono'] text-[10px] text-[#50fa7b] font-bold absolute bottom-2.5 right-3 bg-[#111113] px-2 py-0.5 border border-[#50fa7b]/40">
                        {activeDispatch.coordinates}
                      </div>
                    </div>
                  </div>

                  {/* Subscription Terminal */}
                  <div>
                    <div className="font-['JetBrains_Mono'] text-[10px] tracking-widest uppercase text-[rgba(226,226,228,0.6)] font-bold mb-2">
                      SUBSCRIPTION TERMINAL
                    </div>

                    <form onSubmit={handleSubscribe} className="space-y-2.5">
                      <input
                        type="email"
                        required
                        value={emailInput}
                        onChange={(e) => setEmailInput(e.target.value)}
                        placeholder="ENTER TERMINAL EMAIL..."
                        className="w-full bg-[rgba(226,226,228,0.06)] border border-[rgba(226,226,228,0.15)] focus:border-[#50fa7b] p-3 text-xs font-['JetBrains_Mono'] text-[#e2e2e4] placeholder-[rgba(226,226,228,0.35)] focus:outline-none transition-colors"
                      />
                      
                      <button
                        type="submit"
                        className="w-full bg-[#50fa7b] border border-[#50fa7b] text-[#111113] p-3 font-['JetBrains_Mono'] text-xs uppercase font-extrabold tracking-wider hover:bg-[#45e06e] transition-colors cursor-pointer"
                      >
                        REGISTER CONDUIT
                      </button>

                      {subscribed && (
                        <div className="p-2.5 bg-[#50fa7b] text-[#111113] text-[11px] font-['JetBrains_Mono'] font-bold flex items-center gap-1.5">
                          <Check className="w-3.5 h-3.5 stroke-[3]" />
                          <span>CONDUIT ENROLLED. DISPATCH SENT.</span>
                        </div>
                      )}
                    </form>
                  </div>

                </div>

              </section>
            </div>

            {/* Main Area Technical Bar */}
            <div className="p-4 border-t border-[rgba(226,226,228,0.1)] flex items-center justify-between text-[11px] font-['JetBrains_Mono'] text-[rgba(226,226,228,0.5)]">
              <span>PROJECTION: ORTHOGONAL CARTESIAN</span>
              <span>GRID STRICTNESS: ABSOLUTE 0PX CORNERS</span>
            </div>

          </main>

          {/* ----------------------------------------------------------------------- */}
          {/* RIGHT PANEL: TECTONIC CODE REGISTRY & MANIFESTO */}
          {/* ----------------------------------------------------------------------- */}
          <aside className="overflow-y-auto bg-[#111113] flex flex-col justify-between">
            <div className="p-6 space-y-6">
              
              {/* Registry Header */}
              <div>
                <div className="font-['JetBrains_Mono'] text-[10px] tracking-[0.15em] uppercase text-[rgba(226,226,228,0.6)] font-bold mb-4">
                  TECTONIC CODE REGISTRY
                </div>

                {/* Technical Table */}
                <div className="border border-[rgba(226,226,228,0.1)] overflow-hidden">
                  <table className="w-full border-collapse font-['JetBrains_Mono'] text-xs">
                    <thead>
                      <tr className="border-b-2 border-[#e2e2e4] text-[#e2e2e4]">
                        <th className="text-left p-3 font-bold text-[11px]">MODULE</th>
                        <th className="text-right p-3 font-bold text-[11px]">STATUS</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[rgba(226,226,228,0.1)]">
                      {REGISTRY_SPECS.map((spec, i) => (
                        <tr
                          key={i}
                          className="hover:bg-[rgba(255,255,255,0.03)] hover:text-[#50fa7b] transition-colors group cursor-default"
                        >
                          <td className="p-3 text-[rgba(226,226,228,0.7)] group-hover:text-[#50fa7b] transition-colors text-[11px]">
                            {spec.module}
                          </td>
                          <td className="p-3 text-right">
                            <span className="text-[9px] border border-[#50fa7b] text-[#50fa7b] px-1.5 py-0.5 font-semibold">
                              {spec.status}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Manifesto Clause 09 High-Contrast Block */}
              <div className="border border-[rgba(226,226,228,0.1)] p-5 bg-[#e2e2e4] text-[#111113]">
                <div className="font-['JetBrains_Mono'] text-[9px] tracking-widest uppercase text-[#111113]/60 font-bold mb-1">
                  [MANIFESTO CLAUSE 09]
                </div>
                <h4 className="font-['Syne'] text-[1.15rem] leading-tight font-extrabold uppercase text-[#111113] my-2">
                  "The border is not merely a delimiter; it is where the reality commence."
                </h4>
                <div className="font-['JetBrains_Mono'] text-[9px] text-[#111113]/70 uppercase pt-2 border-t border-[#111113]/20">
                  APPROVED BY EDITORIAL BOARD // 2026
                </div>
              </div>

              {/* Technical Telemetry Summary */}
              <div className="border border-[rgba(226,226,228,0.1)] p-4 bg-[rgba(255,255,255,0.015)] space-y-2">
                <div className="font-['JetBrains_Mono'] text-[10px] text-[rgba(226,226,228,0.5)] uppercase">
                  ACTIVE MATRIX TELEMETRY
                </div>
                <div className="font-['JetBrains_Mono'] text-xs text-[#e2e2e4] space-y-1">
                  <div className="flex justify-between">
                    <span className="text-[rgba(226,226,228,0.6)]">RENDER PITCH:</span>
                    <span className="text-[#50fa7b] font-bold">16PX RADIAL</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgba(226,226,228,0.6)]">TYPOGRAPHIC MASS:</span>
                    <span>SYNE 800</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-[rgba(226,226,228,0.6)]">PALETTE:</span>
                    <span>OBSIDIAN / #50FA7B</span>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Panel Footnote */}
            <div className="p-4 border-t border-[rgba(226,226,228,0.1)] text-[10px] font-['JetBrains_Mono'] text-[rgba(226,226,228,0.5)]">
              ALL SYSTEM MODULES FUNCTIONING NOMINAL
            </div>
          </aside>

        </div>

        {/* ========================================================================= */}
        {/* 3. FOOTER BAR */}
        {/* ========================================================================= */}
        <footer className="border-t border-[rgba(226,226,228,0.1)] px-4 sm:px-6 py-3 flex flex-wrap items-center justify-between text-[11px] font-['JetBrains_Mono'] text-[rgba(226,226,228,0.6)] bg-[#111113]">
          <div className="flex items-center space-x-2">
            <span className="w-1.5 h-1.5 bg-[#50fa7b] inline-block"></span>
            <span>© 2026 THE STRUCTURAL GAZETTE // EXPOSED WIREFRAME VERIFIED</span>
          </div>
          <div>
            <span>LAT: 52°31'N / LON: 13°24'E // ISBN 978-0-8092-2026-X</span>
          </div>
        </footer>

      </div>
    </div>
  );
}
