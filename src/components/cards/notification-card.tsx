"use client";

import { motion } from "framer-motion";
import {
  Megaphone,
  Calendar,
  MessageCircle,
  Moon,
  Users,
  Shield,
  Building,
  Trophy,
  Image,
  Monitor,
} from "lucide-react";
import { cn, formatRelativeTime } from "@/lib/utils";
import { type Notification } from "@/lib/mock-data";

const iconMap: Record<string, React.ElementType> = {
  megaphone: Megaphone,
  calendar: Calendar,
  "message-circle": MessageCircle,
  moon: Moon,
  users: Users,
  shield: Shield,
  building: Building,
  trophy: Trophy,
  image: Image,
  presentation: Monitor,
};

const typeColors: Record<string, string> = {
  announcement: "bg-blue-500/10 text-blue-500",
  event: "bg-purple-500/10 text-purple-500",
  message: "bg-green-500/10 text-green-500",
  system: "bg-orange-500/10 text-orange-500",
};

interface NotificationCardProps {
  notification: Notification;
  onClick?: () => void;
  index?: number;
}

export function NotificationCard({
  notification,
  onClick,
  index = 0,
}: NotificationCardProps) {
  const IconComponent = iconMap[notification.icon] || MessageCircle;
  const colorClass = typeColors[notification.type] || typeColors.system;

  return (
    <motion.button
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ x: 2 }}
      onClick={onClick}
      className={cn(
        "w-full flex items-start gap-3 p-4 rounded-xl transition-all duration-200 text-left",
        notification.isRead
          ? "hover:bg-secondary/60"
          : "bg-green-500/5 hover:bg-green-500/10 border border-green-500/10"
      )}
    >
      {/* Icon */}
      <div
        className={cn(
          "flex-shrink-0 h-10 w-10 rounded-xl flex items-center justify-center",
          colorClass
        )}
      >
        <IconComponent className="h-5 w-5" />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-start justify-between gap-2">
          <h4
            className={cn(
              "text-sm truncate",
              notification.isRead ? "font-medium" : "font-semibold"
            )}
          >
            {notification.title}
          </h4>
          {!notification.isRead && (
            <div className="flex-shrink-0 h-2 w-2 rounded-full bg-green-500 mt-1.5" />
          )}
        </div>
        <p className="text-xs text-muted-foreground mt-0.5 line-clamp-2">
          {notification.description}
        </p>
        <p suppressHydrationWarning className="text-[11px] text-muted-foreground/70 mt-1.5">
          {formatRelativeTime(notification.timestamp)}
        </p>
      </div>
    </motion.button>
  );
}
