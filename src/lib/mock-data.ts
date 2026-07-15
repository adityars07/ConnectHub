// ─── Types ───────────────────────────────────────────────────────

export interface User {
  id: string;
  name: string;
  username: string;
  email: string;
  phone: string;
  avatar: string;
  status: string;
  role: "admin" | "member" | "moderator";
  isOnline: boolean;
  lastSeen: Date;
}

export interface Message {
  id: string;
  senderId: string;
  receiverId: string;
  conversationId: string;
  content: string;
  timestamp: Date;
  isRead: boolean;
  type: "text" | "image" | "file";
}

export interface Conversation {
  id: string;
  participants: string[];
  lastMessage: Message | null;
  unreadCount: number;
  isPinned: boolean;
  isGroup: boolean;
  groupName?: string;
  groupAvatar?: string;
}

export interface Notification {
  id: string;
  type: "announcement" | "event" | "message" | "system";
  title: string;
  description: string;
  timestamp: Date;
  isRead: boolean;
  icon: string;
  actionUrl?: string;
}

export interface Announcement {
  id: string;
  title: string;
  description: string;
  image?: string;
  audience: "all" | "admins" | "members";
  scheduledAt: Date;
  createdBy: string;
  status: "sent" | "scheduled" | "draft";
}

export interface AnalyticsData {
  totalUsers: number;
  onlineUsers: number;
  messagesToday: number;
  announcements: number;
  messagesPerDay: { day: string; count: number }[];
  userGrowth: { month: string; count: number }[];
  recentActivity: { id: string; user: string; action: string; time: Date }[];
}

// ─── Avatar URLs (using DiceBear) ────────────────────────────────

function avatar(seed: string): string {
  return `https://api.dicebear.com/9.x/avataaars/svg?seed=${seed}&backgroundColor=b6e3f4,c0aede,d1d4f9,ffd5dc,ffdfbf`;
}

// ─── Users (20) ──────────────────────────────────────────────────

