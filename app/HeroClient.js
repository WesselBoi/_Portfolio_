'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const COMMANDS = {
  help: {
    output: () => [
      { text: 'Available commands:', color: 'text-retro-yellow' },
      { text: '  skills   — view my tech stack', color: 'text-retro-cream' },
      { text: '  projects — browse my work', color: 'text-retro-cream' },
      { text: '  about    — learn about me', color: 'text-retro-cream' },
      { text: '  contact  — get in touch', color: 'text-retro-cream' },
    ],
  },
  skills: {
    navigate: '/skills',
    output: () => [
      { text: 'Loading skills...', color: 'text-green-400' },
      { text: 'Redirecting to /skills ↗', color: 'text-retro-amber' },
    ],
  },
  projects: {
    navigate: '/projects',
    output: () => [
      { text: 'Loading projects...', color: 'text-green-400' },
      { text: 'Redirecting to /projects ↗', color: 'text-retro-amber' },
    ],
  },
  about: {
    navigate: '/about',
    output: () => [
      { text: 'Loading about page...', color: 'text-green-400' },
      { text: 'Redirecting to /about ↗', color: 'text-retro-amber' },
    ],
  },
  contact: {
    navigate: '/contact',
    output: () => [
      { text: 'Loading contact page...', color: 'text-green-400' },
      { text: 'Redirecting to /contact ↗', color: 'text-retro-amber' },
    ],
  },
}

function InteractiveTerminal() {
  const [input, setInput] = useState('')
  const [history, setHistory] = useState([
    { type: 'output', lines: [
      { text: 'Welcome! Type help for available commands.', color: 'text-retro-amber' },
    ]},
  ])
  const containerRef = useRef(null)
  const inputRef = useRef(null)

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight
    }
  }, [history])

  function handleSubmit(e) {
    e.preventDefault()
    const cmd = input.trim().toLowerCase()
    if (!cmd) return

    const entry = [{ type: 'command', text: cmd }]
    const def = COMMANDS[cmd]

    if (def) {
      entry.push({ type: 'output', lines: def.output() })
      setHistory(h => [...h, ...entry])
      if (def.navigate) {
        setTimeout(() => { window.location.href = def.navigate }, 800)
      }
    } else {
      entry.push({ type: 'output', lines: [
        { text: `Command not found: "${cmd}"`, color: 'text-red-400' },
        { text: 'Type help to see available commands.', color: 'text-retro-cream' },
      ]})
      setHistory(h => [...h, ...entry])
    }

    setInput('')
  }

  return (
    <div
      ref={containerRef}
      className="bg-retro-dark p-6 font-mono-r text-sm leading-loose h-72 overflow-y-auto cursor-text"
      onClick={() => inputRef.current?.focus()}
    >
      {history.map((item, i) =>
        item.type === 'command' ? (
          <p key={i}>
            <span className="text-green-400">~/portfolio</span>{' '}
            <span className="text-retro-yellow">$</span>{' '}
            <span className="text-retro-cream">{item.text}</span>
          </p>
        ) : (
          item.lines.map((line, j) => (
            <p key={`${i}-${j}`} className={`ml-4 ${line.color}`}>{line.text}</p>
          ))
        )
      )}
      <form onSubmit={handleSubmit} className="flex items-center gap-1 mt-1">
        <span className="text-green-400 shrink-0">~/portfolio</span>
        <span className="text-retro-yellow shrink-0">$</span>
        <input
          ref={inputRef}
          value={input}
          onChange={e => setInput(e.target.value)}
          className="bg-transparent outline-none text-retro-cream caret-retro-yellow flex-1 min-w-0"
          spellCheck={false}
          autoComplete="off"
          aria-label="terminal input"
        />
      </form>
    </div>
  )
}

const TYPED_TEXTS = ['FULL-STACK DEVELOPER','UI/UX ENTHUSIAST','AI/ML EXPLORER']

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
              <h1 className="font-pixel text-retro-yellow text-2xl md:text-4xl leading-relaxed mb-4" data-text="ALEX PIXEL">
                SAKSHAM MATHUR
              </h1>
              <div className="mb-8 h-8 flex items-center"><TypedText /></div>
              <p className="font-mono-r text-retro-amber text-base leading-relaxed mb-10 max-w-lg">
                &gt; CS undergrad turning caffeine into code.<br />
                &gt; Passionate about full-stack dev and AI/ML.<br />
                &gt; Based in India, open to remote opportunities.
              </p>
              <div className='flex'>
                <div className="flex flex-wrap gap-4">
                  <Link href="/projects" className="retro-btn">VIEW PROJECTS</Link>
                </div>
                <div className="flex flex-wrap gap-4">
                  <Link href="/skills" className="retro-btn">&nbsp;VIEW Skills&nbsp;</Link>
                </div>
              </div>
            </div>

            {/* Terminal */}
            <div className="retro-window hidden lg:block native-cursor-zone" data-native-cursor>
              <div className="retro-window-bar">
                <span>terminal — portfolio.sh</span>
                <div><span className="retro-window-dot" /><span className="retro-window-dot" /><span className="retro-window-dot" /></div>
              </div>
              <InteractiveTerminal />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}