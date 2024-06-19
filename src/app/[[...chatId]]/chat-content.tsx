"use client"

import ChatInput from "@/components/chat-input"
import { useState } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { duotoneDark as dark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { getSignedURL } from "../actions/GetSignedUrl"

export default function ChatContent() {
  const [assistantResponse, setAssistantResponse] = useState("")
  const handleSubmit = async (value: string, file?: File) => {
    console.log(
      value ? "Question asked: " : "",
      file ? "File Uploaded: " : "",
      value,
      file ? file : "",
    )

    // Uploading file to S3 bucket
    try {
      if (file) {
        console.log("Uploading file to S3 bucket...")
        const fileInfo = {
          name: file.name,
          type: file.type,
          size: file.size,
        }
        const signedUrlResult = await getSignedURL(fileInfo)
        const url = signedUrlResult.success?.url
        if (signedUrlResult.failure !== undefined || !url) {
          // Check if `url` is not defined
          console.error("Error:", signedUrlResult.failure || "URL is undefined")
          return
        }
        console.log("Signed URL Result:", signedUrlResult)

        try {
          const fileUpload = await fetch(url, {
            method: "PUT",
            body: file,
            headers: {
              "Content-Type": file.type,
            },
          })
          if (!fileUpload.ok)
            throw new Error(`HTTP error! status: ${fileUpload.status}`)
          console.log(
            "File upload response:",
            fileUpload.status,
            fileUpload.statusText,
            await fileUpload.text(),
          )
          console.log("File uploaded successfully!")
        } catch (error) {
          console.error("File upload failed:", error)
        }
        console.log("File uploaded successfully!")

        const res = await fetch("/api/message", {
          method: "POST",
          body: JSON.stringify({
            content: value,
            file: file ? { url, type: file.type } : undefined,
          }),
          headers: {
            "Content-Type": "application/json",
          },
        })
        if (!res.ok || !res.body) {
          console.error("Error:", res.status, res.statusText, await res.text())
          return
        }

        const reader = res.body.getReader()

        // Streaming implementation
        // created this loop to read the stream until we get "true" in the done property
        const decoder = new TextDecoder()
        let finalText = ""

        while (true) {
          const { done, value } = await reader.read()

          // Since the value we'll get while reading the steam is in binary, we need to convert it into text
          const decodedText = decoder.decode(value, { stream: !done })
          setAssistantResponse(
            (prevStreamedRes) => prevStreamedRes + decodedText,
          )

          if (done) {
            break
          }
        }
      }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  return (
    <>
      <div className="dark:prose-invert flex-1 w-full max-w-4xl px-10 py-5 mx-auto overflow-x-hidden overflow-y-auto prose">
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
