import OpenAI from "openai"
import { OpenAIStream, StreamingTextResponse } from "ai"
import { initialProgrammerMessages } from "./messages"
// import {createOpenAI} from "@ai-sdk/openai"

// If we want to deploy this Application to Vercel, then we need to make this route an EDGE FUNCTION so that we can stream the response to the client and if we don't do that, the response will be buffered and sent to the client only after the response is fully ready.

// Node and Edge on Vercel both support streaming whereas serverless functions can't stream indefinitely. So, we need to define the runtime as "edge" to make it an edge function. Edge functions don't have a timeout limit and are better for streaming LLM responses but we need to send an initial response within 25 seconds
export const runtime = "edge"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
export async function POST(req: Request) {
  const { content } = await req.json()

  // Take the content and send it to OPENAI's GTP4 Vision model
  const chatCompletion = await openai.chat.completions.create({
    messages: [...initialProgrammerMessages, { role: "user", content }],
    model: "gpt-4-turbo",
    stream: true,
  })

  // Returning the response as a steam to the frontend/client
  const stream = OpenAIStream(chatCompletion)

  return new StreamingTextResponse(stream)
}
