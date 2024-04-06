export async function POST(req: Request) {
    const { content } = await req.json();

    // Take the content and send it to OPENAI's GTP4 Vision

    console.log("Content on server", { content });
    return new Response("Alright!");
}
