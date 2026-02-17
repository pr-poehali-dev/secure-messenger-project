import { useState } from "react";
import Icon from "@/components/ui/icon";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import type { UserProfile } from "./AuthScreen";

interface ProfileViewProps {
  profile: UserProfile;
  onUpdate: (profile: UserProfile) => void;
  onClose: () => void;
  isOwnProfile?: boolean;
}

const avatarOptions = ["🥷", "🐺", "🔥", "⚡", "❄️", "💎", "🐍", "🦅", "🎮", "👾", "🤖", "🎯", "🛡️", "⚔️", "🌙", "🌊"];

const ProfileView = ({ profile, onUpdate, onClose, isOwnProfile = true }: ProfileViewProps) => {
  const [editing, setEditing] = useState(false);
  const [nickname, setNickname] = useState(profile.nickname);
  const [status, setStatus] = useState(profile.status);
  const [bio, setBio] = useState(profile.bio);
  const [avatar, setAvatar] = useState(profile.avatar);
  const [showAvatars, setShowAvatars] = useState(false);

  const handleSave = () => {
    onUpdate({ ...profile, nickname, status, bio, avatar });
    setEditing(false);
  };

  return (
    <div className="flex-1 p-6 overflow-y-auto scrollbar-gaming">
      <div className="max-w-lg mx-auto space-y-6 animate-fade-in">
        <div className="flex items-center justify-between">
          <button onClick={onClose} className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center">
            <Icon name="ArrowLeft" size={20} className="text-muted-foreground" />
          </button>
          <h2 className="font-gaming text-sm font-semibold tracking-wider">ПРОФИЛЬ</h2>
          {isOwnProfile && (
            <button
              onClick={() => editing ? handleSave() : setEditing(true)}
              className="w-9 h-9 rounded-lg hover:bg-secondary flex items-center justify-center"
            >
              <Icon name={editing ? "Check" : "Pencil"} size={18} className={editing ? "text-neon-green" : "text-muted-foreground"} />
            </button>
          )}
        </div>

        <div className="text-center">
          <div className="relative inline-block">
            <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-purple to-neon-cyan flex items-center justify-center text-4xl mx-auto">
              {avatar || profile.nickname.charAt(0).toUpperCase()}
            </div>
            {isOwnProfile && editing && (
              <button
                onClick={() => setShowAvatars(!showAvatars)}
                className="absolute -bottom-1 -right-1 w-8 h-8 rounded-full bg-primary flex items-center justify-center glow-purple"
              >
                <Icon name="Camera" size={14} className="text-primary-foreground" />
              </button>
            )}
          </div>

          {showAvatars && (
            <div className="mt-4 p-4 rounded-xl bg-secondary/30 neon-border animate-scale-in">
              <p className="text-xs text-muted-foreground mb-3">Выбери аватар</p>
              <div className="grid grid-cols-8 gap-2">
                {avatarOptions.map((a) => (
                  <button
                    key={a}
                    onClick={() => { setAvatar(a); setShowAvatars(false); }}
                    className={`w-10 h-10 rounded-lg flex items-center justify-center text-xl hover:bg-primary/15 transition-colors ${
                      avatar === a ? "bg-primary/20 neon-border" : "bg-secondary/50"
                    }`}
                  >
                    {a}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="space-y-4">
          <div>
            <label className="text-xs text-muted-foreground font-gaming tracking-wider">НИКНЕЙМ</label>
            {editing ? (
              <Input
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="mt-1.5 bg-secondary/30 border-border/50 h-10"
              />
            ) : (
              <p className="mt-1.5 text-lg font-semibold">{profile.nickname}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-muted-foreground font-gaming tracking-wider">СТАТУС</label>
            {editing ? (
              <Input
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                className="mt-1.5 bg-secondary/30 border-border/50 h-10"
                placeholder="Твой статус..."
              />
            ) : (
              <p className="mt-1.5 text-sm text-muted-foreground">{profile.status}</p>
            )}
          </div>

          <div>
            <label className="text-xs text-muted-foreground font-gaming tracking-wider">О СЕБЕ</label>
            {editing ? (
              <textarea
                value={bio}
                onChange={(e) => setBio(e.target.value)}
                className="mt-1.5 w-full h-20 rounded-lg bg-secondary/30 border border-border/50 p-3 text-sm resize-none focus:ring-1 focus:ring-primary/30 outline-none"
                placeholder="Расскажи о себе..."
              />
            ) : (
              <p className="mt-1.5 text-sm">{profile.bio}</p>
            )}
          </div>

          <div className="p-3 rounded-xl bg-secondary/30">
            <div className="flex items-center gap-2">
              <Icon name="Fingerprint" size={16} className="text-neon-cyan" />
              <span className="text-xs text-muted-foreground">ID:</span>
              <span className="text-xs font-mono">{profile.id}</span>
            </div>
          </div>
        </div>

        {!isOwnProfile && (
          <div className="flex gap-2">
            <Button className="flex-1 h-10 bg-primary hover:bg-primary/90 glow-purple">
              <Icon name="MessageSquare" size={16} className="mr-2" />
              Написать
            </Button>
            <Button variant="outline" className="h-10">
              <Icon name="Phone" size={16} />
            </Button>
            <Button variant="outline" className="h-10">
              <Icon name="Video" size={16} />
            </Button>
            <Button variant="outline" className="h-10 text-destructive hover:text-destructive">
              <Icon name="Ban" size={16} />
            </Button>
          </div>
        )}

        {editing && (
          <div className="flex gap-2 animate-fade-in">
            <Button variant="outline" onClick={() => setEditing(false)} className="flex-1 h-10">
              Отмена
            </Button>
            <Button onClick={handleSave} className="flex-1 h-10 bg-neon-green hover:bg-neon-green/90 text-black glow-green">
              Сохранить
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProfileView;
