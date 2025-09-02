import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const { prompt } = await req.json()

    // For now, return a simple generated post
    // This can be enhanced with actual AI API integration
    const samplePosts = [
      "Just finished an amazing dance session! 💃 The rhythm flows through your soul when you let the music guide you. What's your favorite dance style?",
      "Movement is medicine for the mind and body. Today I discovered new ways to express myself through dance. Keep dancing, keep growing! ✨",
      "Dance is the hidden language of the soul. Every step tells a story, every move shares an emotion. What story is your dance telling today?",
      "Found my flow today! 🌟 There's something magical about when the music and movement become one. Dance is pure freedom.",
      "Remember: you don't need to be perfect to dance, you just need to feel the music. Let your body move and your spirit soar! 💫"
    ]

    const randomPost = samplePosts[Math.floor(Math.random() * samplePosts.length)]

    return new Response(
      JSON.stringify({ content: randomPost }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    )
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 400,
      },
    )
  }
})