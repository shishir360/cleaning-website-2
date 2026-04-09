"use client";

import { useState, useRef, useEffect } from "react";
import { Card } from "./card";
import { Button } from "./button";
import { Input } from "./input";
import { Send } from "lucide-react";

interface Message {
  id: string;
  content: string;
  sender: "me" | "other";
}

interface ChatScreenProps {
  userName: string;
  userAvatar?: string;
  userOnline?: boolean;
}

const ChatScreen: React.FC<ChatScreenProps> = ({
  userName,
  userAvatar,
  userOnline = false,
}) => {
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", content: "Hi there!", sender: "other" },
    { id: "2", content: "Hello 👋", sender: "me" },
  ]);
  const [newMessage, setNewMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!newMessage.trim()) return;
    const msg: Message = {
      id: Date.now().toString(),
      content: newMessage,
      sender: "me",
    };
    setMessages((prev) => [...prev, msg]);
    setNewMessage("");
  };

  return (
    <Card className="w-full max-w-md h-[600px] flex flex-col rounded bg-inverted">
      {/* Header */}
      <div className="flex items-center gap-3 p-4 border-b border-black/10 bg-inverted">
        <div className="w-10 h-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold overflow-hidden">
          {userAvatar ? (
            <img src={userAvatar} alt={userName} className="w-full h-full rounded-full" />
          ) : (
            (userName?.charAt(0) || "U")
          )}
        </div>
        <div>
          <p className="font-bold text-sm text-primary">{userName}</p>
          {userOnline && <span className="text-xs text-tertiary">Online</span>}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-3 overflow-y-auto bg-paper">
        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex items-end gap-2 ${
              msg.sender === "me" ? "justify-end" : "justify-start"
            }`}
          >
            {msg.sender === "other" && (
              <div className="w-6 h-6 bg-primary/20 rounded-full flex items-center justify-center text-primary text-xs font-bold">
                { (userName?.charAt(0) || "U")}
              </div>
            )}

            <div
              className={`px-3 py-2 rounded-lg text-sm max-w-xs break-words transition-all duration-200 hover:scale-105 ${
                msg.sender === "me"
                  ? "bg-tertiary text-primary font-medium"
                  : "bg-inverted text-primary shadow border border-black/5"
              }`}
            >
              {msg.content}
            </div>

            {msg.sender === "me" && (
              <div className="w-6 h-6 bg-tertiary rounded-full flex items-center justify-center text-primary font-bold text-xs">
                M
              </div>
            )}
          </div>
        ))}

        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-3 border-t border-black/10 flex gap-2 bg-inverted">
        <Input
          placeholder="Type a message..."
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") sendMessage();
          }}
          className="bg-paper text-primary focus-visible:border-tertiary"
        />
        <Button
          onClick={sendMessage}
          className="shrink-0 rounded-full bg-tertiary hover:bg-[#d4af37] text-primary"
        >
          <Send className="h-4 w-4" />
        </Button>
      </div>
    </Card>
  );
};

export default ChatScreen;
