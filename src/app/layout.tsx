import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { store } from "@/state/store"
import StoreProvider from "@/state/StoreProvider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "CodeGenGPT",
  description: "Your AI coding assistant",
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
          "h-screen bg-white dark:bg-black text-black dark:text-white"
        )}
      >
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  )
}
