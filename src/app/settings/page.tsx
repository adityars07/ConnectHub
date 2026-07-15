"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { useTheme } from "next-themes";
import {
  ArrowLeft,
  Building,
  Upload,
  Sun,
  Moon,
  Monitor,
  Bell,
  BellOff,
  Shield,
  LogOut,
  MessageCircle,
} from "lucide-react";
import { MobileNav } from "@/components/shared/mobile-nav";
import { cn } from "@/lib/utils";

export default function SettingsPage() {
  const { theme, setTheme } = useTheme();
  const [orgName, setOrgName] = useState("ConnectHub Organization");
  const [notifMessages, setNotifMessages] = useState(true);
  const [notifAnnouncements, setNotifAnnouncements] = useState(true);
  const [notifEvents, setNotifEvents] = useState(false);
  const [notifSounds, setNotifSounds] = useState(true);
  const [showLogoutDialog, setShowLogoutDialog] = useState(false);

  const themeOptions = [
    { value: "light", label: "Light", icon: Sun },
    { value: "dark", label: "Dark", icon: Moon },
    { value: "system", label: "System", icon: Monitor },
  ];

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
            <h1 className="text-lg font-semibold">Settings</h1>
          </div>
        </div>
      </div>

      <div className="max-w-2xl mx-auto px-4 py-6 pb-24 lg:pb-8 space-y-5">
        {/* Organization */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Building className="h-4 w-4" />
            Organization
          </h3>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Organization Name
              </label>
              <input
                value={orgName}
                onChange={(e) => setOrgName(e.target.value)}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all"
              />
            </div>
            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Organization Logo
              </label>
              <button className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-8 text-sm text-muted-foreground hover:border-green-500/50 hover:text-green-500 transition-all">
                <Upload className="h-4 w-4" />
                Upload Logo
              </button>
            </div>
          </div>
        </motion.div>

        {/* Theme */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Sun className="h-4 w-4" />
            Appearance
          </h3>
          <div className="grid grid-cols-3 gap-3">
            {themeOptions.map(({ value, label, icon: Icon }) => (
              <button
                key={value}
                onClick={() => setTheme(value)}
                className={cn(
                  "flex flex-col items-center gap-2 p-4 rounded-xl transition-all",
                  theme === value
                    ? "bg-green-500/10 border border-green-500/20 text-green-600 dark:text-green-400"
                    : "border border-border text-muted-foreground hover:bg-secondary"
                )}
              >
                <Icon className="h-5 w-5" />
                <span className="text-xs font-medium">{label}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Notifications */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Bell className="h-4 w-4" />
            Notifications
          </h3>
          <div className="space-y-3">
            {[
              {
                label: "Message notifications",
                desc: "Get notified for new messages",
                state: notifMessages,
                setter: setNotifMessages,
              },
              {
                label: "Announcements",
                desc: "Get notified for organization announcements",
                state: notifAnnouncements,
                setter: setNotifAnnouncements,
              },
              {
                label: "Event reminders",
                desc: "Get notified before scheduled events",
                state: notifEvents,
                setter: setNotifEvents,
              },
              {
                label: "Notification sounds",
                desc: "Play sounds for notifications",
                state: notifSounds,
                setter: setNotifSounds,
              },
            ].map(({ label, desc, state, setter }) => (
              <div
                key={label}
                className="flex items-center justify-between py-2"
              >
                <div>
                  <p className="text-sm font-medium">{label}</p>
                  <p className="text-xs text-muted-foreground">{desc}</p>
                </div>
                <button
                  onClick={() => setter(!state)}
                  className={cn(
                    "relative h-6 w-11 rounded-full transition-colors duration-200",
                    state ? "bg-green-500" : "bg-secondary"
                  )}
                >
                  <motion.div
                    layout
                    className={cn(
                      "absolute top-0.5 h-5 w-5 rounded-full bg-white shadow-sm",
                      state ? "left-[22px]" : "left-0.5"
                    )}
                    transition={{ type: "spring", stiffness: 500, damping: 30 }}
                  />
                </button>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Privacy */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="rounded-2xl border border-border bg-card p-5"
        >
          <h3 className="text-sm font-semibold text-muted-foreground mb-4 flex items-center gap-2">
            <Shield className="h-4 w-4" />
            Privacy
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Hide phone number</p>
                <p className="text-xs text-muted-foreground">
                  Your phone is always hidden from other users
                </p>
              </div>
              <span className="px-2.5 py-0.5 rounded-full bg-green-500/10 text-green-500 text-[10px] font-semibold">
                Enabled
              </span>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Show online status</p>
                <p className="text-xs text-muted-foreground">
                  Let others see when you&apos;re online
                </p>
              </div>
              <button className="relative h-6 w-11 rounded-full bg-green-500 transition-colors">
                <div className="absolute top-0.5 left-[22px] h-5 w-5 rounded-full bg-white shadow-sm" />
              </button>
            </div>
            <div className="flex items-center justify-between py-2">
              <div>
                <p className="text-sm font-medium">Read receipts</p>
                <p className="text-xs text-muted-foreground">
                  Let others see when you&apos;ve read messages
                </p>
              </div>
              <button className="relative h-6 w-11 rounded-full bg-green-500 transition-colors">
                <div className="absolute top-0.5 left-[22px] h-5 w-5 rounded-full bg-white shadow-sm" />
              </button>
            </div>
          </div>
        </motion.div>

        {/* Logout */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          <button
            onClick={() => setShowLogoutDialog(true)}
            className="w-full flex items-center justify-center gap-2 rounded-2xl border border-red-500/20 bg-red-500/5 py-3.5 text-sm font-semibold text-red-500 hover:bg-red-500/10 transition-all"
          >
            <LogOut className="h-4 w-4" />
            Log Out
          </button>
        </motion.div>
      </div>

      {/* Logout Dialog */}
      {showLogoutDialog && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
          onClick={() => setShowLogoutDialog(false)}
        >
          <motion.div
            initial={{ scale: 0.95 }}
            animate={{ scale: 1 }}
            onClick={(e) => e.stopPropagation()}
            className="w-full max-w-sm rounded-2xl bg-card border border-border p-6 shadow-2xl text-center"
          >
            <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
              <LogOut className="h-6 w-6 text-red-500" />
            </div>
            <h2 className="text-lg font-semibold mb-2">Log Out</h2>
            <p className="text-sm text-muted-foreground mb-6">
              Are you sure you want to log out of ConnectHub?
            </p>
            <div className="flex gap-3">
              <button
                onClick={() => setShowLogoutDialog(false)}
                className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium hover:bg-secondary transition-all"
              >
                Cancel
              </button>
              <Link
                href="/"
                className="flex-1 rounded-xl bg-red-500 text-white py-2.5 text-sm font-semibold hover:bg-red-600 transition-all text-center"
              >
                Log Out
              </Link>
            </div>
          </motion.div>
        </motion.div>
      )}

      <MobileNav />
    </div>
  );
}
