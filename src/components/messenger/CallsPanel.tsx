import Icon from "@/components/ui/icon";

interface Call {
  id: string;
  name: string;
  avatar: string;
  type: "incoming" | "outgoing" | "missed";
  callType: "audio" | "video";
  time: string;
  duration: string;
}

const mockCalls: Call[] = [
  { id: "1", name: "Кибер Волк", avatar: "🐺", type: "outgoing", callType: "video", time: "Сегодня, 13:45", duration: "12:34" },
  { id: "2", name: "Тёмный Феникс", avatar: "🔥", type: "incoming", callType: "audio", time: "Сегодня, 11:20", duration: "5:17" },
  { id: "3", name: "Нео Страйк", avatar: "⚡", type: "missed", callType: "audio", time: "Вчера, 22:15", duration: "-" },
  { id: "4", name: "Ледяная Тень", avatar: "❄️", type: "outgoing", callType: "video", time: "Вчера, 18:30", duration: "45:02" },
  { id: "5", name: "Группа: Альянс", avatar: "⚔️", type: "incoming", callType: "audio", time: "Пн, 15:00", duration: "1:23:45" },
];

const CallsPanel = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto scrollbar-gaming">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center animate-fade-in">
          <h2 className="font-gaming text-xl font-bold gradient-gaming-text mb-2">
            ЗВОНКИ
          </h2>
          <p className="text-sm text-muted-foreground">
            Шифрованные аудио и видеозвонки
          </p>
        </div>

        <div className="flex gap-2 animate-fade-in">
          <button className="flex-1 p-4 rounded-xl bg-primary/10 neon-border hover:bg-primary/20 transition-all flex items-center justify-center gap-2">
            <Icon name="Phone" size={18} className="text-primary" />
            <span className="text-sm font-medium">Аудиозвонок</span>
          </button>
          <button className="flex-1 p-4 rounded-xl bg-neon-cyan/10 neon-border-cyan hover:bg-neon-cyan/20 transition-all flex items-center justify-center gap-2">
            <Icon name="Video" size={18} className="text-neon-cyan" />
            <span className="text-sm font-medium">Видеозвонок</span>
          </button>
        </div>

        <div className="space-y-2">
          {mockCalls.map((call, i) => (
            <div
              key={call.id}
              className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all animate-fade-in"
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className="w-11 h-11 rounded-full bg-secondary flex items-center justify-center text-xl shrink-0">
                {call.avatar}
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{call.name}</p>
                <div className="flex items-center gap-1.5 mt-0.5">
                  <Icon
                    name={call.type === "missed" ? "PhoneMissed" : call.type === "incoming" ? "PhoneIncoming" : "PhoneOutgoing"}
                    size={13}
                    className={call.type === "missed" ? "text-destructive" : "text-neon-green"}
                  />
                  <span className="text-xs text-muted-foreground">{call.time}</span>
                  {call.duration !== "-" && (
                    <>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{call.duration}</span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-1.5">
                {call.callType === "video" && (
                  <div className="w-2 h-2 rounded-full bg-neon-cyan" />
                )}
                <button className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center transition-colors">
                  <Icon
                    name={call.callType === "video" ? "Video" : "Phone"}
                    size={16}
                    className="text-primary"
                  />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CallsPanel;
