"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Send,
  Clock,
  Upload,
  Eye,
  Megaphone,
  Users,
  CheckCircle2,
  FileEdit,
} from "lucide-react";
import { announcements } from "@/lib/mock-data";
import { cn, formatRelativeTime } from "@/lib/utils";

const statusColors = {
  sent: { bg: "bg-green-500/10", text: "text-green-500", icon: CheckCircle2 },
  scheduled: { bg: "bg-blue-500/10", text: "text-blue-500", icon: Clock },
  draft: { bg: "bg-orange-500/10", text: "text-orange-500", icon: FileEdit },
};

export default function AnnouncementsPage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [audience, setAudience] = useState("all");
  const [showPreview, setShowPreview] = useState(false);

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Announcements</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Broadcast messages to your organization
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Compose Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <h3 className="text-sm font-semibold mb-5 flex items-center gap-2">
            <Megaphone className="h-4 w-4 text-green-500" />
            Compose Announcement
          </h3>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-1.5 block">Title</label>
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Announcement title..."
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Description
              </label>
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Write your announcement..."
                rows={5}
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all resize-none"
              />
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">Image</label>
              <button className="w-full flex items-center justify-center gap-2 rounded-xl border-2 border-dashed border-border py-6 text-sm text-muted-foreground hover:border-green-500/50 hover:text-green-500 transition-all">
                <Upload className="h-4 w-4" />
                Upload Image (Optional)
              </button>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Audience
              </label>
              <div className="flex gap-2">
                {[
                  { value: "all", label: "Everyone", icon: Users },
                  { value: "admins", label: "Admins Only", icon: Megaphone },
                ].map(({ value, label, icon: Icon }) => (
                  <button
                    key={value}
                    onClick={() => setAudience(value)}
                    className={cn(
                      "flex-1 flex items-center justify-center gap-2 rounded-xl py-2.5 text-sm font-medium transition-all",
                      audience === value
                        ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                        : "border border-border text-muted-foreground hover:bg-secondary"
                    )}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="text-sm font-medium mb-1.5 block">
                Schedule
              </label>
              <input
                type="datetime-local"
                className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 focus:border-green-500/50 transition-all"
              />
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setShowPreview(true)}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-border py-2.5 text-sm font-medium hover:bg-secondary transition-all"
              >
                <Eye className="h-4 w-4" />
                Preview
              </button>
              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all"
              >
                <Send className="h-4 w-4" />
                Send Now
              </motion.button>
            </div>
          </div>
        </motion.div>

        {/* Preview + Past Announcements */}
        <div className="space-y-6">
          {/* Preview */}
          {showPreview && (title || description) && (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="rounded-2xl border border-green-500/20 bg-green-500/5 p-6"
            >
              <h3 className="text-sm font-semibold mb-3 flex items-center gap-2 text-green-600 dark:text-green-400">
                <Eye className="h-4 w-4" />
                Preview
              </h3>
              <div className="rounded-xl border border-border bg-card p-4">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-green-500/10 flex items-center justify-center flex-shrink-0">
                    <Megaphone className="h-5 w-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="text-sm font-semibold">
                      {title || "Untitled Announcement"}
                    </h4>
                    <p className="text-xs text-muted-foreground mt-1">
                      {description || "No description yet..."}
                    </p>
                    <p className="text-[10px] text-muted-foreground/70 mt-2">
                      Just now · To: {audience === "all" ? "Everyone" : "Admins"}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          )}

          {/* Past Announcements */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.2 }}
            className="rounded-2xl border border-border bg-card p-6"
          >
            <h3 className="text-sm font-semibold mb-4">Past Announcements</h3>
            <div className="space-y-3">
              {announcements.map((announcement, i) => {
                const statusStyle = statusColors[announcement.status];
                const StatusIcon = statusStyle.icon;

                return (
                  <motion.div
                    key={announcement.id}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.3 + i * 0.05 }}
                    className="flex items-start gap-3 p-3 rounded-xl hover:bg-secondary/50 transition-colors"
                  >
                    <div
                      className={cn(
                        "h-9 w-9 rounded-lg flex items-center justify-center flex-shrink-0",
                        statusStyle.bg
                      )}
                    >
                      <StatusIcon
                        className={cn("h-4 w-4", statusStyle.text)}
                      />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <h4 className="text-sm font-medium truncate">
                          {announcement.title}
                        </h4>
                        <span
                          className={cn(
                            "text-[10px] font-semibold px-2 py-0.5 rounded-full capitalize flex-shrink-0",
                            statusStyle.bg,
                            statusStyle.text
                          )}
                        >
                          {announcement.status}
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground mt-0.5 line-clamp-1">
                        {announcement.description}
                      </p>
                      <p className="text-[10px] text-muted-foreground/70 mt-1">
                        {formatRelativeTime(announcement.scheduledAt)} ·{" "}
                        {announcement.audience === "all"
                          ? "Everyone"
                          : "Admins"}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
