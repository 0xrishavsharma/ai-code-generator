import OpenAI from "openai"
import { OpenAIStream, StreamingTextResponse } from "ai"

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})
export async function POST(req: Request) {
  const { content } = await req.json()

  // Take the content and send it to OPENAI's GTP4 Vision model
  const chatCompletion = await openai.chat.completions.create({
    messages: [{ role: "user", content }],
    model: "gpt-4-turbo-preview",
    stream: true,
  })

  // Returning the response as a steam to the frontend/client
  const stream = OpenAIStream(chatCompletion)

  return new StreamingTextResponse(stream)
}
