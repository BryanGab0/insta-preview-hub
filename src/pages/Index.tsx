import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { ProfileData } from "@/types/instagram";
import PhoneFrame from "@/components/instagram/PhoneFrame";
import ProfilePreview from "@/components/instagram/ProfilePreview";
import EditPanel from "@/components/instagram/EditPanel";
import { Instagram, Moon, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";

const defaultProfile: ProfileData = {
  username: "seuprofile",
  displayName: "Seu Nome",
  bio: "✨ Sua bio aqui\n📍 Cidade, País",
  website: "linktr.ee/seuprofile",
  profileImage: null,
  posts: [],
  highlights: [
    { id: "1", name: "Viagens", image: null },
    { id: "2", name: "Comida", image: null },
    { id: "3", name: "Lifestyle", image: null },
  ],
  postsCount: "42",
  followersCount: "1.2K",
  followingCount: "380",
  isVerified: false,
};

const Index = () => {
  const [profile, setProfile] = useState<ProfileData>(defaultProfile);
  const [previewDarkMode, setPreviewDarkMode] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    if (typeof window !== "undefined") {
      return document.documentElement.classList.contains("dark") ||
        localStorage.getItem("theme") === "dark" ||
        (!localStorage.getItem("theme") && window.matchMedia("(prefers-color-scheme: dark)").matches);
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container max-w-7xl mx-auto flex items-center justify-between py-4 px-6">
          <div className="flex items-center gap-2.5">
            <div className="w-9 h-9 rounded-xl instagram-gradient flex items-center justify-center">
              <Instagram className="w-5 h-5 text-primary-foreground" />
            </div>
            <div>
              <h1 className="text-lg font-bold text-foreground leading-tight">InstaPreview</h1>
              <p className="text-[11px] text-muted-foreground">Visualize seu perfil</p>
            </div>
          </div>
          <Button variant="ghost" size="icon" onClick={() => setDarkMode(!darkMode)} className="rounded-full">
            {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="container max-w-7xl mx-auto px-6 py-10">
        <div className="flex flex-col lg:flex-row gap-12 items-start">
          {/* Edit Panel */}
          <motion.div
            className="flex-1 min-w-0 order-2 lg:order-1"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.4 }}
          >
            <div className="bg-card rounded-2xl border border-border p-6 shadow-sm">
              <EditPanel profile={profile} onChange={setProfile} previewDarkMode={previewDarkMode} onToggleDarkMode={setPreviewDarkMode} />
            </div>
          </motion.div>

          {/* Phone Preview */}
          <motion.div
            className="lg:sticky lg:top-24 order-1 lg:order-2 mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <PhoneFrame darkMode={previewDarkMode}>
              <ProfilePreview profile={profile} darkMode={previewDarkMode} />
            </PhoneFrame>
          </motion.div>
        </div>
      </main>
    </div>
  );
};

export default Index;
