import "./globals.css"
import "./reset.css"

import { Analytics } from "@vercel/analytics/react"
import { GeistSans } from "geist/font/sans"

import { AutoSignIn } from "@/modules/auth/auto-sign-in"
import { serverEnv } from "@/modules/env/server"

import { Providers } from "./providers"

const defaultUrl = serverEnv.VERCEL_URL
  ? `https://${serverEnv.VERCEL_URL}`
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
          <Providers>
            {children}
            <AutoSignIn />
          </Providers>
          <Analytics />
        </main>
      </body>
    </html>
  )
}
