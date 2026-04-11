import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageSquare, X, Send, Sparkles, Loader2, Mic, MicOff, 
  Volume2, VolumeX, CheckCircle2, Bot, Phone, PhoneOff, 
  ChevronDown, Mail, MessageCircle, ArrowLeft, Play, Pause
} from 'lucide-react';
import { siteConfig } from '../config/siteConfig';

// ─── Constants & Types ────────────────────────────────────────────────────────
const CLIENT_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined;
const IS_NETLIFY = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const GEMINI_DIRECT_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

type GeminiPart =
  | { text: string }
  | { functionCall: { name: string; args: Record<string, unknown> } }
  | { functionResponse: { name: string; response: Record<string, unknown> } };

type GeminiContent = { role: 'user' | 'model'; parts: GeminiPart[] };
type GeminiResponse = { candidates?: Array<{ content: GeminiContent; finishReason?: string }>; error?: { message: string } };

type ViewState = 'closed' | 'menu' | 'chat' | 'voice-start' | 'voice-active' | 'contact-choice';

// ─── Audio Helpers ───────────────────────────────────────────────────────────
function playToneNotification(type: 'chat' | 'voice') {
  try {
    const ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    const play = (freq: number, start: number, dur: number, g: number) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = type === 'chat' ? 'sine' : 'triangle';
      osc.frequency.setValueAtTime(freq, ctx.currentTime + start);
      gain.gain.setValueAtTime(0, ctx.currentTime + start);
      gain.gain.linearRampToValueAtTime(g, ctx.currentTime + start + 0.01);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + start + dur);
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(ctx.currentTime + start);
      osc.stop(ctx.currentTime + start + dur);
    };
    if (type === 'chat') {
      play(523.25, 0, 0.35, 0.15);
      play(659.25, 0.18, 0.45, 0.12);
    } else {
      play(392, 0, 0.22, 0.12);
      play(493.88, 0.2, 0.22, 0.12);
      play(587.33, 0.4, 0.32, 0.15);
    }
    setTimeout(() => ctx.close(), 1200);
  } catch { /* fail silent */ }
}

const SYSTEM_PROMPT = `You are a virtual assistant for Lumina Clean Services. Answer questions about cleaning services, pricing ($150 Standard, $250 Deep, $350 Move-In/Out), and availability in New York. You can book using book_appointment (needs Name, Phone, Date). Keep responses professional and brief.`;
const VOICE_PROMPT = `You are Lumina's voice AI. Keep responses to 2-3 SHORT sentences maximum. No lists. Be conversational.`;

const TOOLS = [
  {
    function_declarations: [
      {
        name: 'book_appointment',
        description: 'Books a cleaning appointment.',
        parameters: {
          type: 'OBJECT',
          properties: {
            customer_name: { type: 'STRING' },
            phone: { type: 'STRING' },
            datetime: { type: 'STRING' },
            service_type: { type: 'STRING' },
          },
          required: ['customer_name', 'phone', 'datetime'],
        },
      },
    ],
  },
];

