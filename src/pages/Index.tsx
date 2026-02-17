import { useState } from "react";
import AuthScreen from "@/components/messenger/AuthScreen";
import type { UserProfile } from "@/components/messenger/AuthScreen";
import Sidebar from "@/components/messenger/Sidebar";
import ChatList from "@/components/messenger/ChatList";
import ChatView from "@/components/messenger/ChatView";
import VpnPanel from "@/components/messenger/VpnPanel";
import SecurityPanel from "@/components/messenger/SecurityPanel";
import CallsPanel from "@/components/messenger/CallsPanel";
import FilesPanel from "@/components/messenger/FilesPanel";
import ContactsPanel from "@/components/messenger/ContactsPanel";
import SettingsPanel from "@/components/messenger/SettingsPanel";
import ProfileView from "@/components/messenger/ProfileView";
import CreateGroupChannel from "@/components/messenger/CreateGroupChannel";
import AiChat from "@/components/messenger/AiChat";
import AntiHackPanel from "@/components/messenger/AntiHackPanel";
import type { Chat } from "@/components/messenger/ChatList";

const Index = () => {
  const [user, setUser] = useState<UserProfile | null>(null);
  const [activeTab, setActiveTab] = useState("chats");
  const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
  const [vpnActive, setVpnActive] = useState(true);
  const [showProfile, setShowProfile] = useState(false);
  const [showCreateGroup, setShowCreateGroup] = useState(false);
  const [viewingContactProfile, setViewingContactProfile] = useState<Chat | null>(null);

  if (!user) {
    return <AuthScreen onLogin={setUser} />;
  }

  if (showProfile) {
    return (
      <div className="h-screen flex overflow-hidden bg-background">
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => { setActiveTab(tab); setShowProfile(false); setShowCreateGroup(false); setViewingContactProfile(null); }}
          vpnActive={vpnActive}
          user={user}
          onProfileClick={() => setShowProfile(true)}
        />
        <ProfileView
          profile={user}
          onUpdate={(updated) => { setUser(updated); setShowProfile(false); }}
          onClose={() => setShowProfile(false)}
          isOwnProfile
        />
      </div>
    );
  }

  if (viewingContactProfile) {
    const contactProfile: UserProfile = {
      id: "#" + viewingContactProfile.id + "abc",
      nickname: viewingContactProfile.name,
      avatar: viewingContactProfile.avatar,
      status: viewingContactProfile.online ? "В сети" : "Был(а) недавно",
      bio: "Пользователь ShadowLink",
    };
    return (
      <div className="h-screen flex overflow-hidden bg-background">
        <Sidebar
          activeTab={activeTab}
          onTabChange={(tab) => { setActiveTab(tab); setViewingContactProfile(null); setShowCreateGroup(false); }}
          vpnActive={vpnActive}
          user={user}
          onProfileClick={() => { setShowProfile(true); setViewingContactProfile(null); }}
        />
        <ProfileView
          profile={contactProfile}
          onUpdate={() => {}}
          onClose={() => setViewingContactProfile(null)}
          isOwnProfile={false}
        />
      </div>
    );
  }

  const renderContent = () => {
    if (showCreateGroup) {
      return (
        <CreateGroupChannel
          onClose={() => setShowCreateGroup(false)}
          onCreate={(name, type, members) => {
            setShowCreateGroup(false);
          }}
        />
      );
    }

    switch (activeTab) {
      case "chats":
        return (
          <>
            <ChatList
              onSelectChat={(chat) => setSelectedChat(chat)}
              selectedChatId={selectedChat?.id || null}
              onCreateGroup={() => setShowCreateGroup(true)}
            />
            <ChatView
              chat={selectedChat}
              onViewProfile={(chat) => setViewingContactProfile(chat)}
            />
          </>
        );
      case "calls":
        return <CallsPanel />;
      case "files":
        return <FilesPanel />;
      case "contacts":
        return <ContactsPanel />;
      case "ai":
        return <AiChat />;
      case "vpn":
        return (
          <VpnPanel
            vpnActive={vpnActive}
            onToggleVpn={() => setVpnActive(!vpnActive)}
          />
        );
      case "antihack":
        return <AntiHackPanel />;
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
        onTabChange={(tab) => { setActiveTab(tab); setShowCreateGroup(false); }}
        vpnActive={vpnActive}
        user={user}
        onProfileClick={() => setShowProfile(true)}
      />
      <div className="flex-1 flex h-full overflow-hidden">
        {renderContent()}
      </div>
    </div>
  );
};

export default Index;
