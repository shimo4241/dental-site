"use client";

import { useChat } from "ai/react";
import { useState, useRef, useEffect } from "react";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const { messages, input, handleInputChange, handleSubmit } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // هاد الفونكسيون كتهبط الشات أوتوماتيكيا لتحت ملي كتوصل رسالة جديدة
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="fixed bottom-4 right-4 z-50">
      {isOpen ? (
        /* هادا هو الصندوق الكبير: عطيناه 80% من طول التليفون (h-[80vh]) */
        <div className="flex flex-col bg-white shadow-2xl rounded-2xl border border-gray-200 w-[90vw] md:w-[400px] h-[80vh] md:h-[500px] overflow-hidden">
          
          {/* الفوق (Header) */}
          <div className="bg-blue-600 text-white p-4 flex justify-between items-center shadow-sm">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <h3 className="font-bold">Assistant Dentaire</h3>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="font-bold text-2xl hover:text-gray-200 transition-colors"
            >
              &times;
            </button>
          </div>

          {/* مساحة الرسايل: هنا درنا overflow-y-auto باش تولي تـسكـرولي */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.length === 0 && (
              <div className="text-center text-gray-500 mt-4 text-sm">
                Bonjour! Comment puis-je vous aider aujourd'hui? 😁
              </div>
            )}
            
            {messages.map((m: any) => (
              <div key={m.id} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div 
                  className={`p-3 rounded-2xl max-w-[85%] text-sm ${
                    m.role === 'user' 
                      ? 'bg-blue-600 text-white rounded-br-sm shadow-md' 
                      : 'bg-white border border-gray-200 text-gray-800 rounded-bl-sm shadow-sm'
                  }`}
                >
                  {m.content}
                </div>
              </div>
            ))}
            {/* هاد الديف الخاوي هو لي كنجرو ليه الشاشة باش تبان الرسالة اللخرة */}
            <div ref={messagesEndRef} />
          </div>

          {/* بلاصة الكتابة (Input) */}
          <div className="p-3 bg-white border-t border-gray-100">
            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                value={input}
                onChange={handleInputChange}
                placeholder="Écrivez votre message..."
                className="flex-1 border border-gray-300 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-blue-600 focus:ring-1 focus:ring-blue-600 transition-all"
              />
              <button 
                type="submit" 
                disabled={!input.trim()}
                className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition-colors disabled:opacity-50 flex items-center justify-center w-10 h-10"
              >
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5">
                  <path d="M3.478 2.404a.75.75 0 0 0-.926.941l2.432 7.905H13.5a.75.75 0 0 1 0 1.5H4.984l-2.432 7.905a.75.75 0 0 0 .926.94 60.519 60.519 0 0 0 18.445-8.986.75.75 0 0 0 0-1.218A60.517 60.517 0 0 0 3.478 2.404Z" />
                </svg>
              </button>
            </form>
          </div>
        </div>
      ) : (
        /* البوطونة العائمة باش تحل الشات */
        <button
          onClick={() => setIsOpen(true)}
          className="bg-blue-600 text-white p-4 rounded-full shadow-2xl hover:bg-blue-700 hover:scale-105 transition-all flex items-center justify-center"
        >
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 12.76c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.076-4.076a1.526 1.526 0 0 1 1.037-.443 48.282 48.282 0 0 0 5.68-.494c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
          </svg>
        </button>
      )}
    </div>
  );
}