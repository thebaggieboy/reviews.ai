// app/api/generate-message/route.js
import { OpenAI } from "openai";

// Initialize the OpenAI client
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY, // Store your API key in .env.local
});

export async function POST(request) {
  try {
    // Parse the request body
    const { emailContent } = await request.json();

    if (!emailContent) {
      return new Response(
        JSON.stringify({ message: "Email content is required" }),
        {
          status: 400,
          headers: { "Content-Type": "application/json" },
        }
      );
    }

    // Generate a response using OpenAI
    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini", // or "gpt-4"
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that generates email responses.",
        },
        {
          role: "user",
          content: `Generate a response for the following email: ${emailContent}`,
        },
      ],
    });

    const generatedMessage = completion.choices[0].message.content;

    // Return the generated message
    return new Response(JSON.stringify({ message: generatedMessage }), {
      status: 200,
      headers: { "Content-Type": "application/json" },
    });
  } catch (error) {
    console.error("Error generating message:", error);
    return new Response(
      JSON.stringify({ message: "Failed to generate message" }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}