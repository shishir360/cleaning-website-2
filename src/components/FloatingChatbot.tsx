import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageSquare, X, Send, Sparkles, Loader2, Mic, MicOff, Volume2, VolumeX, CheckCircle2 } from 'lucide-react';
import { GoogleGenAI } from '@google/genai';

// Initialize the Gemini API
const apiKey = (import.meta as any).env.VITE_GEMINI_API_KEY;
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

const SYSTEM_PROMPT = `You are a helpful, professional, and friendly virtual assistant for Lumina Clean Services, a premium cleaning company serving the New York area.
Your goal is to answer questions about cleaning services, pricing, and availability. 
You can ALSO book appointments using the book_appointment tool. To book an appointment, you MUST ask the user for their Name, Phone number, and Desired Date/Time. Do not assume any details. Once you have all 3, call the book_appointment tool.

### Service FAQs:
- Standard Cleaning: Ideal for routine upkeep. Covers dusting, vacuuming, mopping, bathroom sanitation, and kitchen surface wiping. Starts at $150.
- Deep Cleaning: A more intensive clean for neglected areas. Includes inside cabinets, baseboards, interior windows, and appliances. Starts at $250.
- Move-In/Move-Out: Specialized for empty homes. High-detail cleaning to ensure the property is spotless for the next resident. Starts at $350.
- Service Areas: Manhattan, Brooklyn, Queens, Bronx.
- Eco-Friendly: We use exclusively zero-toxin, family-safe, and pet-friendly cleaning agents for every job.

CRITICAL INSTRUCTIONS:
- Keep your answers brief, informative, and courteous.
- DO NOT use markdown like asterisks, bolding, or bullet points if possible because your text will be read aloud by a human-like voice assistant. Speak in conversational, easy-to-hear sentences.
- If the user asks a question not covered by the FAQ, politely state that you can have a human representative contact them via phone, and ask for their number.`;

const bookingTool = {
  functionDeclarations: [
    {
      name: "book_appointment",
      description: "Books a cleaning appointment for the customer.",
      parameters: {
        type: "OBJECT",
        properties: {
          customer_name: { type: "STRING", description: "Customer's full name" },
          phone: { type: "STRING", description: "Customer's contact phone number" },
          datetime: { type: "STRING", description: "The date and time they want the cleaning" },
          service_type: { type: "STRING", description: "Type of clean (e.g. standard, deep, move-in)" }
        },
        required: ["customer_name", "phone", "datetime"]
      }
    }
  ]
};

type Message = {
  id: string;
  sender: 'ai' | 'user' | 'system';
  text: string;
};

// Web Speech API interfaces
const SpeechRecognition = (window as any).SpeechRecognition || (window as any).webkitSpeechRecognition;

