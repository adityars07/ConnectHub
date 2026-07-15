"use client";

import {
  createContext,
  useContext,
  useState,
  useCallback,
  type ReactNode,
} from "react";
import {
  currentUser,
  conversations,
  notifications as mockNotifications,
  type User,
  type Conversation,
  type Notification,
} from "@/lib/mock-data";

interface AppContextType {
  user: User;
  activeConversation: Conversation | null;
  setActiveConversation: (conv: Conversation | null) => void;
  notifications: Notification[];
  markNotificationRead: (id: string) => void;
  markAllNotificationsRead: () => void;
  unreadNotifications: number;
  isSidebarOpen: boolean;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  isMobileChatOpen: boolean;
  setMobileChatOpen: (open: boolean) => void;
}

const AppContext = createContext<AppContextType | null>(null);

export function AppProvider({ children }: { children: ReactNode }) {
  const [user] = useState<User>(currentUser);
  const [activeConversation, setActiveConversation] =
    useState<Conversation | null>(conversations[0]);
  const [notifs, setNotifs] = useState<Notification[]>(mockNotifications);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isMobileChatOpen, setMobileChatOpen] = useState(false);

  const markNotificationRead = useCallback((id: string) => {
    setNotifs((prev) =>
      prev.map((n) => (n.id === id ? { ...n, isRead: true } : n))
    );
  }, []);

  const markAllNotificationsRead = useCallback(() => {
    setNotifs((prev) => prev.map((n) => ({ ...n, isRead: true })));
  }, []);

  const unreadNotifications = notifs.filter((n) => !n.isRead).length;

  const toggleSidebar = useCallback(() => {
    setIsSidebarOpen((prev) => !prev);
  }, []);

  const setSidebarOpen = useCallback((open: boolean) => {
    setIsSidebarOpen(open);
  }, []);

  return (
    <AppContext.Provider
      value={{
        user,
        activeConversation,
        setActiveConversation,
        notifications: notifs,
        markNotificationRead,
        markAllNotificationsRead,
        unreadNotifications,
        isSidebarOpen,
        toggleSidebar,
        setSidebarOpen,
        isMobileChatOpen,
        setMobileChatOpen,
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useApp must be used within an AppProvider");
  }
  return context;
}
