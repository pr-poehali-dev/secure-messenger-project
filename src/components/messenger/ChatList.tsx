import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

interface Chat {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  avatar: string;
  online: boolean;
  encrypted: boolean;
  type?: "personal" | "group" | "channel";
}

const mockChats: Chat[] = [
  { id: "1", name: "Кибер Волк", lastMessage: "Файлы отправлены 🔒", time: "14:32", unread: 3, avatar: "🐺", online: true, encrypted: true, type: "personal" },
  { id: "2", name: "Тёмный Феникс", lastMessage: "Подключай VPN и заходи", time: "13:15", unread: 0, avatar: "🔥", online: true, encrypted: true, type: "personal" },
  { id: "3", name: "Группа: Альянс", lastMessage: "Призрак: Всем привет!", time: "12:40", unread: 12, avatar: "⚔️", online: false, encrypted: true, type: "group" },
  { id: "4", name: "Нео Страйк", lastMessage: "Аудио сообщение", time: "вчера", unread: 0, avatar: "⚡", online: false, encrypted: true, type: "personal" },
  { id: "5", name: "Ледяная Тень", lastMessage: "📷 Фото", time: "вчера", unread: 1, avatar: "❄️", online: false, encrypted: true, type: "personal" },
  { id: "6", name: "Канал: Новости", lastMessage: "Обновление безопасности v2.1", time: "пн", unread: 5, avatar: "📢", online: false, encrypted: false, type: "channel" },
];

interface ChatListProps {
  onSelectChat: (chat: Chat) => void;
  selectedChatId: string | null;
  onCreateGroup: () => void;
}

const ChatList = ({ onSelectChat, selectedChatId, onCreateGroup }: ChatListProps) => {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<"all" | "personal" | "group" | "channel">("all");

  const filtered = mockChats.filter((c) => {
    const matchSearch = c.name.toLowerCase().includes(search.toLowerCase());
    const matchFilter = filter === "all" || c.type === filter;
    return matchSearch && matchFilter;
  });

  return (
    <div className="w-full lg:w-80 h-full border-r border-border flex flex-col">
      <div className="p-4 space-y-3">
        <div className="flex items-center justify-between">
          <h2 className="font-gaming text-sm font-semibold tracking-wider text-foreground">
            СООБЩЕНИЯ
          </h2>
          <div className="flex gap-1">
            <button
              onClick={onCreateGroup}
              className="w-8 h-8 rounded-lg bg-neon-cyan/15 hover:bg-neon-cyan/25 flex items-center justify-center transition-colors"
              title="Создать группу / канал"
            >
              <Icon name="Plus" size={16} className="text-neon-cyan" />
            </button>
            <button className="w-8 h-8 rounded-lg bg-primary/15 hover:bg-primary/25 flex items-center justify-center transition-colors">
              <Icon name="PenSquare" size={16} className="text-primary" />
            </button>
          </div>
        </div>
        <div className="relative">
          <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Поиск чатов..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-secondary/50 border-border/50 h-9 text-sm focus:ring-primary/30"
          />
        </div>
        <div className="flex gap-1">
          {([
            { key: "all", label: "Все" },
            { key: "personal", label: "Личные" },
            { key: "group", label: "Группы" },
            { key: "channel", label: "Каналы" },
          ] as const).map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`flex-1 py-1.5 rounded-lg text-[11px] font-medium transition-all ${
                filter === f.key
                  ? "bg-primary/15 text-primary"
                  : "text-muted-foreground hover:bg-secondary/50"
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-gaming px-2 space-y-0.5">
        {filtered.map((chat, i) => (
          <button
            key={chat.id}
            onClick={() => onSelectChat(chat)}
            className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 animate-fade-in ${
              selectedChatId === chat.id
                ? "bg-primary/10 neon-border"
                : "hover:bg-secondary/70"
            }`}
            style={{ animationDelay: `${i * 40}ms` }}
          >
            <div className="relative shrink-0">
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-xl">
                {chat.avatar}
              </div>
              {chat.online && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-neon-green rounded-full border-2 border-background" />
              )}
              {chat.type === "group" && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-neon-cyan rounded-full border-2 border-background flex items-center justify-center">
                  <Icon name="Users" size={8} className="text-white" />
                </div>
              )}
              {chat.type === "channel" && (
                <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-neon-purple rounded-full border-2 border-background flex items-center justify-center">
                  <Icon name="Megaphone" size={8} className="text-white" />
                </div>
              )}
            </div>
            <div className="flex-1 min-w-0 text-left">
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium truncate">{chat.name}</span>
                <span className="text-[11px] text-muted-foreground shrink-0 ml-2">
                  {chat.time}
                </span>
              </div>
              <div className="flex items-center gap-1.5 mt-0.5">
                {chat.encrypted && (
                  <Icon name="Lock" size={11} className="text-neon-green shrink-0" />
                )}
                <span className="text-xs text-muted-foreground truncate">
                  {chat.lastMessage}
                </span>
              </div>
            </div>
            {chat.unread > 0 && (
              <div className="shrink-0 min-w-[20px] h-5 px-1.5 rounded-full bg-primary flex items-center justify-center">
                <span className="text-[11px] font-bold text-primary-foreground">
                  {chat.unread}
                </span>
              </div>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ChatList;
export type { Chat };