export default function FloatingChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: '1', sender: 'ai', text: 'Hello! I am your Lumina Virtual Assistant. I can answer your questions or help you book an appointment today. How can I assist you?' },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  
  // KEY FIX: Use ref for chat session — avoids React async state update delay
  // When user sends first message, useState would still be null; useRef is instant.
  const chatSessionRef = useRef<any>(null);
  
  // Voice states
  const [isVoiceOutputEnabled, setIsVoiceOutputEnabled] = useState(true);
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<any>(null);
  const [isSpeechAvailable, setIsSpeechAvailable] = useState(false);

  // Scroll to bottom on new messages
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages, isOpen]);

  // Set up speech recognition once on mount
  useEffect(() => {
    if (SpeechRecognition) {
      setIsSpeechAvailable(true);
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = false;
      recognition.lang = 'en-US';

      recognition.onerror = (event: any) => {
        console.error("Speech recognition error", event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
    }
  }, []);
  
  // Keep a always-fresh ref to handleSendMessage for speech recognition callback
  const handleSendMessageRef = useRef<((txt: string) => void) | null>(null);
  
  // Wire up speech recognition result to always-fresh ref
  useEffect(() => {
    if (recognitionRef.current) {
      recognitionRef.current.onresult = (event: any) => {
        const text = event.results[0][0].transcript;
        setInputValue('');
        setIsListening(false);
        if (text.trim().length > 0 && handleSendMessageRef.current) {
          handleSendMessageRef.current(text);
        }
      };
    }
  }, [isSpeechAvailable]);

  // Initialize chat session immediately when chatbot opens
  useEffect(() => {
    if (isOpen && ai && !chatSessionRef.current) {
      try {
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.0-flash',
          config: {
            systemInstruction: SYSTEM_PROMPT,
            tools: [bookingTool as any],
          }
        });
        
        // Greet with voice when first opened
        if (isVoiceOutputEnabled && messages.length === 1) {
          speakText(messages[0].text);
        }
      } catch (err) {
        console.error("Failed to init chat session", err);
      }
    }
  }, [isOpen]);

  const speakText = (text: string) => {
    if (!isVoiceOutputEnabled || !window.speechSynthesis) return;
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => v.name.includes('Google') || v.name.includes('Samantha') || v.name.includes('Natural')) || voices[0];
    if (preferredVoice) utterance.voice = preferredVoice;
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
    setIsVoiceOutputEnabled(prev => {
      if (prev) window.speechSynthesis.cancel();
      return !prev;
    });
  };

  const handleSendMessage = async (textOveride?: string) => {
    const messageToSend = textOveride || inputValue;
    if (!messageToSend.trim()) return;
    
    window.speechSynthesis.cancel();
    if (!textOveride) setInputValue('');
    
    const newUserMessage: Message = { id: Date.now().toString(), sender: 'user', text: messageToSend.trim() };
    setMessages((prev) => [...prev, newUserMessage]);
    
    // If session not yet created (edge case: user typed before useEffect ran), create it now
    if (ai && !chatSessionRef.current) {
      try {
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-2.0-flash',
          config: {
            systemInstruction: SYSTEM_PROMPT,
            tools: [bookingTool as any],
          }
        });
      } catch (err) {
        console.error("Failed to init chat session on demand", err);
      }
    }
    
    if (!ai || !chatSessionRef.current) {
      setMessages((prev) => [...prev, { 
        id: Date.now().toString(), 
        sender: 'ai', 
        text: 'Sorry, I am currently offline or missing the API key configuration. Please call us at (212) 555-0198.' 
      }]);
      return;
    }

    setIsLoading(true);
    
    try {
      let response = await chatSessionRef.current.sendMessage({ message: messageToSend.trim() });
      
      // Handle Function Calling
      if (response.functionCalls && response.functionCalls.length > 0) {
        const call = response.functionCalls[0];
        
        if (call.name === "book_appointment") {
          const args = call.args;
          const bookingMsg: Message = {
            id: Date.now().toString() + '-sys',
            sender: 'system',
            text: `📅 Booking Confirmed for ${args.customer_name} on ${args.datetime} (${args.service_type || 'Cleaning'})! We will contact ${args.phone} shortly.`
          };
          setMessages(prev => [...prev, bookingMsg]);
          
          // Send tool result back to model
          response = await chatSessionRef.current.sendMessage({
            message: [{
              functionResponse: {
                name: 'book_appointment',
                response: { status: 'success', confirmation_id: 'LUM-' + Math.floor(Math.random() * 10000) }
              }
            }]
          });
        }
      }
      
      if (response.text) {
        const newAiMessage: Message = { 
          id: Date.now().toString(), 
          sender: 'ai', 
          text: response.text 
        };
        setMessages((prev) => [...prev, newAiMessage]);
        speakText(response.text);
      }
      
    } catch (error: any) {
      console.error('Chat AI Error:', error);
      const errMsg = error?.message?.includes('API_KEY_INVALID') 
        ? 'The AI API key is invalid. Please contact support.'
        : 'Sorry, I encountered an error connecting to the AI system. Please try again later.';
      setMessages((prev) => [...prev, { 
        id: Date.now().toString(), 
        sender: 'ai', 
        text: errMsg
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  // Always keep ref in sync with latest handler (for speech)
  handleSendMessageRef.current = handleSendMessage;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') handleSendMessage();
  };

  return (
    <>
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
              <div className="absolute inset-0 bg-gradient-to-r from-primary to-black opacity-50"></div>
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
                  aria-label="Toggle Voice Out"
                  title={isVoiceOutputEnabled ? "Mute Voice" : "Enable Voice"}
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

            {/* Chat Area */}
            <div className="flex-1 p-4 overflow-y-auto bg-slate-50 flex flex-col gap-4">
              {messages.map((msg) => {
                if (msg.sender === 'system') {
                  return (
                    <div key={msg.id} className="flex justify-center my-2">
                       <div className="bg-green-50 border border-green-200 text-green-800 text-xs px-4 py-2 rounded-full font-medium shadow-sm flex items-center gap-2">
                         <CheckCircle2 className="w-4 h-4 text-green-600" />
                         {msg.text}
                       </div>
                    </div>
                  );
                }

                return (
                  <div 
                    key={msg.id} 
                    className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
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
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
                    </span>
                    <span className="text-xs font-medium">Listening...</span>
                  </div>
                </div>
              )}

              {isLoading && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-100 rounded-2xl rounded-bl-none p-4 shadow-sm flex gap-2 items-center">
                    <Loader2 className="w-4 h-4 text-primary animate-spin" />
                    <span className="text-xs text-gray-500 font-medium">Lumina AI is thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 bg-white border-t border-gray-100 relative">
               <div className="flex items-center gap-2">
                 
                 {isSpeechAvailable && (
                   <button
                    onClick={toggleListen}
                    className={`w-10 h-10 flex items-center justify-center rounded-full transition-all flex-shrink-0 ${isListening ? 'bg-red-50 text-red-500 hover:bg-red-100' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'}`}
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
                    onKeyDown={handleKeyDown}
                    placeholder={isListening ? "Listening..." : "Message AI Agent..."}
                    className="flex-1 bg-transparent border-none focus:outline-none text-sm py-2 text-gray-800"
                    disabled={isListening}
                  />
                  <button 
                    onClick={() => handleSendMessage()}
                    disabled={(!inputValue.trim() && !isListening) || isLoading}
                    className="w-8 h-8 flex items-center justify-center rounded-full bg-primary text-white disabled:opacity-50 disabled:bg-gray-300 transition-colors"
                  >
                    <Send className="w-4 h-4 ml-1" />
                  </button>
                </div>
              </div>
            </div>
            
            {/* Attribution */}
            <div className="bg-white border-t border-gray-50 py-1.5 text-center">
              <span className="text-[10px] text-gray-400 font-light tracking-wide uppercase">AI Assistant • Powered by Google GenAI</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 w-14 h-14 bg-primary rounded-full shadow-2xl flex items-center justify-center text-white hover:scale-105 active:scale-95 transition-transform z-[100] group"
        onClick={() => setIsOpen(!isOpen)}
        whileHover={{ rotate: 15 }}
        whileTap={{ scale: 0.9 }}
        aria-label="Toggle Chat"
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
              <X className="w-6 h-6 outline-none" />
            </motion.div>
          ) : (
            <motion.div
              key="chat"
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.5, opacity: 0 }}
              transition={{ duration: 0.15 }}
            >
              <MessageSquare className="w-6 h-6 outline-none" />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>
    </>
  );
}
