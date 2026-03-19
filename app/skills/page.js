'use client'
import { useState } from 'react'

const SKILLS = [
  {
    category: 'LANGUAGES',
    icon: '◈',
    items: ['JavaScript', 'TypeScript', 'Python', 'C', 'C++'],
  },
  {
    category: 'FRONTEND',
    icon: '◉',
    items: ['HTML5 & CSS3', 'React', 'Next.js', 'React Native', 'Expo', 'Tailwind', 'Bootstrap'],
  },
  {
    category: 'BACKEND & DATABASES',
    icon: '⬡',
    items: ['Node.js', 'Express', 'Flask', 'MongoDB', 'PostgreSQL', 'MySQL'],
  },
  {
    category: 'TOOLS & ML',
    icon: '◆',
    items: ['Git & GitHub', 'npm', 'Postman', 'VS Code', 'Vite & Blender', 'scikit-learn', 'NumPy & Pandas'],
  },
]

export default function Skills() {
  const [activeCategory, setActiveCategory] = useState(SKILLS[0].category)
  const selected = SKILLS.find((category) => category.category === activeCategory) || SKILLS[0]

  return (
    <>
      <div className="bg-retro-dark py-16 px-4 border-b-4 border-retro-yellow">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono-r text-retro-amber text-sm mb-2">&gt; cat skills.json</p>
          <h1 className="font-pixel text-retro-yellow text-2xl md:text-3xl">SKILLS & TOOLS</h1>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="flex flex-wrap gap-2 mb-8">
          {SKILLS.map((category) => (
            <button
              key={category.category}
              onClick={() => setActiveCategory(category.category)}
              className={`font-pixel text-xs px-3 py-2 border-2 border-retro-dark transition-all ${
                activeCategory === category.category
                  ? 'bg-retro-dark text-retro-yellow shadow-[3px_3px_0_#1A1200]'
                  : 'bg-retro-cream text-retro-dark hover:bg-retro-yellow'
              }`}
            >
              {category.category}
            </button>
          ))}
        </div>

        <div className="retro-window mb-10">
          <div className="retro-window-bar">
            <span>{selected.icon} {selected.category}</span>
          </div>
          <div className="p-6 bg-retro-cream">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-2">
              {selected.items.map((item) => (
                <div key={item} className="font-mono-r text-retro-dark text-sm py-1 border-b border-retro-brown/20">
                  - {item}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-pixel text-retro-dark text-base retro-heading">{'// ALL SKILLS OVERVIEW'}</h2>
          <div className="flex-1 pixel-divider" />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {SKILLS.map((group) => (
            <div key={group.category} className="retro-card">
              <h3 className="font-pixel text-retro-dark text-xs mb-4">{group.category}</h3>
              <div className="flex flex-wrap gap-2">
                {group.items.map((item) => (
                  <span key={item} className="font-mono-r text-xs bg-retro-yellow border border-retro-dark px-2 py-1">
                    {item}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}