import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface Contact {
  id: string;
  name: string;
  avatar: string;
}

const availableContacts: Contact[] = [
  { id: "c1", name: "Кибер Волк", avatar: "🐺" },
  { id: "c2", name: "Тёмный Феникс", avatar: "🔥" },
  { id: "c3", name: "Нео Страйк", avatar: "⚡" },
  { id: "c4", name: "Ледяная Тень", avatar: "❄️" },
  { id: "c5", name: "Кварц", avatar: "💎" },
  { id: "c6", name: "Вайпер", avatar: "🐍" },
];

interface CreateGroupChannelProps {
  onClose: () => void;
  onCreate: (name: string, type: "group" | "channel", members: string[]) => void;
}

const CreateGroupChannel = ({ onClose, onCreate }: CreateGroupChannelProps) => {
  const [type, setType] = useState<"group" | "channel">("group");
  const [name, setName] = useState("");
  const [selectedMembers, setSelectedMembers] = useState<string[]>([]);
  const [search, setSearch] = useState("");

  const filtered = availableContacts.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  const toggleMember = (id: string) => {
    setSelectedMembers((prev) =>
      prev.includes(id) ? prev.filter((m) => m !== id) : [...prev, id]
    );
  };

  const handleCreate = () => {
    if (!name.trim()) return;
    onCreate(name.trim(), type, selectedMembers);
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto scrollbar-gaming">
      <div className="max-w-lg mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center">
            <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
          </button>
          <h2 className="font-gaming text-sm font-semibold tracking-wider">СОЗДАТЬ</h2>
          <div className="w-9" />
        </div>

        <div className="flex bg-secondary/50 rounded-xl p-1">
          <button
            onClick={() => setType("group")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              type === "group" ? "bg-primary text-primary-foreground glow-purple" : "text-muted-foreground"
            }`}
          >
            <Icon name="Users" size={16} />
            Группа
          </button>
          <button
            onClick={() => setType("channel")}
            className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all flex items-center justify-center gap-2 ${
              type === "channel" ? "bg-primary text-primary-foreground glow-purple" : "text-muted-foreground"
            }`}
          >
            <Icon name="Megaphone" size={16} />
            Канал
          </button>
        </div>

        <div className="text-center">
          <div className="w-20 h-20 rounded-2xl bg-secondary/50 flex items-center justify-center text-3xl mx-auto">
            {type === "group" ? "👥" : "📢"}
          </div>
          <p className="text-xs text-muted-foreground mt-3">
            {type === "group"
              ? "Группа для общения до 1000 участников"
              : "Канал для публикации новостей"}
          </p>
        </div>

        <div>
          <label className="text-xs text-muted-foreground font-gaming tracking-wider">НАЗВАНИЕ</label>
          <Input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder={type === "group" ? "Название группы..." : "Название канала..."}
            className="mt-1.5 bg-secondary/30 border-border/50 h-11"
          />
        </div>

        <div>
          <label className="text-xs text-muted-foreground font-gaming tracking-wider mb-2 block">
            ДОБАВИТЬ УЧАСТНИКОВ ({selectedMembers.length})
          </label>
          <div className="relative mb-3">
            <Icon name="Search" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Поиск контактов..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="pl-9 bg-secondary/30 border-border/50 h-9 text-sm"
            />
          </div>

          {selectedMembers.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mb-3 animate-fade-in">
              {selectedMembers.map((id) => {
                const contact = availableContacts.find((c) => c.id === id);
                if (!contact) return null;
                return (
                  <button
                    key={id}
                    onClick={() => toggleMember(id)}
                    className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 text-xs font-medium hover:bg-primary/25 transition-colors"
                  >
                    <span>{contact.avatar}</span>
                    <span>{contact.name}</span>
                    <Icon name="X" size={12} className="text-muted-foreground" />
                  </button>
                );
              })}
            </div>
          )}

          <div className="space-y-1.5">
            {filtered.map((contact) => (
              <button
                key={contact.id}
                onClick={() => toggleMember(contact.id)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all ${
                  selectedMembers.includes(contact.id)
                    ? "bg-primary/10 neon-border"
                    : "bg-secondary/20 hover:bg-secondary/40"
                }`}
              >
                <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-xl">
                  {contact.avatar}
                </div>
                <span className="text-sm font-medium flex-1 text-left">{contact.name}</span>
                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                  selectedMembers.includes(contact.id) ? "bg-primary border-primary" : "border-muted-foreground"
                }`}>
                  {selectedMembers.includes(contact.id) && (
                    <Icon name="Check" size={12} className="text-primary-foreground" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        <Button
          onClick={handleCreate}
          disabled={!name.trim()}
          className="w-full h-11 bg-primary hover:bg-primary/90 font-medium glow-purple disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Icon name={type === "group" ? "Users" : "Megaphone"} size={16} className="mr-2" />
          Создать {type === "group" ? "группу" : "канал"}
        </Button>
      </div>
    </div>
  );
};

export default CreateGroupChannel;
