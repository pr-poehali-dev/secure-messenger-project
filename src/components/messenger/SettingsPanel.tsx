import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";

const SettingsPanel = () => {
  const [notifications, setNotifications] = useState(true);
  const [sounds, setSounds] = useState(true);
  const [darkMode, setDarkMode] = useState(true);
  const [readReceipts, setReadReceipts] = useState(false);

  return (
    <div className="flex-1 p-6 overflow-y-auto scrollbar-gaming">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center animate-fade-in">
          <h2 className="font-gaming text-xl font-bold gradient-gaming-text mb-2">
            НАСТРОЙКИ
          </h2>
        </div>

        <div className="p-6 rounded-2xl bg-secondary/30 text-center animate-fade-in">
          <div className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center mx-auto mb-3">
            <span className="text-3xl">🥷</span>
          </div>
          <h3 className="font-gaming text-sm font-bold">АНОНИМ</h3>
          <p className="text-xs text-muted-foreground mt-1">ID: #x7k9m2 • Уровень защиты: Высокий</p>
          <button className="mt-3 px-4 py-2 rounded-xl bg-primary/15 hover:bg-primary/25 text-primary text-sm font-medium transition-colors">
            Редактировать профиль
          </button>
        </div>

        <div className="space-y-3 animate-fade-in">
          <h3 className="font-gaming text-xs font-semibold tracking-wider text-muted-foreground">
            ОБЩИЕ
          </h3>
          {[
            { icon: "Bell", title: "Уведомления", active: notifications, onChange: setNotifications },
            { icon: "Volume2", title: "Звуки", active: sounds, onChange: setSounds },
            { icon: "Moon", title: "Тёмная тема", active: darkMode, onChange: setDarkMode },
            { icon: "CheckCheck", title: "Отчёты о прочтении", active: readReceipts, onChange: setReadReceipts },
          ].map((item) => (
            <div key={item.title} className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Icon name={item.icon} size={18} className="text-muted-foreground" />
              </div>
              <span className="flex-1 text-sm">{item.title}</span>
              <Switch checked={item.active} onCheckedChange={item.onChange} />
            </div>
          ))}
        </div>

        <div className="space-y-3 animate-fade-in">
          <h3 className="font-gaming text-xs font-semibold tracking-wider text-muted-foreground">
            ДАННЫЕ
          </h3>
          {[
            { icon: "HardDrive", title: "Хранилище", value: "2.4 ГБ / 10 ГБ" },
            { icon: "Download", title: "Автозагрузка медиа", value: "Wi-Fi" },
            { icon: "Globe", title: "Язык", value: "Русский" },
          ].map((item) => (
            <button key={item.title} className="w-full flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-colors">
              <div className="w-9 h-9 rounded-lg bg-secondary flex items-center justify-center shrink-0">
                <Icon name={item.icon} size={18} className="text-muted-foreground" />
              </div>
              <span className="flex-1 text-sm text-left">{item.title}</span>
              <span className="text-xs text-muted-foreground">{item.value}</span>
              <Icon name="ChevronRight" size={16} className="text-muted-foreground" />
            </button>
          ))}
        </div>

        <div className="pt-4 border-t border-border text-center">
          <p className="text-xs text-muted-foreground font-gaming">
            SHADOWLINK v1.0.0 • E2E Encrypted
          </p>
        </div>
      </div>
    </div>
  );
};

export default SettingsPanel;