export const users: User[] = [
  {
    id: "u1",
    name: "Aditya Sharma",
    username: "@aditya",
    email: "aditya@connecthub.com",
    phone: "+91 98765 43210",
    avatar: avatar("aditya"),
    status: "Building something amazing ✨",
    role: "admin",
    isOnline: true,
    lastSeen: new Date(),
  },
  {
    id: "u2",
    name: "Priya Patel",
    username: "@priya",
    email: "priya@connecthub.com",
    phone: "+91 87654 32109",
    avatar: avatar("priya"),
    status: "Available",
    role: "moderator",
    isOnline: true,
    lastSeen: new Date(),
  },
  {
    id: "u3",
    name: "Rahul Kumar",
    username: "@rahul",
    email: "rahul@connecthub.com",
    phone: "+91 76543 21098",
    avatar: avatar("rahul"),
    status: "In a meeting 🔇",
    role: "member",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 30),
  },
  {
    id: "u4",
    name: "Sneha Gupta",
    username: "@sneha",
    email: "sneha@connecthub.com",
    phone: "+91 65432 10987",
    avatar: avatar("sneha"),
    status: "Coffee first ☕",
    role: "member",
    isOnline: true,
    lastSeen: new Date(),
  },
  {
    id: "u5",
    name: "Arjun Mehta",
    username: "@arjun",
    email: "arjun@connecthub.com",
    phone: "+91 54321 09876",
    avatar: avatar("arjun"),
    status: "Working from home",
    role: "member",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 2),
  },
  {
    id: "u6",
    name: "Ananya Singh",
    username: "@ananya",
    email: "ananya@connecthub.com",
    phone: "+91 43210 98765",
    avatar: avatar("ananya"),
    status: "Design is life 🎨",
    role: "member",
    isOnline: true,
    lastSeen: new Date(),
  },
  {
    id: "u7",
    name: "Vikram Rao",
    username: "@vikram",
    email: "vikram@connecthub.com",
    phone: "+91 32109 87654",
    avatar: avatar("vikram"),
    status: "On vacation 🏖️",
    role: "member",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 24),
  },
  {
    id: "u8",
    name: "Kavya Nair",
    username: "@kavya",
    email: "kavya@connecthub.com",
    phone: "+91 21098 76543",
    avatar: avatar("kavya"),
    status: "Let's connect! 🤝",
    role: "moderator",
    isOnline: true,
    lastSeen: new Date(),
  },
  {
    id: "u9",
    name: "Rohan Joshi",
    username: "@rohan",
    email: "rohan@connecthub.com",
    phone: "+91 10987 65432",
    avatar: avatar("rohan"),
    status: "Debugging 🐛",
    role: "member",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 45),
  },
  {
    id: "u10",
    name: "Meera Iyer",
    username: "@meera",
    email: "meera@connecthub.com",
    phone: "+91 09876 54321",
    avatar: avatar("meera"),
    status: "Happy to help 😊",
    role: "member",
    isOnline: true,
    lastSeen: new Date(),
  },
  {
    id: "u11",
    name: "Karthik Reddy",
    username: "@karthik",
    email: "karthik@connecthub.com",
    phone: "+91 98712 34567",
    avatar: avatar("karthik"),
    status: "Coding all night 🌙",
    role: "member",
    isOnline: true,
    lastSeen: new Date(),
  },
  {
    id: "u12",
    name: "Divya Sharma",
    username: "@divya",
    email: "divya@connecthub.com",
    phone: "+91 87612 34567",
    avatar: avatar("divya"),
    status: "Reading books 📚",
    role: "member",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 120),
  },
  {
    id: "u13",
    name: "Nikhil Verma",
    username: "@nikhil",
    email: "nikhil@connecthub.com",
    phone: "+91 76512 34567",
    avatar: avatar("nikhil"),
    status: "Gym time 💪",
    role: "member",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 3),
  },
  {
    id: "u14",
    name: "Pooja Desai",
    username: "@pooja",
    email: "pooja@connecthub.com",
    phone: "+91 65412 34567",
    avatar: avatar("pooja"),
    status: "Product thinking 🧠",
    role: "member",
    isOnline: true,
    lastSeen: new Date(),
  },
  {
    id: "u15",
    name: "Saurabh Mishra",
    username: "@saurabh",
    email: "saurabh@connecthub.com",
    phone: "+91 54312 34567",
    avatar: avatar("saurabh"),
    status: "Shipping features 🚀",
    role: "member",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 15),
  },
  {
    id: "u16",
    name: "Ritu Kapoor",
    username: "@ritu",
    email: "ritu@connecthub.com",
    phone: "+91 43212 34567",
    avatar: avatar("ritu"),
    status: "Team lead mode 🎯",
    role: "moderator",
    isOnline: true,
    lastSeen: new Date(),
  },
  {
    id: "u17",
    name: "Amit Bhatt",
    username: "@amit",
    email: "amit@connecthub.com",
    phone: "+91 32112 34567",
    avatar: avatar("amit"),
    status: "Just vibing ✌️",
    role: "member",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 5),
  },
  {
    id: "u18",
    name: "Ishita Roy",
    username: "@ishita",
    email: "ishita@connecthub.com",
    phone: "+91 21012 34567",
    avatar: avatar("ishita"),
    status: "Music on 🎵",
    role: "member",
    isOnline: true,
    lastSeen: new Date(),
  },
  {
    id: "u19",
    name: "Deepak Chauhan",
    username: "@deepak",
    email: "deepak@connecthub.com",
    phone: "+91 10912 34567",
    avatar: avatar("deepak"),
    status: "DevOps wizard 🧙",
    role: "member",
    isOnline: false,
    lastSeen: new Date(Date.now() - 1000 * 60 * 60 * 8),
  },
  {
    id: "u20",
    name: "Tanvi Malhotra",
    username: "@tanvi",
    email: "tanvi@connecthub.com",
    phone: "+91 09812 34567",
    avatar: avatar("tanvi"),
    status: "Creating magic ✨",
    role: "member",
    isOnline: true,
    lastSeen: new Date(),
  },
];

export const currentUser = users[0];

// ─── Messages (50) ──────────────────────────────────────────────

function msg(
  id: string,
  senderId: string,
  receiverId: string,
  convId: string,
  content: string,
  minutesAgo: number,
  isRead = true
): Message {
  return {
    id,
    senderId,
    receiverId,
    conversationId: convId,
    content,
    timestamp: new Date(Date.now() - minutesAgo * 60 * 1000),
    isRead,
    type: "text",
  };
}

