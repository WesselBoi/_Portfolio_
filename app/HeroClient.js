'use client'
import Link from 'next/link'
import { useState, useEffect, useRef } from 'react'

const FILE_TREE = {
  about: ['bio.txt', 'experience.txt', 'education.txt'],
  skills: ['frontend.txt', 'backend.txt', 'tools.txt'],
  projects: ['featured.txt', 'web-apps.txt', 'experiments.txt'],
  contact: ['email.txt', 'socials.txt', 'availability.txt'],
}

const FILE_CONTENTS = {
  about: {
    'bio.txt': [
      'Saksham Mathur - Full-stack developer and CS undergrad.',
      'Interested in building reliable products with thoughtful UX.',
    ],
    'experience.txt': [
      '- Built multiple end-to-end web projects using Next.js and Node.js.',
      '- Worked on APIs, authentication, and data-driven interfaces.',
      '- Exploring applied AI/ML through practical side projects.',
    ],
    'education.txt': [
      'Computer Science Undergraduate',
      'Focus: software engineering, full-stack systems, and AI fundamentals.',
    ],
  },
  skills: {
    'frontend.txt': [
      'React, Next.js, Tailwind CSS, JavaScript, TypeScript',
      'Focus on responsive UI and clean component architecture.',
    ],
    'backend.txt': [
      'Node.js, Express, Python, FastAPI, REST API design',
      'Comfortable with authentication, validation, and database integration.',
    ],
    'tools.txt': [
      'Git, Docker, Postman, VS Code, Vercel',
      'Workflow focused on iteration, versioning, and reliable deployments.',
    ],
  },
  projects: {
    'featured.txt': [
      'Retro OS - Browser OS simulation with terminal-like interactions.',
      'Pixel Shop - Full-stack commerce workflow project.',
      'Chiptune API - Backend-focused service experimentation.',
    ],
    'web-apps.txt': [
      '- UI-heavy full-stack projects with reusable component systems.',
      '- Strong emphasis on readability and performance.',
    ],
    'experiments.txt': [
      '- AI/ML mini projects for recommendations and predictions.',
      '- Creative coding and retro interaction prototypes.',
    ],
  },
  contact: {
    'email.txt': [
      'hello@saksham.dev',
      'Expected response time: under 24 hours.',
    ],
    'socials.txt': [
      'GitHub: github.com/wesselboi',
      'LinkedIn: linkedin.com/in/saksham',
    ],
    'availability.txt': [
      'Open to internships and entry-level full-stack roles.',
      'Remote-friendly and available for collaborative projects.',
    ],
  },
}

const ROOT_FOLDERS = Object.keys(FILE_TREE)

function formatPath(parts) {
  if (parts.length === 0) return '~/portfolio'
  return `~/portfolio/${parts.join('/')}`
}

function InteractiveTerminal() {
  const [input, setInput] = useState('')
  const [cwd, setCwd] = useState([])
  const [history, setHistory] = useState([
    {
      type: 'output',
      lines: [
        { text: 'Type help to see available commands.', color: 'text-retro-cream' },
        { text: 'Type ls to see available directories.', color: 'text-retro-cream' },
      ],
    },
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
    const raw = input.trim()
    if (!raw) return

    const tokens = raw.split(/\s+/)
    const command = tokens[0].toLowerCase()
    const args = tokens.slice(1)
    const output = []

    if (command === 'help') {
      output.push({ text: 'Available commands:', color: 'text-retro-yellow' })
      output.push({ text: '  ls         --   list files/folders in current directory', color: 'text-retro-cream' })
      output.push({ text: '  cd <dir>   --   enter a category (about, skills, projects, contact)', color: 'text-retro-cream' })
      output.push({ text: '  cat <file> --   print file content in current directory', color: 'text-retro-cream' })
      output.push({ text: '  pwd        --   print current path', color: 'text-retro-cream' })
      output.push({ text: '  clear      --   clear terminal output', color: 'text-retro-cream' })
    } else if (command === 'ls') {
      if (cwd.length === 0) {
        ROOT_FOLDERS.forEach((folder) => {
          output.push({ text: `${folder}/`, color: 'text-green-400' })
        })
      } else {
        const folder = cwd[0]
        FILE_TREE[folder].forEach((file) => {
          output.push({ text: file, color: 'text-retro-cream' })
        })
      }
    } else if (command === 'cd') {
      const target = args[0]

      if (!target) {
        output.push({ text: 'Usage: cd <directory>', color: 'text-red-400' })
      } else if (target === '/' || target === '~') {
        setCwd([])
      } else if (target === '..') {
        setCwd((prev) => prev.slice(0, -1))
      } else if (ROOT_FOLDERS.includes(target)) {
        setCwd([target])
      } else {
        output.push({ text: `cd: no such directory: ${target}`, color: 'text-red-400' })
      }
    } else if (command === 'cat') {
      const file = args[0]

      if (!file) {
        output.push({ text: 'Usage: cat <file>', color: 'text-red-400' })
      } else if (cwd.length === 0) {
        output.push({ text: 'cat: open a category first using cd <directory>', color: 'text-red-400' })
      } else {
        const folder = cwd[0]
        const files = FILE_TREE[folder]

        if (!files.includes(file)) {
          output.push({ text: `cat: ${file}: No such file`, color: 'text-red-400' })
        } else {
          const lines = FILE_CONTENTS[folder][file] || ['(empty file)']
          lines.forEach((line) => {
            output.push({ text: line, color: 'text-retro-cream' })
          })
        }
      }
    } else if (command === 'pwd') {
      output.push({ text: formatPath(cwd), color: 'text-retro-amber' })
    } else if (command === 'clear') {
      setHistory([])
      setInput('')
      return
    } else {
      output.push({ text: `Command not found: "${command}"`, color: 'text-red-400' })
      output.push({ text: 'Type help to see available commands.', color: 'text-retro-cream' })
    }

    const entry = [{ type: 'command', text: raw, path: formatPath(cwd) }]
    if (output.length > 0) {
      entry.push({ type: 'output', lines: output })
    }
    setHistory((h) => [...h, ...entry])

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
            <span className="text-green-400">{item.path}</span>{' '}
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
        <span className="text-green-400 shrink-0">{formatPath(cwd)}</span>
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
                &gt; Full-stack dev and AI/ML.<br />
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