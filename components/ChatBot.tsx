'use client';

import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'framer-motion';

/* ─────────────────────────────────────────────
   Premium floating AI assistant button + chat
   ───────────────────────────────────────────── */

/** Slow luxury ease shared across all micro-interactions. */
const luxe = [0.16, 1, 0.3, 1] as const;

/** Gentle infinite floating — subtle "breathing" idle state. */
const floatingIdle = {
  y: [0, -5, 0],
  transition: {
    duration: 5,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop" as const,
  },
};

/** Chat panel entrance — cinematic slide-up with blur. */
const panelVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    scale: 0.96,
    filter: "blur(6px)",
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.6,
      ease: luxe,
    },
  },
  exit: {
    opacity: 0,
    y: 12,
    scale: 0.97,
    filter: "blur(4px)",
    transition: {
      duration: 0.4,
      ease: luxe,
    },
  },
};

/** Button entrance — subtle scale-up. */
const buttonVariants = {
  hidden: { opacity: 0, scale: 0.8 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.5, ease: luxe },
  },
  exit: {
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3, ease: luxe },
  },
};

export default function ChatBot() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();

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

  const themeColor = "#112A46";

  return (
    <div className="font-sans">
      <AnimatePresence mode="wait">
        {!isOpen && (
          <motion.div
            key="fab"
            className="fixed bottom-6 right-6 z-50"
            variants={buttonVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* ── Ambient glow layer ── */}
            <motion.div
              className="pointer-events-none absolute inset-0 rounded-full"
              style={{
                background:
                  "radial-gradient(circle, rgba(34,211,238,0.25) 0%, rgba(8,145,178,0.12) 50%, transparent 70%)",
                filter: "blur(14px)",
              }}
              animate={
                reduceMotion
                  ? {}
                  : {
                      scale: [1, 1.35, 1],
                      opacity: [0.5, 0.8, 0.5],
                    }
              }
              transition={{
                duration: 4,
                ease: "easeInOut",
                repeat: Infinity,
                repeatType: "loop",
              }}
            />

            {/* ── Outer ring glow ── */}
            <div
              className="pointer-events-none absolute -inset-1 rounded-full opacity-40"
              style={{
                background:
                  "conic-gradient(from 180deg, rgba(34,211,238,0.3), rgba(8,145,178,0.15), rgba(15,23,42,0.05), rgba(34,211,238,0.3))",
                filter: "blur(6px)",
              }}
            />

            {/* ── Main button ── */}
            <motion.button
              onClick={() => setIsOpen(true)}
              className="relative flex h-[60px] w-[60px] items-center justify-center rounded-full text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400/50 focus-visible:ring-offset-2"
              style={{
                background:
                  "linear-gradient(145deg, #0c2240 0%, #112A46 40%, #0e3a5e 70%, #164e63 100%)",
                boxShadow: `
                  0 0 0 1px rgba(34, 211, 238, 0.12),
                  0 1px 0 0 rgba(255, 255, 255, 0.06) inset,
                  0 -1px 0 0 rgba(0, 0, 0, 0.15) inset,
                  0 8px 30px -6px rgba(17, 42, 70, 0.5),
                  0 20px 50px -12px rgba(8, 145, 178, 0.2)
                `,
              }}
              animate={reduceMotion ? {} : floatingIdle}
              whileHover={{
                scale: 1.08,
                boxShadow: `
                  0 0 0 1px rgba(34, 211, 238, 0.25),
                  0 1px 0 0 rgba(255, 255, 255, 0.1) inset,
                  0 -1px 0 0 rgba(0, 0, 0, 0.15) inset,
                  0 12px 40px -6px rgba(17, 42, 70, 0.6),
                  0 24px 60px -12px rgba(8, 145, 178, 0.3)
                `,
                transition: { duration: 0.5, ease: luxe },
              }}
              whileTap={{
                scale: 0.95,
                transition: { duration: 0.15 },
              }}
              aria-label="Ouvrir l'assistant"
            >
              {/* Glass overlay — top-left highlight */}
              <div
                className="pointer-events-none absolute inset-0 rounded-full"
                style={{
                  background:
                    "linear-gradient(135deg, rgba(255,255,255,0.12) 0%, rgba(255,255,255,0.03) 40%, transparent 60%)",
                }}
              />

              {/* Inner subtle ring */}
              <div
                className="pointer-events-none absolute inset-[3px] rounded-full"
                style={{
                  border: "1px solid rgba(34, 211, 238, 0.1)",
                }}
              />

              {/* Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.8}
                stroke="currentColor"
                className="relative z-10 h-6 w-6"
                style={{
                  filter: "drop-shadow(0 1px 2px rgba(0,0,0,0.2))",
                }}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M7.5 8.25h9m-9 3H12m-9.75 1.51c0 1.6 1.123 2.994 2.707 3.227 1.129.166 2.27.293 3.423.379.35.026.67.21.865.501L12 21l2.755-4.133a1.14 1.14 0 01.865-.501 48.172 48.172 0 003.423-.379c1.584-.233 2.707-1.626 2.707-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0012 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018z"
                />
              </svg>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Chat panel ── */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="panel"
            className="fixed bottom-6 right-6 z-50 flex h-[550px] max-h-[80vh] w-[90vw] flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-[0_20px_50px_rgba(0,0,0,0.15)] sm:w-[380px]"
            variants={panelVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
          >
            {/* Header */}
            <div
              className="flex items-center justify-between p-4 text-white shadow-md"
              style={{ backgroundColor: themeColor }}
            >
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-white/10 text-xl backdrop-blur-sm">
                    🦷
                  </div>
                  <div
                    className="absolute bottom-0 right-0 h-3 w-3 rounded-full bg-green-400 border-2"
                    style={{ borderColor: themeColor }}
                  />
                </div>
                <div>
                  <h3 className="text-sm font-bold">
                    Assistant Maison Dentaire
                  </h3>
                  <p className="text-[10px] uppercase tracking-wider text-gray-300">
                    En ligne • Support 24/7
                  </p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-2 transition-colors duration-300 hover:bg-white/10"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2.5}
                  stroke="currentColor"
                  className="h-5 w-5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              ref={scrollRef}
              className="flex-1 space-y-4 overflow-y-auto bg-gray-50/50 p-4"
            >
              {messages.length === 0 && (
                <div className="px-6 py-10 text-center">
                  <p className="text-sm leading-relaxed text-gray-500">
                    Bonjour ! Je suis l'assistant de la clinique. <br />
                    <b>Comment puis-je vous aider aujourd'hui ?</b>
                    <br />
                    <span className="text-xs text-gray-400">
                      (يمكنك التحدث معي باللغة العربية)
                    </span>
                  </p>
                </div>
              )}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${
                    m.role === 'user' ? 'justify-end' : 'justify-start'
                  }`}
                >
                  <div
                    className={`max-w-[85%] rounded-2xl px-4 py-2.5 text-[13.5px] leading-relaxed shadow-sm ${
                      m.role === 'user'
                        ? 'rounded-tr-none text-white'
                        : 'rounded-tl-none border border-gray-100 bg-white text-gray-700'
                    }`}
                    style={
                      m.role === 'user'
                        ? { backgroundColor: themeColor }
                        : {}
                    }
                  >
                    {m.content}
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start">
                  <div className="flex gap-1 rounded-2xl border border-gray-100 bg-white p-3 shadow-sm">
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full"
                      style={{ backgroundColor: themeColor }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:0.2s]"
                      style={{ backgroundColor: themeColor }}
                    />
                    <span
                      className="h-1.5 w-1.5 animate-bounce rounded-full [animation-delay:0.4s]"
                      style={{ backgroundColor: themeColor }}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Input form */}
            <form
              onSubmit={sendMessage}
              className="flex items-center gap-2 border-t border-gray-100 bg-white p-3"
            >
              <input
                className="flex-1 rounded-xl border-none bg-gray-50 px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 outline-none ring-0 focus:ring-1 focus:ring-gray-300"
                value={input}
                placeholder="Écrivez ici... / اكتب هنا..."
                onChange={(e) => setInput(e.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading || !input.trim()}
                className="rounded-xl p-2.5 text-white shadow-md transition-all duration-300 disabled:opacity-50 hover:opacity-90"
                style={{ backgroundColor: themeColor }}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M3.478 2.405a.75.75 0 00-.926.94l2.432 7.905H13.5a.75.75 0 010 1.5H4.984l-2.432 7.905a.75.75 0 00.926.94 60.519 60.519 0 0018.445-8.986.75.75 0 000-1.218A60.517 60.517 0 003.478 2.405z" />
                </svg>
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}