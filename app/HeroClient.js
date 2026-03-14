'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'

const TYPED_TEXTS = ['FULL-STACK DEVELOPER','UI/UX ENTHUSIAST','PIXEL CRAFTSMAN','OPEN SOURCE LOVER']

function TypedText() {
  const [textIdx, setTextIdx] = useState(0)
  const [displayed, setDisplayed] = useState('')
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    const target = TYPED_TEXTS[textIdx]
    let t
    if (!deleting && displayed.length < target.length)
      t = setTimeout(() => setDisplayed(target.slice(0, displayed.length + 1)), 80)
    else if (!deleting && displayed.length === target.length)
      t = setTimeout(() => setDeleting(true), 1800)
    else if (deleting && displayed.length > 0)
      t = setTimeout(() => setDisplayed(displayed.slice(0, -1)), 40)
    else {
      t = setTimeout(() => {
        setDeleting(false);
        setTextIdx((textIdx + 1) % TYPED_TEXTS.length);
      }, 200);
    }
    return () => clearTimeout(t)
  }, [displayed, deleting, textIdx])

  return (
    <span className="text-retro-orange font-pixel text-sm md:text-base">
      {displayed}<span className="animate-blink">█</span>
    </span>
  )
}

export default function HeroClient() {

  return (
    <>
      {/* Hero */}
      <section className="bg-retro-dark text-retro-cream py-20 px-4 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage:'linear-gradient(#F5C518 1px,transparent 1px),linear-gradient(90deg,#F5C518 1px,transparent 1px)', backgroundSize:'40px 40px' }} />
        <div className="max-w-6xl mx-auto relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <div className="inline-flex items-center gap-2 border border-green-500 px-3 py-1 mb-6">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                <span className="font-mono-r text-green-400 text-xs">SYSTEM ONLINE // AVAILABLE FOR HIRE</span>
              </div>
              <h1 className="font-pixel text-retro-yellow text-2xl md:text-4xl leading-relaxed mb-4 glitch" data-text="ALEX PIXEL">
                ALEX PIXEL
              </h1>
              <div className="mb-8 h-8 flex items-center"><TypedText /></div>
              <p className="font-mono-r text-retro-amber text-base leading-relaxed mb-10 max-w-lg">
                &gt; Crafting digital experiences with retro soul and modern tech.<br />
                &gt; 5+ years building web apps that users actually love.<br />
                &gt; Based in San Francisco, CA.
              </p>
              <div className="flex flex-wrap gap-4">
                <Link href="/projects" className="retro-btn">VIEW PROJECTS</Link>
                <Link href="/contact" className="retro-btn retro-btn-dark">HIRE ME</Link>
              </div>
            </div>

            {/* Terminal */}
            <div className="retro-window hidden lg:block">
              <div className="retro-window-bar">
                <span>terminal — portfolio.sh</span>
                <div><span className="retro-window-dot" /><span className="retro-window-dot" /><span className="retro-window-dot" /></div>
              </div>
              <div className="bg-retro-dark p-6 font-mono-r text-sm leading-loose">
                <p><span className="text-green-400">~/portfolio</span> <span className="text-retro-yellow">$</span> whoami</p>
                <p className="text-retro-cream ml-4">alex_pixel — Full Stack Developer</p>
                <p className="mt-2"><span className="text-green-400">~/portfolio</span> <span className="text-retro-yellow">$</span> cat skills.txt</p>
                <p className="text-retro-amber ml-4">React, Next.js, Node.js, Python</p>
                <p className="text-retro-amber ml-4">PostgreSQL, MongoDB, Redis</p>
                <p className="text-retro-amber ml-4">Docker, AWS, CI/CD</p>
                <p className="mt-2"><span className="text-green-400">~/portfolio</span> <span className="text-retro-yellow">$</span> echo $STATUS</p>
                <p className="text-green-400 ml-4">OPEN TO WORK ✓</p>
                <p className="mt-2"><span className="text-green-400">~/portfolio</span> <span className="text-retro-yellow">$</span> <span className="animate-blink">█</span></p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}