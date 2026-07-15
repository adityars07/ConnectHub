"use client";

import { motion } from "framer-motion";
import {
  Users,
  Wifi,
  MessageSquare,
  Megaphone,
  TrendingUp,
} from "lucide-react";
import { StatsCard } from "@/components/cards/stats-card";
import { analyticsData } from "@/lib/mock-data";
import { formatRelativeTime } from "@/lib/utils";

export default function AdminDashboard() {
  const maxMessages = Math.max(
    ...analyticsData.messagesPerDay.map((d) => d.count)
  );
  const maxUsers = Math.max(...analyticsData.userGrowth.map((d) => d.count));

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-sm text-muted-foreground mt-1">
          Overview of your organization&apos;s activity
        </p>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard
          title="Total Users"
          value={analyticsData.totalUsers}
          icon={Users}
          trend={{ value: "12% from last month", positive: true }}
          color="blue"
          index={0}
        />
        <StatsCard
          title="Online Users"
          value={analyticsData.onlineUsers}
          icon={Wifi}
          trend={{ value: "50% active now", positive: true }}
          color="green"
          index={1}
        />
        <StatsCard
          title="Messages Today"
          value={analyticsData.messagesToday}
          icon={MessageSquare}
          trend={{ value: "18% from yesterday", positive: true }}
          color="purple"
          index={2}
        />
        <StatsCard
          title="Announcements"
          value={analyticsData.announcements}
          icon={Megaphone}
          trend={{ value: "2 scheduled", positive: true }}
          color="orange"
          index={3}
        />
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Messages Per Day */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold">Messages This Week</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Daily message volume
              </p>
            </div>
            <TrendingUp className="h-4 w-4 text-green-500" />
          </div>
          <div className="flex items-end justify-between gap-2 h-44">
            {analyticsData.messagesPerDay.map((day, i) => (
              <motion.div
                key={day.day}
                initial={{ height: 0 }}
                animate={{ height: `${(day.count / maxMessages) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.5 + i * 0.08 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <span className="text-[10px] font-medium text-muted-foreground">
                  {day.count}
                </span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-green-500 to-green-400 min-h-[4px]"
                  style={{
                    height: `${(day.count / maxMessages) * 100}%`,
                  }}
                />
                <span className="text-[11px] text-muted-foreground font-medium">
                  {day.day}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* User Growth */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
          className="rounded-2xl border border-border bg-card p-6"
        >
          <div className="flex items-center justify-between mb-6">
            <div>
              <h3 className="text-sm font-semibold">User Growth</h3>
              <p className="text-xs text-muted-foreground mt-0.5">
                Monthly new users
              </p>
            </div>
            <Users className="h-4 w-4 text-blue-500" />
          </div>
          <div className="flex items-end justify-between gap-2 h-44">
            {analyticsData.userGrowth.map((month, i) => (
              <motion.div
                key={month.month}
                initial={{ height: 0 }}
                animate={{ height: `${(month.count / maxUsers) * 100}%` }}
                transition={{ duration: 0.6, delay: 0.6 + i * 0.08 }}
                className="flex-1 flex flex-col items-center gap-2"
              >
                <span className="text-[10px] font-medium text-muted-foreground">
                  {month.count}
                </span>
                <div
                  className="w-full rounded-t-lg bg-gradient-to-t from-blue-500 to-blue-400 min-h-[4px]"
                  style={{
                    height: `${(month.count / maxUsers) * 100}%`,
                  }}
                />
                <span className="text-[11px] text-muted-foreground font-medium">
                  {month.month}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Recent Activity */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.6 }}
        className="rounded-2xl border border-border bg-card p-6"
      >
        <h3 className="text-sm font-semibold mb-4">Recent Activity</h3>
        <div className="space-y-3">
          {analyticsData.recentActivity.map((activity, i) => (
            <motion.div
              key={activity.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.7 + i * 0.05 }}
              className="flex items-center justify-between py-2 border-b border-border last:border-0"
            >
              <div className="flex items-center gap-3">
                <div className="h-2 w-2 rounded-full bg-green-500" />
                <div>
                  <span className="text-sm font-medium">{activity.user}</span>
                  <span className="text-sm text-muted-foreground">
                    {" "}
                    {activity.action}
                  </span>
                </div>
              </div>
              <span className="text-xs text-muted-foreground flex-shrink-0">
                {formatRelativeTime(activity.time)}
              </span>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}
