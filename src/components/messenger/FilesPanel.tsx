import Icon from "@/components/ui/icon";

interface FileItem {
  id: string;
  name: string;
  size: string;
  type: "image" | "video" | "document" | "archive";
  from: string;
  date: string;
}

const mockFiles: FileItem[] = [
  { id: "1", name: "screenshot_2024.png", size: "2.4 MB", type: "image", from: "Кибер Волк", date: "Сегодня" },
  { id: "2", name: "project_v2_encrypted.zip", size: "4.2 MB", type: "archive", from: "Вы", date: "Сегодня" },
  { id: "3", name: "meeting_record.mp4", size: "156 MB", type: "video", from: "Тёмный Феникс", date: "Вчера" },
  { id: "4", name: "contracts_2024.pdf", size: "890 KB", type: "document", from: "Ледяная Тень", date: "Вчера" },
  { id: "5", name: "backup_full.zip", size: "1.2 GB", type: "archive", from: "Вы", date: "Пн" },
  { id: "6", name: "avatar_new.jpg", size: "340 KB", type: "image", from: "Нео Страйк", date: "Пн" },
];

const typeConfig = {
  image: { icon: "Image", color: "text-neon-cyan", bg: "bg-neon-cyan/10" },
  video: { icon: "Film", color: "text-neon-pink", bg: "bg-neon-pink/10" },
  document: { icon: "FileText", color: "text-neon-green", bg: "bg-neon-green/10" },
  archive: { icon: "FileArchive", color: "text-neon-purple", bg: "bg-primary/10" },
};

const FilesPanel = () => {
  return (
    <div className="flex-1 p-6 overflow-y-auto scrollbar-gaming">
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="text-center animate-fade-in">
          <h2 className="font-gaming text-xl font-bold gradient-gaming-text mb-2">
            ФАЙЛЫ
          </h2>
          <p className="text-sm text-muted-foreground">
            Зашифрованное хранилище файлов
          </p>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 animate-fade-in">
          {(["image", "video", "document", "archive"] as const).map((type) => {
            const config = typeConfig[type];
            const count = mockFiles.filter((f) => f.type === type).length;
            return (
              <div key={type} className={`p-3 rounded-xl ${config.bg} text-center`}>
                <Icon name={config.icon} size={24} className={`${config.color} mx-auto mb-1`} />
                <p className="text-xs text-muted-foreground">
                  {type === "image" ? "Фото" : type === "video" ? "Видео" : type === "document" ? "Документы" : "Архивы"}
                </p>
                <p className="text-lg font-bold">{count}</p>
              </div>
            );
          })}
        </div>

        <div>
          <h3 className="font-gaming text-xs font-semibold tracking-wider text-muted-foreground mb-3">
            ПОСЛЕДНИЕ ФАЙЛЫ
          </h3>
          <div className="space-y-2">
            {mockFiles.map((file, i) => {
              const config = typeConfig[file.type];
              return (
                <div
                  key={file.id}
                  className="flex items-center gap-3 p-3 rounded-xl bg-secondary/30 hover:bg-secondary/50 transition-all animate-fade-in group"
                  style={{ animationDelay: `${i * 50}ms` }}
                >
                  <div className={`w-10 h-10 rounded-lg ${config.bg} flex items-center justify-center shrink-0`}>
                    <Icon name={config.icon} size={20} className={config.color} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium truncate">{file.name}</p>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span className="text-xs text-muted-foreground">{file.size}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{file.from}</span>
                      <span className="text-xs text-muted-foreground">•</span>
                      <span className="text-xs text-muted-foreground">{file.date}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                    <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center">
                      <Icon name="Download" size={16} className="text-primary" />
                    </button>
                    <button className="w-8 h-8 rounded-lg hover:bg-secondary flex items-center justify-center">
                      <Icon name="MoreVertical" size={16} className="text-muted-foreground" />
                    </button>
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

export default FilesPanel;
