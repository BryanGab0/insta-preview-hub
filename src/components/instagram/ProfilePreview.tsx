import { ProfileData } from "@/types/instagram";
import { Grid3X3, Bookmark, UserSquare2, BadgeCheck, ChevronDown, Menu, Plus, Heart, MessageCircle, Search, Home, PlaySquare } from "lucide-react";

interface ProfilePreviewProps {
  profile: ProfileData;
  darkMode?: boolean;
}

const ProfilePreview = ({ profile, darkMode = false }: ProfilePreviewProps) => {
  const bg = darkMode ? "bg-black" : "bg-card";
  const text = darkMode ? "text-white" : "text-foreground";
  const textMuted = darkMode ? "text-neutral-500" : "text-muted-foreground";
  const borderColor = darkMode ? "border-neutral-800" : "border-border";
  const secondaryBg = darkMode ? "bg-neutral-800" : "bg-secondary";
  const secondaryText = darkMode ? "text-white" : "text-secondary-foreground";

  return (
    <div className={`${bg} min-h-full`}>
      {/* Instagram Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1">
          <span className={`text-sm font-bold ${text}`}>{profile.username || "username"}</span>
          {profile.isVerified && <BadgeCheck className="w-4 h-4 text-accent fill-accent" />}
          <ChevronDown className={`w-3.5 h-3.5 ${text}`} />
        </div>
        <div className="flex items-center gap-5">
          <Plus className={`w-5 h-5 ${text}`} />
          <Menu className={`w-5 h-5 ${text}`} />
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="instagram-gradient-ring flex-shrink-0">
            <div className={`w-[77px] h-[77px] rounded-full ${bg} p-[2px]`}>
              {profile.profileImage ? (
                <img src={profile.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <div className={`w-full h-full rounded-full ${secondaryBg} flex items-center justify-center`}>
                  <span className={`text-2xl ${textMuted}`}>+</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-1 justify-around">
            <StatItem value={profile.postsCount || "0"} label="posts" text={text} />
            <StatItem value={profile.followersCount || "0"} label="followers" text={text} />
            <StatItem value={profile.followingCount || "0"} label="following" text={text} />
          </div>
        </div>

        {/* Name & Bio */}
        <div className="mt-3">
          <p className={`text-sm font-semibold ${text}`}>{profile.displayName || "Display Name"}</p>
          {profile.bio && (
            <p className={`text-sm ${text} mt-0.5 whitespace-pre-line`}>{profile.bio}</p>
          )}
          {profile.website && (
            <a className="text-sm text-accent font-medium mt-0.5 block">{profile.website}</a>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1.5 mt-3">
          <button className={`flex-1 ${secondaryBg} ${secondaryText} text-xs font-semibold py-1.5 rounded-lg`}>
            Edit profile
          </button>
          <button className={`flex-1 ${secondaryBg} ${secondaryText} text-xs font-semibold py-1.5 rounded-lg`}>
            Share profile
          </button>
          <button className={`${secondaryBg} ${secondaryText} px-2.5 py-1.5 rounded-lg`}>
            <UserSquare2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Highlights */}
      {profile.highlights.length > 0 && (
        <div className="flex gap-3 px-4 py-3 overflow-x-auto">
          {profile.highlights.map((highlight) => (
            <div key={highlight.id} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className={`w-[60px] h-[60px] rounded-full border ${borderColor} flex items-center justify-center overflow-hidden`}>
                {highlight.image ? (
                  <img src={highlight.image} alt={highlight.name} className="w-full h-full object-cover" />
                ) : (
                  <Plus className={`w-4 h-4 ${textMuted}`} />
                )}
              </div>
              <span className={`text-[10px] ${text} max-w-[60px] truncate`}>{highlight.name}</span>
            </div>
          ))}
          {/* Add new */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className={`w-[60px] h-[60px] rounded-full border ${borderColor} flex items-center justify-center`}>
              <Plus className={`w-5 h-5 ${text}`} />
            </div>
            <span className={`text-[10px] ${text}`}>New</span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className={`flex border-t ${borderColor}`}>
        <div className={`flex-1 flex justify-center py-2.5 border-b-2 ${darkMode ? 'border-white' : 'border-foreground'}`}>
          <Grid3X3 className={`w-5 h-5 ${text}`} />
        </div>
        <div className="flex-1 flex justify-center py-2.5">
          <PlaySquare className={`w-5 h-5 ${textMuted}`} />
        </div>
        <div className="flex-1 flex justify-center py-2.5">
          <UserSquare2 className={`w-5 h-5 ${textMuted}`} />
        </div>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-3 gap-[1px]">
        {profile.posts.map((post, index) => (
          <div key={index} className={`aspect-square ${secondaryBg} overflow-hidden`}>
            <img src={post} alt={`Post ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        {profile.posts.length === 0 && (
          <div className="col-span-3 py-16 flex flex-col items-center gap-2">
            <div className={`w-16 h-16 rounded-full border-2 ${darkMode ? 'border-white' : 'border-foreground'} flex items-center justify-center`}>
              <svg className={`w-8 h-8 ${text}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className={`text-2xl font-bold ${text}`}>Share Photos</p>
            <p className={`text-sm ${textMuted} text-center px-8`}>
              When you share photos, they will appear on your profile.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className={`sticky bottom-0 ${bg} border-t ${borderColor} flex items-center justify-around py-2`}>
        <Home className={`w-6 h-6 ${text}`} />
        <Search className={`w-6 h-6 ${textMuted}`} />
        <Plus className={`w-6 h-6 ${textMuted}`} />
        <Heart className={`w-6 h-6 ${textMuted}`} />
        <div className={`w-6 h-6 rounded-full ${secondaryBg} border ${borderColor}`} />
      </div>
    </div>
  );
};

const StatItem = ({ value, label, text }: { value: string; label: string; text: string }) => (
  <div className="flex flex-col items-center">
    <span className={`text-base font-bold ${text}`}>{value}</span>
    <span className={`text-[11px] ${text}`}>{label}</span>
  </div>
);

export default ProfilePreview;
