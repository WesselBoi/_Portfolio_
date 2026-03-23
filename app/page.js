// app/page.js  — Server Component
import Link from 'next/link'
import HeroClient from './HeroClient'   // ← client island

const FEATURED = [
  { id: 1, title: 'AI Image Generator', badge: 'AI',      desc: 'Text-to-image generation platform with community sharing and smooth API-driven UX.',               tech: ['MERN Stack', 'Stable Diffusion API', 'React'], year: '2025' },
  { id: 2, title: 'ShopEase',           badge: 'PRODUCT', desc: 'MERN commerce app with secure authentication, cart and checkout, plus REST APIs.',                  tech: ['MERN', 'Redux Toolkit', 'JWT'],                year: '2025' },
  { id: 3, title: 'Self-Harm Content Detection', badge: 'ML', desc: 'NLP pipeline for self-harm detection using baseline ML models and fine-tuned BERT.',         tech: ['Python', 'Scikit-learn', 'Transformers'],      year: '2025' },
]

export default function Home() {
  return (
    <>
      <HeroClient />

      {/* Stats bar */}
      <div className="bg-retro-yellow border-y-4 border-retro-dark py-4 px-4">
        <div className="max-w-6xl mx-auto grid grid-cols-2 md:grid-cols-3 gap-4">
          {[['3rd','YEAR CS'],['15+','PROJECTS'],['9.7','GPA']].map(([n,l]) => (
            <div key={l} className="text-center">
              <div className="font-pixel text-retro-dark text-2xl md:text-3xl">{n}</div>
              <div className="font-mono-r text-retro-brown text-xs mt-1">{l}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Featured projects */}
      <section className="py-20 px-4 bg-retro-cream">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-12">
            <h2 className="font-pixel text-retro-dark text-xl retro-heading">FEATURED WORK</h2>
            <div className="flex-1 pixel-divider" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
            {FEATURED.map(p => (
              <div key={p.id} className="retro-card group">
                <div className="flex justify-between items-start mb-4">
                  <span className="retro-badge">{p.badge}</span>
                  <span className="font-mono-r text-retro-brown text-xs">{p.year}</span>
                </div>
                <div className="w-12 h-12 bg-retro-dark border-2 border-retro-yellow flex items-center justify-center mb-4 group-hover:bg-retro-yellow transition-colors">
                  <span className="font-pixel text-retro-yellow group-hover:text-retro-dark text-xs">
                    {String(p.id).padStart(2,'0')}
                  </span>
                </div>
                <h3 className="font-pixel text-retro-dark text-sm mb-3">{p.title}</h3>
                <p className="font-mono-r text-retro-brown text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tech.map(t => (
                    <span key={t} className="font-mono-r text-xs border border-retro-dark px-2 py-1 bg-retro-yellow">{t}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>
          <div className="text-center">
            <Link href="/projects" className="retro-btn">VIEW ALL PROJECTS →</Link>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4 bg-retro-dark relative overflow-hidden">
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage:'radial-gradient(#F5C518 1px,transparent 1px)', backgroundSize:'10px 10px' }} />
        <div className="max-w-3xl mx-auto text-center relative">
          <Link href="/contact" className="retro-btn">Download Resume</Link>
        </div>
      </section>
    </>
  )
}