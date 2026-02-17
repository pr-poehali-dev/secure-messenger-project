import Icon from "@/components/ui/icon";
import type { UserProfile } from "./AuthScreen";

interface SidebarProps {
  activeTab: string;
  onTabChange: (tab: string) => void;
  vpnActive: boolean;
  user: UserProfile;
  onProfileClick: () => void;
}

const tabs = [
  { id: "chats", icon: "MessageSquare", label: "Чаты" },
  { id: "calls", icon: "Phone", label: "Звонки" },
  { id: "files", icon: "FolderClosed", label: "Файлы" },
  { id: "contacts", icon: "Users", label: "Контакты" },
  { id: "ai", icon: "Bot", label: "ShadowAI" },
  { id: "vpn", icon: "Shield", label: "VPN" },
  { id: "antihack", icon: "ShieldAlert", label: "Антивзлом" },
  { id: "security", icon: "Lock", label: "Защита" },
  { id: "settings", icon: "Settings", label: "Настройки" },
];

const Sidebar = ({ activeTab, onTabChange, vpnActive, user, onProfileClick }: SidebarProps) => {
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

      <nav className="flex-1 px-2 lg:px-3 space-y-1 overflow-y-auto scrollbar-gaming">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabChange(tab.id)}
            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl transition-all duration-200 group ${
              activeTab === tab.id
                ? "bg-primary/15 text-primary glow-purple"
                : "text-muted-foreground hover:text-foreground hover:bg-secondary"
            }`}
          >
            <Icon
              name={tab.icon}
              size={20}
              className={`shrink-0 ${activeTab === tab.id ? "text-primary" : ""} ${
                tab.id === "ai" ? "text-neon-pink" : ""
              }`}
            />
            <span className="hidden lg:block text-sm font-medium">
              {tab.label}
            </span>
            {tab.id === "vpn" && vpnActive && (
              <div className="hidden lg:block ml-auto w-2 h-2 rounded-full bg-neon-green animate-pulse" />
            )}
            {tab.id === "ai" && (
              <span className="hidden lg:block ml-auto text-[10px] font-gaming text-neon-pink bg-neon-pink/10 px-1.5 py-0.5 rounded">AI</span>
            )}
          </button>
        ))}
      </nav>

      <div className="p-3 lg:p-4">
        <button
          onClick={onProfileClick}
          className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/50 hover:bg-secondary/70 transition-colors"
        >
          <div className="w-9 h-9 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center shrink-0">
            <span className="text-white text-sm">{user.avatar || user.nickname.charAt(0).toUpperCase()}</span>
          </div>
          <div className="hidden lg:block flex-1 min-w-0 text-left">
            <p className="text-sm font-medium truncate">{user.nickname}</p>
            <p className="text-xs text-muted-foreground">ID: {user.id}</p>
          </div>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;
