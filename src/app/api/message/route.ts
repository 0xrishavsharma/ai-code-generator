import OpenAI from "openai";

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});
export async function POST(req: Request) {
    const { content } = await req.json();

    const chatCompletion = await openai.chat.completions.create({
        messages: [{ role: "user", content }],
        model: "gpt-4-turbo-preview",
        stream: true,
    });

    // Take the content and send it to OPENAI's GTP4 Vision

    console.log("Content on server", { content });
    return new Response("Alright!");
}
