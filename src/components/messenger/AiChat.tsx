import { useState, useRef, useEffect } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";

interface AiMessage {
  id: string;
  text: string;
  isAi: boolean;
  time: string;
}

const aiResponses = [
  "Привет! Я ShadowAI — твой защищённый ассистент. Чем могу помочь?",
  "Все наши разговоры зашифрованы E2E. Никто не может их прочитать, даже мы.",
  "Для максимальной безопасности рекомендую включить VPN и двухэтапную аутентификацию.",
  "Я могу помочь с настройками безопасности, подсказать как защитить аккаунт или ответить на любые вопросы.",
  "Используй автоудаление сообщений для особо секретных чатов — они исчезнут через 24 часа.",
  "Чтобы добавить контакт в чёрный список, перейди в раздел Безопасность → Чёрный список.",
  "Рекомендую использовать серверы в Швейцарии или Исландии — там самые строгие законы о приватности.",
  "Для создания группы нажми + в разделе чатов и выбери 'Создать группу'.",
  "Ты можешь скрыть свой статус онлайн в настройках безопасности.",
  "Режим анонимности полностью скрывает твой ID и аватар от других пользователей.",
];

const AiChat = () => {
  const [messages, setMessages] = useState<AiMessage[]>([
    {
      id: "1",
      text: "Привет! Я **ShadowAI** — твой защищённый ИИ-ассистент 🤖\n\nМогу помочь с настройками безопасности, ответить на вопросы или просто поболтать. Все наши разговоры зашифрованы.",
      isAi: true,
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    },
  ]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, typing]);

  const sendMessage = () => {
    if (!input.trim()) return;
    const userMsg: AiMessage = {
      id: Date.now().toString(),
      text: input.trim(),
      isAi: false,
      time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
    };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setTyping(true);

    setTimeout(() => {
      const response = aiResponses[Math.floor(Math.random() * aiResponses.length)];
      const aiMsg: AiMessage = {
        id: (Date.now() + 1).toString(),
        text: response,
        isAi: true,
        time: new Date().toLocaleTimeString("ru-RU", { hour: "2-digit", minute: "2-digit" }),
      };
      setMessages((prev) => [...prev, aiMsg]);
      setTyping(false);
    }, 800 + Math.random() * 1200);
  };

  return (
    <div className="flex-1 flex flex-col h-full animate-fade-in">
      <div className="h-16 px-4 flex items-center justify-between border-b border-border glass">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center">
            <Icon name="Bot" size={20} className="text-white" />
          </div>
          <div>
            <h3 className="text-sm font-semibold">ShadowAI</h3>
            <div className="flex items-center gap-1.5">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-pulse" />
              <span className="text-xs text-muted-foreground">Всегда на связи</span>
              <span className="text-xs text-muted-foreground">•</span>
              <Icon name="Lock" size={11} className="text-neon-green" />
              <span className="text-xs text-neon-green">E2E</span>
            </div>
          </div>
        </div>
        <div className="px-2.5 py-1 rounded-full bg-neon-purple/10 neon-border">
          <span className="text-[11px] font-gaming text-neon-purple">AI</span>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto scrollbar-gaming p-4 space-y-3">
        <div className="flex justify-center">
          <div className="px-3 py-1 rounded-full bg-neon-purple/10 text-xs text-neon-purple flex items-center gap-1.5">
            <Icon name="Sparkles" size={12} />
            ИИ-ассистент ShadowLink
          </div>
        </div>

        {messages.map((msg) => (
          <div
            key={msg.id}
            className={`flex ${msg.isAi ? "justify-start" : "justify-end"} animate-fade-in`}
          >
            {msg.isAi && (
              <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center mr-2 shrink-0 mt-1">
                <Icon name="Bot" size={14} className="text-white" />
              </div>
            )}
            <div
              className={`max-w-[75%] px-4 py-2.5 rounded-2xl ${
                msg.isAi
                  ? "bg-neon-purple/10 border border-neon-purple/20 rounded-bl-sm"
                  : "bg-primary/20 neon-border rounded-br-sm"
              }`}
            >
              <p className="text-sm leading-relaxed whitespace-pre-line">{msg.text}</p>
              <div className={`flex items-center gap-1 mt-1 ${msg.isAi ? "" : "justify-end"}`}>
                <span className="text-[10px] text-muted-foreground">{msg.time}</span>
                {!msg.isAi && <Icon name="CheckCheck" size={14} className="text-neon-cyan" />}
              </div>
            </div>
          </div>
        ))}

        {typing && (
          <div className="flex justify-start animate-fade-in">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-neon-purple to-neon-pink flex items-center justify-center mr-2 shrink-0">
              <Icon name="Bot" size={14} className="text-white" />
            </div>
            <div className="px-4 py-3 rounded-2xl bg-neon-purple/10 border border-neon-purple/20 rounded-bl-sm">
              <div className="flex gap-1.5">
                <div className="w-2 h-2 rounded-full bg-neon-purple animate-bounce" style={{ animationDelay: "0ms" }} />
                <div className="w-2 h-2 rounded-full bg-neon-purple animate-bounce" style={{ animationDelay: "150ms" }} />
                <div className="w-2 h-2 rounded-full bg-neon-purple animate-bounce" style={{ animationDelay: "300ms" }} />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      <div className="p-4 border-t border-border glass">
        <div className="flex items-center gap-2">
          <Input
            placeholder="Спроси ShadowAI..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            className="flex-1 bg-secondary/50 border-border/50 h-10 text-sm focus:ring-primary/30"
          />
          <button
            onClick={sendMessage}
            className="w-9 h-9 rounded-lg bg-gradient-to-r from-neon-purple to-neon-pink hover:opacity-90 flex items-center justify-center transition-all shrink-0 glow-purple"
          >
            <Icon name="Send" size={16} className="text-white" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default AiChat;
