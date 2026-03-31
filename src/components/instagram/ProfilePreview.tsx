import { ProfileData } from "@/types/instagram";
import { Grid3X3, Bookmark, UserSquare2, BadgeCheck, ChevronDown, Menu, Plus, Heart, MessageCircle, Search, Home, PlaySquare } from "lucide-react";

interface ProfilePreviewProps {
  profile: ProfileData;
}

const ProfilePreview = ({ profile }: ProfilePreviewProps) => {
  return (
    <div className="bg-card min-h-full">
      {/* Instagram Header */}
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-1">
          <span className="text-sm font-bold text-foreground">{profile.username || "username"}</span>
          {profile.isVerified && <BadgeCheck className="w-4 h-4 text-accent fill-accent" />}
          <ChevronDown className="w-3.5 h-3.5 text-foreground" />
        </div>
        <div className="flex items-center gap-5">
          <Plus className="w-5 h-5 text-foreground" />
          <Menu className="w-5 h-5 text-foreground" />
        </div>
      </div>

      {/* Profile Info */}
      <div className="px-4 py-2">
        <div className="flex items-center gap-6">
          {/* Avatar */}
          <div className="instagram-gradient-ring flex-shrink-0">
            <div className="w-[77px] h-[77px] rounded-full bg-card p-[2px]">
              {profile.profileImage ? (
                <img src={profile.profileImage} alt="Profile" className="w-full h-full rounded-full object-cover" />
              ) : (
                <div className="w-full h-full rounded-full bg-secondary flex items-center justify-center">
                  <span className="text-2xl text-muted-foreground">+</span>
                </div>
              )}
            </div>
          </div>

          {/* Stats */}
          <div className="flex flex-1 justify-around">
            <StatItem value={profile.postsCount || "0"} label="posts" />
            <StatItem value={profile.followersCount || "0"} label="followers" />
            <StatItem value={profile.followingCount || "0"} label="following" />
          </div>
        </div>

        {/* Name & Bio */}
        <div className="mt-3">
          <p className="text-sm font-semibold text-foreground">{profile.displayName || "Display Name"}</p>
          {profile.bio && (
            <p className="text-sm text-foreground mt-0.5 whitespace-pre-line">{profile.bio}</p>
          )}
          {profile.website && (
            <a className="text-sm text-accent font-medium mt-0.5 block">{profile.website}</a>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-1.5 mt-3">
          <button className="flex-1 bg-secondary text-secondary-foreground text-xs font-semibold py-1.5 rounded-lg">
            Edit profile
          </button>
          <button className="flex-1 bg-secondary text-secondary-foreground text-xs font-semibold py-1.5 rounded-lg">
            Share profile
          </button>
          <button className="bg-secondary text-secondary-foreground px-2.5 py-1.5 rounded-lg">
            <UserSquare2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Highlights */}
      {profile.highlights.length > 0 && (
        <div className="flex gap-3 px-4 py-3 overflow-x-auto">
          {profile.highlights.map((highlight) => (
            <div key={highlight.id} className="flex flex-col items-center gap-1 flex-shrink-0">
              <div className="w-[60px] h-[60px] rounded-full border border-border flex items-center justify-center overflow-hidden">
                {highlight.image ? (
                  <img src={highlight.image} alt={highlight.name} className="w-full h-full object-cover" />
                ) : (
                  <Plus className="w-4 h-4 text-muted-foreground" />
                )}
              </div>
              <span className="text-[10px] text-foreground max-w-[60px] truncate">{highlight.name}</span>
            </div>
          ))}
          {/* Add new */}
          <div className="flex flex-col items-center gap-1 flex-shrink-0">
            <div className="w-[60px] h-[60px] rounded-full border border-border flex items-center justify-center">
              <Plus className="w-5 h-5 text-foreground" />
            </div>
            <span className="text-[10px] text-foreground">New</span>
          </div>
        </div>
      )}

      {/* Tabs */}
      <div className="flex border-t border-border">
        <div className="flex-1 flex justify-center py-2.5 border-b-2 border-foreground">
          <Grid3X3 className="w-5 h-5 text-foreground" />
        </div>
        <div className="flex-1 flex justify-center py-2.5">
          <PlaySquare className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex-1 flex justify-center py-2.5">
          <UserSquare2 className="w-5 h-5 text-muted-foreground" />
        </div>
      </div>

      {/* Post Grid */}
      <div className="grid grid-cols-3 gap-[1px]">
        {profile.posts.map((post, index) => (
          <div key={index} className="aspect-square bg-secondary overflow-hidden">
            <img src={post} alt={`Post ${index + 1}`} className="w-full h-full object-cover" />
          </div>
        ))}
        {profile.posts.length === 0 && (
          <div className="col-span-3 py-16 flex flex-col items-center gap-2">
            <div className="w-16 h-16 rounded-full border-2 border-foreground flex items-center justify-center">
              <svg className="w-8 h-8 text-foreground" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </div>
            <p className="text-2xl font-bold text-foreground">Share Photos</p>
            <p className="text-sm text-muted-foreground text-center px-8">
              When you share photos, they will appear on your profile.
            </p>
          </div>
        )}
      </div>

      {/* Bottom Nav */}
      <div className="sticky bottom-0 bg-card border-t border-border flex items-center justify-around py-2">
        <Home className="w-6 h-6 text-foreground" />
        <Search className="w-6 h-6 text-muted-foreground" />
        <Plus className="w-6 h-6 text-muted-foreground" />
        <Heart className="w-6 h-6 text-muted-foreground" />
        <div className="w-6 h-6 rounded-full bg-secondary border border-border" />
      </div>
    </div>
  );
};

const StatItem = ({ value, label }: { value: string; label: string }) => (
  <div className="flex flex-col items-center">
    <span className="text-base font-bold text-foreground">{value}</span>
    <span className="text-[11px] text-foreground">{label}</span>
  </div>
);

export default ProfilePreview;
