"use client";

import { motion } from "framer-motion";
import { Check, CheckCheck } from "lucide-react";
import { cn, formatTime } from "@/lib/utils";
import { type Message, currentUser } from "@/lib/mock-data";

interface MessageBubbleProps {
  message: Message;
  index: number;
}

export function MessageBubble({ message, index }: MessageBubbleProps) {
  const isOutgoing = message.senderId === currentUser.id;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      transition={{ duration: 0.2, delay: index * 0.03 }}
      className={cn("flex", isOutgoing ? "justify-end" : "justify-start")}
    >
      <div
        className={cn(
          "max-w-[75%] px-4 py-2.5 shadow-sm",
          isOutgoing
            ? "bubble-outgoing bg-green-500 text-white"
            : "bubble-incoming bg-card border border-border"
        )}
      >
        <p className="text-sm leading-relaxed whitespace-pre-wrap">
          {message.content}
        </p>
        <div
          className={cn(
            "flex items-center justify-end gap-1 mt-1",
            isOutgoing ? "text-white/70" : "text-muted-foreground"
          )}
        >
          <span suppressHydrationWarning className="text-[10px]">{formatTime(message.timestamp)}</span>
          {isOutgoing && (
            message.isRead ? (
              <CheckCheck className="h-3.5 w-3.5" />
            ) : (
              <Check className="h-3.5 w-3.5" />
            )
          )}
        </div>
      </div>
    </motion.div>
  );
}
