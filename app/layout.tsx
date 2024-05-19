import "./globals.css"

import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from "geist/font/sans"

const defaultUrl = process.env.VERCEL_URL
  ? `https://${process.env.VERCEL_URL}`
  : "http://localhost:3000"

export const metadata = {
  metadataBase: new URL(defaultUrl),
  title: "OpenFING",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={GeistSans.className}>
      <body className="bg-background text-foreground">
        <main className="flex min-h-screen flex-col">
          {children}
          <Analytics />
        </main>
      </body>
    </html>
  )
}
