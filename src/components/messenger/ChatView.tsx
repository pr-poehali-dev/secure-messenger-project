import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import type { Chat } from "./ChatList";

interface Message {
  id: string;
  text: string;
  time: string;
  isMine: boolean;
  type: "text" | "image" | "video" | "audio" | "file";
  mediaUrl?: string;
}

const mockMessages: Message[] = [
  { id: "1", text: "Привет! Как дела с проектом?", time: "14:20", isMine: false, type: "text" },
  { id: "2", text: "Всё чисто, работаю через VPN 🛡️", time: "14:22", isMine: true, type: "text" },
  { id: "3", text: "", time: "14:24", isMine: false, type: "image", mediaUrl: "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop" },
  { id: "4", text: "Отлично. Скинь файлы когда будут готовы", time: "14:25", isMine: false, type: "text" },
  { id: "5", text: "📎 project_v2_encrypted.zip (4.2 MB)", time: "14:30", isMine: true, type: "file" },
  { id: "6", text: "", time: "14:31", isMine: true, type: "video", mediaUrl: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop" },
  { id: "7", text: "Файлы отправлены 🔒", time: "14:32", isMine: true, type: "text" },
];

const sampleImages = [
  "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=400&h=300&fit=crop",
  "https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=400&h=300&fit=crop",
];

interface ChatViewProps {
  chat: Chat | null;
  onViewProfile?: (chat: Chat) => void;
}

const ChatView = ({ chat, onViewProfile }: ChatViewProps) => {
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(mockMessages);
  const [showAttach, setShowAttach] = useState(false);
  const [showMediaPreview, setShowMediaPreview] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = () => {
    if (!message.trim()) return;
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        text: message,
        time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        isMine: true,
        type: "text",
      },
    ]);
    setMessage("");

    setTimeout(() => {
      const replies = [
        "Принял! 👍",
        "Круто, всё зашифровано 🔒",
        "Ок, жду!",
        "Отлично, работаем дальше 💪",
        "VPN активен, мы в безопасности",
      ];
      setMessages((prev) => [
        ...prev,
        {
          id: (Date.now() + 1).toString(),
          text: replies[Math.floor(Math.random() * replies.length)],
          time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
          isMine: false,
          type: "text",
        },
      ]);
    }, 1000 + Math.random() * 2000);
  };

  const sendMedia = (type: "image" | "video") => {
    const url = sampleImages[Math.floor(Math.random() * sampleImages.length)];
    setMessages([
      ...messages,
      {
        id: Date.now().toString(),
        text: "",
        time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
        isMine: true,
        type,
        mediaUrl: url,
      },
    ]);
    setShowAttach(false);
  };

  if (!chat) {
    return (
      <div className="flex-1 flex items-center justify-center">
        <div className="text-center animate-fade-in">
          <div className="w-20 h-20 rounded-2xl gradient-gaming flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <Icon name="MessageSquare" size={36} className="text-white" />
          </div>
          <h3 className="font-gaming text-lg font-bold gradient-gaming-text mb-2">
            SHADOWLINK
          </h3>
          <p className="text-sm text-muted-foreground max-w-xs">
            Выбери чат для начала общения.
            <br />
            Все сообщения защищены E2E шифрованием.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="flex-1 flex flex-col h-full animate-fade-in">
      {showMediaPreview && (
        <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center animate-fade-in" onClick={() => setShowMediaPreview(null)}>
          <button className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
            <Icon name="X" size={24} className="text-white" />
          </button>
          <img src={showMediaPreview} alt="" className="max-w-[90%] max-h-[90%] rounded-xl object-contain" />
        </div>
      )}

      <div className="h-16 px-4 flex items-center justify-between border-b border-border glass">
        <button
          className="flex items-center gap-3 hover:opacity-80 transition-opacity"
          onClick={() => onViewProfile?.(chat)}
        >
          <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-lg">
            {chat.avatar}
          </div>
          <div>
            <h3 className="text-sm font-semibold text-left">{chat.name}</h3>
            <div className="flex items-center gap-1.5">
              {chat.online && <div className="w-2 h-2 rounded-full bg-neon-green" />}
              <span className="text-xs text-muted-foreground">
                {chat.online ? "в сети" : "был(а) недавно"}
              </span>
              {chat.encrypted && (
                <>
                  <span className="text-xs text-muted-foreground">•</span>
                  <Icon name="Lock" size={11} className="text-neon-green" />
                  <span className="text-xs text-neon-green">E2E</span>
                </>
              )}
            </div>
          </div>
        </button>
        <div className="flex items-center gap-1">
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <Icon name="Phone" size={18} className="text-muted-foreground" />
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <Icon name="Video" size={18} className="text-muted-foreground" />
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <Icon name="Search" size={18} className="text-muted-foreground" />
          </button>
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
            <Icon name="MoreVertical" size={18} className="text-muted-foreground" />
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-gaming p-4 space-y-3">
        <div className="flex justify-center">
          <div className="px-3 py-1 rounded-full bg-secondary/50 text-xs text-muted-foreground flex items-center gap-1.5">
            <Icon name="Lock" size={12} className="text-neon-green" />
            Сквозное шифрование включено
          </div>
        </div>
        {messages.map((msg, i) => (
          <div
            key={msg.id}
            className={`flex ${msg.isMine ? "justify-end" : "justify-start"} animate-fade-in`}
            style={{ animationDelay: `${i * 30}ms` }}
          >
            <div
              className={`max-w-[75%] rounded-2xl overflow-hidden ${
                msg.isMine
                  ? "bg-primary/20 neon-border rounded-br-sm"
                  : "bg-secondary rounded-bl-sm"
              } ${msg.type === "file" ? "neon-border-cyan" : ""}`}
            >
              {(msg.type === "image" || msg.type === "video") && msg.mediaUrl && (
                <button
                  className="relative block w-full"
                  onClick={() => setShowMediaPreview(msg.mediaUrl!)}
                >
                  <img
                    src={msg.mediaUrl}
                    alt=""
                    className="w-full h-48 object-cover"
                  />
                  {msg.type === "video" && (
                    <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                      <div className="w-12 h-12 rounded-full bg-white/20 backdrop-blur flex items-center justify-center">
                        <Icon name="Play" size={24} className="text-white ml-1" />
                      </div>
                    </div>
                  )}
                </button>
              )}
              <div className={`px-4 py-2.5 ${(msg.type === "image" || msg.type === "video") && !msg.text ? "py-1.5" : ""}`}>
                {msg.type === "file" && (
                  <div className="flex items-center gap-2 mb-1">
                    <Icon name="FileArchive" size={16} className="text-neon-cyan" />
                  </div>
                )}
                {msg.text && <p className="text-sm leading-relaxed">{msg.text}</p>}
                <div className={`flex items-center gap-1 mt-1 ${msg.isMine ? "justify-end" : ""}`}>
                  <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                  {msg.isMine && <Icon name="CheckCheck" size={14} className="text-neon-cyan" />}
                </div>
              </div>
            </div>
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>

      {showAttach && (
        <div className="px-4 pb-2 animate-fade-in">
          <div className="flex gap-2 p-2 rounded-xl bg-secondary/50 neon-border">
            <button
              onClick={() => sendMedia("image")}
              className="flex-1 flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-neon-cyan/15 flex items-center justify-center">
                <Icon name="Image" size={20} className="text-neon-cyan" />
              </div>
              <span className="text-[11px] text-muted-foreground">Фото</span>
            </button>
            <button
              onClick={() => sendMedia("video")}
              className="flex-1 flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-neon-pink/15 flex items-center justify-center">
                <Icon name="Video" size={20} className="text-neon-pink" />
              </div>
              <span className="text-[11px] text-muted-foreground">Видео</span>
            </button>
            <button
              onClick={() => setShowAttach(false)}
              className="flex-1 flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-neon-purple/15 flex items-center justify-center">
                <Icon name="FileText" size={20} className="text-neon-purple" />
              </div>
              <span className="text-[11px] text-muted-foreground">Файл</span>
            </button>
            <button
              onClick={() => setShowAttach(false)}
              className="flex-1 flex flex-col items-center gap-1 p-3 rounded-lg hover:bg-primary/10 transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-neon-green/15 flex items-center justify-center">
                <Icon name="MapPin" size={20} className="text-neon-green" />
              </div>
              <span className="text-[11px] text-muted-foreground">Локация</span>
            </button>
          </div>
        </div>
      )}

      <div className="p-4 border-t border-border glass">
        <div className="flex items-center gap-2">
          <button
            onClick={() => setShowAttach(!showAttach)}
            className={`w-9 h-9 rounded-lg flex items-center justify-center transition-colors shrink-0 ${
              showAttach ? "bg-primary/15 text-primary" : "hover:bg-secondary text-muted-foreground"
            }`}
          >
            <Icon name="Paperclip" size={18} />
          </button>
          <Input
            placeholder="Сообщение..."
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-secondary/50 border-border/50 h-10 text-sm focus:ring-primary/30"
          />
          <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors shrink-0">
            <Icon name="Mic" size={18} className="text-muted-foreground" />
          </button>
          <button
            onClick={sendMessage}
            className="w-9 h-9 rounded-lg bg-primary hover:bg-primary/80 flex items-center justify-center transition-colors shrink-0 glow-purple"
          >
            <Icon name="Send" size={16} className="text-primary-foreground" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatView;
