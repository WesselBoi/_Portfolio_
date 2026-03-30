import fs from 'fs'
import path from 'path'

export async function GET() {
  try {
    const filePath = path.join(process.cwd(), 'public', 'resume.pdf')

    if (!fs.existsSync(filePath)) {
      return new Response('Resume not found', { status: 404 })
    }

    const fileBuffer = fs.readFileSync(filePath)

    return new Response(fileBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Length': fileBuffer.length,
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0',
      },
    })
  } catch (error) {
    console.error('Resume download error:', error)
    return new Response('Error retrieving resume', { status: 500 })
  }
}
