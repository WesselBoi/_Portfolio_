'use client'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState, useEffect } from 'react'

const navLinks = [
  { label: '[ HOME ]',    href: '/' },
  { label: '[ ABOUT ]',   href: '/about' },
  { label: '[ WORK ]',    href: '/projects' },
  { label: '[ SKILLS ]',  href: '/skills' },
  { label: '[ CONTACT ]', href: '/contact' },
]

export default function Navbar() {
  const pathname = usePathname()
  const [time, setTime] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const update = () =>
      setTime(new Date().toLocaleTimeString('en-US', { hour12: false }))
    update()
    const id = setInterval(update, 1000)
    return () => clearInterval(id)
  }, [])

  return (
    <nav className="sticky top-0 z-50 bg-retro-dark border-b-4 border-retro-yellow">
      {/* Marquee */}
      {/* <div className="bg-retro-yellow py-1 overflow-hidden">
        <span className="inline-block animate-marquee font-pixel text-retro-dark text-xs whitespace-nowrap">
          ★ WELCOME TO MY PORTFOLIO ★ &nbsp;&nbsp; // PIXEL.DEV v1.0 // &nbsp;&nbsp;
          ★ AVAILABLE FOR HIRE ★ &nbsp;&nbsp; // OPEN SOURCE LOVER // &nbsp;&nbsp;
          ★ WELCOME TO MY PORTFOLIO ★ &nbsp;&nbsp; // PIXEL.DEV v1.0 //
        </span>
      </div> */}

      <div className="max-w-6xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="font-pixel text-retro-yellow text-sm hover:text-retro-amber transition-colors glitch" data-text="PX.DEV">
            PX.DEV
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                className={`font-pixel text-xs px-3 py-2 transition-all ${
                  pathname === href
                    ? 'bg-retro-yellow text-retro-dark'
                    : 'text-retro-yellow hover:bg-retro-brown'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>

          {/* Clock */}
          <div className="hidden md:block font-mono-r text-retro-yellow text-sm border border-retro-yellow px-3 py-1">
            <span className="text-retro-amber">SYS:</span> {time}
          </div>

          {/* Mobile menu toggle */}
          <button
            className="md:hidden font-pixel text-retro-yellow text-xs"
            onClick={() => setMenuOpen(!menuOpen)}
          >
            {menuOpen ? '[ X ]' : '[ ≡ ]'}
          </button>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="md:hidden pb-4 border-t border-retro-brown">
            {navLinks.map(({ label, href }) => (
              <Link
                key={href}
                href={href}
                onClick={() => setMenuOpen(false)}
                className={`block font-pixel text-xs py-3 px-2 border-b border-retro-brown ${
                  pathname === href
                    ? 'text-retro-yellow bg-retro-brown'
                    : 'text-retro-amber hover:bg-retro-brown'
                }`}
              >
                {label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  )
}