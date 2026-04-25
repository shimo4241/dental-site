export async function POST(req: Request) {
  try {
    const { messages } = await req.json();

    const geminiMessages = messages.map((m: any) => ({
      role: m.role === 'user' ? 'user' : 'model',
      parts: [{ text: m.content }]
    }));

    const lastMessage = geminiMessages[geminiMessages.length - 1];
    if (lastMessage && lastMessage.role === 'user') {
      // 🛑 هنا زدنا الأوامر الصارمة ديال اللغة والرونديفو
      lastMessage.parts[0].text = `Instructions: Tu es l'assistant virtuel de 'Maison Dentaire Élysée'.
      RÈGLE 1 (Langue) : Si le patient parle en Arabe ou en Darija marocaine, tu DOIS ABSOLUMENT répondre avec l'alphabet arabe (حروف عربية). N'utilise JAMAIS les lettres latines pour écrire en arabe (Interdiction d'utiliser le franco-arabe).
      RÈGLE 2 (Rendez-vous) : TU NE PEUX PAS prendre ou enregistrer de rendez-vous toi-même. Si un patient veut un rendez-vous, ne lui dis jamais que le rendez-vous est confirmé. Dis-lui poliment de cliquer sur le bouton "Prendre un Rendez-vous" situé en haut du site web pour remplir le formulaire officiel.
      
      Message du patient: ` + lastMessage.parts[0].text;
    }

    const apiKey = process.env.GEMINI_API_KEY;
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