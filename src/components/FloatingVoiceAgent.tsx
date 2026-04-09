import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, X, Sparkles, Volume2, VolumeX, Phone, PhoneOff } from 'lucide-react';

// ─── Reuse same Gemini setup as chatbot ───────────────────────────────────────
const CLIENT_API_KEY = (import.meta as any).env?.VITE_GEMINI_API_KEY as string | undefined;
const IS_NETLIFY = window.location.hostname !== 'localhost' && window.location.hostname !== '127.0.0.1';
const GEMINI_DIRECT_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent`;

type GeminiPart = { text: string } | { functionCall: { name: string; args: Record<string, unknown> } } | { functionResponse: { name: string; response: Record<string, unknown> } };
type GeminiContent = { role: 'user' | 'model'; parts: GeminiPart[] };
type GeminiResponse = { candidates?: Array<{ content: GeminiContent; finishReason?: string }>; error?: { message: string } };

const VOICE_SYSTEM_PROMPT = `You are a voice AI assistant for Lumina Clean Services, a premium cleaning company in New York. 
You are speaking to a customer on the phone. Keep all responses SHORT — maximum 2-3 sentences. Speak naturally, conversationally, no lists or markdown. 
You can answer questions about cleaning services, pricing (Standard $150, Deep $250, Move-In/Out $350), and availability in Manhattan, Brooklyn, Queens, Bronx.
If they want to book, ask for their name, phone, and desired date/time.
Always end with a helpful follow-up question to keep the conversation going.`;

const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

async function callGeminiVoice(history: GeminiContent[], message: string): Promise<string> {
  const useProxy = IS_NETLIFY || !CLIENT_API_KEY;
  let data: GeminiResponse;

  if (useProxy) {
    const res = await fetch('/.netlify/functions/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ history, message }),
    });
    data = await res.json();
  } else {
    const contents: GeminiContent[] = [
      ...history,
      { role: 'user', parts: [{ text: message }] },
    ];
    const res = await fetch(`${GEMINI_DIRECT_URL}?key=${CLIENT_API_KEY}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        system_instruction: { parts: [{ text: VOICE_SYSTEM_PROMPT }] },
        contents,
      }),
    });
    data = await res.json();
  }

  if (data.error) throw new Error(data.error.message);
  const parts = data.candidates?.[0]?.content?.parts ?? [];
  const textPart = parts.find((p): p is { text: string } => 'text' in p);
  return textPart?.text ?? 'Sorry, I did not catch that. Could you repeat?';
}

// ─── Animated Audio Visualizer Bars ───────────────────────────────────────────
function AudioBars({ isActive, color = '#fff' }: { isActive: boolean; color?: string }) {
  const bars = [3, 5, 8, 5, 10, 6, 4, 9, 6, 3, 7, 5, 8, 4, 6];
  return (
    <div className="flex items-center gap-[3px] h-8">
      {bars.map((h, i) => (
        <motion.div
          key={i}
          style={{ backgroundColor: color, width: 3, borderRadius: 4 }}
          animate={
            isActive
              ? {
                  height: [h, h * 2.5 + Math.random() * 8, h, h * 1.5, h],
                  opacity: [0.6, 1, 0.7, 1, 0.6],
                }
              : { height: 3, opacity: 0.3 }
          }
          transition={
            isActive
              ? {
                  duration: 0.5 + Math.random() * 0.4,
                  repeat: Infinity,
                  repeatType: 'reverse',
                  delay: i * 0.04,
                  ease: 'easeInOut',
                }
              : { duration: 0.3 }
          }
        />
      ))}
    </div>
  );
}

