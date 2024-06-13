"use client"
import { signOut, useSession } from "next-auth/react"
import ChatContent from "./chat-content"
import ChatList from "./chat-list"
import Link from "next/link"
import AuthButton from "./auth-button"

export default function Page({ params }: { params: { chatId?: string[] } }) {
  const chatId = params.chatId?.[0]

  return (
    <div className="flex w-full h-full">
      <div className="w-80 border-neutral-300 dark:border-neutral-700 flex flex-col justify-between h-full max-h-full p-8 overflow-auto border-r-2">
        <ChatList />
        <AuthButton />
      </div>
      <div className="flex flex-col flex-1 h-full">
        <ChatContent />
      </div>
    </div>
  )
}
