import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

const PLANT_DATA = `
BloomSphere is an educational platform about Egyptian plants and flora. Here's our plant database:

1. Jasmine (ياسمين) - Jasminum officinale - White star-shaped flowers, blooms April-June in Nile Delta
2. Aloe Vera (صبار) - Aloe vera - Fleshy green leaves, blooms June-August in Sinai
3. Poppy (خشخاش) - Papaver rhoeas - Red petals with black center, blooms March-May
4. Hibiscus (كركديه) - Hibiscus sabdariffa - Red funnel-shaped flowers, blooms July-September
5. Olive Tree (زيتون) - Olea europaea - Silver-green leaves, blooms April-May on North Coast
6. Date Palm (نخيل) - Phoenix dactylifera - Tall trunk with feathery leaves, blooms February-April
7. Fig (تين) - Ficus carica - Broad leaves, pear-shaped fruits, blooms May-June
8. Carob Tree (خروب) - Ceratonia siliqua - Evergreen leaves, brown pods, blooms April-May
9. Thyme (زعتر) - Thymus vulgaris - Small purple flowers, aromatic herb, blooms March-May
10. Rosemary (إكليل الجبل) - Rosmarinus officinalis - Needle-like leaves, blue flowers, blooms April-June
11. Mint (نعناع) - Mentha spicata - Green serrated leaves, blooms March-May
12. Anemone (شقائق النعمان) - Anemone coronaria - Red/purple flowers, blooms February-April
13. Acacia (طلح) - Acacia nilotica - Yellow puffball flowers, thorny tree, blooms June-September
14. Lotus (لوتس) - Nymphaea lotus - White/pink floating flowers, blooms May-August on Nile River
15. Chamomile (بابونج) - Matricaria chamomilla - White petals, yellow center, blooms March-May
16. Tamarind (تمر هندي) - Tamarindus indica - Brown pods, feathery leaves, blooms April-June
17. Sage (مريمية) - Salvia officinalis - Gray-green leaves, purple flowers, blooms April-June
18. Cypress (سرو) - Cupressus sempervirens - Tall conifer, dark green foliage, blooms March-April
19. Marjoram (بردقوش) - Origanum majorana - Small white flowers, aromatic leaves, blooms April-June
20. Lavender (خزامى) - Lavandula angustifolia - Purple spikes, highly fragrant, blooms May-July

And many more! I can help you learn about their care, identification, blooming seasons, and uses.
`;

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { message } = await req.json();
    
    if (!message) {
      throw new Error('No message provided');
    }

    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY not configured');
    }

    console.log('Sending request to Lovable AI with message:', message);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          {
            role: 'system',
            content: `You are BloomBot, a friendly and knowledgeable assistant for BloomSphere, an educational platform about Egyptian plants and flora. 

Your personality:
- Warm, friendly, and encouraging
- Patient and educational
- Enthusiastic about plants and nature
- Use simple, clear language
- Occasionally use plant-related emojis 🌱🌸🌿

Your knowledge base:
${PLANT_DATA}

Your capabilities:
- Answer questions about Egyptian plants
- Provide care instructions
- Help identify plants based on descriptions
- Teach about blooming seasons and regions
- Share interesting facts about plants
- Offer one-on-one educational support

Always be helpful and encouraging. If you don't know something specific, be honest but guide the user to related information you do know.`
          },
          {
            role: 'user',
            content: message
          }
        ],
        temperature: 0.8,
        max_tokens: 800,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('Lovable AI error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'AI service requires payment. Please contact support.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }

      throw new Error(`AI API error: ${errorText}`);
    }

    const data = await response.json();
    const assistantMessage = data.choices?.[0]?.message?.content;

    if (!assistantMessage) {
      throw new Error('No response from AI');
    }

    console.log('AI response received successfully');

    return new Response(
      JSON.stringify({ message: assistantMessage }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error) {
    console.error('Error in bloombot-chat function:', error);
    const errorMessage = error instanceof Error ? error.message : 'Internal server error';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { 
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' }
      }
    );
  }
});
