import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Switch } from "@/components/ui/switch";

interface Server {
  id: string;
  country: string;
  city: string;
  flag: string;
  ping: number;
  load: number;
}

const servers: Server[] = [
  { id: "1", country: "Нидерланды", city: "Амстердам", flag: "🇳🇱", ping: 24, load: 35 },
  { id: "2", country: "Германия", city: "Франкфурт", flag: "🇩🇪", ping: 31, load: 42 },
  { id: "3", country: "Швейцария", city: "Цюрих", flag: "🇨🇭", ping: 38, load: 28 },
  { id: "4", country: "Финляндия", city: "Хельсинки", flag: "🇫🇮", ping: 45, load: 18 },
  { id: "5", country: "Исландия", city: "Рейкьявик", flag: "🇮🇸", ping: 67, load: 12 },
  { id: "6", country: "Япония", city: "Токио", flag: "🇯🇵", ping: 112, load: 55 },
];

interface VpnPanelProps {
  vpnActive: boolean;
  onToggleVpn: () => void;
}

const VpnPanel = ({ vpnActive, onToggleVpn }: VpnPanelProps) => {
  const [selectedServer, setSelectedServer] = useState(servers[0]);

  return (
    <div className="flex-1 p-6 overflow-y-auto scrollbar-gaming">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center animate-fade-in">
          <h2 className="font-gaming text-xl font-bold gradient-gaming-text mb-2">
            SHADOW VPN
          </h2>
          <p className="text-sm text-muted-foreground">
            Скрывает IP-адрес и шифрует весь трафик
          </p>
        </div>

        <div className="relative animate-scale-in">
          <div className={`rounded-2xl p-8 text-center transition-all duration-500 ${
            vpnActive 
              ? "bg-neon-green/5 border border-neon-green/30 glow-green" 
              : "bg-secondary/30 border border-border"
          }`}>
            <button
              onClick={onToggleVpn}
              className={`w-28 h-28 rounded-full mx-auto flex items-center justify-center transition-all duration-500 ${
                vpnActive
                  ? "bg-neon-green/20 glow-green"
                  : "bg-secondary hover:bg-secondary/80"
              }`}
            >
              <Icon
                name="Power"
                size={40}
                className={`transition-colors duration-300 ${
                  vpnActive ? "text-neon-green" : "text-muted-foreground"
                }`}
              />
            </button>
            <div className="mt-4">
              <span className={`font-gaming text-sm font-bold ${
                vpnActive ? "text-neon-green text-glow-cyan" : "text-muted-foreground"
              }`}>
                {vpnActive ? "ЗАЩИТА АКТИВНА" : "VPN ВЫКЛЮЧЕН"}
              </span>
            </div>
            {vpnActive && (
              <div className="mt-4 grid grid-cols-3 gap-4 animate-fade-in">
                <div>
                  <p className="text-xs text-muted-foreground">IP скрыт</p>
                  <p className="text-sm font-medium text-neon-green">✓</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Пинг</p>
                  <p className="text-sm font-medium">{selectedServer.ping} мс</p>
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">Шифрование</p>
                  <p className="text-sm font-medium text-neon-cyan">AES-256</p>
                </div>
              </div>
            )}
          </div>
        </div>

        <div>
          <h3 className="font-gaming text-xs font-semibold tracking-wider text-muted-foreground mb-3">
            СЕРВЕРЫ
          </h3>
          <div className="space-y-2">
            {servers.map((server, i) => (
              <button
                key={server.id}
                onClick={() => setSelectedServer(server)}
                className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 animate-fade-in ${
                  selectedServer.id === server.id
                    ? "bg-primary/10 neon-border"
                    : "bg-secondary/30 hover:bg-secondary/50"
                }`}
                style={{ animationDelay: `${i * 50}ms` }}
              >
                <span className="text-2xl">{server.flag}</span>
                <div className="text-left flex-1">
                  <p className="text-sm font-medium">{server.country}</p>
                  <p className="text-xs text-muted-foreground">{server.city}</p>
                </div>
                <div className="text-right">
                  <p className={`text-xs font-medium ${
                    server.ping < 40 ? "text-neon-green" : server.ping < 80 ? "text-yellow-400" : "text-orange-400"
                  }`}>
                    {server.ping} мс
                  </p>
                  <div className="flex items-center gap-1 mt-0.5">
                    <div className="w-12 h-1.5 rounded-full bg-secondary overflow-hidden">
                      <div
                        className={`h-full rounded-full transition-all ${
                          server.load < 30 ? "bg-neon-green" : server.load < 60 ? "bg-yellow-400" : "bg-orange-400"
                        }`}
                        style={{ width: `${server.load}%` }}
                      />
                    </div>
                    <span className="text-[10px] text-muted-foreground">{server.load}%</span>
                  </div>
                </div>
                {selectedServer.id === server.id && vpnActive && (
                  <Icon name="CheckCircle" size={18} className="text-neon-green shrink-0" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VpnPanel;
