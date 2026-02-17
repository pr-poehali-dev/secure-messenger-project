import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserProfile {
  id: string;
  nickname: string;
  avatar: string;
  status: string;
  bio: string;
}

interface AuthScreenProps {
  onLogin: (profile: UserProfile) => void;
}

const AuthScreen = ({ onLogin }: AuthScreenProps) => {
  const [mode, setMode] = useState<"login" | "register">("login");
  const [nickname, setNickname] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [step, setStep] = useState<"credentials" | "2fa">("credentials");
  const [error, setError] = useState("");

  const handleSubmit = () => {
    setError("");
    if (!nickname.trim() || !password.trim()) {
      setError("Заполни все поля");
      return;
    }
    if (mode === "register" && password !== confirmPassword) {
      setError("Пароли не совпадают");
      return;
    }
    if (password.length < 6) {
      setError("Пароль минимум 6 символов");
      return;
    }
    setStep("2fa");
  };

  const handle2FA = () => {
    if (twoFactorCode.length < 4) {
      setError("Введи код подтверждения");
      return;
    }
    const id = "#" + Math.random().toString(36).substring(2, 8);
    onLogin({
      id,
      nickname: nickname.trim(),
      avatar: "",
      status: "В сети",
      bio: "Пользователь ShadowLink",
    });
  };

  return (
    <div className="h-screen flex items-center justify-center bg-background relative overflow-hidden">
      <div className="absolute inset-0 opacity-20">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-purple/20 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-cyan/20 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-neon-pink/10 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-md mx-4 animate-scale-in">
        <div className="text-center mb-8">
          <div className="w-20 h-20 rounded-2xl gradient-gaming flex items-center justify-center mx-auto mb-4 animate-pulse-glow">
            <Icon name="Zap" size={36} className="text-white" />
          </div>
          <h1 className="font-gaming text-2xl font-bold gradient-gaming-text">
            SHADOWLINK
          </h1>
          <p className="text-sm text-muted-foreground mt-2">
            Защищённый мессенджер нового поколения
          </p>
        </div>

        <div className="glass rounded-2xl p-6 neon-border space-y-5">
          {step === "credentials" ? (
            <>
              <div className="flex bg-secondary/50 rounded-xl p-1">
                <button
                  onClick={() => { setMode("login"); setError(""); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    mode === "login" ? "bg-primary text-primary-foreground glow-purple" : "text-muted-foreground"
                  }`}
                >
                  Вход
                </button>
                <button
                  onClick={() => { setMode("register"); setError(""); }}
                  className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all ${
                    mode === "register" ? "bg-primary text-primary-foreground glow-purple" : "text-muted-foreground"
                  }`}
                >
                  Регистрация
                </button>
              </div>

              <div className="space-y-3">
                <div className="relative">
                  <Icon name="User" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    placeholder="Никнейм"
                    value={nickname}
                    onChange={(e) => setNickname(e.target.value)}
                    className="pl-10 bg-secondary/30 border-border/50 h-11"
                  />
                </div>
                <div className="relative">
                  <Icon name="Lock" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                  <Input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 bg-secondary/30 border-border/50 h-11"
                  />
                </div>
                {mode === "register" && (
                  <div className="relative animate-fade-in">
                    <Icon name="ShieldCheck" size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                    <Input
                      type="password"
                      placeholder="Повтори пароль"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      className="pl-10 bg-secondary/30 border-border/50 h-11"
                    />
                  </div>
                )}
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20 animate-fade-in">
                  <Icon name="AlertCircle" size={16} className="text-destructive shrink-0" />
                  <span className="text-sm text-destructive">{error}</span>
                </div>
              )}

              <Button
                onClick={handleSubmit}
                className="w-full h-11 bg-primary hover:bg-primary/90 font-medium glow-purple"
              >
                {mode === "login" ? "Войти" : "Создать аккаунт"}
                <Icon name="ArrowRight" size={16} className="ml-2" />
              </Button>
            </>
          ) : (
            <div className="space-y-5 animate-fade-in">
              <div className="text-center">
                <div className="w-16 h-16 rounded-xl bg-neon-green/10 flex items-center justify-center mx-auto mb-3">
                  <Icon name="ShieldCheck" size={32} className="text-neon-green" />
                </div>
                <h3 className="font-gaming text-sm font-bold">ДВУХЭТАПНАЯ ПРОВЕРКА</h3>
                <p className="text-xs text-muted-foreground mt-1">
                  Введи код из приложения-аутентификатора
                </p>
              </div>

              <div className="flex gap-2 justify-center">
                {[0, 1, 2, 3, 4, 5].map((i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-10 h-12 rounded-lg bg-secondary/50 border border-border/50 text-center text-lg font-bold focus:border-primary focus:ring-1 focus:ring-primary/30 outline-none transition-all"
                    value={twoFactorCode[i] || ""}
                    onChange={(e) => {
                      const val = e.target.value;
                      if (/^\d?$/.test(val)) {
                        const newCode = twoFactorCode.split("");
                        newCode[i] = val;
                        setTwoFactorCode(newCode.join(""));
                        if (val && e.target.nextElementSibling) {
                          (e.target.nextElementSibling as HTMLInputElement).focus();
                        }
                      }
                    }}
                  />
                ))}
              </div>

              {error && (
                <div className="flex items-center gap-2 p-3 rounded-xl bg-destructive/10 border border-destructive/20">
                  <Icon name="AlertCircle" size={16} className="text-destructive shrink-0" />
                  <span className="text-sm text-destructive">{error}</span>
                </div>
              )}

              <div className="flex gap-2">
                <Button
                  variant="outline"
                  onClick={() => { setStep("credentials"); setError(""); }}
                  className="flex-1 h-11"
                >
                  Назад
                </Button>
                <Button
                  onClick={handle2FA}
                  className="flex-1 h-11 bg-neon-green hover:bg-neon-green/90 text-black font-medium glow-green"
                >
                  Подтвердить
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-center gap-2 pt-2">
            <Icon name="Lock" size={14} className="text-neon-green" />
            <span className="text-[11px] text-muted-foreground">
              Все данные защищены E2E шифрованием AES-256
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthScreen;
export type { UserProfile };
