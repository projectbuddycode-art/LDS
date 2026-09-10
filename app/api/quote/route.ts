import { NextResponse } from 'next/server'
import fs from 'fs'
import path from 'path'
import nodemailer from 'nodemailer'

// Centralized verified LDS notification email recipients
const DEFAULT_LDS_EMAILS = 'lukhdatar_sons@rediffmail.com, lukhdatar6sons@gmail.com'
const NOTIFICATION_EMAIL = process.env.LDS_NOTIFICATION_EMAIL || process.env.LDS_TEAM_EMAIL || DEFAULT_LDS_EMAILS

interface LeadData {
  name: string
  company?: string
  phone: string
  email: string
  projectType?: string
  location?: string
  requirement: string
  message?: string
  source?: string
  conversationSummary?: string
  conversationLog?: string[]
}

export async function POST(request: Request) {
  try {
    const body: LeadData = await request.json()

    // 1. Validation
    if (!body.name || !body.name.trim()) {
      return NextResponse.json({ error: 'Full name is required' }, { status: 400 })
    }
    if (!body.phone || !body.phone.trim()) {
      return NextResponse.json({ error: 'Phone number is required' }, { status: 400 })
    }
    if (!body.email || !body.email.trim()) {
      return NextResponse.json({ error: 'Email address is required' }, { status: 400 })
    }
    if (!body.requirement || !body.requirement.trim()) {
      return NextResponse.json({ error: 'Project requirement details are required' }, { status: 400 })
    }

    const timestamp = new Date().toISOString()
    const leadId = `LDS-${Date.now()}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`
    const source = body.source || 'Website Quote Form'

    const leadRecord = {
      id: leadId,
      name: body.name.trim(),
      company: body.company?.trim() || 'N/A',
      phone: body.phone.trim(),
      email: body.email.trim(),
      projectType: body.projectType || 'General Electrical Work',
      location: body.location?.trim() || 'N/A',
      requirement: body.requirement.trim(),
      message: body.message?.trim() || 'N/A',
      source,
      conversationSummary: body.conversationSummary || undefined,
      conversationLog: body.conversationLog || undefined,
      timestamp,
      status: 'NEW',
    }

    // 2. Persist Lead to Database / Storage File
    try {
      const dataDir = path.join(process.cwd(), 'data')
      if (!fs.existsSync(dataDir)) {
        fs.mkdirSync(dataDir, { recursive: true })
      }
      const leadsFile = path.join(dataDir, 'leads.json')
      let leads: any[] = []
      if (fs.existsSync(leadsFile)) {
        const fileContent = fs.readFileSync(leadsFile, 'utf-8')
        try {
          leads = JSON.parse(fileContent)
          if (!Array.isArray(leads)) leads = []
        } catch {
          leads = []
        }
      }
      leads.unshift(leadRecord)
      fs.writeFileSync(leadsFile, JSON.stringify(leads, null, 2), 'utf-8')
    } catch (saveErr) {
      console.error('[LDS Lead Store Error]:', saveErr)
    }

    // 3. Format Lead Email Notification
    const isBot = source.toLowerCase().includes('bot')
    const emailSubject = isBot ? 'New LDS Lead — Ask LDS Bot' : 'New LDS Website Quote Request'

    const emailBodyText = isBot
      ? `NEW LDS WEBSITE LEAD\n\nSource:\n${source}\n\nName:\n${leadRecord.name}\nCompany:\n${leadRecord.company}\nPhone:\n${leadRecord.phone}\nEmail:\n${leadRecord.email}\n\nProject Type:\n${leadRecord.projectType}\nProject Location:\n${leadRecord.location}\n\nRequirement:\n${leadRecord.requirement}\n\nConversation Summary:\n${leadRecord.conversationSummary || 'Inquiry submitted via Ask LDS Bot'}\n\nSubmitted:\n${timestamp}`
      : `New Quote Request\n\nName:\n${leadRecord.name}\nCompany:\n${leadRecord.company}\nPhone:\n${leadRecord.phone}\nEmail:\n${leadRecord.email}\nProject Type:\n${leadRecord.projectType}\nProject Location:\n${leadRecord.location}\nRequirement:\n${leadRecord.requirement}\nMessage:\n${leadRecord.message}\n\nSource:\n${source}\n\nSubmission Time:\n${timestamp}`

    // 4. Send Email to LDS Team
    if (process.env.SMTP_HOST && process.env.SMTP_USER) {
      try {
        const transporter = nodemailer.createTransport({
          host: process.env.SMTP_HOST,
          port: Number(process.env.SMTP_PORT) || 587,
          secure: Number(process.env.SMTP_PORT) === 465,
          auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
          },
        })

        await transporter.sendMail({
          from: process.env.SMTP_FROM || `"LDS Website Notification" <${process.env.SMTP_USER}>`,
          to: NOTIFICATION_EMAIL,
          subject: emailSubject,
          text: emailBodyText,
        })
        console.log(`[LDS Email Sent Successfully] To: ${NOTIFICATION_EMAIL}, Subject: ${emailSubject}`)
      } catch (mailErr) {
        console.error('[LDS Email Dispatch Failed]:', mailErr)
      }
    } else {
      // Local development or unconfigured SMTP: log notification clearly
      console.log(`\n==================================================\n[LDS TEAM EMAIL NOTIFICATION SIMULATION]\nTO: ${NOTIFICATION_EMAIL}\nSUBJECT: ${emailSubject}\n\n${emailBodyText}\n==================================================\n`)
    }

    return NextResponse.json({
      success: true,
      message: 'Enquiry received successfully by LDS team.',
      leadId: leadRecord.id,
      timestamp: leadRecord.timestamp,
    })
  } catch (error: any) {
    console.error('[LDS Quote API Error]:', error)
    return NextResponse.json(
      { error: 'Failed to process quotation request. Please try again or contact LDS directly.' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const leadsFile = path.join(process.cwd(), 'data', 'leads.json')
    if (fs.existsSync(leadsFile)) {
      const data = fs.readFileSync(leadsFile, 'utf-8')
      const leads = JSON.parse(data)
      return NextResponse.json({ leads })
    }
    return NextResponse.json({ leads: [] })
  } catch (err) {
    return NextResponse.json({ leads: [] })
  }
}
