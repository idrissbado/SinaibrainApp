import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "BRVM Exchange - Real-Time Stock Trading Platform",
  description:
    "Access real-time BRVM stock prices, advanced analytics, and AI-powered insights for West African markets",
  keywords: "BRVM, stock exchange, West Africa, trading, investment, real-time prices",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
