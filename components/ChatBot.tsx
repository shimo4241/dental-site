'use client';

import { useState } from 'react';

export default function ChatBot() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // هادا هو المتغير السحري اللي كيتحكم واش الشات محلول ولا مسدود
  const [isOpen, setIsOpen] = useState(false);

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
      console.error(error);
      setMessages(prev => [...prev, { id: Date.now() + 1, role: 'assistant', content: "Désolé, une erreur s'est produite. Veuillez réessayer." }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* الزر الدائري اللي كيبان ملي كيكون الشات مسدود */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-6 right-6 bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 transition-all z-50 hover:scale-110 flex items-center justify-center"
          style={{ width: '64px', height: '64px' }}
          aria-label="Ouvrir le chat"
        >
          {/* أيقونة ديال الشات */}
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-8 h-8">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 01-.923 1.785A5.969 5.969 0 006 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337z" />
          </svg>
        </button>
      )}

      {/* النافذة ديال الشات اللي كتبان ملي كيكليكي على الزر */}
      {isOpen && (
        <div className="fixed bottom-4 right-4 w-96 bg-white border border-gray-200 rounded-xl shadow-2xl z-50 overflow-hidden flex flex-col animate-in fade-in slide-in-from-bottom-4 duration-300">
          
          {/* Header */}
          <div className="bg-blue-600 text-white py-3 px-4 font-bold shadow-sm flex justify-between items-center">
            <span className="flex items-center gap-2">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
              Assistant Dentaire
            </span>
            {/* زر الإغلاق (X) */}
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-white hover:bg-blue-700 p-1 rounded-lg transition"
              aria-label="Fermer"
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-80 overflow-y-auto p-4 flex flex-col gap-3 bg-gray-50">
            {messages.length === 0 && (
              <div className="text-center mt-10">
                <div className="bg-blue-100 text-blue-600 w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-3">
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1A3.75 3.75 0 0012 18z" />
                  </svg>
                </div>
                <p className="text-gray-500 text-sm">
                  Bonjour ! Posez-moi vos questions sur nos soins dentaires.
                </p>
              </div>
            )}
            {messages.map((m) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <span className={`inline-block p-3 rounded-2xl max-w-[85%] text-sm shadow-sm ${
                  m.role === 'user' 
                    ? 'bg-blue-600 text-white rounded-br-none text-right' 
                    : 'bg-white text-gray-800 rounded-bl-none text-left border border-gray-100'
                }`}>
                  {m.content}
                </span>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <span className="inline-block p-4 rounded-2xl bg-white border border-gray-100 text-gray-800 rounded-bl-none shadow-sm flex gap-1 items-center">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></span>
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.4s' }}></span>
                </span>
              </div>
            )}
          </div>

          {/* Input Form */}
          <form onSubmit={sendMessage} className="flex gap-2 p-3 bg-white border-t">
            <input
              className="flex-1 p-2.5 text-sm border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 text-black transition"
              value={input}
              placeholder="Écrivez votre message..."
              onChange={(e) => setInput(e.target.value)}
              disabled={isLoading}
            />
            <button 
              type="submit" 
              disabled={isLoading || !input.trim()}
              className={`p-2.5 rounded-xl transition flex items-center justify-center ${
                isLoading || !input.trim() 
                ? 'bg-gray-100 text-gray-400' 
                : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md hover:shadow-lg'
              }`}
            >
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
              </svg>
            </button>
          </form>
        </div>
      )}
    </>
  );
}