// ─── Orbiting Pulse Orb ────────────────────────────────────────────────────────
function PulseOrb({ state }: { state: 'idle' | 'listening' | 'speaking' | 'thinking' }) {
  const colors = {
    idle: { outer: 'rgba(255,255,255,0.08)', inner: 'rgba(255,255,255,0.15)', glow: '#ffffff30' },
    listening: { outer: 'rgba(239,68,68,0.18)', inner: 'rgba(239,68,68,0.35)', glow: '#ef444460' },
    speaking: { outer: 'rgba(99,102,241,0.18)', inner: 'rgba(99,102,241,0.35)', glow: '#6366f160' },
    thinking: { outer: 'rgba(251,191,36,0.15)', inner: 'rgba(251,191,36,0.3)', glow: '#fbbf2450' },
  };
  const c = colors[state];

  return (
    <div className="relative flex items-center justify-center w-32 h-32">
      {/* Outer ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 128, height: 128, border: `2px solid ${c.outer}` }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: 'easeInOut' }}
      />
      {/* Middle ring */}
      <motion.div
        className="absolute rounded-full"
        style={{ width: 96, height: 96, border: `2px solid ${c.inner}`, boxShadow: `0 0 20px ${c.glow}` }}
        animate={{ scale: [1, 1.08, 1], opacity: [0.6, 1, 0.6] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut', delay: 0.3 }}
      />
      {/* Core orb */}
      <motion.div
        className="w-20 h-20 rounded-full flex items-center justify-center"
        style={{
          background: `radial-gradient(circle at 35% 35%, ${c.inner}, ${c.outer})`,
          boxShadow: `0 0 30px ${c.glow}, 0 0 60px ${c.glow}`,
        }}
        animate={
          state === 'listening'
            ? { scale: [1, 1.12, 0.96, 1.08, 1] }
            : state === 'speaking'
            ? { scale: [1, 1.05, 1.1, 1.02, 1] }
            : { scale: 1 }
        }
        transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
      >
        {state === 'thinking' ? (
          <motion.div
            className="w-6 h-6 border-2 border-yellow-300/70 border-t-transparent rounded-full"
            animate={{ rotate: 360 }}
            transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          />
        ) : (
          <Sparkles className="w-7 h-7 text-white/90" />
        )}
      </motion.div>
    </div>
  );
}

// ─── Main Component ────────────────────────────────────────────────────────────
type ConvEntry = { role: 'user' | 'ai'; text: string };

export default function FloatingVoiceAgent() {
  const [isOpen, setIsOpen] = useState(false);
  const [agentState, setAgentState] = useState<'idle' | 'listening' | 'speaking' | 'thinking'>('idle');
  const [conversation, setConversation] = useState<ConvEntry[]>([]);
  const [currentTranscript, setCurrentTranscript] = useState('');
  const [isVoiceEnabled, setIsVoiceEnabled] = useState(true);
  const [sessionActive, setSessionActive] = useState(false);
  const [isSpeechAvail, setIsSpeechAvail] = useState(false);

  const recognitionRef = useRef<any>(null);
  const geminiHistoryRef = useRef<GeminiContent[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);
  const handleUserSpeechRef = useRef<((text: string) => void) | null>(null);

  // Scroll conversation to bottom
  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [conversation]);

  // Init speech recognition
  useEffect(() => {
    if (!SpeechRecognition) return;
    setIsSpeechAvail(true);
    const rec = new SpeechRecognition();
    rec.continuous = false;
    rec.interimResults = true;
    rec.lang = 'en-US';

    rec.onresult = (event: any) => {
      const interim = Array.from(event.results)
        .map((r: any) => r[0].transcript)
        .join('');
      setCurrentTranscript(interim);

      if (event.results[event.results.length - 1].isFinal) {
        const finalText = interim.trim();
        setCurrentTranscript('');
        if (finalText && handleUserSpeechRef.current) {
          handleUserSpeechRef.current(finalText);
        }
      }
    };

    rec.onerror = () => {
      setAgentState('idle');
      setCurrentTranscript('');
    };

    rec.onend = () => {
      // Only reset if we're still in listening state (not moved to thinking)
      setAgentState(prev => prev === 'listening' ? 'idle' : prev);
    };

    recognitionRef.current = rec;
  }, []);

  const speakText = useCallback((text: string, onEnd?: () => void) => {
    if (!window.speechSynthesis) { onEnd?.(); return; }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferred =
      voices.find(v => v.name.toLowerCase().includes('google') && v.lang === 'en-US') ||
      voices.find(v => v.name.includes('Samantha')) ||
      voices.find(v => v.lang === 'en-US') ||
      voices[0];
    if (preferred) utterance.voice = preferred;
    utterance.rate = 1.0;
    utterance.pitch = 1.05;

    utterance.onstart = () => setAgentState('speaking');
    utterance.onend = () => {
      setAgentState('idle');
      onEnd?.();
    };
    utterance.onerror = () => {
      setAgentState('idle');
      onEnd?.();
    };

    if (isVoiceEnabled) {
      window.speechSynthesis.speak(utterance);
    } else {
      setAgentState('idle');
      onEnd?.();
    }
  }, [isVoiceEnabled]);

  const handleUserSpeech = useCallback(async (text: string) => {
    setAgentState('thinking');
    setConversation(prev => [...prev, { role: 'user', text }]);

    try {
      const reply = await callGeminiVoice(geminiHistoryRef.current, text);

      // Update Gemini history
      geminiHistoryRef.current = [
        ...geminiHistoryRef.current,
        { role: 'user', parts: [{ text }] },
        { role: 'model', parts: [{ text: reply }] },
      ];

      setConversation(prev => [...prev, { role: 'ai', text: reply }]);
      speakText(reply);
    } catch {
      const errMsg = 'Sorry, I ran into an issue. Please try again.';
      setConversation(prev => [...prev, { role: 'ai', text: errMsg }]);
      speakText(errMsg);
    }
  }, [speakText]);

  handleUserSpeechRef.current = handleUserSpeech;

  const startListening = useCallback(() => {
    if (!recognitionRef.current || agentState !== 'idle') return;
    window.speechSynthesis.cancel();
    try {
      recognitionRef.current.start();
      setAgentState('listening');
    } catch { /* already started */ }
  }, [agentState]);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setAgentState('idle');
    setCurrentTranscript('');
  }, []);

  const startSession = useCallback(() => {
    setSessionActive(true);
    geminiHistoryRef.current = [];
    setConversation([]);
    const greeting = "Hello! I'm Lumina's voice assistant. How can I help you today?";
    setConversation([{ role: 'ai', text: greeting }]);
    speakText(greeting);
  }, [speakText]);

  const endSession = useCallback(() => {
    window.speechSynthesis.cancel();
    recognitionRef.current?.stop();
    setSessionActive(false);
    setAgentState('idle');
    setCurrentTranscript('');
    setConversation([]);
    geminiHistoryRef.current = [];
  }, []);

  const handleOpen = useCallback(() => {
    setIsOpen(true);
  }, []);

  const handleClose = useCallback(() => {
    endSession();
    setIsOpen(false);
  }, [endSession]);

  const stateLabel = {
    idle: sessionActive ? 'Tap mic to speak' : 'Tap "Start Call" to begin',
    listening: 'Listening…',
    speaking: 'Lumina is speaking…',
    thinking: 'Thinking…',
  }[agentState];

  const stateColor = {
    idle: 'text-white/50',
    listening: 'text-red-400',
    speaking: 'text-indigo-300',
    thinking: 'text-yellow-300',
  }[agentState];

  return (
    <>
      {/* Voice Agent Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.94 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.94 }}
            transition={{ duration: 0.25, type: 'spring', stiffness: 260, damping: 22 }}
            className="fixed bottom-20 right-20 sm:bottom-24 sm:right-24 w-[calc(100vw-3rem)] sm:w-[360px] z-[100] font-sans"
            style={{ maxHeight: '90vh' }}
          >
            {/* Glass card */}
            <div
              className="rounded-3xl overflow-hidden shadow-2xl flex flex-col"
              style={{
                background: 'linear-gradient(135deg, #0e1120ee 0%, #1a1f3cee 60%, #0e1120ee 100%)',
                border: '1px solid rgba(255,255,255,0.1)',
                backdropFilter: 'blur(24px)',
                WebkitBackdropFilter: 'blur(24px)',
              }}
            >
              {/* Header bar */}
              <div className="flex items-center justify-between px-5 py-4 border-b border-white/10">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 rounded-full bg-green-400 shadow-[0_0_6px_#4ade80]" />
                  <span className="text-white/80 text-sm font-semibold tracking-wide">Lumina Voice Agent</span>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setIsVoiceEnabled(v => !v)}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                    title={isVoiceEnabled ? 'Mute' : 'Unmute'}
                  >
                    {isVoiceEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  </button>
                  <button
                    onClick={handleClose}
                    className="p-1.5 rounded-full hover:bg-white/10 transition-colors text-white/50 hover:text-white"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Orb area */}
              <div className="flex flex-col items-center pt-6 pb-4 px-5">
                <PulseOrb state={agentState} />
                <motion.p
                  key={agentState}
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className={`mt-3 text-xs font-medium tracking-wider uppercase ${stateColor}`}
                >
                  {stateLabel}
                </motion.p>

                {/* Live transcript */}
                <AnimatePresence>
                  {currentTranscript && (
                    <motion.div
                      initial={{ opacity: 0, y: 6 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="mt-3 px-4 py-2 rounded-xl text-center text-sm text-white/70 italic"
                      style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.2)' }}
                    >
                      "{currentTranscript}"
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Audio visualizer */}
              <div className="flex justify-center py-1">
                <AudioBars
                  isActive={agentState === 'speaking' || agentState === 'listening'}
                  color={agentState === 'listening' ? '#f87171' : '#818cf8'}
                />
              </div>

              {/* Conversation transcript */}
              {conversation.length > 0 && (
                <div
                  ref={scrollRef}
                  className="mx-4 my-3 rounded-2xl overflow-y-auto flex flex-col gap-2 p-3"
                  style={{
                    maxHeight: 160,
                    background: 'rgba(255,255,255,0.04)',
                    border: '1px solid rgba(255,255,255,0.07)',
                  }}
                >
                  {conversation.map((entry, i) => (
                    <div key={i} className={`flex ${entry.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div
                        className={`max-w-[85%] rounded-xl px-3 py-2 text-xs leading-relaxed ${
                          entry.role === 'user'
                            ? 'text-white/90'
                            : 'text-indigo-200'
                        }`}
                        style={{
                          background:
                            entry.role === 'user'
                              ? 'rgba(239,68,68,0.15)'
                              : 'rgba(99,102,241,0.15)',
                          border:
                            entry.role === 'user'
                              ? '1px solid rgba(239,68,68,0.2)'
                              : '1px solid rgba(99,102,241,0.2)',
                        }}
                      >
                        {entry.text}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Controls */}
              <div className="flex items-center justify-center gap-4 px-5 pb-6 pt-3">
                {!sessionActive ? (
                  <motion.button
                    whileTap={{ scale: 0.94 }}
                    onClick={startSession}
                    className="flex items-center gap-2 px-6 py-3 rounded-full text-sm font-bold text-white shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #6366f1, #4f46e5)',
                      boxShadow: '0 0 20px rgba(99,102,241,0.4)',
                    }}
                  >
                    <Phone className="w-4 h-4" />
                    Start Call
                  </motion.button>
                ) : (
                  <>
                    {/* Mic button */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={agentState === 'listening' ? stopListening : startListening}
                      disabled={agentState === 'thinking' || agentState === 'speaking'}
                      className="w-16 h-16 rounded-full flex items-center justify-center shadow-xl transition-all disabled:opacity-40"
                      style={{
                        background:
                          agentState === 'listening'
                            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
                            : 'linear-gradient(135deg, #6366f1, #4f46e5)',
                        boxShadow:
                          agentState === 'listening'
                            ? '0 0 24px rgba(239,68,68,0.5)'
                            : '0 0 20px rgba(99,102,241,0.4)',
                      }}
                    >
                      {agentState === 'listening' ? (
                        <MicOff className="w-7 h-7 text-white" />
                      ) : (
                        <Mic className="w-7 h-7 text-white" />
                      )}
                    </motion.button>

                    {/* End call */}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={endSession}
                      className="w-12 h-12 rounded-full flex items-center justify-center shadow-lg"
                      style={{ background: 'rgba(239,68,68,0.2)', border: '1px solid rgba(239,68,68,0.3)' }}
                      title="End call"
                    >
                      <PhoneOff className="w-5 h-5 text-red-400" />
                    </motion.button>
                  </>
                )}
              </div>

              {/* Footer */}
              {!isSpeechAvail && (
                <p className="text-center text-[10px] text-yellow-400/70 pb-3 px-4">
                  ⚠️ Voice input not supported in this browser. Use Chrome or Edge.
                </p>
              )}
              <div className="text-center pb-3">
                <span className="text-[10px] text-white/20 uppercase tracking-widest">
                  Voice Agent • Powered by Google GenAI
                </span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Voice Button — sits left of the chatbot button */}
      <motion.button
        className="fixed bottom-4 right-20 sm:bottom-6 sm:right-24 w-14 h-14 rounded-full shadow-2xl flex items-center justify-center text-white z-[100]"
        style={{
          background: isOpen
            ? 'linear-gradient(135deg, #ef4444, #dc2626)'
            : 'linear-gradient(135deg, #6366f1, #4f46e5)',
          boxShadow: isOpen
            ? '0 0 20px rgba(239,68,68,0.5)'
            : '0 0 20px rgba(99,102,241,0.5)',
        }}
        onClick={() => (isOpen ? handleClose() : handleOpen())}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        aria-label="Toggle Voice Agent"
        title="Talk to AI Voice Agent"
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <X className="w-6 h-6" />
            </motion.div>
          ) : (
            <motion.div
              key="mic"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <Mic className="w-6 h-6" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
