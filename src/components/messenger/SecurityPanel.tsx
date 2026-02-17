import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";

interface BlockedContact {
  id: string;
  name: string;
  avatar: string;
}

const SecurityPanel = () => {
  const [hideOnline, setHideOnline] = useState(true);
  const [twoFactor, setTwoFactor] = useState(true);
  const [anonymousMode, setAnonymousMode] = useState(false);
  const [autoDelete, setAutoDelete] = useState(false);
  const [screenProtection, setScreenProtection] = useState(true);

  const [blockedContacts] = useState<BlockedContact[]>([
    { id: "1", name: "Спамер_001", avatar: "🚫" },
    { id: "2", name: "Unknown_User", avatar: "👤" },
  ]);

  const features = [
    {
      icon: "EyeOff",
      title: "Скрыть статус онлайн",
      desc: "Никто не видит, когда вы в сети",
      active: hideOnline,
      onChange: setHideOnline,
      color: "text-neon-purple",
    },
    {
      icon: "ShieldCheck",
      title: "Двухэтапная аутентификация",
      desc: "Дополнительный пароль при входе",
      active: twoFactor,
      onChange: setTwoFactor,
      color: "text-neon-green",
    },
    {
      icon: "Ghost",
      title: "Режим анонимности",
      desc: "Скрывает ID и аватар от собеседников",
      active: anonymousMode,
      onChange: setAnonymousMode,
      color: "text-neon-cyan",
    },
    {
      icon: "Timer",
      title: "Автоудаление сообщений",
      desc: "Удаляет сообщения через 24 часа",
      active: autoDelete,
      onChange: setAutoDelete,
      color: "text-neon-pink",
    },
    {
      icon: "MonitorOff",
      title: "Защита от скриншотов",
      desc: "Блокирует захват экрана в чатах",
      active: screenProtection,
      onChange: setScreenProtection,
      color: "text-yellow-400",
    },
  ];

  return (
    <div className="flex-1 p-6 overflow-y-auto scrollbar-gaming">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center animate-fade-in">
          <h2 className="font-gaming text-xl font-bold gradient-gaming-text mb-2">
            БЕЗОПАСНОСТЬ
          </h2>
          <p className="text-sm text-muted-foreground">
            Полный контроль над приватностью
          </p>
        </div>

        <div className="grid gap-3 animate-fade-in">
          {features.map((f, i) => (
            <div
              key={f.title}
              className={`flex items-center gap-4 p-4 rounded-xl transition-all duration-200 ${
                f.active ? "bg-secondary/50 neon-border" : "bg-secondary/20"
              }`}
              style={{ animationDelay: `${i * 50}ms` }}
            >
              <div className={`w-10 h-10 rounded-xl ${f.active ? "bg-primary/15" : "bg-secondary"} flex items-center justify-center shrink-0`}>
                <Icon name={f.icon} size={20} className={f.active ? f.color : "text-muted-foreground"} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium">{f.title}</p>
                <p className="text-xs text-muted-foreground">{f.desc}</p>
              </div>
              <Switch checked={f.active} onCheckedChange={f.onChange} />
            </div>
          ))}
        </div>

        <div className="animate-fade-in">
          <h3 className="font-gaming text-xs font-semibold tracking-wider text-muted-foreground mb-3">
            ЧЁРНЫЙ СПИСОК
          </h3>
          <div className="space-y-2">
            {blockedContacts.map((contact) => (
              <div
                key={contact.id}
                className="flex items-center gap-3 p-3 rounded-xl bg-destructive/5 border border-destructive/20"
              >
                <span className="text-xl">{contact.avatar}</span>
                <div className="flex-1">
                  <p className="text-sm font-medium">{contact.name}</p>
                  <p className="text-xs text-muted-foreground">Заблокирован</p>
                </div>
                <button className="text-xs text-destructive hover:underline">
                  Разблокировать
                </button>
              </div>
            ))}
            <button className="w-full p-3 rounded-xl border border-dashed border-border hover:border-primary/50 hover:bg-primary/5 text-sm text-muted-foreground hover:text-foreground transition-all flex items-center justify-center gap-2">
              <Icon name="Plus" size={16} />
              Добавить в чёрный список
            </button>
          </div>
        </div>

        <div className="p-4 rounded-xl bg-neon-green/5 border border-neon-green/20 animate-fade-in">
          <div className="flex items-start gap-3">
            <Icon name="ShieldCheck" size={20} className="text-neon-green shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-neon-green">Уровень защиты: Высокий</p>
              <p className="text-xs text-muted-foreground mt-1">
                E2E шифрование • AES-256 • Скрытый IP • Двухфакторная аутентификация
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SecurityPanel;
