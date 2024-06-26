import { streamText } from "ai"
import { initialProgrammerMessages } from "./messages"
import { openai } from "@ai-sdk/openai"
import { createStreamableValue } from "ai/rsc"

// If we want to deploy this Application to Vercel, then we need to make this route an EDGE FUNCTION so that we can stream the response to the client and if we don't do that, the response will be buffered and sent to the client only after the response is fully ready.

// Node and Edge on Vercel both support streaming whereas serverless functions can't stream indefinitely. So, we need to define the runtime as "edge" to make it an edge function. Edge functions don't have a timeout limit and are better for streaming LLM responses but we need to send an initial response within 25 seconds
export const runtime = "edge"

export async function POST(req: Request) {
  try {
    const { prompt }: { prompt: string } = await req.json()

    const result = await streamText({
      model: openai("gpt-4-turbo"),
      system: initialProgrammerMessages[0].content,
      prompt: prompt,
    })

    const stream = createStreamableValue(result.textStream)
    return result.toAIStreamResponse()
  } catch (error) {
    console.error("Error:", error)
    return new Response("Internal Server Error", { status: 500 })
  }
}
