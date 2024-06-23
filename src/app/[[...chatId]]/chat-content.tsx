"use client"

import ChatInput from "@/components/chat-input"
import { use, useRef, useState } from "react"
import Markdown from "react-markdown"
import remarkGfm from "remark-gfm"
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter"
import { duotoneDark as dark } from "react-syntax-highlighter/dist/esm/styles/prism"
import { getSignedURL } from "../actions/GetSignedUrl"
import { computeSHA256 } from "@/lib/utils"
import { CoreMessage } from "ai"
import { readStreamableValue } from "ai/rsc"
import { useCompletion } from "ai/react"

interface ExpandingInputRef {
  resetInput: () => void
}

// Force the page to be dynamic and allow streaming responses upto 30sec
export const dynamic = "force-dynamic"
export const maxDuration = 30

// Upload the file to the server
async function uploadFile(file: File) {
  const fileInfo = {
    name: file.name,
    type: file.type,
    size: file.size,
    checksum: await computeSHA256(file),
  }
  const signedUrlResult = await getSignedURL(fileInfo)
  const url = signedUrlResult.success?.url
  if (signedUrlResult.failure !== undefined || !url) {
    throw new Error(signedUrlResult.failure || "URL is undefined")
  }

  const fileUpload = await fetch(url, {
    method: "PUT",
    body: file,
    headers: {
      "Content-Type": file.type,
    },
  })
  if (!fileUpload.ok)
    throw new Error(`HTTP error! status: ${fileUpload.status}`)

  return url // Return the URL of the uploaded file
}

// Post the message to the server
async function postMessage(
  content: string | CoreMessage[],
  fileUrl?: string | null | undefined,
  fileType?: File | string | undefined,
) {
  const res = await fetch("/api/message", {
    method: "POST",
    body: JSON.stringify({
      content,
      file: fileUrl
        ? {
            url: fileUrl,
            type: fileType instanceof File ? fileType : undefined,
          }
        : undefined,
    }),
    headers: {
      "Content-Type": "application/json",
    },
  })
  if (!res.ok || !res.body) {
    throw new Error(`Error: ${res.status} ${res.statusText}`)
  }
  return res.body.getReader() // Return the reader for the response body
}

async function readStream(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  setAssistantResponse: Function,
) {
  const decoder = new TextDecoder()
  let result = ""
  while (true) {
    const { value, done } = await reader.read()
    const decodedText = decoder.decode(value, { stream: !done })
    setAssistantResponse((prev: any) => prev + decodedText)
    if (done) break
  }
}

export default function ChatContent() {
  const [assistantResponse, setAssistantResponse] = useState("")
  const inputRef = useRef<ExpandingInputRef>(null)

  const { completion, complete } = useCompletion({
    api: "/api/message",
  })

  const handleSubmit = async (value: string, file?: File) => {
    try {
      let fileUrl = null
      // if (file) {
      //   fileUrl = await uploadFile(file)
      // }
      const result = await complete(value)
      console.log("result from chat-content", result)

      // Reset the input field after successful submission and getting an error free response
      // if (inputRef.current !== null) {
      //   inputRef.current.resetInput()
      // }
    } catch (error) {
      console.error("Error:", error)
    }
  }

  console.log("completion hai yeh: ", completion)

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
          {/* {assistantResponse} */}
          {completion}
        </Markdown>
      </div>
      <ChatInput onSubmit={handleSubmit} ref={inputRef} />
    </>
  )
}
