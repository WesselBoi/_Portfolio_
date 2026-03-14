import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="bg-retro-dark border-t-4 border-retro-yellow mt-0">
      <div className="max-w-6xl mx-auto px-4 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-pixel text-retro-yellow text-sm mb-4">PX.DEV</h3>
            <p className="font-mono-r text-retro-amber text-sm leading-relaxed">
              &gt; A retro-styled developer portfolio.<br />
              &gt; Building digital experiences<br />
              &gt; one pixel at a time.
            </p>
          </div>
          <div>
            <h3 className="font-pixel text-retro-yellow text-xs mb-4">// NAVIGATION</h3>
            <div className="flex flex-col gap-2">
              {[['/', 'Home'], ['/about', 'About'], ['/projects', 'Projects'], ['/skills', 'Skills'], ['/contact', 'Contact']].map(([href, label]) => (
                <Link key={href} href={href} className="font-mono-r text-retro-amber hover:text-retro-yellow text-sm transition-colors">
                  &gt; {label}
                </Link>
              ))}
            </div>
          </div>
          <div>
            <h3 className="font-pixel text-retro-yellow text-xs mb-4">// SYSTEM STATUS</h3>
            <div className="space-y-2 font-mono-r text-sm">
              {[['AVAILABLE','YES'],['COFFEE','FULL'],['BUGS','0 KNOWN'],['STATUS','ONLINE']].map(([k,v]) => (
                <div key={k} className="flex justify-between">
                  <span className="text-retro-amber">{k}:</span>
                  <span className="text-green-400">{v}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
        <div className="border-t border-retro-brown mt-8 pt-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-pixel text-retro-brown text-xs">© 2025 PIXEL.DEV — ALL RIGHTS RESERVED</p>
          <div className="flex gap-4">
            {['GITHUB','TWITTER','LINKEDIN'].map(s => (
              <a key={s} href="#" className="font-pixel text-retro-brown hover:text-retro-yellow text-xs transition-colors">{s}</a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}