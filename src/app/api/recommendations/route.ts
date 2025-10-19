

import { Mistral } from '@mistralai/mistralai';
import { NextRequest, NextResponse } from "next/server";


export async function POST(req: NextRequest){
try {
    const {prompt} = await req.json()
    if(!prompt){
        return NextResponse.json({error: "Prompt is required"}, {status: 400})
    }
    const apiKey = process.env.MISTRAL_API_KEY;
     if (!apiKey) {
          throw new Error("MISTRAL_API_KEY is not set in environment variables.");
        }
   
    const mistral = new Mistral({apiKey: apiKey});
    const systemPrompt =   `You are a world-class music recommendation expert.
Based on the user's vibe or description, generate a list of 10 song recommendations that are 
recent (released within the last 2 years) and currently popular or trending on major streaming platforms.

For each song, provide the title and the artist.

Return the list as a valid JSON array in this exact format:
[
  {"title": "Song Title 1", "artist": "Artist Name 1"},
  {"title": "Song Title 2", "artist": "Artist Name 2"}
]`

const response = await mistral.chat.complete({
   model: "mistral-tiny",
    messages:[
        {role: "system", content: systemPrompt},
        {role: "user", content: `My vibe is ${prompt}`}
    ]
})
let content = response.choices?.[0]?.message?.content

if(typeof content !== 'string' || content.trim() === ''){
    throw new Error("Invalid response from AI")
}
const recommendations = JSON.parse(content)

return NextResponse.json({recommendations})
} catch (error) {
    console.error("Error generating recommendations:", error);
    return NextResponse.json({error: "Failed to generate recommendations"}, {status: 500})
}

}