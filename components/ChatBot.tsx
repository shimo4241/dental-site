'use client';

import { useState, useEffect, useRef } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const sendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = { id: Date.now(), role: 'user', content: input };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput('');
    setIsLoading(true);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: newMessages }),
      });
      const data = await res.json();
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: data.text }]);
    } catch (error) {
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: "Désolé, réessayez plus tard. / المرجو المحاولة لاحقاً." }]);
    } finally {
      setIsLoading(false);
    }
  };

  // اللون الموحد للعيادة (كحلي طبي أنيق) - تقدر تبدلو من هنا يلا بغيتي لون آخر
  const themeColor = "#112A46"; 

  return (
    <div className="font-sans">
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 text-white p-4 rounded-full shadow-[0_10px_40px_rgba(17,42,70,0.3)] transition-all z-50 hover:scale-110 flex items-center justify-center border-2 border-white"
          style={{ width: '60px', height: '60px', backgroundColor: themeColor }}
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-7 h-7">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z" />
          </svg>
        </button>
      )}

      {isOpen && (
        <div className="fixed bottom-6 right-6 w-[90vw] sm:w-[380px] h-[550px] max-h-[80vh] bg-white rounded-2xl shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-50 overflow-hidden flex flex-col border border-gray-100 animate-in fade-in slide-in-from-bottom-5 duration-300">
          
          <div className="p-4 text-white flex justify-between items-center shadow-md" style={{ backgroundColor: themeColor }}>
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm border border-white/20 text-xl">🦷</div>
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-400 border-2 rounded-full" style={{ borderColor: themeColor }}></div>
              </div>
              <div>
                <h3 className="font-bold text-sm">Assistant Maison Dentaire</h3>
                <p className="text-[10px] text-gray-300 uppercase tracking-wider">En ligne • Support 24/7</p>
              </div>
            </div>
            <button onClick={() => setIsOpen(false)} className="hover:bg-white/10 p-2 rounded-full transition">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          <div ref={scrollRef} className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50/50">
            {messages.length === 0 && (
              <div className="text-center py-10 px-6">
                <p className="text-gray-500 text-sm leading-relaxed">
                  Bonjour ! Je suis l'assistant de la clinique. <br/> 
                  <b>Comment puis-je vous aider aujourd'hui ?</b><br/>
                  <span className="text-xs text-gray-400">(يمكنك التحدث معي باللغة العربية)</span>
                </p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`px-4 py-2.5 rounded-2xl text-[13.5px] max-w-[85%] leading-relaxed shadow-sm ${
                    m.role === 'user' 
                      ? 'text-white rounded-tr-none' 
                      : 'bg-white text-gray-700 rounded-tl-none border border-gray-100'
                  }`}
                  style={m.role === 'user' ? { backgroundColor: themeColor } : {}}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-gray-100 p-3 rounded-2xl flex gap-1 shadow-sm">
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce" style={{ backgroundColor: themeColor }}></span>
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.2s]" style={{ backgroundColor: themeColor }}></span>
                  <span className="w-1.5 h-1.5 rounded-full animate-bounce [animation-delay:0.4s]" style={{ backgroundColor: themeColor }}></span>
                </div>
              </div>
            )}
          </div>

          <form onSubmit={sendMessage} className="p-3 bg-white border-t border-gray-100 flex gap-2 items-center">
            <input
              className="flex-1 bg-gray-50 border-none rounded-xl px-4 py-2.5 text-sm focus:ring-1 focus:ring-gray-300 outline-none text-gray-800 placeholder-gray-400"
              value={input}
              placeholder="Écrivez ici... / اكتب هنا..."
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className="text-white p-2.5 rounded-xl transition-all shadow-md disabled:opacity-50 hover:opacity-90"
              style={{ backgroundColor: themeColor }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </div>
  );
}