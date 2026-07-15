"use client";

import { motion } from "framer-motion";
import { Pin } from "lucide-react";
import { cn, formatTime, truncate, getInitials } from "@/lib/utils";
import { type Conversation, getOtherParticipant, currentUser } from "@/lib/mock-data";

interface ChatCardProps {
  conversation: Conversation;
  isActive: boolean;
  onClick: () => void;
}

export function ChatCard({ conversation, isActive, onClick }: ChatCardProps) {
  const otherUser = getOtherParticipant(conversation, currentUser.id);
  if (!otherUser) return null;

  return (
    <motion.button
      onClick={onClick}
      whileHover={{ x: 2 }}
      whileTap={{ scale: 0.98 }}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 text-left",
        isActive
          ? "bg-green-500/10 border border-green-500/20"
          : "hover:bg-secondary/60 border border-transparent"
      )}
    >
      {/* Avatar */}
      <div className="relative flex-shrink-0">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
          {otherUser.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={otherUser.avatar}
              alt={otherUser.name}
              className="h-full w-full object-cover"
            />
          ) : (
            <span className="text-sm font-semibold text-white">
              {getInitials(otherUser.name)}
            </span>
          )}
        </div>
        {otherUser.isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-background" />
        )}
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-2">
          <h4 className="text-sm font-semibold truncate">{otherUser.name}</h4>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            {conversation.isPinned && (
              <Pin className="h-3 w-3 text-muted-foreground rotate-45" />
            )}
            {conversation.lastMessage && (
              <span className="text-[11px] text-muted-foreground">
                {formatTime(conversation.lastMessage.timestamp)}
              </span>
            )}
          </div>
        </div>
        <div className="flex items-center justify-between gap-2 mt-0.5">
          <p className="text-xs text-muted-foreground truncate">
            {conversation.lastMessage
              ? truncate(conversation.lastMessage.content, 40)
              : "Start a conversation"}
          </p>
          {conversation.unreadCount > 0 && (
            <span className="flex-shrink-0 flex items-center justify-center h-5 min-w-5 px-1.5 rounded-full bg-green-500 text-[10px] font-bold text-white">
              {conversation.unreadCount}
            </span>
          )}
        </div>
      </div>
    </motion.button>
  );
}
