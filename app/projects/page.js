'use client'
import { useState } from 'react'

const PROJECTS = [
  { id:1, title:'RETRO OS',     category:'WEB APP',    badge:'FEATURED',    status:'LIVE',   desc:'Browser-based OS simulator with file manager, terminal, retro games.', tech:['React','Canvas','Node.js'], year:'2024' },
  { id:2, title:'PIXEL SHOP',   category:'E-COMMERCE', badge:'LIVE',        status:'LIVE',   desc:'Full e-commerce platform with pixel-art UI and real-time inventory.', tech:['Next.js','Stripe','MongoDB'], year:'2024' },
  { id:3, title:'CHIPTUNE API', category:'API',        badge:'API',         status:'LIVE',   desc:'REST API generating 8-bit music from MIDI. 10k+ monthly requests.', tech:['Python','FastAPI','Docker'], year:'2023' },
  { id:4, title:'QUEST TRACKER',category:'TOOL',       badge:'HOBBY',       status:'LIVE',   desc:'RPG-inspired productivity app. Earn XP, level up, defeat procrastination.', tech:['React','Firebase'], year:'2023' },
  { id:5, title:'GRID EDITOR',  category:'TOOL',       badge:'OPEN SOURCE', status:'LIVE',   desc:'Browser pixel art editor with layers, animation, and GIF export.', tech:['Vanilla JS','Canvas'], year:'2023' },
  { id:6, title:'DEVLOG CLI',   category:'CLI',        badge:'CLI',         status:'STABLE', desc:'CLI for developer journals with markdown, tagging, and search.', tech:['Node.js','SQLite'], year:'2022' },
]
const CATEGORIES = ['ALL','WEB APP','E-COMMERCE','API','TOOL','CLI']

export default function Projects() {
  const [active, setActive] = useState('ALL')
  const filtered = active === 'ALL' ? PROJECTS : PROJECTS.filter(p => p.category === active)

  return (
    <>
      <div className="bg-retro-dark py-16 px-4 border-b-4 border-retro-yellow">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono-r text-retro-amber text-sm mb-2">&gt; ls ~/projects</p>
          <h1 className="font-pixel text-retro-yellow text-2xl md:text-3xl mb-2">MY PROJECTS</h1>
          <p className="font-mono-r text-retro-amber">&gt; {PROJECTS.length} projects found.</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Filter */}
        <div className="flex flex-wrap gap-2 mb-10">
          <span className="font-pixel text-retro-dark text-xs mr-2 self-center">FILTER:</span>
          {CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setActive(cat)}
              className={`font-pixel text-xs px-3 py-2 border-2 border-retro-dark transition-all ${
                active === cat ? 'bg-retro-dark text-retro-yellow shadow-[3px_3px_0_#1A1200]' : 'bg-retro-cream text-retro-dark hover:bg-retro-yellow'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map(p => (
            <div key={p.id} className="retro-card flex flex-col group">
              <div className="flex justify-between items-center mb-4">
                <span className="retro-badge">{p.badge}</span>
                <div className="flex items-center gap-2">
                  <span className={`w-2 h-2 rounded-full ${p.status === 'LIVE' ? 'bg-green-500 animate-pulse' : 'bg-retro-amber'}`} />
                  <span className="font-mono-r text-xs text-retro-brown">{p.status}</span>
                </div>
              </div>
              <div className="flex items-start gap-3 mb-3">
                <div className="w-10 h-10 bg-retro-dark flex items-center justify-center font-pixel text-retro-yellow text-xs shrink-0 group-hover:bg-retro-yellow group-hover:text-retro-dark transition-colors">
                  {String(p.id).padStart(2,'0')}
                </div>
                <div>
                  <div className="font-mono-r text-retro-orange text-xs mb-1">{p.category}</div>
                  <h3 className="font-pixel text-retro-dark text-sm">{p.title}</h3>
                </div>
              </div>
              <p className="font-mono-r text-retro-brown text-sm leading-relaxed mb-4 flex-1">{p.desc}</p>
              <div className="flex flex-wrap gap-1 mb-5">
                {p.tech.map(t => <span key={t} className="font-mono-r text-xs bg-retro-yellow border border-retro-dark px-2 py-0.5">{t}</span>)}
              </div>
              <div className="flex gap-2 pt-4 border-t-2 border-retro-dark">
                <a href="#" className="retro-btn text-xs py-2 px-3 flex-1 text-center">DEMO ↗</a>
                <a href="#" className="retro-btn retro-btn-dark text-xs py-2 px-3 flex-1 text-center">
                  <span className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap leading-none">
                    <span>CODE</span>
                    <span style={{color:"white"}}>↗</span>
                    <svg style={{color:"white"}} xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github shrink-0" viewBox="0 0 16 16" aria-hidden="true">
                      <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                    </svg>
                  </span>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}