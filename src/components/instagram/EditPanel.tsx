import { useRef, ChangeEvent } from "react";
import { ProfileData, Highlight } from "@/types/instagram";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { Camera, Plus, X, Image as ImageIcon, Trash2, Moon, Sun } from "lucide-react";

interface EditPanelProps {
  profile: ProfileData;
  onChange: (profile: ProfileData) => void;
  previewDarkMode: boolean;
  onToggleDarkMode: (value: boolean) => void;
}

const EditPanel = ({ profile, onChange }: EditPanelProps) => {
  const profileImageRef = useRef<HTMLInputElement>(null);
  const postImageRef = useRef<HTMLInputElement>(null);
  const highlightImageRefs = useRef<Record<string, HTMLInputElement | null>>({});

  const handleImageUpload = (e: ChangeEvent<HTMLInputElement>, type: "profile" | "post" | "highlight", highlightId?: string) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onloadend = () => {
      const url = reader.result as string;
      if (type === "profile") {
        onChange({ ...profile, profileImage: url });
      } else if (type === "post") {
        onChange({ ...profile, posts: [...profile.posts, url] });
      } else if (type === "highlight" && highlightId) {
        onChange({
          ...profile,
          highlights: profile.highlights.map((h) =>
            h.id === highlightId ? { ...h, image: url } : h
          ),
        });
      }
    };
    reader.readAsDataURL(file);
    e.target.value = "";
  };

  const addHighlight = () => {
    const newHighlight: Highlight = {
      id: Date.now().toString(),
      name: "Destaque",
      image: null,
    };
    onChange({ ...profile, highlights: [...profile.highlights, newHighlight] });
  };

  const removeHighlight = (id: string) => {
    onChange({ ...profile, highlights: profile.highlights.filter((h) => h.id !== id) });
  };

  const removePost = (index: number) => {
    onChange({ ...profile, posts: profile.posts.filter((_, i) => i !== index) });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-foreground mb-1">Editar Perfil</h2>
        <p className="text-sm text-muted-foreground">Configure seu perfil e veja como ficará no Instagram</p>
      </div>

      {/* Profile Image */}
      <div className="space-y-2">
        <Label>Foto de perfil</Label>
        <div className="flex items-center gap-3">
          <div
            className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center overflow-hidden cursor-pointer border border-border hover:opacity-80 transition-opacity"
            onClick={() => profileImageRef.current?.click()}
          >
            {profile.profileImage ? (
              <img src={profile.profileImage} alt="" className="w-full h-full object-cover" />
            ) : (
              <Camera className="w-6 h-6 text-muted-foreground" />
            )}
          </div>
          <Button variant="outline" size="sm" onClick={() => profileImageRef.current?.click()}>
            Alterar foto
          </Button>
          {profile.profileImage && (
            <Button variant="ghost" size="sm" onClick={() => onChange({ ...profile, profileImage: null })}>
              <X className="w-4 h-4" />
            </Button>
          )}
          <input ref={profileImageRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "profile")} />
        </div>
      </div>

      {/* Username */}
      <div className="space-y-2">
        <Label>Username</Label>
        <Input
          value={profile.username}
          onChange={(e) => onChange({ ...profile, username: e.target.value })}
          placeholder="seu.username"
        />
      </div>

      {/* Display Name */}
      <div className="space-y-2">
        <Label>Nome</Label>
        <Input
          value={profile.displayName}
          onChange={(e) => onChange({ ...profile, displayName: e.target.value })}
          placeholder="Seu Nome"
        />
      </div>

      {/* Verified */}
      <div className="flex items-center justify-between">
        <Label>Selo de verificado</Label>
        <Switch
          checked={profile.isVerified}
          onCheckedChange={(checked) => onChange({ ...profile, isVerified: checked })}
        />
      </div>

      {/* Bio */}
      <div className="space-y-2">
        <Label>Bio</Label>
        <Textarea
          value={profile.bio}
          onChange={(e) => onChange({ ...profile, bio: e.target.value })}
          placeholder="Escreva sua bio..."
          rows={3}
        />
      </div>

      {/* Website */}
      <div className="space-y-2">
        <Label>Website / Link</Label>
        <Input
          value={profile.website}
          onChange={(e) => onChange({ ...profile, website: e.target.value })}
          placeholder="seusite.com"
        />
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-2">
        <div className="space-y-1">
          <Label className="text-xs">Posts</Label>
          <Input value={profile.postsCount} onChange={(e) => onChange({ ...profile, postsCount: e.target.value })} placeholder="0" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Seguidores</Label>
          <Input value={profile.followersCount} onChange={(e) => onChange({ ...profile, followersCount: e.target.value })} placeholder="0" />
        </div>
        <div className="space-y-1">
          <Label className="text-xs">Seguindo</Label>
          <Input value={profile.followingCount} onChange={(e) => onChange({ ...profile, followingCount: e.target.value })} placeholder="0" />
        </div>
      </div>

      {/* Highlights */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Destaques</Label>
          <Button variant="outline" size="sm" onClick={addHighlight}>
            <Plus className="w-4 h-4 mr-1" /> Adicionar
          </Button>
        </div>
        {profile.highlights.map((highlight) => (
          <div key={highlight.id} className="flex items-center gap-2 p-2 rounded-lg bg-secondary/50">
            <div
              className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center overflow-hidden cursor-pointer border border-border flex-shrink-0"
              onClick={() => highlightImageRefs.current[highlight.id]?.click()}
            >
              {highlight.image ? (
                <img src={highlight.image} alt="" className="w-full h-full object-cover" />
              ) : (
                <ImageIcon className="w-4 h-4 text-muted-foreground" />
              )}
            </div>
            <Input
              value={highlight.name}
              onChange={(e) =>
                onChange({
                  ...profile,
                  highlights: profile.highlights.map((h) =>
                    h.id === highlight.id ? { ...h, name: e.target.value } : h
                  ),
                })
              }
              className="flex-1 h-8 text-sm"
              placeholder="Nome do destaque"
            />
            <Button variant="ghost" size="sm" onClick={() => removeHighlight(highlight.id)} className="flex-shrink-0">
              <X className="w-4 h-4" />
            </Button>
            <input
              ref={(el) => { highlightImageRefs.current[highlight.id] = el; }}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => handleImageUpload(e, "highlight", highlight.id)}
            />
          </div>
        ))}
      </div>

      {/* Posts */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <Label>Posts do feed</Label>
          <Button variant="outline" size="sm" onClick={() => postImageRef.current?.click()}>
            <Plus className="w-4 h-4 mr-1" /> Adicionar
          </Button>
          <input ref={postImageRef} type="file" accept="image/*" className="hidden" onChange={(e) => handleImageUpload(e, "post")} />
        </div>
        {profile.posts.length > 0 && (
          <div className="grid grid-cols-4 gap-2">
            {profile.posts.map((post, index) => (
              <div key={index} className="relative aspect-square rounded-md overflow-hidden group">
                <img src={post} alt="" className="w-full h-full object-cover" />
                <button
                  onClick={() => removePost(index)}
                  className="absolute inset-0 bg-foreground/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 className="w-4 h-4 text-primary-foreground" />
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default EditPanel;