export const messages: Message[] = [
  // Conversation with Priya (c1)
  msg("m1", "u2", "u1", "c1", "Hey Aditya! How's the new feature coming along?", 45),
  msg("m2", "u1", "u2", "c1", "Going great! Almost done with the chat UI 🎉", 43),
  msg("m3", "u2", "u1", "c1", "That's awesome! Can't wait to see it", 40),
  msg("m4", "u1", "u2", "c1", "I'll push a PR by end of day", 38),
  msg("m5", "u2", "u1", "c1", "Perfect! The design team will love it", 35),
  msg("m6", "u1", "u2", "c1", "Thanks! Let me know if you need anything else", 30),
  msg("m7", "u2", "u1", "c1", "Actually, can we sync on the notification system too?", 25),
  msg("m8", "u1", "u2", "c1", "Sure! Let's do a quick call at 3?", 20),
  msg("m9", "u2", "u1", "c1", "Works for me 👍", 15),
  msg("m10", "u1", "u2", "c1", "Great, talk soon!", 10),

  // Conversation with Rahul (c2)
  msg("m11", "u3", "u1", "c2", "Did you check the deployment?", 120),
  msg("m12", "u1", "u3", "c2", "Yes, all good on staging", 115),
  msg("m13", "u3", "u1", "c2", "The API response time improved by 40%!", 110),
  msg("m14", "u1", "u3", "c2", "That's incredible! Great optimization work 💯", 105),
  msg("m15", "u3", "u1", "c2", "Thanks! Will document the changes", 100),

  // Conversation with Sneha (c3)
  msg("m16", "u4", "u1", "c3", "Morning! Quick question about the dashboard", 180),
  msg("m17", "u1", "u4", "c3", "Good morning! What's up?", 175),
  msg("m18", "u4", "u1", "c3", "Should the analytics chart show weekly or monthly data?", 170),
  msg("m19", "u1", "u4", "c3", "Let's go with both - add a toggle", 165),
  msg("m20", "u4", "u1", "c3", "Smart! I'll implement that today", 160),

  // Conversation with Arjun (c4)
  msg("m21", "u5", "u1", "c4", "The mobile app build is failing 😰", 300),
  msg("m22", "u1", "u5", "c4", "Let me check the CI logs", 295),
  msg("m23", "u5", "u1", "c4", "It started after the last merge", 290),
  msg("m24", "u1", "u5", "c4", "Found it! Missing env variable. Fixed now ✅", 280),
  msg("m25", "u5", "u1", "c4", "You're a lifesaver!", 275),

  // Conversation with Ananya (c5)
  msg("m26", "u6", "u1", "c5", "I've updated the design system", 60),
  msg("m27", "u1", "u6", "c5", "Looks beautiful! Love the new color palette", 55),
  msg("m28", "u6", "u1", "c5", "Thanks! Inspired by the new brand guidelines", 50),
  msg("m29", "u1", "u6", "c5", "The dark mode is especially nice", 45),
  msg("m30", "u6", "u1", "c5", "I spent extra time on that 😄", 40),

  // Conversation with Kavya (c6)
  msg("m31", "u8", "u1", "c6", "Team meeting tomorrow at 10 AM", 90),
  msg("m32", "u1", "u8", "c6", "Got it, I'll prepare the sprint review", 85),
  msg("m33", "u8", "u1", "c6", "Also, new members joining next week", 80),
  msg("m34", "u1", "u8", "c6", "Great! I'll set up their accounts", 75),
  msg("m35", "u8", "u1", "c6", "Thanks for handling onboarding!", 70),

  // Conversation with Rohan (c7)
  msg("m36", "u9", "u1", "c7", "Found a critical bug in the auth flow", 200),
  msg("m37", "u1", "u9", "c7", "What's happening?", 195),
  msg("m38", "u9", "u1", "c7", "Token refresh fails silently after 24h", 190),
  msg("m39", "u1", "u9", "c7", "Good catch! Creating a hotfix now", 185),
  msg("m40", "u9", "u1", "c7", "Let me know if you need help testing", 180),

  // Conversation with Meera (c8)
  msg("m41", "u10", "u1", "c8", "Can you review my PR?", 30, false),
  msg("m42", "u1", "u10", "c8", "Sure, which repo?", 25, false),
  msg("m43", "u10", "u1", "c8", "The frontend one - PR #247", 20, false),
  msg("m44", "u1", "u10", "c8", "On it! 👀", 15, false),
  msg("m45", "u10", "u1", "c8", "Thanks! No rush, end of day is fine", 10, false),

  // Conversation with Karthik (c9)
  msg("m46", "u11", "u1", "c9", "Have you tried the new VS Code extension?", 400),
  msg("m47", "u1", "u11", "c9", "Which one?", 395),
  msg("m48", "u11", "u1", "c9", "The AI code reviewer - it's amazing", 390),
  msg("m49", "u1", "u11", "c9", "Installing it right now!", 385),
  msg("m50", "u11", "u1", "c9", "You'll love it, trust me 🔥", 380),
];

