import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { cn } from "@/lib/utils"
import { Provider } from "react-redux"
import { store } from "@/state/store"

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
        <Provider store={store}>{children}</Provider>
      </body>
    </html>
  )
}
