'use client'
import { useState } from 'react'

export default function Contact() {
  const [form, setForm] = useState({ name:'', email:'', subject:'', message:'' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const socials = [
    {
      name: 'GITHUB',
      handle: 'github.com/wesselboi',
      url: 'https://github.com/wesselboi',
    },
    {
      name: 'LINKEDIN',
      handle: 'linkedin.com/in/saksham-mathur-a416a1323',
      url: 'https://www.linkedin.com/in/saksham-mathur-a416a1323',
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')
    setSending(true)

    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })

      const payload = await response.json()

      if (!response.ok) {
        if (response.status === 429 && payload?.retryAfter) {
          const minutes = Math.ceil(Number(payload.retryAfter) / 60)
          setErrorMessage(`Rate limit active. Try again in about ${minutes} minute(s).`)
        } else {
          setErrorMessage(payload?.error || 'Failed to send message. Please try again.')
        }
        return
      }

      setSent(true)
      setForm({ name:'', email:'', subject:'', message:'' })
    } catch {
      setErrorMessage('Network error. Please try again.')
    } finally {
      setSending(false)
    }
  }

  return (
    <>
      <div className="bg-retro-dark py-16 px-4 border-b-4 border-retro-yellow">
        <div className="max-w-6xl mx-auto">
          <p className="font-mono-r text-retro-amber text-sm mb-2">&gt; send_message --to=saksham</p>
          <h1 className="font-pixel text-retro-yellow text-2xl md:text-3xl">CONTACT</h1>
        </div>
      </div>

      <div className="max-w-8xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          {/* Info */}
          <div className="lg:col-span-2 space-y-6">
            <div className="retro-window">
              <div className="retro-window-bar"><span>contact_info.txt</span></div>
              <div className="p-6 bg-retro-cream space-y-4">
                {[['@ EMAIL','mathur.saksham2005@gmail.com'],['▲ LOCATION','Greater Noida, India'],['◷ TIMEZONE','IST (UTC+5:30)'],['★ AVAILABILITY','Open to work']].map(([l,v]) => (
                  <div key={l}>
                    <div className="font-pixel text-xs text-retro-orange mb-1">{l}</div>
                    <div className="font-mono-r text-retro-dark text-sm">{v}</div>
                    <div className="pixel-divider" />
                  </div>
                ))}
              </div>
            </div>
            <div className="retro-card">
              <h3 className="font-pixel text-retro-dark text-xs mb-4">{'// FIND ME ON'}</h3>
              {socials.map(({ name, handle, url }) => (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noreferrer"
                  className="flex flex-col md:flex-row md:items-center md:justify-between gap-2 p-3 border-2 border-retro-dark hover:bg-retro-yellow transition-colors group mb-2"
                >
                  <span className="font-pixel text-xs text-retro-dark">{name}</span>
                  <span className="font-mono-r text-xs text-retro-brown group-hover:text-retro-dark break-all md:text-right">{handle} ↗</span>
                </a>
              ))}
            </div>
          </div>

          {/* Form */}
          <div className="lg:col-span-3">
            <div className="retro-window">
              <div className="retro-window-bar">
                <span>compose_message.exe</span>
                <div><span className="retro-window-dot" /><span className="retro-window-dot" /><span className="retro-window-dot" /></div>
              </div>
              <div className="p-8 bg-retro-cream native-cursor-zone" data-native-cursor>
                {sent ? (
                  <div className="text-center py-12">
                    <div className="font-pixel text-4xl text-retro-yellow mb-4">✓</div>
                    <h3 className="font-pixel text-retro-dark text-base mb-4">MESSAGE SENT!</h3>
                    <p className="font-mono-r text-retro-brown mb-8">&gt; I&apos;ll reply within 24 hours.</p>
                    <button onClick={() => { setSent(false); setErrorMessage(''); setForm({ name:'',email:'',subject:'',message:'' }) }} className="retro-btn">SEND ANOTHER</button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div>
                        <label className="block font-pixel text-xs text-retro-dark mb-2">NAME *</label>
                        <input required value={form.name} onChange={e => setForm({...form,name:e.target.value})} placeholder="Your name" className="retro-input" />
                      </div>
                      <div>
                        <label className="block font-pixel text-xs text-retro-dark mb-2">EMAIL *</label>
                        <input required type="email" value={form.email} onChange={e => setForm({...form,email:e.target.value})} placeholder="your@email.com" className="retro-input" />
                      </div>
                    </div>
                    <div>
                      <label className="block font-pixel text-xs text-retro-dark mb-2">SUBJECT *</label>
                      <select required value={form.subject} onChange={e => setForm({...form,subject:e.target.value})} className="retro-input">
                        <option value="">Select subject...</option>
                        <option>Job Opportunity</option>
                        <option>Freelance Project</option>
                        <option>Collaboration</option>
                        <option>Other</option>
                      </select>
                    </div>
                    <div>
                      <label className="block font-pixel text-xs text-retro-dark mb-2">MESSAGE *</label>
                      <textarea required rows={6} value={form.message} onChange={e => setForm({...form,message:e.target.value})} placeholder="Tell me about your project..." className="retro-input resize-none" />
                    </div>
                    {errorMessage ? (
                      <p className="font-mono-r text-sm text-red-600 border-2 border-red-600 bg-red-100 px-3 py-2">
                        {errorMessage}
                      </p>
                    ) : null}
                    <button type="submit" disabled={sending} className="retro-btn w-full text-center">
                      {sending ? <span className="flex items-center justify-center gap-2"><span className="animate-blink">█</span> SENDING...</span> : 'SEND MESSAGE ↗'}
                    </button>
                  </form>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}