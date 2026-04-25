// ─── Domain Types ─────────────────────────────────────────────────────────────

export interface Skill {
  id: number;
  name: string;
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  startDate: string;
  endDate: string | null;
  current: boolean;
  description: string | null;
}

export interface Education {
  id: number;
  school: string;
  degree: string;
  field: string;
  startYear: number;
  endYear: number | null;
  current: boolean;
  description: string | null;
}

export type UserRole = "ALUMNI" | "ADMIN" | "ETUDIANT";

export interface UserProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  role: UserRole;
  phone: string | null;
  bio: string | null;
  country: string | null;
  city: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  avatarUrl: string | null;
  sector: string | null;
  // Alumni-specific
  promotion: string | null;
  graduationYear: number | null;
  entreprise: string | null;
  jobTitle: string | null;
  mentor: boolean | null;
  // Admin-specific
  department: string | null;
  informations: string | null;
}

export interface UpdateProfileRequest {
  phone?: string;
  bio?: string;
  country?: string;
  city?: string;
  linkedinUrl?: string;
  githubUrl?: string;
  avatarUrl?: string;
  sector?: string;
}
export interface PublicUserProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  role: UserRole;
  bio: string | null;
  country: string | null;
  city: string | null;
  linkedinUrl: string | null;
  githubUrl: string | null;
  avatarUrl: string | null;
  sector: string | null;
  // Alumni-specific
  promotion: string | null;
  graduationYear: number | null;
  entreprise: string | null;
  jobTitle: string | null;
  mentor: boolean | null;
  // Admin-specific (department is public, informations is not)
  department: string | null;
}
