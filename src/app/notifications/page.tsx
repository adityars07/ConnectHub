"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowLeft, Bell, CheckCheck } from "lucide-react";
import { useApp } from "@/contexts/app-context";
import { NotificationCard } from "@/components/cards/notification-card";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { MobileNav } from "@/components/shared/mobile-nav";
import { EmptyState } from "@/components/shared/empty-state";
import { cn } from "@/lib/utils";

type FilterType = "all" | "unread" | "announcement" | "event";

export default function NotificationsPage() {
  const { notifications, markNotificationRead, markAllNotificationsRead, unreadNotifications } =
    useApp();
  const [filter, setFilter] = useState<FilterType>("all");

  const filteredNotifications = notifications.filter((n) => {
    if (filter === "all") return true;
    if (filter === "unread") return !n.isRead;
    return n.type === filter;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="sticky top-0 z-20 glass border-b border-border">
        <div className="max-w-2xl mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard"
              className="h-9 w-9 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <div>
              <h1 className="text-lg font-semibold">Notifications</h1>
              {unreadNotifications > 0 && (
                <p className="text-xs text-muted-foreground">
                  {unreadNotifications} unread
                </p>
              )}
            </div>
          </div>
          <div className="flex items-center gap-2">
            {unreadNotifications > 0 && (
              <button
                onClick={markAllNotificationsRead}
                className="flex items-center gap-1.5 text-xs font-medium text-green-600 dark:text-green-400 px-3 py-1.5 rounded-lg hover:bg-green-500/10 transition-colors"
              >
                <CheckCheck className="h-3.5 w-3.5" />
                Mark all read
              </button>
            )}
            <ThemeToggle />
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-4 pb-24 lg:pb-8">
        {/* Filters */}
        <div className="flex gap-1.5 mb-4 overflow-x-auto no-scrollbar">
          {(
            [
              { key: "all", label: "All" },
              { key: "unread", label: "Unread" },
              { key: "announcement", label: "Announcements" },
              { key: "event", label: "Events" },
            ] as const
          ).map(({ key, label }) => (
            <button
              key={key}
              onClick={() => setFilter(key)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all whitespace-nowrap",
                filter === key
                  ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                  : "text-muted-foreground hover:bg-secondary"
              )}
            >
              {label}
            </button>
          ))}
        </div>

        {/* Notification List */}
        <div className="space-y-1">
          {filteredNotifications.map((notification, i) => (
            <NotificationCard
              key={notification.id}
              notification={notification}
              index={i}
              onClick={() => markNotificationRead(notification.id)}
            />
          ))}

          {filteredNotifications.length === 0 && (
            <EmptyState
              icon={<Bell className="h-8 w-8 text-muted-foreground" />}
              title="No notifications"
              description="You're all caught up! We'll notify you when something new arrives."
            />
          )}
        </div>
      </div>

      <MobileNav />
    </div>
  );
}
