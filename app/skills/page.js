'use client'
import { useEffect, useState } from 'react'

const SKILLS = [
  { category:'FRONTEND', icon:'◈', items:[{name:'React / Next.js',level:95},{name:'TypeScript',level:88},{name:'CSS / Tailwind',level:92},{name:'Vue.js',level:72},{name:'Three.js',level:65}] },
  { category:'BACKEND',  icon:'◉', items:[{name:'Node.js / Express',level:90},{name:'Python / FastAPI',level:85},{name:'PostgreSQL',level:82},{name:'MongoDB',level:78},{name:'Redis',level:70}] },
  { category:'DEVOPS',   icon:'⬡', items:[{name:'Docker',level:80},{name:'AWS / GCP',level:75},{name:'CI/CD',level:85},{name:'Linux / Bash',level:88},{name:'Terraform',level:55}] },
]
const TOOLS = ['Neovim','Git','Figma','Postman','Docker Desktop','VS Code','iTerm2','TablePlus','Notion','Linear','Vercel','Railway']

function SkillBar({ name, level }) {
  const [width, setWidth] = useState(0)
  useEffect(() => { const t = setTimeout(() => setWidth(level), 200); return () => clearTimeout(t) }, [level])
  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="font-mono-r text-sm text-retro-dark">{name}</span>
        <span className="font-pixel text-xs text-retro-orange">{level}%</span>
      </div>
      <div className="retro-progress">
        <div className="retro-progress-fill" style={{ width:`${width}%` }} />
      </div>
    </div>
  )
}

export default function Skills() {
  return (
    <>
      <div className="bg-retro-dark py-16 px-4 border-b-4 border-retro-yellow">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono-r text-retro-amber text-sm mb-2">&gt; cat skills.json</p>
          <h1 className="font-pixel text-retro-yellow text-2xl md:text-3xl">SKILLS & TOOLS</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-16">
          {SKILLS.map(g => (
            <div key={g.category} className="retro-window">
              <div className="retro-window-bar">
                <span>{g.icon} {g.category}</span>
              </div>
              <div className="p-6 bg-retro-cream">
                {g.items.map(s => <SkillBar key={s.name} name={s.name} level={s.level} />)}
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-pixel text-retro-dark text-base retro-heading">{'// TOOLS & SOFTWARE'}</h2>
          <div className="flex-1 pixel-divider" />
        </div>
        <div className="flex flex-wrap gap-3 mb-16">
          {TOOLS.map(t => (
            <div key={t} className="retro-card py-3 px-5 hover:bg-retro-yellow transition-colors cursor-default">
              <span className="font-mono-r text-retro-dark text-sm">{t}</span>
            </div>
          ))}
        </div>
        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-pixel text-retro-dark text-base retro-heading">{'// SOFT SKILLS'}</h2>
          <div className="flex-1 pixel-divider" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[{skill:'COMMUNICATION',score:'★★★★★',desc:'Clear & concise'},{skill:'TEAMWORK',score:'★★★★★',desc:'Collaborative'},{skill:'PROBLEM SOLVING',score:'★★★★☆',desc:'Creative approach'},{skill:'MENTORING',score:'★★★★☆',desc:'Patient & clear'}].map(({skill,score,desc}) => (
            <div key={skill} className="retro-card text-center hover:bg-retro-yellow transition-colors">
              <div className="font-pixel text-retro-dark text-xs mb-3">{skill}</div>
              <div className="text-retro-orange text-lg mb-1">{score}</div>
              <div className="font-mono-r text-retro-brown text-xs">{desc}</div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}