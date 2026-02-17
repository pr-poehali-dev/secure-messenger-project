import { useState } from "react";
import Icon from "@/components/ui/icon";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  vpnActive: boolean;
}

const tabs = [
  { id: "chats", icon: "MessageSquare", label: "Чаты" },
  { id: "calls", icon: "Phone", label: "Звонки" },
  { id: "files", icon: "FolderClosed", label: "Файлы" },
  { id: "contacts", icon: "Users", label: "Контакты" },
  { id: "vpn", icon: "Shield", label: "VPN" },
  { id: "security", icon: "Lock", label: "Защита" },
  { id: "settings", icon: "Settings", label: "Настройки" },
];

const Sidebar = ({ activeTab, onTabChange, vpnActive }: SidebarProps) => {
  return (
    <div className="w-20 lg:w-72 h-full glass border-r border-border flex flex-col">
      <div className="p-4 lg:p-6 flex items-center gap-3">
        <div className="w-10 h-10 rounded-xl gradient-gaming flex items-center justify-center shrink-0">
          <Icon name="Zap" size={20} className="text-white" />
        </div>
        <div className="hidden lg:block">
          <h1 className="font-gaming text-sm font-bold gradient-gaming-text">
            SHADOWLINK
          </h1>
          <div className="flex items-center gap-1.5 mt-0.5">
            <div className={`w-2 h-2 rounded-full ${vpnActive ? "bg-neon-green animate-pulse" : "bg-muted-foreground"}`} />
            <span className="text-xs text-muted-foreground">
              {vpnActive ? "VPN активен" : "VPN выключен"}
            </span>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-2 lg:px-3 space-y-1">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group ${
              activeTab === tab.id
                ? "bg-primary/15 text-primary glow-purple"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Icon
              name={tab.icon}
              size={20}
              className={`shrink-0 ${activeTab === tab.id ? "text-primary" : ""}`}
            />
            <span className="hidden lg:block text-sm font-medium">
              {tab.label}
            </span>
            {tab.id === "vpn" && vpnActive && (
              <div className="hidden lg:block ml-auto w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 lg:p-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-secondary/50">
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center shrink-0">
            <span className="text-white text-sm font-bold">A</span>
          </div>
          <div className="hidden lg:block flex-1 min-w-0">
            <p className="text-sm font-medium truncate">Аноним</p>
            <p className="text-xs text-muted-foreground">ID: #x7k9m2</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
