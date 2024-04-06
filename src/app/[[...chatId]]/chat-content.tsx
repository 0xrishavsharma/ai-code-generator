"use client";

import ChatInput from "@/components/chat-input";

export default function ChatContent() {
    const handleSubmit = async (value: string, file?: File) => {
        const res = fetch("/api/message", {
            method: "POST",
            body: JSON.stringify({ content: value }),
            headers: {
                "Content-Type": "application/json",
            },
        });
        console.log("submit", res);
    };
    return (
        <>
            <div className='max-w-4xl w-full mx-auto flex-1 px-10 py-5 overflow-x-hidden overflow-y-auto'>
                AI Content goes here
            </div>
            <ChatInput onSubmit={handleSubmit} />
        </>
    );
}
