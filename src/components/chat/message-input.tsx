"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Smile, Paperclip, Mic } from "lucide-react";
import { cn } from "@/lib/utils";

interface MessageInputProps {
  onSend?: (message: string) => void;
}

export function MessageInput({ onSend }: MessageInputProps) {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend?.(message.trim());
      setMessage("");
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="p-3 border-t border-border bg-card/50 backdrop-blur-sm">
      <div className="flex items-end gap-2">
        {/* Emoji Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex-shrink-0 h-10 w-10 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
        >
          <Smile className="h-5 w-5 text-muted-foreground" />
        </motion.button>

        {/* Attachment Button */}
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="flex-shrink-0 h-10 w-10 rounded-xl bg-secondary hover:bg-secondary/80 flex items-center justify-center transition-colors"
        >
          <Paperclip className="h-5 w-5 text-muted-foreground" />
        </motion.button>

        {/* Input */}
        <div className="flex-1 relative">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type a message..."
            rows={1}
            className={cn(
              "w-full resize-none rounded-2xl border border-border bg-background px-4 py-2.5",
              "text-sm placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50",
              "transition-all duration-200 max-h-32"
            )}
            style={{ minHeight: "40px" }}
          />
        </div>

        {/* Send / Mic Button */}
        <motion.button
          onClick={handleSend}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center transition-all duration-200",
            message.trim()
              ? "bg-gradient-to-r from-green-500 to-green-600 text-white shadow-lg shadow-green-500/25"
              : "bg-secondary text-muted-foreground"
          )}
        >
          {message.trim() ? (
            <Send className="h-4.5 w-4.5" />
          ) : (
            <Mic className="h-5 w-5" />
          )}
        </motion.button>
      </div>
    </div>
  );
}
