import { getSignedURL } from "@/app/actions/GetSignedUrl"
import { type ClassValue, clsx } from "clsx"
import { twMerge } from "tailwind-merge"
import env from "./env"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const convertFileToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = (error) => reject(error)
  })
}

export async function* makeStreamAsyncIterator(
  reader: ReadableStreamDefaultReader<Uint8Array>,
): AsyncGenerator<string, void, undefined> {
  const textDecoder = new TextDecoder()
  while (true) {
    const { done, value } = await reader.read()
    const chunkAsString = textDecoder.decode(value)
    if (done) break
    yield chunkAsString
  }
}

export function generateRandomString(bytes: number) {
  if (env.NEXT_RUNTIME === "nodejs") {
    //we are primarily using this function in the server actions so this code will work
    const crypto = require("crypto")
    return crypto.randomBytes(bytes).toString("hex")
  }

  const array = new Uint8Array(bytes)
  crypto.getRandomValues(array)
  return [...array].map((b) => b.toString(16).padStart(2, "0")).join("")
}

export const computeSHA256 = async (file: File) => {
  const buffer = await file.arrayBuffer()
  const hashBuffer = await crypto.subtle.digest("SHA-256", buffer)
  const hashArray = Array.from(new Uint8Array(hashBuffer))
  const hashHex = hashArray
    .map((byte) => byte.toString(16).padStart(2, "0"))
    .join("")
  return hashHex
}

export async function uploadFileToS3(file: File) {
  if (!file) {
    console.error("No file provided")
    return
  }

  // Validate file size and type here (if needed)

  console.log("Uploading file to S3 bucket...")
  try {
    const checksum = await computeSHA256(file)
    const fileInfo = {
      name: file.name,
      type: file.type,
      size: file.size,
      checksum,
    }
    const signedUrlResult = await getSignedURL(fileInfo)
    const url = signedUrlResult.success?.url
    if (signedUrlResult.failure !== undefined || !url) {
      console.error("Error:", signedUrlResult.failure || "URL is undefined")
      return
    }

    const response = await fetch(url, {
      method: "PUT",
      body: file,
      headers: { "Content-Type": file.type },
    })

    if (response.ok) {
      console.log("File successfully uploaded")
    } else {
      console.error("File upload failed")
    }
  } catch (error) {
    console.error("Error uploading file:", error)
  }
}
