"use client";

import { motion } from "framer-motion";
import { cn, getInitials } from "@/lib/utils";
import { type User } from "@/lib/mock-data";

interface UserCardProps {
  user: User;
  index?: number;
  onClick?: () => void;
  compact?: boolean;
}

export function UserCard({ user, index = 0, onClick, compact }: UserCardProps) {
  if (compact) {
    return (
      <motion.button
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.2, delay: index * 0.03 }}
        whileHover={{ scale: 1.05 }}
        onClick={onClick}
        className="flex flex-col items-center gap-1.5 p-2 rounded-xl hover:bg-secondary/60 transition-all"
      >
        <div className="relative">
          <div className="h-11 w-11 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
            {user.avatar ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
            ) : (
              <span className="text-xs font-semibold text-white">{getInitials(user.name)}</span>
            )}
          </div>
          {user.isOnline && (
            <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-background" />
          )}
        </div>
        <span className="text-[11px] text-muted-foreground truncate max-w-[60px]">
          {user.name.split(" ")[0]}
        </span>
      </motion.button>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ y: -2 }}
      className="flex items-center gap-3 p-3 rounded-xl border border-border bg-card hover:shadow-md transition-all duration-200 cursor-pointer"
      onClick={onClick}
    >
      <div className="relative flex-shrink-0">
        <div className="h-12 w-12 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
          {user.avatar ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={user.avatar} alt={user.name} className="h-full w-full object-cover" />
          ) : (
            <span className="text-sm font-semibold text-white">{getInitials(user.name)}</span>
          )}
        </div>
        {user.isOnline && (
          <div className="absolute -bottom-0.5 -right-0.5 h-3.5 w-3.5 rounded-full bg-green-500 border-2 border-card" />
        )}
      </div>
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold truncate">{user.name}</h4>
        <p className="text-xs text-muted-foreground truncate">{user.status}</p>
      </div>
      <span
        className={cn(
          "text-[10px] font-medium px-2 py-0.5 rounded-full capitalize",
          user.role === "admin"
            ? "bg-red-500/10 text-red-500"
            : user.role === "moderator"
            ? "bg-blue-500/10 text-blue-500"
            : "bg-secondary text-muted-foreground"
        )}
      >
        {user.role}
      </span>
    </motion.div>
  );
}
