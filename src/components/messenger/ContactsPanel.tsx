import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

interface Contact {
  id: string;
  name: string;
  avatar: string;
  status: string;
  online: boolean;
  verified: boolean;
}

const mockContacts: Contact[] = [
  { id: "1", name: "Кибер Волк", avatar: "🐺", status: "Всегда на связи", online: true, verified: true },
  { id: "2", name: "Тёмный Феникс", avatar: "🔥", status: "Не беспокоить", online: true, verified: true },
  { id: "3", name: "Нео Страйк", avatar: "⚡", status: "В тени...", online: false, verified: true },
  { id: "4", name: "Ледяная Тень", avatar: "❄️", status: "Offline is the new luxury", online: false, verified: false },
  { id: "5", name: "Кварц", avatar: "💎", status: "GG WP", online: false, verified: true },
  { id: "6", name: "Вайпер", avatar: "🐍", status: "In code we trust", online: true, verified: false },
];

const ContactsPanel = () => {
  const [search, setSearch] = useState("");
  const filtered = mockContacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );
  const onlineContacts = filtered.filter((c) => c.online);
  const offlineContacts = filtered.filter((c) => !c.online);

  return (
    <div className="flex-1 p-6 overflow-y-auto scrollbar-gaming">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center animate-fade-in">
          <h2 className="font-gaming text-xl font-bold gradient-gaming-text mb-2">
            КОНТАКТЫ
          </h2>
          <p className="text-sm text-muted-foreground">
            {mockContacts.length} контактов • {onlineContacts.length} в сети
          </p>
        </div>

        <div className="flex items-center gap-2 animate-fade-in">
          <div className="relative flex-1">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Найти контакт..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary/50 border-border/50 h-10 text-sm"
            />
          </div>
          <button className="h-10 px-4 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary text-sm font-medium transition-colors flex items-center gap-2">
            <Icon name="UserPlus" size={16} />
            <span className="hidden sm:inline">Добавить</span>
          </button>
        </div>

        {onlineContacts.length > 0 && (
          <div className="animate-fade-in">
            <h3 className="font-gaming text-xs font-semibold tracking-wider text-neon-green mb-3 flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              В СЕТИ — {onlineContacts.length}
            </h3>
            <div className="space-y-2">
              {onlineContacts.map((contact, i) => (
                <ContactCard key={contact.id} contact={contact} delay={i * 40} />
              ))}
            </div>
          </div>
        )}

        {offlineContacts.length > 0 && (
          <div className="animate-fade-in">
            <h3 className="font-gaming text-xs font-semibold tracking-wider text-muted-foreground mb-3">
              НЕ В СЕТИ — {offlineContacts.length}
            </h3>
            <div className="space-y-2">
              {offlineContacts.map((contact, i) => (
                <ContactCard key={contact.id} contact={contact} delay={i * 40} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

const ContactCard = ({ contact, delay }: { contact: Contact; delay: number }) => (
  <div
    className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all animate-fade-in group"
    style={{ animationDelay: `${delay}ms` }}
  >
    <div className="relative shrink-0">
      <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-xl">
        {contact.avatar}
      </div>
      {contact.online && (
        <div className="absolute -bottom-0.5 -right-0.5 w-3.5 h-3.5 bg-neon-green rounded-full border-2 border-background" />
      )}
    </div>
    <div className="flex-1 min-w-0">
      <div className="flex items-center gap-1.5">
        <p className="text-sm font-medium">{contact.name}</p>
        {contact.verified && (
          <Icon name="BadgeCheck" size={14} className="text-neon-cyan shrink-0" />
        )}
      </div>
      <p className="text-xs text-muted-foreground truncate">{contact.status}</p>
    </div>
    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
      <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center">
        <Icon name="MessageSquare" size={16} className="text-primary" />
      </button>
      <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center">
        <Icon name="Phone" size={16} className="text-neon-green" />
      </button>
      <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center">
        <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
      </button>
    </div>
  </div>
);

export default ContactsPanel;