// ─── Main Component ────────────────────────────────────────────────────────────
export default function UnifiedAgent() {
  const [view, setView] = useState<ViewState>('closed');
  const [showNotif, setShowNotif] = useState(false);
  const [activeTab, setActiveTab] = useState<'chat' | 'voice'>('chat');
  
  // Chat State
  const [chatMessages, setChatMessages] = useState<Array<{ id: string; sender: 'ai' | 'user' | 'system'; text: string }>>([
    { id: '1', sender: 'ai', text: 'Hello! How can I assist you with your cleaning needs today?' }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const chatHistoryRef = useRef<GeminiContent[]>([]);
  const chatScrollRef = useRef<HTMLDivElement>(null);

  // Voice State
  const [voiceState, setVoiceState] = useState<'idle' | 'listening' | 'speaking' | 'thinking'>('idle');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const recognitionRef = useRef<any>(null);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

  // ── Notification Logic ─────────────────────────────────────────────────────
  useEffect(() => {
    const timer = setTimeout(() => {
      if (view === 'closed') {
        setShowNotif(true);
        playToneNotification('chat');
      }
    }, 4000);
    return () => clearTimeout(timer);
  }, [view]);

  // ── Gemini API Call ────────────────────────────────────────────────────────
  const callAgent = async (history: GeminiContent[], message?: string, funcRes?: any, isVoice = false) => {
    const useProxy = IS_NETLIFY || !CLIENT_API_KEY;
    const prompt = isVoice ? VOICE_PROMPT : SYSTEM_PROMPT;
    
    if (useProxy) {
      const res = await fetch('/.netlify/functions/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ history, message, functionResponse: funcRes }),
      });
      return res.json();
    }

    const contents = [...history];
    if (message) contents.push({ role: 'user', parts: [{ text: message }] });
    if (funcRes) contents.push({ role: 'user', parts: [{ functionResponse: funcRes }] });

    const res = await fetch(`${GEMINI_DIRECT_URL}?key=${CLIENT_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: prompt }] },
        contents,
        tools: isVoice ? undefined : TOOLS,
      }),
    });
    return res.json();
  };

  // ── Text Chat Actions ──────────────────────────────────────────────────────
  const sendChatMessage = async (override?: string) => {
    const msg = override || input;
    if (!msg.trim() || isTyping) return;
    setInput('');
    const newMsg = { id: Date.now().toString(), sender: 'user' as const, text: msg };
    setChatMessages(prev => [...prev, newMsg]);
    setIsTyping(true);

    try {
      const data = await callAgent(chatHistoryRef.current, msg);
      const parts = data.candidates?.[0]?.content?.parts || [];
      const funcCall = parts.find((p: any) => 'functionCall' in p);
      
      if (funcCall) {
        // Handle booking
        const { name, args } = funcCall.functionCall;
        const refId = 'LUM-' + Math.floor(Math.random() * 10000);
        setChatMessages(prev => [...prev, { 
          id: Date.now().toString() + 's', 
          sender: 'system', 
          text: `Booking Confirmed for ${args.customer_name} on ${args.datetime}. Ref: ${refId}` 
        }]);
        // Follow up
        const final = await callAgent([...chatHistoryRef.current, { role: 'user', parts: [{ text: msg }] }, { role: 'model', parts: [funcCall] }], undefined, { name, response: { status: 'success' } });
        const reply = final.candidates?.[0]?.content?.parts?.[0]?.text || 'Confirmed!';
        setChatMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: reply }]);
      } else {
        const reply = parts[0]?.text || 'I didn\'t catch that.';
        setChatMessages(prev => [...prev, { id: Date.now().toString(), sender: 'ai', text: reply }]);
        chatHistoryRef.current.push({ role: 'user', parts: [{ text: msg }] }, { role: 'model', parts: [{ text: reply }] });
      }
    } catch {
      setChatMessages(prev => [...prev, { id: 'err', sender: 'ai', text: 'Service unavailable. Call us at (212) 555-0198.' }]);
    } finally {
      setIsTyping(false);
    }
  };

  // ── Voice Agent Logic ──────────────────────────────────────────────────────
  const startVoiceCall = () => {
    setView('voice-active');
    setCallDuration(0);
    timerRef.current = setInterval(() => setCallDuration(d => d + 1), 1000);
    
    // Initial greeting
    const greeting = "Hello! I'm your Lumina assistant. How can I help you today?";
    speakVoice(greeting, () => {
      startListening();
    });
  };

  const endVoiceCall = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    if (recognitionRef.current) recognitionRef.current.stop();
    window.speechSynthesis.cancel();
    setVoiceState('idle');
    setView('menu');
  };

  const speakVoice = (text: string, onEnd?: () => void) => {
    if (!window.speechSynthesis) return;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.onstart = () => setVoiceState('speaking');
    utterance.onend = () => { setVoiceState('idle'); onEnd?.(); };
    window.speechSynthesis.speak(utterance);
  };

  const startListening = () => {
    if (!SpeechRecognition) return;
    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.lang = 'en-US';
    rec.onstart = () => setVoiceState('listening');
    rec.onresult = async (e: any) => {
      const transcript = e.results[0][0].transcript;
      setVoiceState('thinking');
      const data = await callAgent([], transcript, undefined, true);
      const reply = data.candidates?.[0]?.content?.parts?.[0]?.text || "I'm sorry, I missed that.";
      speakVoice(reply, () => startListening());
    };
    rec.onerror = () => setVoiceState('idle');
    rec.onend = () => { if (voiceState === 'listening') setVoiceState('idle'); };
    recognitionRef.current = rec;
    rec.start();
  };

  const formatTime = (s: number) => {
    const mins = Math.floor(s / 60);
    const secs = s % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // ── UI Components ──────────────────────────────────────────────────────────
  
  const Header = () => (
    <div className="bg-primary p-4 text-white flex items-center justify-between border-b border-tertiary/20">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 rounded-full border-2 border-tertiary p-0.5 overflow-hidden">
          <img src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=100" alt="Agent" className="w-full h-full object-cover rounded-full" />
        </div>
        <div>
          <h3 className="font-bold text-sm tracking-wide">Have a question?</h3>
          <div className="flex items-center gap-1">
            <div className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse" />
            <span className="text-[10px] text-white/60 uppercase tracking-widest font-bold">Online</span>
          </div>
        </div>
      </div>
      <button onClick={() => setView('closed')} className="p-2 hover:bg-white/10 rounded-full transition-colors">
        <ChevronDown className="w-5 h-5" />
      </button>
    </div>
  );

  return (
    <>
      <AnimatePresence>
        {showNotif && view === 'closed' && (
          <motion.div 
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 10 }}
            className="fixed bottom-20 right-4 sm:bottom-24 sm:right-6 z-[100] max-w-[260px] cursor-pointer"
            onClick={() => { setView('menu'); setShowNotif(false); }}
          >
            <div className="bg-primary/95 backdrop-blur-xl border border-tertiary/30 p-4 rounded-2xl shadow-2xl relative">
              <button 
                onClick={(e) => { e.stopPropagation(); setShowNotif(false); }}
                className="absolute top-2 right-2 text-white/30 hover:text-white"
              >
                <X className="w-3 h-3" />
              </button>
              <div className="flex gap-3">
                <div className="w-10 h-10 rounded-full bg-tertiary flex items-center justify-center flex-shrink-0">
                  <Sparkles className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs font-bold text-tertiary uppercase tracking-widest mb-1">VIP Concierge</p>
                  <p className="text-sm text-inverted/80 leading-snug font-light">Need a custom quote? Talk to our AI team now.</p>
                </div>
              </div>
              <div className="absolute -bottom-2 right-6 w-4 h-4 bg-primary rotate-45 border-r border-b border-tertiary/30" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <AnimatePresence>
        {view !== 'closed' && (
          <motion.div
            initial={{ opacity: 0, y: 40, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 40, scale: 0.95 }}
            className="fixed inset-0 sm:inset-auto sm:bottom-20 sm:right-4 md:bottom-24 md:right-6 w-full sm:w-[400px] h-full sm:h-[600px] overflow-hidden z-[101] flex flex-col shadow-[0_32px_80px_rgba(0,0,0,0.6)] sm:rounded-3xl border border-tertiary/30 bg-primary"
          >
            <Header />

            <div className="flex-1 relative bg-[#0a0a0a]">
              <AnimatePresence mode="wait">
                {view === 'menu' && (
                  <motion.div 
                    key="menu"
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    className="p-6 h-full flex flex-col"
                  >
                    <p className="text-white/60 text-sm mb-6 text-center font-light">Choose a chat option to get started.</p>
                    
                    <div className="space-y-4">
                      {[
                        { id: 'sms', icon: Mail, title: 'Chat via SMS/Email', sub: 'Receive updates via mobile', action: () => setView('contact-choice') },
                        { id: 'chat', icon: MessageCircle, title: 'Chat via Live Chat', sub: 'Instant assistant response', action: () => setView('chat') },
                        { id: 'voice', icon: Phone, title: 'Chat with Voice', sub: 'Hands-free AI voice call', action: () => setView('voice-start') },
                      ].map((opt) => (
                        <button 
                          key={opt.id}
                          onClick={opt.action}
                          className="w-full group p-4 flex items-center gap-4 bg-white/5 hover:bg-white/10 border border-white/10 hover:border-tertiary/30 text-left transition-all duration-300 sm:rounded-2xl"
                        >
                          <div className="w-12 h-12 rounded-xl bg-tertiary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-500">
                            <opt.icon className="w-6 h-6 text-tertiary" />
                          </div>
                          <div className="flex-1">
                            <h4 className="text-white text-sm font-bold tracking-wide">{opt.title}</h4>
                            <p className="text-white/40 text-xs font-light tracking-wide">{opt.sub}</p>
                          </div>
                        </button>
                      ))}
                    </div>
                    
                    <div className="mt-auto text-center pt-8">
                      <p className="text-[10px] text-white/20 uppercase tracking-[0.2em] font-bold">Powered by Lumina AI Agent</p>
                    </div>
                  </motion.div>
                )}

                {view === 'contact-choice' && (
                  <motion.div 
                    key="contact"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-8 h-full flex flex-col items-center justify-center text-center"
                  >
                    <button onClick={() => setView('menu')} className="absolute top-4 left-4 p-2 hover:bg-white/10 rounded-lg text-tertiary flex items-center gap-1 text-xs transition-colors">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>

                    <div className="w-20 h-20 rounded-full bg-tertiary/10 flex items-center justify-center mb-6">
                      <Mail className="w-10 h-10 text-tertiary" />
                    </div>

                    <h3 className="text-xl font-serif text-white mb-2">Multi-Channel Support</h3>
                    <p className="text-white/40 text-sm font-light mb-8 max-w-[240px]">How would you like to receive your cleaning updates?</p>

                    <div className="grid grid-cols-1 gap-4 w-full px-4">
                      <a 
                        href={`sms:${siteConfig.contact.phone.replace(/[^0-9+]/g, '')}`}
                        className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:border-tertiary/50 p-4 rounded-xl text-white transition-all hover:scale-[1.02]"
                      >
                        <MessageSquare className="w-5 h-5 text-tertiary" />
                        <span className="font-bold tracking-widest text-xs uppercase">Send SMS</span>
                      </a>
                      <a 
                        href={`mailto:${siteConfig.contact.email}`}
                        className="flex items-center justify-center gap-3 bg-white/5 border border-white/10 hover:border-tertiary/50 p-4 rounded-xl text-white transition-all hover:scale-[1.02]"
                      >
                        <Mail className="w-5 h-5 text-tertiary" />
                        <span className="font-bold tracking-widest text-xs uppercase">Send Email</span>
                      </a>
                    </div>
                  </motion.div>
                )}

                {view === 'chat' && (
                  <motion.div 
                    key="chat"
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    className="flex flex-col h-full"
                  >
                    <div className="flex items-center gap-2 p-3 bg-white/5 border-b border-white/5">
                      <button onClick={() => setView('menu')} className="p-1 hover:bg-white/10 rounded-lg text-tertiary transition-colors flex items-center gap-1 text-xs">
                        <ArrowLeft className="w-3.5 h-3.5" /> Back
                      </button>
                    </div>
                    
                    <div className="flex-1 overflow-y-auto p-4 space-y-4">
                      {chatMessages.map((m) => (
                        <div key={m.id} className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          {m.sender === 'system' ? (
                            <div className="w-full py-2 px-4 bg-tertiary/10 border border-tertiary/20 text-tertiary text-[10px] font-bold uppercase tracking-widest text-center rounded-xl">
                              {m.text}
                            </div>
                          ) : (
                            <div className={`max-w-[85%] p-3 rounded-2xl text-sm ${m.sender === 'user' ? 'bg-tertiary text-primary font-bold' : 'bg-white/10 text-white/90 font-light'}`}>
                              {m.text}
                            </div>
                          )}
                        </div>
                      ))}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="bg-white/10 p-3 rounded-2xl flex gap-1">
                            <span className="w-1.5 h-1.5 bg-tertiary rounded-full animate-bounce" />
                            <span className="w-1.5 h-1.5 bg-tertiary rounded-full animate-bounce [animation-delay:0.2s]" />
                            <span className="w-1.5 h-1.5 bg-tertiary rounded-full animate-bounce [animation-delay:0.4s]" />
                          </div>
                        </div>
                      )}
                      <div ref={chatScrollRef} />
                    </div>

                    <div className="p-4 bg-white/5 border-t border-white/5">
                      <div className="flex gap-2">
                        <input 
                          value={input}
                          onChange={(e) => setInput(e.target.value)}
                          onKeyDown={(e) => e.key === 'Enter' && sendChatMessage()}
                          placeholder="Type your message..."
                          className="flex-1 bg-white/10 border-none rounded-xl px-4 py-3 text-sm text-white focus:ring-1 focus:ring-tertiary/50"
                        />
                        <button onClick={() => sendChatMessage()} className="w-12 h-12 bg-tertiary flex items-center justify-center rounded-xl text-primary hover:scale-105 transition-transform">
                          <Send className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </motion.div>
                )}

                {view === 'voice-start' && (
                  <motion.div 
                    key="voice-start"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="p-8 h-full flex flex-col items-center justify-center"
                  >
                    <button onClick={() => setView('menu')} className="absolute top-4 left-4 p-2 hover:bg-white/10 rounded-lg text-tertiary flex items-center gap-1 text-xs">
                      <ArrowLeft className="w-4 h-4" /> Back
                    </button>
                    
                    <div className="relative mb-8">
                       <div className="absolute inset-0 bg-tertiary/20 blur-3xl rounded-full" />
                       <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" 
                        alt="Kelan AI" 
                        className="w-32 h-32 rounded-full object-cover border-4 border-tertiary/30 relative z-10 shadow-2xl" 
                       />
                    </div>
                    
                    <h2 className="text-2xl font-serif text-white mb-1">Kelan <span className="text-xs bg-tertiary/20 text-tertiary px-1.5 py-0.5 rounded font-sans uppercase">AI</span></h2>
                    <p className="text-white/40 text-sm font-light mb-12">Support Agent</p>
                    
                    <button 
                      onClick={startVoiceCall}
                      className="group flex items-center gap-4 bg-white/5 border-2 border-tertiary/40 hover:border-tertiary px-8 py-4 rounded-2xl text-tertiary transition-all duration-300 hover:scale-105"
                    >
                      <div className="flex gap-0.5 items-center">
                        <div className="w-1 h-3 bg-tertiary rounded-full animate-pulse" />
                        <div className="w-1 h-5 bg-tertiary rounded-full animate-pulse [animation-delay:0.2s]" />
                        <div className="w-1 h-3 bg-tertiary rounded-full animate-pulse [animation-delay:0.4s]" />
                      </div>
                      <span className="font-bold tracking-widest text-sm uppercase">Call us here</span>
                    </button>
                  </motion.div>
                )}

                {view === 'voice-active' && (
                  <motion.div 
                    key="voice-active"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-8 h-full flex flex-col items-center justify-center"
                  >
                    <div className="relative mb-12">
                      {/* Animated Glow Rings */}
                      {(voiceState === 'speaking' || voiceState === 'listening') && (
                        <>
                          <motion.div 
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: [1, 1.5, 1], opacity: [0.1, 0.3, 0.1] }}
                            transition={{ duration: 2, repeat: Infinity }}
                            className="absolute inset-[-40px] rounded-full"
                            style={{ background: 'radial-gradient(circle, #c0a06244 0%, transparent 70%)' }}
                          />
                          <motion.div 
                            initial={{ scale: 1, opacity: 0 }}
                            animate={{ scale: [1.2, 1.8, 1.2], opacity: [0.05, 0.2, 0.05] }}
                            transition={{ duration: 3, repeat: Infinity, delay: 0.5 }}
                            className="absolute inset-[-60px] rounded-full"
                            style={{ background: 'radial-gradient(circle, #c0a06233 0%, transparent 70%)' }}
                          />
                        </>
                      )}
                      <img 
                        src="https://images.unsplash.com/photo-1560250097-0b93528c311a?auto=format&fit=crop&q=80&w=200" 
                        alt="Kelan AI" 
                        className={`w-32 h-32 rounded-full object-cover relative z-10 border-2 transition-colors duration-500 ${voiceState === 'listening' ? 'border-red-500' : 'border-tertiary'}`} 
                      />
                    </div>
                    
                    <h3 className="text-white text-lg font-bold mb-1">Kelan</h3>
                    <p className="text-white/40 text-xs font-light mb-12 tracking-[0.2em] uppercase">AI Support</p>
                    
                    <div className="flex flex-col items-center gap-4 mb-16">
                      <span className="text-white/30 text-xs uppercase tracking-[0.3em]">Talking</span>
                      <span className="text-tertiary text-2xl font-mono">{formatTime(callDuration)}</span>
                    </div>
                    
                    <div className="flex items-end gap-12">
                      <div className="flex flex-col items-center gap-3">
                        <button 
                          onClick={() => setIsMuted(!isMuted)}
                          className={`w-14 h-14 rounded-full flex items-center justify-center border transition-all ${isMuted ? 'bg-red-500/20 border-red-500 text-red-500' : 'bg-white/5 border-white/20 text-white hover:border-white'}`}
                        >
                          {isMuted ? <MicOff className="w-5 h-5" /> : <Mic className="w-5 h-5" />}
                        </button>
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">Mute</span>
                      </div>
                      
                      <div className="flex flex-col items-center gap-3">
                        <button 
                          onClick={endVoiceCall}
                          className="w-16 h-16 rounded-full flex items-center justify-center bg-red-600 text-white hover:bg-red-700 hover:scale-110 transition-all shadow-[0_0_20px_rgba(220,38,38,0.4)]"
                        >
                          <PhoneOff className="w-7 h-7" />
                        </button>
                        <span className="text-[10px] text-white/40 uppercase tracking-widest font-bold">End Call</span>
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-primary text-tertiary rounded-full shadow-2xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-[101] border border-tertiary/40"
        onClick={() => setView(v => v === 'closed' ? 'menu' : 'closed')}
        whileHover={{ rotate: 90 }}
      >
        <AnimatePresence mode="wait">
          {view === 'closed' ? (
            <motion.div key="chaticon" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5 }}>
              <MessageSquare className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div key="closeicon" initial={{ scale: 0.5, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.5 }}>
              <X className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
