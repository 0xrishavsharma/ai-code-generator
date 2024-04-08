"use client"

import ChatInput from "@/components/chat-input"
import { useState } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { duotoneDark as dark } from "react-syntax-highlighter/dist/esm/styles/prism"

export default function ChatContent() {
  const [assistantResponse, setAssistantResponse] = useState("")
  const handleSubmit = async (value: string, file?: File) => {
    console.log(
      value ? "Question asked: " : "",
      file ? "File Uploaded: " : "",
      value,
      file ? file : ""
    )
    const res = await fetch("/api/message", {
      method: "POST",
      body: JSON.stringify({ content: value }),
      headers: {
        "Content-Type": "application/json",
      },
    })
    if (!res.ok || !res.body) {
      console.error("Error:", res.status, res.statusText, await res.text())
      return
    }
    const reader = res.body.getReader()

    // created this loop to read the stream until we get "true" in the done property
    const decoder = new TextDecoder()
    let finalText = ""

    while (true) {
      const { done, value } = await reader.read()

      // Since the value we'll get while reading the steam is in binary, we need to convert it into text
      const decodedText = decoder.decode(value, { stream: !done })
      setAssistantResponse((prevStreamedRes) => prevStreamedRes + decodedText)

      if (done) {
        break
      }
    }
  }
  return (
    <>
      <div className="max-w-4xl w-full mx-auto flex-1 px-10 py-5 overflow-x-hidden overflow-y-auto prose dark:prose-invert">
        <Markdown
          remarkPlugins={[remarkGfm]}
          components={{
            code(props) {
              const { children, className, node, ...rest } = props
              const match = /language-(\w+)/.exec(className || "")
              return match ? (
                <SyntaxHighlighter
                  PreTag="div"
                  language={match[1]}
                  style={dark}
                  wrapLines
                  wrapLongLines
                >
                  {String(children).replace(/\n$/, "")}
                </SyntaxHighlighter>
              ) : (
                <code {...rest} className={className}>
                  {children}
                </code>
              )
            },
          }}
        >
          {assistantResponse}
        </Markdown>
      </div>
      <ChatInput onSubmit={handleSubmit} />
    </>
  )
}
