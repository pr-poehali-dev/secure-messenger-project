import { useState, useEffect } from "react";
import Icon from "@/components/ui/icon";

interface ThreatEvent {
  id: string;
  type: "blocked" | "warning" | "info";
  title: string;
  desc: string;
  time: string;
}

const mockEvents: ThreatEvent[] = [
  { id: "1", type: "blocked", title: "Брутфорс заблокирован", desc: "15 попыток входа с IP 185.xx.xx.12", time: "2 мин назад" },
  { id: "2", type: "blocked", title: "Фишинговая ссылка", desc: "Заблокирована вредоносная ссылка в чате", time: "1 час назад" },
  { id: "3", type: "warning", title: "Новое устройство", desc: "Обнаружен вход с нового устройства", time: "3 часа назад" },
  { id: "4", type: "info", title: "Обновление ключей", desc: "E2E ключи шифрования обновлены", time: "Сегодня" },
  { id: "5", type: "blocked", title: "MITM-атака", desc: "Попытка перехвата соединения отклонена", time: "Вчера" },
  { id: "6", type: "info", title: "VPN стабилен", desc: "Туннель работает без сбоев 24 часа", time: "Вчера" },
];

const AntiHackPanel = () => {
  const [threatLevel, setThreatLevel] = useState(12);
  const [scanning, setScanning] = useState(false);
  const [scanProgress, setScanProgress] = useState(0);

  const startScan = () => {
    setScanning(true);
    setScanProgress(0);
  };

  useEffect(() => {
    if (!scanning) return;
    const interval = setInterval(() => {
      setScanProgress((prev) => {
        if (prev >= 100) {
          setScanning(false);
          clearInterval(interval);
          return 100;
        }
        return prev + 2;
      });
    }, 50);
    return () => clearInterval(interval);
  }, [scanning]);

  const typeConfig = {
    blocked: { icon: "ShieldAlert", color: "text-destructive", bg: "bg-destructive/10", border: "border-destructive/20" },
    warning: { icon: "AlertTriangle", color: "text-yellow-400", bg: "bg-yellow-400/10", border: "border-yellow-400/20" },
    info: { icon: "Info", color: "text-neon-cyan", bg: "bg-neon-cyan/10", border: "border-neon-cyan/20" },
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto scrollbar-gaming">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center animate-fade-in">
          <h2 className="font-gaming text-xl font-bold gradient-gaming-text mb-2">
            АНТИВЗЛОМ
          </h2>
          <p className="text-sm text-muted-foreground">
            Защита от хакерских атак в реальном времени
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in">
          <div className="p-4 rounded-xl bg-neon-green/5 border border-neon-green/20 text-center">
            <Icon name="Shield" size={24} className="text-neon-green mx-auto mb-1" />
            <p className="text-2xl font-bold text-neon-green">98%</p>
            <p className="text-[11px] text-muted-foreground">Защита</p>
          </div>
          <div className="p-4 rounded-xl bg-destructive/5 border border-destructive/20 text-center">
            <Icon name="ShieldAlert" size={24} className="text-destructive mx-auto mb-1" />
            <p className="text-2xl font-bold">{threatLevel}</p>
            <p className="text-[11px] text-muted-foreground">Угрозы</p>
          </div>
          <div className="p-4 rounded-xl bg-neon-cyan/5 border border-neon-cyan/20 text-center">
            <Icon name="Lock" size={24} className="text-neon-cyan mx-auto mb-1" />
            <p className="text-2xl font-bold">AES</p>
            <p className="text-[11px] text-muted-foreground">Шифрование</p>
          </div>
          <div className="p-4 rounded-xl bg-neon-purple/5 border border-neon-purple/20 text-center">
            <Icon name="Wifi" size={24} className="text-neon-purple mx-auto mb-1" />
            <p className="text-2xl font-bold">VPN</p>
            <p className="text-[11px] text-muted-foreground">Туннель</p>
          </div>
        </div>

        <div className="animate-fade-in">
          <button
            onClick={startScan}
            disabled={scanning}
            className={`w-full p-5 rounded-2xl transition-all duration-500 ${
              scanning
                ? "bg-neon-green/5 border border-neon-green/30"
                : scanProgress === 100
                ? "bg-neon-green/10 border border-neon-green/30 glow-green"
                : "bg-secondary/30 border border-border hover:bg-secondary/50"
            }`}
          >
            <div className="flex items-center gap-4">
              <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${
                scanning ? "bg-neon-green/20" : "bg-secondary"
              }`}>
                <Icon
                  name={scanning ? "Loader2" : scanProgress === 100 ? "ShieldCheck" : "Scan"}
                  size={28}
                  className={`${scanning ? "text-neon-green animate-spin" : scanProgress === 100 ? "text-neon-green" : "text-muted-foreground"}`}
                />
              </div>
              <div className="flex-1 text-left">
                <p className="text-sm font-semibold">
                  {scanning ? "Сканирование..." : scanProgress === 100 ? "Система защищена" : "Запустить сканирование"}
                </p>
                <p className="text-xs text-muted-foreground mt-0.5">
                  {scanning
                    ? `Проверено ${scanProgress}%`
                    : scanProgress === 100
                    ? "Угрозы не обнаружены"
                    : "Проверить все компоненты безопасности"}
                </p>
                {scanning && (
                  <div className="mt-2 w-full h-1.5 rounded-full bg-secondary overflow-hidden">
                    <div
                      className="h-full rounded-full bg-neon-green transition-all duration-100"
                      style={{ width: `${scanProgress}%` }}
                    />
                  </div>
                )}
              </div>
            </div>
          </button>
        </div>

        <div>
          <h3 className="font-gaming text-xs font-semibold tracking-wider text-muted-foreground mb-3">
            ЖУРНАЛ БЕЗОПАСНОСТИ
          </h3>
          <div className="space-y-2">
            {mockEvents.map((event, i) => {
              const config = typeConfig[event.type];
              return (
                <div
                  key={event.id}
                  className={`flex items-start gap-3 p-3 rounded-xl ${config.bg} border ${config.border} animate-fade-in`}
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className="w-9 h-9 rounded-lg bg-background/50 flex items-center justify-center shrink-0 mt-0.5">
                    <Icon name={config.icon} size={18} className={config.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <p className="text-sm font-medium">{event.title}</p>
                      <span className="text-[10px] text-muted-foreground shrink-0 ml-2">{event.time}</span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{event.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntiHackPanel;
