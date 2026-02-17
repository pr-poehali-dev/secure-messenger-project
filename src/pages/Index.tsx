import { useState } from "react";
import Sidebar from "@/components/messenger/Sidebar";
import ChatList from "@/components/messenger/ChatList";
import ChatView from "@/components/messenger/ChatView";
import VpnPanel from "@/components/messenger/VpnPanel";
import SecurityPanel from "@/components/messenger/SecurityPanel";
import CallsPanel from "@/components/messenger/CallsPanel";
import FilesPanel from "@/components/messenger/FilesPanel";
import ContactsPanel from "@/components/messenger/ContactsPanel";
import SettingsPanel from "@/components/messenger/SettingsPanel";
import type { Chat } from "@/components/messenger/ChatList";

const Index = () => {
  const [activeTab, setActiveTab] = useState("chats");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [vpnActive, setVpnActive] = useState(true);

  const renderContent = () => {
    switch (activeTab) {
      case "chats":
        return (
          <>
            <ChatList
              onSelectChat={(chat) => setSelectedChat(chat)}
              selectedChatId={selectedChat?.id || null}
            />
            <ChatView chat={selectedChat} />
          </>
        );
      case "calls":
        return <CallsPanel />;
      case "files":
        return <FilesPanel />;
      case "contacts":
        return <ContactsPanel />;
      case "vpn":
        return (
          <VpnPanel
            vpnActive={vpnActive}
            onToggleVpn={() => setVpnActive(!vpnActive)}
          />
        );
      case "security":
        return <SecurityPanel />;
      case "settings":
        return <SettingsPanel />;
      default:
        return null;
    }
  };

  return (
    <div className="h-screen flex overflow-hidden bg-background">
      <Sidebar
        activeTab={activeTab}
        onTabChange={setActiveTab}
        vpnActive={vpnActive}
      />
      <div className="flex-1 flex h-full overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
