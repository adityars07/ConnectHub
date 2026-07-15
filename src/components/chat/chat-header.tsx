"use client";

import { ArrowLeft, Phone, Video, MoreVertical } from "lucide-react";
import { type User } from "@/lib/mock-data";
import { formatRelativeTime, getInitials } from "@/lib/utils";

interface ChatHeaderProps {
  user: User;
  onBack?: () => void;
  showBack?: boolean;
}

export function ChatHeader({ user, onBack, showBack }: ChatHeaderProps) {
  return (
    <div className="flex items-center justify-between px-4 py-3 border-b border-border bg-card/80 backdrop-blur-sm">
      <div className="flex items-center gap-3">
        {showBack && (
          <button
            onClick={onBack}
            className="h-9 w-9 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors lg:hidden"
          >
            <ArrowLeft className="h-5 w-5" />
          </button>
        )}
        <div className="relative">
          <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={user.avatar}
                alt={user.name}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-sm font-semibold text-white">
                {getInitials(user.name)}
              </span>
            )}
          </div>
          {user.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
          )}
        </div>
        <div>
          <h3 className="text-sm font-semibold">{user.name}</h3>
          <p className="text-xs text-muted-foreground">
            {user.isOnline
              ? "Online"
              : `Last seen ${formatRelativeTime(user.lastSeen)}`}
          </p>
        </div>
      </div>

      <div className="flex items-center gap-1">
        {[Phone, Video, MoreVertical].map((Icon, i) => (
          <button
            key={i}
            className="h-9 w-9 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors"
          >
            <Icon className="h-4.5 w-4.5 text-muted-foreground" />
          </button>
        ))}
      </div>
    </div>
  );
}
