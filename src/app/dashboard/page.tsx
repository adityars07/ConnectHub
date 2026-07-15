"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  Settings,
  Bell,
  LogOut,
  LayoutDashboard,
} from "lucide-react";
import Link from "next/link";
import { useApp } from "@/contexts/app-context";
import { ChatCard } from "@/components/chat/chat-card";
import { ChatHeader } from "@/components/chat/chat-header";
import { MessageBubble } from "@/components/chat/message-bubble";
import { MessageInput } from "@/components/chat/message-input";
import { TypingIndicator } from "@/components/chat/typing-indicator";
import { SearchBar } from "@/components/shared/search-bar";
import { ThemeToggle } from "@/components/shared/theme-toggle";
import { EmptyState } from "@/components/shared/empty-state";
import { UserCard } from "@/components/cards/user-card";
import {
  conversations,
  getConversationMessages,
  getOtherParticipant,
  getOnlineUsers,
  currentUser,
  type Conversation,
  type Message,
} from "@/lib/mock-data";
import { cn, getInitials } from "@/lib/utils";

export default function DashboardPage() {
  const { activeConversation, setActiveConversation, unreadNotifications, isMobileChatOpen, setMobileChatOpen } =
    useApp();
  const [searchQuery, setSearchQuery] = useState("");
  const [chatFilter, setChatFilter] = useState<"all" | "unread" | "pinned">("all");
  const [chatMessages, setChatMessages] = useState<Message[]>([]);
  const [showTyping, setShowTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const onlineUsers = getOnlineUsers();

  // Filter conversations
  const filteredConversations = conversations.filter((conv) => {
    const other = getOtherParticipant(conv, currentUser.id);
    if (!other) return false;

    const matchesSearch = other.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    if (chatFilter === "unread") return matchesSearch && conv.unreadCount > 0;
    if (chatFilter === "pinned") return matchesSearch && conv.isPinned;
    return matchesSearch;
  });

  // Load messages for active conversation
  useEffect(() => {
    if (activeConversation) {
      setChatMessages(getConversationMessages(activeConversation.id));
    }
  }, [activeConversation]);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chatMessages, showTyping]);

  const handleSelectConversation = (conv: Conversation) => {
    setActiveConversation(conv);
    setMobileChatOpen(true);
  };

  const handleSendMessage = (content: string) => {
    const newMessage: Message = {
      id: `m-new-${Date.now()}`,
      senderId: currentUser.id,
      receiverId: activeConversation?.participants.find(
        (p) => p !== currentUser.id
      ) || "",
      conversationId: activeConversation?.id || "",
      content,
      timestamp: new Date(),
      isRead: false,
      type: "text",
    };
    setChatMessages((prev) => [...prev, newMessage]);

    // Simulate typing and reply
    setShowTyping(true);
    setTimeout(() => {
      setShowTyping(false);
      const reply: Message = {
        id: `m-reply-${Date.now()}`,
        senderId:
          activeConversation?.participants.find(
            (p) => p !== currentUser.id
          ) || "",
        receiverId: currentUser.id,
        conversationId: activeConversation?.id || "",
        content: getAutoReply(),
        timestamp: new Date(),
        isRead: true,
        type: "text",
      };
      setChatMessages((prev) => [...prev, reply]);
    }, 2000 + Math.random() * 1500);
  };

  const otherUser = activeConversation
    ? getOtherParticipant(activeConversation, currentUser.id)
    : null;

  return (
    <div className="h-full flex">
      {/* ─── Left Sidebar ─────────────────────────────────────── */}
      <aside
        className={cn(
          "flex-shrink-0 w-full lg:w-[380px] border-r border-border bg-sidebar flex flex-col",
          isMobileChatOpen ? "hidden lg:flex" : "flex"
        )}
      >
        {/* Profile Header */}
        <div className="flex items-center justify-between px-4 py-3 border-b border-border">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
              {currentUser.avatar ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="h-full w-full object-cover"
                />
              ) : (
                <span className="text-sm font-semibold text-white">
                  {getInitials(currentUser.name)}
                </span>
              )}
            </div>
            <div>
              <h2 className="text-sm font-semibold">{currentUser.name}</h2>
              <p className="text-[11px] text-green-500 font-medium">Online</p>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <ThemeToggle />
            <Link
              href="/notifications"
              className="relative h-9 w-9 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <Bell className="h-4 w-4 text-muted-foreground" />
              {unreadNotifications > 0 && (
                <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-red-500" />
              )}
            </Link>
            <Link
              href="/admin"
              className="h-9 w-9 rounded-xl flex items-center justify-center hover:bg-secondary transition-colors"
            >
              <LayoutDashboard className="h-4 w-4 text-muted-foreground" />
            </Link>
          </div>
        </div>

        {/* Search */}
        <div className="px-3 py-3">
          <SearchBar
            placeholder="Search chats..."
            onSearch={setSearchQuery}
          />
        </div>

        {/* Filters */}
        <div className="px-3 pb-2 flex gap-1.5">
          {(["all", "unread", "pinned"] as const).map((filter) => (
            <button
              key={filter}
              onClick={() => setChatFilter(filter)}
              className={cn(
                "px-3 py-1.5 rounded-lg text-xs font-medium transition-all capitalize",
                chatFilter === filter
                  ? "bg-green-500/10 text-green-600 dark:text-green-400 border border-green-500/20"
                  : "text-muted-foreground hover:bg-secondary"
              )}
            >
              {filter}
            </button>
          ))}
        </div>

        {/* Online Users */}
        {onlineUsers.length > 0 && (
          <div className="px-3 pb-2">
            <p className="text-[11px] font-semibold text-muted-foreground uppercase tracking-wider px-1 mb-2">
              Online — {onlineUsers.length}
            </p>
            <div className="flex gap-0.5 overflow-x-auto no-scrollbar pb-1">
              {onlineUsers.slice(0, 8).map((user, i) => (
                <UserCard key={user.id} user={user} compact index={i} />
              ))}
            </div>
          </div>
        )}

        {/* Chat List */}
        <div className="flex-1 overflow-y-auto px-2 pb-20 lg:pb-2 space-y-0.5">
          <AnimatePresence>
            {filteredConversations.map((conv) => (
              <ChatCard
                key={conv.id}
                conversation={conv}
                isActive={activeConversation?.id === conv.id}
                onClick={() => handleSelectConversation(conv)}
              />
            ))}
          </AnimatePresence>

          {filteredConversations.length === 0 && (
            <EmptyState
              icon={<MessageCircle className="h-8 w-8 text-muted-foreground" />}
              title="No chats found"
              description="Try a different search or filter"
            />
          )}
        </div>
      </aside>

      {/* ─── Main Chat Area ───────────────────────────────────── */}
      <main
        className={cn(
          "flex-1 flex flex-col bg-background",
          !isMobileChatOpen ? "hidden lg:flex" : "flex"
        )}
      >
        {activeConversation && otherUser ? (
          <>
            {/* Chat Header */}
            <ChatHeader
              user={otherUser}
              showBack
              onBack={() => setMobileChatOpen(false)}
            />

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3">
              {/* Date separator */}
              <div className="flex items-center justify-center py-2">
                <span className="px-3 py-1 rounded-full bg-secondary text-[11px] text-muted-foreground font-medium">
                  Today
                </span>
              </div>

              {chatMessages.map((message, i) => (
                <MessageBubble key={message.id} message={message} index={i} />
              ))}

              {showTyping && <TypingIndicator />}

              <div ref={messagesEndRef} />
            </div>

            {/* Message Input */}
            <div className="pb-16 lg:pb-0">
              <MessageInput onSend={handleSendMessage} />
            </div>
          </>
        ) : (
          <EmptyState
            icon={
              <MessageCircle className="h-10 w-10 text-muted-foreground" />
            }
            title="Select a conversation"
            description="Choose a chat from the sidebar to start messaging"
            className="h-full"
          />
        )}
      </main>
    </div>
  );
}

// Auto-reply messages
function getAutoReply(): string {
  const replies = [
    "That sounds great! Let me look into it 👀",
    "Sure, I'll get back to you on that!",
    "Thanks for letting me know! 🙏",
    "Absolutely, let's do that!",
    "Good point, I hadn't thought of that.",
    "I'm on it! Will update you soon 🚀",
    "Perfect, thanks for the update!",
    "Interesting! Tell me more about it.",
    "Got it! I'll handle this right away ✅",
    "Sounds like a plan! 💪",
  ];
  return replies[Math.floor(Math.random() * replies.length)];
}
