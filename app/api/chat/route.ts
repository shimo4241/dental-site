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
      RÈGLE 1: Si le patient parle en Arabe ou en Darija, tu DOIS répondre avec l'alphabet arabe (حروف عربية).
      RÈGLE 2: TU NE PEUX PAS prendre de rendez-vous. Dis poliment de cliquer sur le bouton "Prendre un Rendez-vous" en haut du site.
      Message du patient: ` + lastMessage.parts[0].text;
    }

    const apiKey = process.env.GEMINI_API_KEY;

    // كنتأكدو واش Vercel قرات الساروت بصح
    if (!apiKey) {
      return Response.json({ text: "Erreur: La clé API Gemini manque dans Vercel. / مفتاح API غير موجود." });
    }

    // السمية الصحيحة والرسمية ديال الموديل
    const url = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${apiKey}`;

    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ contents: geminiMessages })
    });

    const data = await response.json();

    // يلا رفضات Google الطلب، غتكتب لينا السبب نيشان فالشات
    if (!response.ok) {
      return Response.json({ text: `Google API Error: ${data.error?.message || 'Erreur inconnue'}` });
    }

    const text = data.candidates[0].content.parts[0].text;
    return Response.json({ text });

  } catch (error: any) {
    return Response.json({ text: `Erreur Serveur: ${error.message}` });
  }
}