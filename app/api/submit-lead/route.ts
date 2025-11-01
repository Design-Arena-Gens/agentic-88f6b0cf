import { NextRequest, NextResponse } from 'next/server'

const services = [
  { id: 1, name: 'AI Calling Agent' },
  { id: 2, name: 'Game Development' },
  { id: 3, name: 'Mobile App Development' },
  { id: 4, name: 'Full-Stack Web Development' },
  { id: 5, name: 'Cybersecurity Solutions' },
  { id: 6, name: 'Robotic Process Automation' },
  { id: 7, name: 'Cloud Computing Solutions' },
  { id: 8, name: 'AI & ML Development' },
  { id: 9, name: 'Data Analytics & BI' },
  { id: 10, name: 'IoT Development' },
  { id: 11, name: 'VR/AR Solutions' },
  { id: 12, name: 'Blockchain Development' },
  { id: 13, name: 'AI Chatbot Development' },
  { id: 14, name: 'UX/UI Design' },
  { id: 15, name: 'Business Automation' },
]

// In-memory storage for leads (for demo purposes)
const leads: any[] = []

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, company, phone, services: selectedServices, message } = body

    if (!name || !email) {
      return NextResponse.json(
        { error: 'Name and email are required' },
        { status: 400 }
      )
    }

    const selectedServiceNames = selectedServices
      .map((id: number) => services.find(s => s.id === id)?.name)
      .filter(Boolean)

    const lead = {
      id: Date.now(),
      name,
      email,
      company: company || 'N/A',
      phone: phone || 'N/A',
      services: selectedServiceNames,
      message: message || 'N/A',
      timestamp: new Date().toISOString(),
    }

    leads.push(lead)

    // Email content
    const emailContent = `
New Lead Received from Alfox.ai

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Contact Information:
→ Name: ${name}
→ Email: ${email}
→ Company: ${company || 'Not provided'}
→ Phone: ${phone || 'Not provided'}

Services Interested In:
${selectedServiceNames.length > 0
  ? selectedServiceNames.map((s: string) => `  • ${s}`).join('\n')
  : '  • No specific services selected'
}

Project Details:
${message || 'No additional details provided'}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━

Timestamp: ${new Date().toLocaleString()}
Lead ID: ${lead.id}

━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
    `.trim()

    // Send email using a webhook or service
    try {
      // For demo: Using a simple email service API
      // In production, use services like SendGrid, AWS SES, or Resend
      const emailApiUrl = process.env.EMAIL_WEBHOOK_URL || 'https://formsubmit.co/ajax/' + (process.env.EMAIL_TO || 'demo@alfox.ai')

      // Attempt to send email
      if (process.env.EMAIL_WEBHOOK_URL) {
        await fetch(emailApiUrl, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            subject: `New Lead: ${name} - ${selectedServiceNames.length} service(s)`,
            text: emailContent,
            from: 'leads@alfox.ai',
            to: process.env.EMAIL_TO || 'demo@alfox.ai',
          }),
        })
      }
    } catch (emailError) {
      console.error('Email sending failed:', emailError)
      // Continue even if email fails - lead is still stored
    }

    // Log lead to console (for demo/debugging)
    console.log('New Lead Received:')
    console.log(emailContent)

    return NextResponse.json(
      {
        success: true,
        message: 'Lead submitted successfully',
        leadId: lead.id
      },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error processing lead:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  // Simple admin endpoint to view leads (protect this in production!)
  const authHeader = request.headers.get('authorization')
  const adminToken = process.env.ADMIN_TOKEN || 'demo-admin-token'

  if (authHeader !== `Bearer ${adminToken}`) {
    return NextResponse.json(
      { error: 'Unauthorized' },
      { status: 401 }
    )
  }

  return NextResponse.json({
    total: leads.length,
    leads: leads.sort((a, b) => b.id - a.id),
  })
}