// ─── Conversations ───────────────────────────────────────────────

export const conversations: Conversation[] = [
  {
    id: "c1",
    participants: ["u1", "u2"],
    lastMessage: messages[9],
    unreadCount: 0,
    isPinned: true,
    isGroup: false,
  },
  {
    id: "c2",
    participants: ["u1", "u3"],
    lastMessage: messages[14],
    unreadCount: 0,
    isPinned: true,
    isGroup: false,
  },
  {
    id: "c3",
    participants: ["u1", "u4"],
    lastMessage: messages[19],
    unreadCount: 0,
    isPinned: false,
    isGroup: false,
  },
  {
    id: "c4",
    participants: ["u1", "u5"],
    lastMessage: messages[24],
    unreadCount: 0,
    isPinned: false,
    isGroup: false,
  },
  {
    id: "c5",
    participants: ["u1", "u6"],
    lastMessage: messages[29],
    unreadCount: 2,
    isPinned: true,
    isGroup: false,
  },
  {
    id: "c6",
    participants: ["u1", "u8"],
    lastMessage: messages[34],
    unreadCount: 0,
    isPinned: false,
    isGroup: false,
  },
  {
    id: "c7",
    participants: ["u1", "u9"],
    lastMessage: messages[39],
    unreadCount: 0,
    isPinned: true,
    isGroup: false,
  },
  {
    id: "c8",
    participants: ["u1", "u10"],
    lastMessage: messages[44],
    unreadCount: 3,
    isPinned: false,
    isGroup: false,
  },
  {
    id: "c9",
    participants: ["u1", "u11"],
    lastMessage: messages[49],
    unreadCount: 0,
    isPinned: true,
    isGroup: false,
  },
  {
    id: "c10",
    participants: ["u1", "u14"],
    lastMessage: null,
    unreadCount: 0,
    isPinned: false,
    isGroup: false,
  },
  {
    id: "c11",
    participants: ["u1", "u16"],
    lastMessage: null,
    unreadCount: 0,
    isPinned: false,
    isGroup: false,
  },
  {
    id: "c12",
    participants: ["u1", "u18"],
    lastMessage: null,
    unreadCount: 0,
    isPinned: false,
    isGroup: false,
  },
];

// ─── Notifications (10) ─────────────────────────────────────────

