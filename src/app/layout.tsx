// src/app/layout.tsx
import "./globals.css"
import type { Metadata } from "next"
import type { ReactNode } from "react"
import { Toaster } from "@/components/ui/sonner"

export const metadata: Metadata = {
  title: "FUSAF — Федерація української спортивної аеробіки",
  description: "Офіційний сайт Федерації української спортивної аеробіки",
}

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="uk" suppressHydrationWarning>
      <body className="min-h-screen bg-background text-foreground">
        {children}
        <Toaster richColors position="top-right" />
      </body>
    </html>
  )
}
