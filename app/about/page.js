import Link from 'next/link'

const TIMELINE = [
  { year:'2024', title:'Senior Dev @ PixelCorp',    desc:'Led team of 8 engineers building SaaS platform with 100k+ users.', icon:'★' },
  { year:'2022', title:'Full Stack @ RetroSoft',     desc:'Built real-time collaboration tools for Fortune 500 clients.', icon:'◆' }
]

export const metadata = { title: 'About — PIXEL.DEV' }

export default function About() {
  return (
    <>
      <div className="bg-retro-dark py-16 px-4 border-b-4 border-retro-yellow">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono-r text-retro-amber text-sm mb-2">&gt; cd /about</p>
          <h1 className="font-pixel text-retro-yellow text-2xl md:text-3xl">ABOUT ME</h1>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Profile */}
          <div className="lg:col-span-1">
            <div className="retro-window mb-6">
              <div className="retro-window-bar">
                <span>profile.bmp</span><span>128×128</span>
              </div>
              <div className="bg-retro-cream p-6 flex justify-center">
                <div className="relative w-32 h-32 border-4 border-retro-dark bg-retro-yellow flex flex-col items-center justify-center">
                  <span className="font-pixel text-retro-dark text-4xl">:)</span>
                  <span className="font-pixel text-retro-brown text-xs mt-1">ALEX.PX</span>
                  <div className="absolute -bottom-2 -right-2 w-6 h-6 bg-green-500 border-2 border-retro-dark" />
                </div>
              </div>
            </div>
            <div className="retro-card">
              <h3 className="font-pixel text-retro-dark text-xs mb-4">{'// PROFILE'}</h3>
              {[['NAME','Alex Pixel'],['ROLE','Full Stack Dev'],['LOCATION','San Francisco'],['COFFEE','Black, always'],['EDITOR','Neovim (btw)'],['OS','Arch Linux']].map(([k,v]) => (
                <div key={k} className="flex gap-2 mb-3 font-mono-r text-sm">
                  <span className="text-retro-orange w-24 shrink-0">{k}:</span>
                  <span className="text-retro-brown">{v}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Content */}
          <div className="lg:col-span-2 space-y-10">
            <div>
              <h2 className="font-pixel text-retro-dark text-base mb-6 retro-heading">{'// WHO AM I'}</h2>
              <div className="font-mono-r text-retro-brown text-base leading-relaxed space-y-4">
                <p>&gt; Yo, I&apos;m Saksham Mathur, By day, I’m a full‑stack developer who enjoys wiring up pixel‑perfect interfaces to reliable backends. By night, I experiment with machine learning models, turning data into little decision‑making power‑ups.</p>
                <p>&gt; I study at university, where I balance algorithms, math, and software engineering projects with building side quests like this portfolio.</p>
                <p>&gt; I like working across the stack: from designing clean, responsive UIs to building APIs that don’t fall over when people start actually using them. Separately, I build ML‑focused projects—small models for recommendation, prediction, or classification—that live in their own worlds and let me explore the “smart” side of software.</p>
              </div>
            </div>

            <div>
              <h2 className="font-pixel text-retro-dark text-base mb-8 retro-heading">{'// EXPERIENCE'}</h2>
              <div className="relative">
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-retro-dark" />
                <div className="space-y-8">
                  {TIMELINE.map((item, i) => (
                    <div key={i} className="flex gap-6">
                      <div className="w-12 h-12 bg-retro-yellow border-4 border-retro-dark flex items-center justify-center font-pixel text-retro-dark text-xs shrink-0 z-10">
                        {item.icon}
                      </div>
                      <div className="retro-card flex-1 py-4">
                        <div className="flex justify-between items-start mb-1">
                          <h3 className="font-pixel text-retro-dark text-xs">{item.title}</h3>
                          <span className="retro-badge">{item.year}</span>
                        </div>
                        <p className="font-mono-r text-retro-brown text-sm">{item.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-4">
              <Link href="/skills" className="retro-btn">VIEW MY SKILLS →</Link>
              <Link href="/contact" className="retro-btn retro-btn-dark">GET IN TOUCH</Link>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}