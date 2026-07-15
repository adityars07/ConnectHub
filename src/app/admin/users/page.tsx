"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  Edit3,
  Trash2,
  Ban,
  ChevronLeft,
  ChevronRight,
  X,
} from "lucide-react";
import { users, type User } from "@/lib/mock-data";
import { SearchBar } from "@/components/shared/search-bar";
import { cn, getInitials } from "@/lib/utils";

const USERS_PER_PAGE = 8;

export default function UserManagementPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const [showAddDialog, setShowAddDialog] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState<User | null>(null);

  const filteredUsers = users.filter((user) => {
    const matchesSearch =
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    return matchesSearch && matchesRole;
  });

  const totalPages = Math.ceil(filteredUsers.length / USERS_PER_PAGE);
  const paginatedUsers = filteredUsers.slice(
    (currentPage - 1) * USERS_PER_PAGE,
    currentPage * USERS_PER_PAGE
  );

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Users</h1>
          <p className="text-sm text-muted-foreground mt-1">
            Manage your organization&apos;s members
          </p>
        </div>
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowAddDialog(true)}
          className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-green-500 to-green-600 px-5 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all"
        >
          <Plus className="h-4 w-4" />
          Add User
        </motion.button>
      </div>

      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row gap-3">
        <SearchBar
          placeholder="Search users..."
          onSearch={(q) => {
            setSearchQuery(q);
            setCurrentPage(1);
          }}
          className="flex-1"
        />
        <div className="flex gap-1.5">
          {["all", "admin", "moderator", "member"].map((role) => (
            <button
              key={role}
              onClick={() => {
                setRoleFilter(role);
                setCurrentPage(1);
              }}
              className={cn(
                "px-3 py-2 rounded-lg text-xs font-medium transition-all capitalize whitespace-nowrap",
                roleFilter === role
                  ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                  : "text-muted-foreground hover:bg-secondary border border-transparent"
              )}
            >
              {role}
            </button>
          ))}
        </div>
      </div>

      {/* Users Table */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="rounded-2xl border border-border bg-card overflow-hidden"
      >
        {/* Table Header */}
        <div className="hidden sm:grid grid-cols-[1fr_auto_auto_auto] gap-4 px-6 py-3 bg-secondary/30 border-b border-border">
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
            User
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24 text-center">
            Status
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-24 text-center">
            Role
          </span>
          <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider w-32 text-center">
            Actions
          </span>
        </div>

        {/* Table Body */}
        <div className="divide-y divide-border">
          <AnimatePresence mode="wait">
            {paginatedUsers.map((user, i) => (
              <motion.div
                key={user.id}
                initial={{ opacity: 0, y: 5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2, delay: i * 0.03 }}
                className="grid grid-cols-1 sm:grid-cols-[1fr_auto_auto_auto] gap-3 sm:gap-4 items-center px-4 sm:px-6 py-4 hover:bg-secondary/30 transition-colors"
              >
                {/* User info */}
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                      {user.avatar ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img
                          src={user.avatar}
                          alt={user.name}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <span className="text-xs font-semibold text-white">
                          {getInitials(user.name)}
                        </span>
                      )}
                    </div>
                    {user.isOnline && (
                      <div className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full bg-green-500 border-2 border-card" />
                    )}
                  </div>
                  <div>
                    <p className="text-sm font-semibold">{user.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {user.username} · {user.email}
                    </p>
                  </div>
                </div>

                {/* Status */}
                <div className="w-24 flex justify-center">
                  <span
                    className={cn(
                      "flex items-center gap-1.5 text-[11px] font-medium px-2.5 py-0.5 rounded-full",
                      user.isOnline
                        ? "bg-green-500/10 text-green-500"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    <span
                      className={cn(
                        "h-1.5 w-1.5 rounded-full",
                        user.isOnline ? "bg-green-500" : "bg-muted-foreground"
                      )}
                    />
                    {user.isOnline ? "Online" : "Offline"}
                  </span>
                </div>

                {/* Role */}
                <div className="w-24 flex justify-center">
                  <span
                    className={cn(
                      "text-[10px] font-semibold px-2.5 py-0.5 rounded-full uppercase",
                      user.role === "admin"
                        ? "bg-red-500/10 text-red-500"
                        : user.role === "moderator"
                        ? "bg-blue-500/10 text-blue-500"
                        : "bg-secondary text-muted-foreground"
                    )}
                  >
                    {user.role}
                  </span>
                </div>

                {/* Actions */}
                <div className="w-32 flex items-center justify-center gap-1">
                  <button className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
                    <Edit3 className="h-3.5 w-3.5 text-muted-foreground" />
                  </button>
                  <button className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors">
                    <Ban className="h-3.5 w-3.5 text-orange-500" />
                  </button>
                  <button
                    onClick={() => setShowDeleteDialog(user)}
                    className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-red-500/10 transition-colors"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex items-center justify-between px-6 py-3 border-t border-border bg-secondary/10">
            <p className="text-xs text-muted-foreground">
              Showing {(currentPage - 1) * USERS_PER_PAGE + 1} -{" "}
              {Math.min(currentPage * USERS_PER_PAGE, filteredUsers.length)} of{" "}
              {filteredUsers.length}
            </p>
            <div className="flex items-center gap-1">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors disabled:opacity-50"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  onClick={() => setCurrentPage(i + 1)}
                  className={cn(
                    "h-8 w-8 rounded-lg flex items-center justify-center text-xs font-medium transition-all",
                    currentPage === i + 1
                      ? "bg-green-500 text-white"
                      : "hover:bg-secondary text-muted-foreground"
                  )}
                >
                  {i + 1}
                </button>
              ))}
              <button
                onClick={() =>
                  setCurrentPage((p) => Math.min(totalPages, p + 1))
                }
                disabled={currentPage === totalPages}
                className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary transition-colors disabled:opacity-50"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>
          </div>
        )}
      </motion.div>

      {/* Add User Dialog */}
      <AnimatePresence>
        {showAddDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowAddDialog(false)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-2xl bg-card border border-border p-6 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-lg font-semibold">Add New User</h2>
                <button
                  onClick={() => setShowAddDialog(false)}
                  className="h-8 w-8 rounded-lg flex items-center justify-center hover:bg-secondary"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Full Name
                  </label>
                  <input className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all" />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all"
                  />
                </div>
                <div>
                  <label className="text-sm font-medium mb-1.5 block">
                    Role
                  </label>
                  <select className="w-full rounded-xl border border-border bg-background px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-green-500/30 transition-all">
                    <option>Member</option>
                    <option>Moderator</option>
                    <option>Admin</option>
                  </select>
                </div>
                <button
                  onClick={() => setShowAddDialog(false)}
                  className="w-full rounded-xl bg-gradient-to-r from-green-500 to-green-600 py-2.5 text-sm font-semibold text-white shadow-lg shadow-green-500/25 hover:shadow-green-500/40 transition-all"
                >
                  Add User
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Delete Confirmation Dialog */}
      <AnimatePresence>
        {showDeleteDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50"
            onClick={() => setShowDeleteDialog(null)}
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-sm rounded-2xl bg-card border border-border p-6 shadow-2xl text-center"
            >
              <div className="h-12 w-12 rounded-full bg-red-500/10 flex items-center justify-center mx-auto mb-4">
                <Trash2 className="h-6 w-6 text-red-500" />
              </div>
              <h2 className="text-lg font-semibold mb-2">Delete User</h2>
              <p className="text-sm text-muted-foreground mb-6">
                Are you sure you want to delete{" "}
                <strong>{showDeleteDialog.name}</strong>? This action cannot be
                undone.
              </p>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowDeleteDialog(null)}
                  className="flex-1 rounded-xl border border-border py-2.5 text-sm font-medium hover:bg-secondary transition-all"
                >
                  Cancel
                </button>
                <button
                  onClick={() => setShowDeleteDialog(null)}
                  className="flex-1 rounded-xl bg-red-500 text-white py-2.5 text-sm font-semibold hover:bg-red-600 transition-all"
                >
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
