'use client'
import { useState } from 'react'
import Marquee from 'react-fast-marquee'
import {
  SiJavascript,
  SiTypescript,
  SiPython,
  SiC,
  SiCplusplus,
  SiHtml5,
  SiCss,
  SiReact,
  SiNextdotjs,
  SiExpo,
  SiTailwindcss,
  SiBootstrap,
  SiNodedotjs,
  SiExpress,
  SiFlask,
  SiMongodb,
  SiPostgresql,
  SiMysql,
  SiGit,
  SiGithub,
  SiNpm,
  SiPostman,
  SiVite,
  SiBlender,
  SiScikitlearn,
  SiNumpy,
  SiPandas,
} from 'react-icons/si'
import { VscCode } from 'react-icons/vsc'

const SKILLS = [
  {
    category: 'LANGUAGES',
    icon: '◈',
    items: [
      { name: 'JavaScript', icon: SiJavascript },
      { name: 'TypeScript', icon: SiTypescript },
      { name: 'Python', icon: SiPython },
      { name: 'C', icon: SiC },
      { name: 'C++', icon: SiCplusplus },
    ],
  },
  {
    category: 'FRONTEND',
    icon: '◉',
    items: [
      { name: 'HTML5', icon: SiHtml5 },
      { name: 'CSS3', icon: SiCss },
      { name: 'React', icon: SiReact },
      { name: 'Next.js', icon: SiNextdotjs },
      { name: 'React Native', icon: SiReact },
      { name: 'Expo', icon: SiExpo },
      { name: 'Tailwind', icon: SiTailwindcss },
      { name: 'Bootstrap', icon: SiBootstrap },
    ],
  },
  {
    category: 'BACKEND & DATABASES',
    icon: '⬡',
    items: [
      { name: 'Node.js', icon: SiNodedotjs },
      { name: 'Express', icon: SiExpress },
      { name: 'Flask', icon: SiFlask },
      { name: 'MongoDB', icon: SiMongodb },
      { name: 'PostgreSQL', icon: SiPostgresql },
      { name: 'MySQL', icon: SiMysql },
    ],
  },
  {
    category: 'TOOLS & ML',
    icon: '◆',
    items: [
      { name: 'Git', icon: SiGit },
      { name: 'GitHub', icon: SiGithub },
      { name: 'npm', icon: SiNpm },
      { name: 'Postman', icon: SiPostman },
      { name: 'VS Code', icon: VscCode },
      { name: 'Vite', icon: SiVite },
      { name: 'Blender', icon: SiBlender },
      { name: 'scikit-learn', icon: SiScikitlearn },
      { name: 'NumPy', icon: SiNumpy },
      { name: 'Pandas', icon: SiPandas },
    ],
  },
]

const ALL_SKILLS = SKILLS.flatMap((group) => group.items)

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
                <div key={item.name} className="font-mono-r text-retro-dark text-sm py-1 border-b border-retro-brown/20 flex items-center gap-2">
                  <item.icon className="text-base" aria-hidden="true" />
                  <span>- {item.name}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4 mb-8">
          <h2 className="font-pixel text-retro-dark text-lg md:text-xl retro-heading">{'// ALL SKILLS OVERVIEW'}</h2>
          <div className="flex-1 pixel-divider" />
        </div>

        <div className="retro-window overflow-hidden bg-retro-cream">
          <div className="retro-window-bar">
          <div><span className="retro-window-dot" /><span className="retro-window-dot" /><span className="retro-window-dot" /></div>
          </div>
          <div className="p-4 bg-retro-cream overflow-hidden">
            <Marquee gradient={false} speed={80} pauseOnHover autoFill>
              {ALL_SKILLS.map((item) => (
                <div
                  key={item.name}
                  className="mx-3 flex items-center gap-3 bg-retro-yellow border-2 border-retro-dark px-4 py-3 shadow-[3px_3px_0_#1A1200]"
                >
                  <item.icon className="text-xl" aria-hidden="true" />
                  <span className="font-mono-r text-sm md:text-base text-retro-dark">{item.name}</span>
                </div>
              ))}
            </Marquee>
          </div>
        </div>
      </div>
    </>
  )
}