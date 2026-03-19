'use client'
import { useState } from 'react'

const PROJECTS = [
  {
    id: 1,
    title: 'AI Image Generator',
    category: 'WEB APP',
    badge: 'AI',
    status: 'LIVE',
    type: 'AI-Powered Web App',
    tech: ['MERN Stack', 'Stable Diffusion API'],
    summary: 'Text-to-image generation platform with community sharing and smooth API-driven UX.',
    demoUrl: 'https://ai-image-generator-8r3r.onrender.com/',
    codeUrl: 'https://github.com/WesselBoi/AI-Image-Generator--'
  },
  {
    id: 2,
    title: 'SocialBuzz',
    category: 'WEB APP',
    badge: 'FEATURED',
    status: 'LIVE',
    type: 'End-to-End Social Media Application',
    tech: ['Next.js', 'Node.js', 'MongoDB', 'Tailwind CSS'],
    summary: 'Full-stack social platform with secure auth, profiles, posts, comments, likes, and follows.',
    demoUrl: 'https://social-buzz-1010.vercel.app/',
    codeUrl: 'https://github.com/WesselBoi/SocialBuzz'
  },
  {
    id: 3,
    title: 'Self-Harm Content Detection',
    category: 'ML',
    badge: 'ML',
    type: 'NLP Classification',
    tech: ['Python', 'Pandas', 'Scikit-learn', 'PyTorch', 'Transformers'],
    summary: 'NLP pipeline for self-harm detection using baseline ML models and fine-tuned BERT.',
    codeUrl: 'https://github.com/WesselBoi/Suicidal-Content-detection',
  },
  {
    id: 4,
    title: 'Exoplanet Habitability Index',
    category: 'ML',
    badge: 'RESEARCH',
    type: 'Habitability analysis',
    tech: ['Python', 'Pandas', 'Scikit-learn'],
    summary: 'Machine learning model to estimate exoplanet habitability using planetary and stellar feature analysis.',
    codeUrl: 'https://github.com/WesselBoi/Titanic_Survival_Prediction',
  },
  {
    id: 5,
    title: 'ShopEase',
    category: 'WEB APP',
    badge: 'PRODUCT',
    status: 'LIVE',
    type: 'E-commerce Platform',
    tech: ['MERN', 'Redux Toolkit', 'JWT', 'bcrypt'],
    summary: 'MERN commerce app with secure authentication, cart and checkout, plus REST APIs.',
    demoUrl: 'https://shopease-ealb.onrender.com/',
    codeUrl: 'https://github.com/WesselBoi/ShopEase'
  },
  {
    id: 6,
    title: 'Carbon Emission Tracker',
    category: 'WEB APP',
    badge: 'SUSTAINABILITY',
    type: 'Flask Application',
    tech: ['Flask', 'SQLite', 'HTML', 'CSS', 'JavaScript'],
    summary: 'Flask-based tracker for carbon emissions with dynamic inputs, charts, and SQLite persistence.',
    codeUrl: 'https://github.com/WesselBoi/Carbon-Emission-Tracker-System',
  },
  {
    id: 7,
    title: 'Titanic Survival Prediction',
    category: 'ML',
    badge: 'ML',
    type: 'Machine Learning Pipeline',
    tech: ['Python', 'Pandas', 'Scikit-learn'],
    summary: 'End-to-end ML workflow for Titanic survival prediction with feature engineering and tuned Random Forest.',
    codeUrl: 'https://github.com/WesselBoi/Exoplanet_Habitability_Index',
  },
]
const CATEGORIES = ['ALL', ...new Set(PROJECTS.map((project) => project.category))]

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
                  <span className={`w-2 h-2 rounded-full ${p.status === 'LIVE' ? 'bg-green-500 animate-pulse' : ''}`} />
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
                  <p className="font-mono-r text-retro-brown text-xs mt-1">{p.type}</p>
                </div>
              </div>
              <p className="font-mono-r text-retro-brown text-sm leading-relaxed mb-4 flex-1">
                {p.summary}
              </p>
              <div className="flex flex-wrap gap-1 mb-5">
                {p.tech.map(t => <span key={t} className="font-mono-r text-xs bg-retro-yellow border border-retro-dark px-2 py-0.5">{t}</span>)}
              </div>
              <div className="flex gap-2 pt-4 border-t-2 border-retro-dark">
                {p.demoUrl ? (
                  <a href={p.demoUrl} target="_blank" rel="noreferrer" className="retro-btn text-xs py-2 px-3 flex-1 text-center">
                    LIVE SITE ↗
                  </a>
                ) : (
                  <span className="retro-btn text-xs py-2 px-3 flex-1 text-center bg-gray-300! text-gray-500! border-gray-400! shadow-none! cursor-not-allowed opacity-80">
                    LIVE SITE
                  </span>
                )}

                {p.codeUrl ? (
                  <a href={p.codeUrl} target="_blank" rel="noreferrer" className="retro-btn retro-btn-dark text-xs py-2 px-3 flex-1 text-center">
                    <span className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap leading-none">
                      <span>GITHUB</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github shrink-0" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                      </svg>
                    </span>
                  </a>
                ) : (
                  <span className="retro-btn retro-btn-dark text-xs py-2 px-3 flex-1 text-center bg-gray-500! text-gray-300! border-gray-500! shadow-none! cursor-not-allowed opacity-80">
                    <span className="inline-flex w-full items-center justify-center gap-2 whitespace-nowrap leading-none">
                      <span>GITHUB</span>
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-github shrink-0" viewBox="0 0 16 16" aria-hidden="true">
                        <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8"/>
                      </svg>
                    </span>
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  )
}