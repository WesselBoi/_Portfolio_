import Link from 'next/link'

export default function NotFound() {
  return (
    <div className="min-h-[70vh] flex items-center justify-center px-4 bg-retro-dark">
      <div className="text-center">
        <div className="font-pixel text-retro-yellow text-8xl mb-6 glitch" data-text="404">404</div>
        <div className="pixel-divider mb-6" />
        <h1 className="font-pixel text-retro-yellow text-xl mb-4">PAGE NOT FOUND</h1>
        <p className="font-mono-r text-retro-amber text-base mb-10">
          &gt; ERROR: The requested file does not exist.<br />
          &gt; Check the path and try again.
        </p>
        <Link href="/" className="retro-btn">← RETURN HOME</Link>
      </div>
    </div>
  )
}