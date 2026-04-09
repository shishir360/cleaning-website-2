/**
 * Netlify Serverless Function: /netlify/functions/chat
 * Proxies requests to the Gemini REST API securely using GEMINI_API_KEY env var.
 * Set GEMINI_API_KEY in: Netlify Dashboard → Site → Environment Variables
 */

const GEMINI_MODEL = 'gemini-2.0-flash';
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/${GEMINI_MODEL}:generateContent`;

const SYSTEM_PROMPT = `You are a helpful, professional, and friendly virtual assistant for Lumina Clean Services, a premium cleaning company serving the New York area.
Your goal is to answer questions about cleaning services, pricing, and availability.
You can ALSO book appointments using the book_appointment function. To book an appointment, you MUST ask the user for their Name, Phone number, and Desired Date/Time. Do not assume any details. Once you have all 3, call the book_appointment function.

### Service FAQs:
- Standard Cleaning: Ideal for routine upkeep. Covers dusting, vacuuming, mopping, bathroom sanitation, and kitchen surface wiping. Starts at $150.
- Deep Cleaning: A more intensive clean for neglected areas. Includes inside cabinets, baseboards, interior windows, and appliances. Starts at $250.
- Move-In/Move-Out: Specialized for empty homes. High-detail cleaning to ensure the property is spotless for the next resident. Starts at $350.
- Service Areas: Manhattan, Brooklyn, Queens, Bronx.
- Eco-Friendly: We use exclusively zero-toxin, family-safe, and pet-friendly cleaning agents for every job.

CRITICAL INSTRUCTIONS:
- Keep your answers brief, informative, and courteous.
- Do not use markdown like asterisks, bolding, or bullet points. Speak in conversational, easy-to-hear sentences.
- If the user asks a question not covered by the FAQ, politely state that you can have a human representative contact them via phone, and ask for their number.`;

const TOOLS = [
  {
    function_declarations: [
      {
        name: 'book_appointment',
        description: 'Books a cleaning appointment for the customer.',
        parameters: {
          type: 'OBJECT',
          properties: {
            customer_name: { type: 'STRING', description: "Customer's full name" },
            phone: { type: 'STRING', description: "Customer's contact phone number" },
            datetime: { type: 'STRING', description: 'The date and time they want the cleaning' },
            service_type: { type: 'STRING', description: 'Type of clean (e.g. standard, deep, move-in)' },
          },
          required: ['customer_name', 'phone', 'datetime'],
        },
      },
    ],
  },
];

exports.handler = async (event) => {
  const headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
  };

  // Handle CORS preflight
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 200, headers, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, headers, body: JSON.stringify({ error: 'Method Not Allowed' }) };
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'GEMINI_API_KEY is not configured on the server. Please add it in Netlify Dashboard → Site → Environment Variables.' }),
    };
  }

  let body;
  try {
    body = JSON.parse(event.body || '{}');
  } catch {
    return { statusCode: 400, headers, body: JSON.stringify({ error: 'Invalid JSON body' }) };
  }

  const { message, history = [], functionResponse = null } = body;

  // Build the contents array
  const contents = [
    ...history,
    ...(message
      ? [{ role: 'user', parts: [{ text: message }] }]
      : []),
    ...(functionResponse
      ? [{ role: 'user', parts: [{ functionResponse }] }]
      : []),
  ];

  const requestBody = {
    system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
    contents,
    tools: TOOLS,
  };

  try {
    const geminiRes = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody),
    });

    const data = await geminiRes.json();

    if (!geminiRes.ok) {
      return {
        statusCode: geminiRes.status,
        headers,
        body: JSON.stringify({ error: data?.error?.message || 'Gemini API error', details: data }),
      };
    }

    return { statusCode: 200, headers, body: JSON.stringify(data) };
  } catch (err) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Failed to reach Gemini API: ' + err.message }),
    };
  }
};
