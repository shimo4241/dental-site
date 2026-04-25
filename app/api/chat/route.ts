export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const geminiMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const lastMessage = geminiMessages[geminiMessages.length - 1];
    if (lastMessage && lastMessage.role === 'user') {
      lastMessage.parts[0].text = `Instructions: Tu es l'assistant virtuel de 'Maison Dentaire Élysée'. 
      IMPORTANT: Réponds TOUJOURS dans la même langue que l'utilisateur (Arabe, Français, Anglais ou Darija).
      Sois professionnel, accueillant et aide les patients pour leurs rendez-vous ou questions de soins. 
      Message du patient: ` + lastMessage.parts[0].text;
    }

    const apiKey = process.env.GEMINI_API_KEY;
    // هادي هي اللي تصلحات باش مايبقاش يعطي المشكل التقني
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: geminiMessages })
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json({ text: "Désolé, j'ai un petit souci technique. / عذراً، لدي مشكل تقني." });
    }

    const text = data.candidates[0].content.parts[0].text;
    return Response.json({ text });

  } catch (error) {
    return Response.json({ text: "Erreur serveur. / خطأ في الخادم." });
  }
}