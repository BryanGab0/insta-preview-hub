export interface ProfileData {
  username: string;
  displayName: string;
  bio: string;
  website: string;
  profileImage: string | null;
  posts: string[];
  highlights: Highlight[];
  postsCount: string;
  followersCount: string;
  followingCount: string;
  isVerified: boolean;
}

export interface Highlight {
  id: string;
  name: string;
  image: string | null;
}
