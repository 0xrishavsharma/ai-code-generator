"use client"
import { signOut, useSession } from "next-auth/react"
import ChatContent from "./chat-content"
import ChatList from "./chat-list"
import Link from "next/link"
import AuthButton from "./auth-button"
import Image from "next/image"
import { useState } from "react"
import { IoSettingsOutline } from "react-icons/io5"
import { IoIosLogOut } from "react-icons/io"
import useRequireAuth from "@/hooks/useRequireAuth"

export default function Page({ params }: { params: { chatId?: string[] } }) {
  const chatId = params.chatId?.[0]
  const { session, status } = useRequireAuth()
  const [isSettingModalOpen, setIsSettingModalOpen] = useState(false)

  return (
    <div className="flex w-full h-full">
      <div className="w-80 border-neutral-300 dark:border-neutral-700 flex flex-col justify-between h-full max-h-full p-8 overflow-auto border-r-2">
        <ChatList />
        <AuthButton />
      </div>
      <div className="flex flex-col flex-1 h-full relative">
        <ChatContent />
        <div className="">
          <div className="absolute  items-center justify-center top-8 right-8 rounded-full bg-gray-300 shadow-2xl cursor-pointer">
            {session?.user?.image ? (
              <Image
                src={session.user.image}
                onClick={() => setIsSettingModalOpen(!isSettingModalOpen)}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
                width={50}
                height={50}
              />
            ) : (
              <Image
                src="/img/default-avatar.png"
                onClick={() => setIsSettingModalOpen(!isSettingModalOpen)}
                alt="User Avatar"
                className="w-10 h-10 rounded-full"
                width={50}
                height={50}
              />
            )}
            {isSettingModalOpen && (
              <div className="absolute flex flex-col top-10 right-4 bg-white dark:bg-neutral-600 text-gray-400  rounded-md shadow-lg text-sm w-36">
                {session?.user && (
                  <button
                    onClick={() => signOut()}
                    className="flex gap-4 items-center p-3 hover:bg-neutral-700 w-full rounded-md"
                  >
                    <IoIosLogOut />
                    Sign Out
                  </button>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
