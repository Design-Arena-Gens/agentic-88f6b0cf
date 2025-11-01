import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Alfox.ai - Next-Gen Technology Solutions',
  description: 'Leading provider of AI, Web Development, Cybersecurity, IoT, VR/AR, Blockchain, and Business Automation solutions',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