export const notifications: Notification[] = [
  {
    id: "n1",
    type: "announcement",
    title: "System Maintenance Scheduled",
    description:
      "ConnectHub will undergo scheduled maintenance on Saturday from 2 AM - 4 AM IST. Please save your work.",
    timestamp: new Date(Date.now() - 1000 * 60 * 30),
    isRead: false,
    icon: "megaphone",
  },
  {
    id: "n2",
    type: "event",
    title: "Team Standup in 15 minutes",
    description:
      "Daily standup meeting starts at 10:00 AM. Don't forget to update your status!",
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    isRead: false,
    icon: "calendar",
  },
  {
    id: "n3",
    type: "message",
    title: "Meera sent you a message",
    description: "Thanks! No rush, end of day is fine",
    timestamp: new Date(Date.now() - 1000 * 60 * 10),
    isRead: false,
    icon: "message-circle",
  },
  {
    id: "n4",
    type: "system",
    title: "New Feature: Dark Mode",
    description:
      "ConnectHub now supports dark mode! Toggle it from Settings or the theme button.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    isRead: true,
    icon: "moon",
  },
  {
    id: "n5",
    type: "announcement",
    title: "Welcome New Team Members!",
    description:
      "Please welcome Tanvi, Ishita, and Deepak to the team. Say hi in the general chat!",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 4),
    isRead: true,
    icon: "users",
  },
  {
    id: "n6",
    type: "event",
    title: "Sprint Review Tomorrow",
    description:
      "Sprint review presentation is scheduled for tomorrow at 3 PM. Prepare your demo.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 6),
    isRead: true,
    icon: "presentation",
  },
  {
    id: "n7",
    type: "message",
    title: "Ananya shared a design",
    description: "I spent extra time on that 😄",
    timestamp: new Date(Date.now() - 1000 * 60 * 40),
    isRead: false,
    icon: "image",
  },
  {
    id: "n8",
    type: "system",
    title: "Security Update",
    description:
      "We've enabled two-factor authentication. Please set it up in your security settings.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    isRead: true,
    icon: "shield",
  },
  {
    id: "n9",
    type: "announcement",
    title: "Company All-Hands This Friday",
    description:
      "Quarterly all-hands meeting at 4 PM. CEO will share the roadmap for next quarter.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48),
    isRead: true,
    icon: "building",
  },
  {
    id: "n10",
    type: "event",
    title: "Hackathon Registration Open",
    description:
      "Annual hackathon starts next month! Register your team by Friday.",
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72),
    isRead: true,
    icon: "trophy",
  },
];

// ─── Announcements (5) ──────────────────────────────────────────

export const announcements: Announcement[] = [
  {
    id: "a1",
    title: "System Maintenance Scheduled",
    description:
      "ConnectHub will undergo scheduled maintenance on Saturday from 2 AM - 4 AM IST. During this time, the platform may be temporarily unavailable. Please save any ongoing work before the maintenance window.",
    audience: "all",
    scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 48),
    createdBy: "u1",
    status: "scheduled",
  },
  {
    id: "a2",
    title: "Welcome New Team Members!",
    description:
      "We're excited to welcome Tanvi Malhotra, Ishita Roy, and Deepak Chauhan to the ConnectHub team. Please say hi and help them get settled in!",
    audience: "all",
    scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 4),
    createdBy: "u1",
    status: "sent",
  },
  {
    id: "a3",
    title: "Q3 Goals & OKR Update",
    description:
      "The Q3 objectives and key results have been published. Please review them in the shared document and align your sprint goals accordingly. Reach out to your team lead if you have questions.",
    audience: "all",
    scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 24),
    createdBy: "u1",
    status: "sent",
  },
  {
    id: "a4",
    title: "Security Policy Update",
    description:
      "We've updated our security policies. Two-factor authentication is now mandatory for all admin accounts. Please update your settings by end of this week.",
    audience: "admins",
    scheduledAt: new Date(Date.now() - 1000 * 60 * 60 * 72),
    createdBy: "u1",
    status: "sent",
  },
  {
    id: "a5",
    title: "Annual Hackathon 2026",
    description:
      "Get ready for the biggest hackathon of the year! Form your teams (3-5 members) and register by Friday. Theme will be revealed on Day 1. Amazing prizes to be won!",
    audience: "all",
    scheduledAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
    createdBy: "u1",
    status: "draft",
  },
];

// ─── Analytics ───────────────────────────────────────────────────

