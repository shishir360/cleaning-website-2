import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Loader2, Mic, MicOff, Volume2, VolumeX, CheckCircle2, Bot } from 'lucide-react';

// ─── Notification Sound (Web Audio API — no files needed) ─────────────────────
function playChatNotifSound() {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const playTone = (freq: number, startAt: number, duration: number, gain: number) => {
      const osc = ctx.createOscillator();
      const gainNode = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + startAt);
      gainNode.gain.setValueAtTime(0, ctx.currentTime + startAt);
      gainNode.gain.linearRampToValueAtTime(gain, ctx.currentTime + startAt + 0.01);
      gainNode.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + startAt + duration);
      osc.connect(gainNode);
      gainNode.connect(ctx.destination);
      osc.start(ctx.currentTime + startAt);
      osc.stop(ctx.currentTime + startAt + duration);
    };
    // Soft two-tone ding: C5 then E5
    playTone(523.25, 0, 0.35, 0.18);
    playTone(659.25, 0.18, 0.45, 0.14);
    setTimeout(() => ctx.close(), 1000);
  } catch { /* audio not available */ }
}

// ─── Gemini REST API ───────────────────────────────────────────────────────────
// In production (Netlify): calls /.netlify/functions/chat (no key exposed)
// In local dev: uses VITE_GEMINI_API_KEY directly to Gemini REST API
const CLIENT_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined;
const IS_NETLIFY = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const GEMINI_DIRECT_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

type GeminiPart =
  | { text: string }
  | { functionCall: { name: string; args: Record<string, unknown> } }
  | { functionResponse: { name: string; response: Record<string, unknown> } };

type GeminiContent = {
  role: 'user' | 'model';
  parts: GeminiPart[];
};

type GeminiResponse = {
  candidates?: Array<{
    content: GeminiContent;
    finishReason?: string;
  }>;
  error?: { message: string; code?: number };
};

// ─── System Prompt ─────────────────────────────────────────────────────────────
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

