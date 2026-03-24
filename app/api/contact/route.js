import nodemailer from 'nodemailer'

const WINDOW_MS = 10 * 60 * 1000
const BLOCK_MS = 10 * 60 * 1000
const MAX_EMAILS_PER_WINDOW = 2

const rateLimitStore = globalThis.__contactRateLimitStore || new Map()
globalThis.__contactRateLimitStore = rateLimitStore

function getClientIp(request) {
  const forwarded = request.headers.get('x-forwarded-for')
  if (forwarded) {
    return forwarded.split(',')[0].trim()
  }

  return request.headers.get('x-real-ip') || 'unknown'
}

function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
}

export async function POST(request) {
  try {
    const ip = getClientIp(request)
    const now = Date.now()
    const existing = rateLimitStore.get(ip) || { timestamps: [], blockedUntil: 0 }

    if (existing.blockedUntil > now) {
      const retryAfterSeconds = Math.ceil((existing.blockedUntil - now) / 1000)
      return Response.json(
        {
          error: 'Too many email attempts. Try again in a few minutes.',
          retryAfter: retryAfterSeconds,
        },
        { status: 429 }
      )
    }

    const validTimestamps = existing.timestamps.filter((ts) => now - ts < WINDOW_MS)
    if (validTimestamps.length >= MAX_EMAILS_PER_WINDOW) {
      const blockedUntil = now + BLOCK_MS
      rateLimitStore.set(ip, { timestamps: validTimestamps, blockedUntil })
      return Response.json(
        {
          error: 'Rate limit reached. You can send 2 emails per 10 minutes.',
          retryAfter: Math.ceil(BLOCK_MS / 1000),
        },
        { status: 429 }
      )
    }

    const body = await request.json()
    const name = (body?.name || '').trim()
    const email = (body?.email || '').trim()
    const subject = (body?.subject || '').trim()
    const message = (body?.message || '').trim()

    if (!name || !email || !subject || !message) {
      return Response.json({ error: 'All fields are required.' }, { status: 400 })
    }

    if (!isValidEmail(email)) {
      return Response.json({ error: 'Invalid email address.' }, { status: 400 })
    }

    if (message.length > 5000) {
      return Response.json({ error: 'Message is too long.' }, { status: 400 })
    }

    const smtpHost = process.env.SMTP_HOST
    const smtpPort = Number(process.env.SMTP_PORT || '587')
    const smtpUser = process.env.SMTP_USER
    const smtpPass = process.env.SMTP_PASS
    const smtpFrom = process.env.SMTP_FROM || smtpUser
    const contactTo = process.env.CONTACT_TO_EMAIL || smtpUser

    if (!smtpHost || !smtpUser || !smtpPass || !contactTo || !smtpFrom) {
      return Response.json(
        {
          error: 'Email service is not configured yet. Add SMTP environment variables.',
        },
        { status: 500 }
      )
    }

    const transporter = nodemailer.createTransport({
      host: smtpHost,
      port: smtpPort,
      secure: smtpPort === 465,
      auth: {
        user: smtpUser,
        pass: smtpPass,
      },
    })

    await transporter.sendMail({
      from: smtpFrom,
      to: contactTo,
      replyTo: email,
      subject: `[Portfolio] ${subject}`,
      text: `Name: ${name}\nEmail: ${email}\nSubject: ${subject}\n\nMessage:\n${message}`,
    })

    rateLimitStore.set(ip, {
      timestamps: [...validTimestamps, now],
      blockedUntil: 0,
    })

    return Response.json({ ok: true })
  } catch (error) {
    console.error('Contact API error:', error)
    return Response.json({ error: 'Failed to send message. Please try again.' }, { status: 500 })
  }
}
