"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { type LucideIcon } from "lucide-react";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: LucideIcon;
  trend?: { value: string; positive: boolean };
  color?: "green" | "blue" | "purple" | "orange";
  index?: number;
}

const colorStyles = {
  green: {
    bg: "bg-green-500/10",
    icon: "text-green-500",
    border: "border-green-500/20",
    shadow: "shadow-green-500/5",
  },
  blue: {
    bg: "bg-blue-500/10",
    icon: "text-blue-500",
    border: "border-blue-500/20",
    shadow: "shadow-blue-500/5",
  },
  purple: {
    bg: "bg-purple-500/10",
    icon: "text-purple-500",
    border: "border-purple-500/20",
    shadow: "shadow-purple-500/5",
  },
  orange: {
    bg: "bg-orange-500/10",
    icon: "text-orange-500",
    border: "border-orange-500/20",
    shadow: "shadow-orange-500/5",
  },
};

export function StatsCard({
  title,
  value,
  icon: Icon,
  trend,
  color = "green",
  index = 0,
}: StatsCardProps) {
  const styles = colorStyles[color];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.1 }}
      whileHover={{ y: -2, scale: 1.01 }}
      className={cn(
        "relative overflow-hidden rounded-2xl border bg-card p-6 transition-shadow duration-300",
        styles.border,
        `hover:${styles.shadow} hover:shadow-lg`
      )}
    >
      {/* Background glow */}
      <div
        className={cn(
          "absolute -top-12 -right-12 h-32 w-32 rounded-full opacity-20 blur-2xl",
          styles.bg
        )}
      />

      <div className="relative flex items-start justify-between">
        <div>
          <p className="text-sm text-muted-foreground font-medium">{title}</p>
          <p className="text-3xl font-bold mt-2 tracking-tight">{value}</p>
          {trend && (
            <p
              className={cn(
                "text-xs font-medium mt-2",
                trend.positive ? "text-green-500" : "text-red-500"
              )}
            >
              {trend.positive ? "↑" : "↓"} {trend.value}
            </p>
          )}
        </div>
        <div
          className={cn(
            "flex h-12 w-12 items-center justify-center rounded-xl",
            styles.bg
          )}
        >
          <Icon className={cn("h-6 w-6", styles.icon)} />
        </div>
      </div>
    </motion.div>
  );
}
