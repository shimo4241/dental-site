export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const geminiMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const lastMessage = geminiMessages[geminiMessages.length - 1];
    if (lastMessage && lastMessage.role === 'user') {
      lastMessage.parts[0].text = "Instructions: Tu es un assistant virtuel professionnel pour 'Maison Dentaire Élysée'. Réponds toujours en français, de manière polie et concise.\n\nMessage du patient: " + lastMessage.parts[0].text;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    
    // 🛑 هادي هي السمية الجديدة لي خدامة دابا: gemini-2.5-flash
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: geminiMessages })
    });

    const data = await response.json();

    if (!response.ok) {
      console.error("Google API Error:", data);
      return Response.json({ text: "Désolé, problème de connexion avec l'intelligence artificielle." });
    }

    const text = data.candidates[0].content.parts[0].text;
    return Response.json({ text });

  } catch (error) {
    console.error("Server Error:", error);
    return Response.json({ text: "Désolé, le serveur est temporairement indisponible." });
  }
}