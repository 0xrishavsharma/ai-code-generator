import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import StoreProvider from "@/state/StoreProvider"
import { SessionProvider } from "next-auth/react"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "AI Code Generator",
  description: "Your Personal AI Coding Assistant",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          inter.className,
          "h-screen bg-white dark:bg-black text-black dark:text-white",
        )}
      >
        <SessionProvider>
          <StoreProvider>{children}</StoreProvider>
        </SessionProvider>
      </body>
    </html>
  )
}
