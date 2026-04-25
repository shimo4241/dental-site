export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const geminiMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const lastMessage = geminiMessages[geminiMessages.length - 1];
    if (lastMessage && lastMessage.role === 'user') {
      // هنا مجموعين القوانين الصارمة ديال اللغة والرونديفو
      lastMessage.parts[0].text = `Instructions: Tu es l'assistant virtuel de 'Maison Dentaire Élysée'.
      RÈGLE 1 (Langue): Si le patient parle en Arabe ou en Darija, tu DOIS ABSOLUMENT répondre avec l'alphabet arabe (حروف عربية). N'utilise JAMAIS le franco-arabe.
      RÈGLE 2 (Rendez-vous): TU NE PEUX PAS prendre ou enregistrer de rendez-vous. Si un patient veut un rendez-vous, dis-lui poliment de cliquer sur le bouton "Prendre un Rendez-vous" en haut du site web pour remplir le formulaire officiel.
      Message du patient: ` + lastMessage.parts[0].text;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    if (!apiKey) {
      return Response.json({ text: "Erreur: La clé API Gemini manque. / مفتاح API غير موجود." });
    }

    // 🛑 رجعناها 2.5 لي صدقات لينا ومضمونة
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: geminiMessages })
    });

    const data = await response.json();

    if (!response.ok) {
      return Response.json({ text: `Google API Error: ${data.error?.message || 'Erreur inconnue'}` });
    }

    const text = data.candidates[0].content.parts[0].text;
    return Response.json({ text });

  } catch (error: any) {
    return Response.json({ text: `Erreur Serveur: ${error.message}` });
  }
}