// ─── Core API call ─────────────────────────────────────────────────────────────
async function callGemini(
  history: GeminiContent[],
  message?: string,
  functionResponse?: { name: string; response: Record<string, unknown> }
): Promise<GeminiResponse> {
  // Use Netlify proxy on production, or direct API when running locally with key
  const useProxy = IS_NETLIFY || !CLIENT_API_KEY;

  if (useProxy) {
    const res = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, message, functionResponse }),
    });
    return res.json();
  }

  // Local dev: call Gemini REST API directly
  const contents: GeminiContent[] = [
    ...history,
    ...(message ? [{ role: 'user' as const, parts: [{ text: message }] }] : []),
    ...(functionResponse
      ? [{ role: 'user' as const, parts: [{ functionResponse }] }]
      : []),
  ];

  const res = await fetch(`${GEMINI_DIRECT_URL}?key=${CLIENT_API_KEY}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      system_instruction: { parts: [{ text: SYSTEM_PROMPT }] },
      contents,
      tools: TOOLS,
    }),
  });
  return res.json();
}

// ─── helpers ───────────────────────────────────────────────────────────────────
const SpeechRecognition =
  (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

type UIMessage = {
  id: string;
  sender: 'ai' | 'user' | 'system';
  text: string;
};

// ─── Component ─────────────────────────────────────────────────────────────────
export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const notifTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const [messages, setMessages] = useState<UIMessage[]>([
    {
      id: '1',
      sender: 'ai',
      text: 'Hello! I am your Lumina Virtual Assistant. I can answer your questions or help you book an appointment today. How can I assist you?',
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Multi-turn Gemini history (separate from UI messages)
  const geminiHistoryRef = useRef<GeminiContent[]>([]);

  // Auto-show notification bubble after 2s, hide after 10s — with sound
  useEffect(() => {
    const showTimer = setTimeout(() => {
      if (!isOpen) {
        setShowNotification(true);
        playChatNotifSound();
      }
    }, 2000);
    notifTimerRef.current = setTimeout(() => {
      setShowNotification(false);
    }, 10000);
    return () => {
      clearTimeout(showTimer);
      if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const dismissNotification = useCallback(() => {
    setShowNotification(false);
    if (notifTimerRef.current) clearTimeout(notifTimerRef.current);
  }, []);

  const openChatFromNotification = useCallback(() => {
    dismissNotification();
    setIsOpen(true);
  }, [dismissNotification]);

  // Voice
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [isSpeechAvailable, setIsSpeechAvailable] = useState(false);
  const handleSendRef = useRef<((txt?: string) => void) | null>(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  // Init speech recognition
  useEffect(() => {
    if (!SpeechRecognition) return;
    setIsSpeechAvailable(true);
    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = false;
    rec.lang = 'en-US';
    rec.onerror = () => setIsListening(false);
    rec.onend = () => setIsListening(false);
    rec.onresult = (event: any) => {
      const text = event.results[0][0].transcript;
      setIsListening(false);
      if (text.trim() && handleSendRef.current) handleSendRef.current(text);
    };
    recognitionRef.current = rec;
  }, []);

  // Greet with voice on open
  useEffect(() => {
    if (isOpen && isVoiceOutputEnabled && messages.length === 1) {
      speakText(messages[0].text);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen]);

  // ── TTS ────────────────────────────────────────────────────────────────────
  const speakText = (text: string) => {
    if (!isVoiceOutputEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find((v) => v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Natural')) ||
      voices[0];
    if (preferred) utterance.voice = preferred;
    utterance.rate = 1.0;
    utterance.pitch = 1.1;
    window.speechSynthesis.speak(utterance);
  };

  const toggleListen = () => {
    if (!recognitionRef.current) return;
    if (isListening) {
      recognitionRef.current.stop();
      setIsListening(false);
    } else {
      setInputValue('');
      recognitionRef.current.start();
      setIsListening(true);
    }
  };

  const toggleVoiceOutput = () => {
    setIsVoiceOutputEnabled((prev) => {
      if (prev) window.speechSynthesis.cancel();
      return !prev;
    });
  };

  // ── Send message ───────────────────────────────────────────────────────────
  const handleSendMessage = async (textOverride?: string) => {
    const messageToSend = textOverride ?? inputValue;
    if (!messageToSend.trim() || isLoading) return;

    window.speechSynthesis.cancel();
    if (!textOverride) setInputValue('');

    const userMsg: UIMessage = { id: Date.now().toString(), sender: 'user', text: messageToSend.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setIsLoading(true);

    try {
      const data = await callGemini(geminiHistoryRef.current, messageToSend.trim());

      if (data.error) {
        throw new Error(data.error.message || 'Gemini API returned an error');
      }

      const candidate = data.candidates?.[0];
      if (!candidate) throw new Error('No response received from AI');

      const parts = candidate.content?.parts ?? [];

      // Check for function call
      const funcCallPart = parts.find((p): p is { functionCall: { name: string; args: Record<string, unknown> } } =>
        'functionCall' in p
      );

      if (funcCallPart) {
        const { name, args } = funcCallPart.functionCall;

        if (name === 'book_appointment') {
          // Add model turn to history
          geminiHistoryRef.current = [
            ...geminiHistoryRef.current,
            { role: 'user', parts: [{ text: messageToSend.trim() }] },
            { role: 'model', parts: [{ functionCall: { name, args } }] },
          ];

          // Show booking confirmation in UI
          const confirmationId = 'LUM-' + Math.floor(Math.random() * 10000);
          const bookingMsg: UIMessage = {
            id: Date.now().toString() + '-sys',
            sender: 'system',
            text: `📅 Booking Confirmed for ${args.customer_name} on ${args.datetime} (${args.service_type || 'Cleaning'})! We will contact ${args.phone} shortly. Ref: ${confirmationId}`,
          };
          setMessages((prev) => [...prev, bookingMsg]);

          // Send function result back to model
          const funcResult = { name: 'book_appointment', response: { status: 'success', confirmation_id: confirmationId } };
          const followUp = await callGemini(geminiHistoryRef.current, undefined, funcResult);

          if (followUp.error) throw new Error(followUp.error.message);

          const followUpText = followUp.candidates?.[0]?.content?.parts?.find(
            (p): p is { text: string } => 'text' in p
          )?.text;

          if (followUpText) {
            // Add function response + model reply to history
            geminiHistoryRef.current = [
              ...geminiHistoryRef.current,
              { role: 'user', parts: [{ functionResponse: funcResult }] },
              { role: 'model', parts: [{ text: followUpText }] },
            ];
            const aiReply: UIMessage = { id: Date.now().toString() + '-ai', sender: 'ai', text: followUpText };
            setMessages((prev) => [...prev, aiReply]);
            speakText(followUpText);
          }
        }
      } else {
        // Normal text response
        const textPart = parts.find((p): p is { text: string } => 'text' in p);
        const replyText = textPart?.text ?? 'I did not get a clear response. Please try again.';

        // Update history
        geminiHistoryRef.current = [
          ...geminiHistoryRef.current,
          { role: 'user', parts: [{ text: messageToSend.trim() }] },
          { role: 'model', parts: [{ text: replyText }] },
        ];

        const aiReply: UIMessage = { id: Date.now().toString(), sender: 'ai', text: replyText };
        setMessages((prev) => [...prev, aiReply]);
        speakText(replyText);
      }
    } catch (err: any) {
      console.error('Chatbot error:', err);
      const errText =
        err?.message?.includes('API_KEY_INVALID') || err?.message?.includes('API key')
          ? '⚠️ AI service is not configured. Please contact us at (212) 555-0198 to book.'
          : `Sorry, I encountered an error: ${err?.message ?? 'Unknown error'}. Please try again or call (212) 555-0198.`;
      setMessages((prev) => [...prev, { id: Date.now().toString(), sender: 'ai', text: errText }]);
    } finally {
      setIsLoading(false);
    }
  };

  handleSendRef.current = handleSendMessage;

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <>
      {/* Proactive Notification Bubble */}
      <AnimatePresence>
        {showNotification && !isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 12, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 8, scale: 0.9 }}
            transition={{ type: 'spring', stiffness: 300, damping: 22 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-[99] max-w-[260px]"
          >
            <div
              className="bg-white rounded-2xl shadow-2xl border border-gray-100 p-4 cursor-pointer relative"
              onClick={openChatFromNotification}
            >
              {/* Close button */}
              <button
                onClick={(e) => { e.stopPropagation(); dismissNotification(); }}
                className="absolute top-2 right-2 w-5 h-5 flex items-center justify-center rounded-full text-gray-400 hover:text-gray-600 hover:bg-gray-100 transition-colors"
                aria-label="Dismiss"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="flex items-start gap-3 pr-4">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                  <Bot className="w-4 h-4 text-white" />
                </div>
                <div>
                  <p className="text-xs font-semibold text-gray-800 mb-0.5">Lumina AI Agent</p>
                  <p className="text-sm text-gray-600 leading-snug">👋 Hey! How can I help you today?</p>
                  <p className="text-xs text-primary font-medium mt-1.5">Click to chat →</p>
                </div>
              </div>
              {/* Tail */}
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-white border-r border-b border-gray-100 rotate-45" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 w-[calc(100vw-2rem)] sm:w-[420px] h-[75vh] sm:h-[550px] max-h-[800px] bg-white rounded-2xl shadow-2xl border border-gray-100 flex flex-col overflow-hidden z-[100] font-sans"
          >
            {/* Header */}
            <div className="bg-primary p-4 text-white flex items-center justify-between relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-black opacity-50" />
              <div className="relative z-[101] flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center backdrop-blur-sm">
                  <Sparkles className="w-5 h-5 text-tertiary" />
                </div>
                <div>
                  <h3 className="font-bold text-sm tracking-wide">Lumina AI Agent</h3>
                  <p className="text-xs text-white/70 font-light hidden sm:block">Ask questions or book online</p>
                </div>
              </div>
              <div className="relative z-[101] flex items-center gap-1">
                <button
                  onClick={toggleVoiceOutput}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Toggle Voice Output"
                  title={isVoiceOutputEnabled ? 'Mute Voice' : 'Enable Voice'}
                >
                  {isVoiceOutputEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-white/50" />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-2 hover:bg-white/20 rounded-full transition-colors"
                  aria-label="Close Chat"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
              {messages.map((msg) => {
                if (msg.sender === 'system') {
                  return (
                    <div key={msg.id} className="flex justify-center my-2">
                      <div className="bg-green-50 border border-green-200 text-green-800 text-xs px-4 py-2 rounded-full font-medium shadow-sm flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
                        {msg.text}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                    <div
                      className={`max-w-[85%] rounded-2xl p-3 shadow-sm ${
                        msg.sender === 'user'
                          ? 'bg-primary text-white rounded-br-none'
                          : 'bg-white text-gray-800 border border-gray-100 rounded-bl-none'
                      }`}
                    >
                      <p className="text-sm leading-relaxed whitespace-pre-wrap">{msg.text}</p>
                    </div>
                  </div>
                );
              })}

              {isListening && (
                <div className="flex justify-end">
                  <div className="bg-primary/10 text-primary border border-primary/20 rounded-2xl p-3 rounded-br-none shadow-sm flex gap-2 items-center">
                    <span className="flex h-2 w-2 relative">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    <span className="text-xs font-medium">Listening…</span>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex gap-2 items-center">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    <span className="text-xs text-gray-500 font-medium">Lumina AI is thinking…</span>
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t border-gray-100">
              <div className="flex items-center gap-2">
                {isSpeechAvailable && (
                  <button
                    onClick={toggleListen}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all flex-shrink-0 ${
                      isListening ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
                    }`}
                    title={isListening ? 'Stop recording' : 'Speak to agent'}
                  >
                    {isListening ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                  </button>
                )}
                <div className="flex-1 flex items-center bg-gray-50 rounded-full pr-2 pl-4 py-1 border border-gray-200 focus-within:border-primary focus-within:bg-white transition-all">
                  <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    onKeyDown={(e) => { if (e.key === 'Enter') handleSendMessage(); }}
                    placeholder={isListening ? 'Listening…' : 'Message AI Agent…'}
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2 text-gray-800"
                    disabled={isListening || isLoading}
                  />
                  <button
                    onClick={() => handleSendMessage()}
                    disabled={!inputValue.trim() || isLoading}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white disabled:opacity-50 disabled:bg-gray-300 transition-colors"
                  >
                    <Send className="w-4 h-4 ml-0.5" />
                  </button>
                </div>
              </div>
            </div>

            {/* Attribution */}
            <div className="bg-white border-t border-gray-50 py-1.5 text-center">
              <span className="text-[10px] text-gray-400 font-light tracking-wide uppercase">
                AI Assistant • Powered by Google GenAI
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating button */}
      <motion.button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-primary rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform z-[100]"
        onClick={() => setIsOpen((prev) => !prev)}
        whileHover={{ rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle Chat"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }} transition={{ duration: 0.15 }}>
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5, opacity: 0 }} transition={{ duration: 0.15 }}>
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