export const analyticsData: AnalyticsData = {
  totalUsers: 20,
  onlineUsers: 10,
  messagesToday: 247,
  announcements: 5,
  messagesPerDay: [
    { day: "Mon", count: 180 },
    { day: "Tue", count: 220 },
    { day: "Wed", count: 195 },
    { day: "Thu", count: 310 },
    { day: "Fri", count: 247 },
    { day: "Sat", count: 120 },
    { day: "Sun", count: 85 },
  ],
  userGrowth: [
    { month: "Jan", count: 5 },
    { month: "Feb", count: 7 },
    { month: "Mar", count: 9 },
    { month: "Apr", count: 12 },
    { month: "May", count: 15 },
    { month: "Jun", count: 18 },
    { month: "Jul", count: 20 },
  ],
  recentActivity: [
    {
      id: "ra1",
      user: "Priya Patel",
      action: "sent a message in #general",
      time: new Date(Date.now() - 1000 * 60 * 5),
    },
    {
      id: "ra2",
      user: "Ananya Singh",
      action: "updated the design system",
      time: new Date(Date.now() - 1000 * 60 * 15),
    },
    {
      id: "ra3",
      user: "Rahul Kumar",
      action: "deployed to staging",
      time: new Date(Date.now() - 1000 * 60 * 30),
    },
    {
      id: "ra4",
      user: "Kavya Nair",
      action: "created a new announcement",
      time: new Date(Date.now() - 1000 * 60 * 45),
    },
    {
      id: "ra5",
      user: "Rohan Joshi",
      action: "fixed bug #1247",
      time: new Date(Date.now() - 1000 * 60 * 60),
    },
    {
      id: "ra6",
      user: "Meera Iyer",
      action: "submitted PR #247",
      time: new Date(Date.now() - 1000 * 60 * 90),
    },
    {
      id: "ra7",
      user: "Karthik Reddy",
      action: "joined the platform",
      time: new Date(Date.now() - 1000 * 60 * 120),
    },
    {
      id: "ra8",
      user: "Sneha Gupta",
      action: "updated dashboard analytics",
      time: new Date(Date.now() - 1000 * 60 * 150),
    },
  ],
};

// ─── Pricing Plans ───────────────────────────────────────────────

export const pricingPlans = [
  {
    name: "Starter",
    price: "Free",
    description: "Perfect for small teams getting started",
    features: [
      "Up to 10 users",
      "Basic messaging",
      "1 admin",
      "Community support",
      "5GB storage",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    price: "$12",
    period: "/user/month",
    description: "For growing organizations that need more",
    features: [
      "Unlimited users",
      "Advanced messaging",
      "Multiple admins",
      "Priority support",
      "50GB storage",
      "Analytics dashboard",
      "Custom branding",
      "API access",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "For large organizations with custom needs",
    features: [
      "Everything in Pro",
      "SSO & SAML",
      "Dedicated support",
      "Unlimited storage",
      "Custom integrations",
      "SLA guarantee",
      "On-premise option",
      "Advanced security",
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

// ─── Features ────────────────────────────────────────────────────

export const features = [
  {
    icon: "shield",
    title: "Private & Secure",
    description:
      "End-to-end encryption ensures your conversations stay private. Phone numbers are hidden from other users.",
  },
  {
    icon: "users",
    title: "Team Collaboration",
    description:
      "Create channels, groups, and direct messages. Keep your team connected and productive.",
  },
  {
    icon: "megaphone",
    title: "Broadcast Announcements",
    description:
      "Send organization-wide announcements with scheduling, targeting, and read receipts.",
  },
  {
    icon: "bar-chart-3",
    title: "Analytics Dashboard",
    description:
      "Track engagement, user activity, and messaging patterns with beautiful analytics.",
  },
  {
    icon: "smartphone",
    title: "Mobile Ready",
    description:
      "Fully responsive design that works beautifully on desktop, tablet, and mobile devices.",
  },
  {
    icon: "palette",
    title: "Customizable",
    description:
      "Custom branding, themes, and settings to make ConnectHub truly yours.",
  },
];

// ─── Helper Functions ────────────────────────────────────────────

export function getUserById(id: string): User | undefined {
  return users.find((u) => u.id === id);
}

export function getConversationMessages(conversationId: string): Message[] {
  return messages.filter((m) => m.conversationId === conversationId);
}

export function getOtherParticipant(
  conversation: Conversation,
  currentUserId: string
): User | undefined {
  const otherId = conversation.participants.find((p) => p !== currentUserId);
  return otherId ? getUserById(otherId) : undefined;
}

export function getOnlineUsers(): User[] {
  return users.filter((u) => u.isOnline && u.id !== currentUser.id);
}

export function getUnreadNotificationsCount(): number {
  return notifications.filter((n) => !n.isRead).length;
}
