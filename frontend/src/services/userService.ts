import api from "@/lib/axios";

// ─── Enums ────────────────────────────────────────────────────────────────────

export type UserRole = "ALUMNI" | "ADMIN" | "ETUDIANT";

// ─── Shared sub-types ─────────────────────────────────────────────────────────

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

// ─── Own profile (full — private fields included) ─────────────────────────────
// Returned by GET /api/users/profile

export interface UserProfileResponse {
  id: number;
  firstName: string;
  lastName: string;
  email: string; // private — only present in own profile
  role: UserRole;
  phone: string | null; // private — only present in own profile
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
  informations: string | null; // private — only present in own profile
  // Etudiant: uses promotion above
}

// ─── Public profile (safe — private fields excluded) ──────────────────────────
// Returned by GET /api/users/:id
// Mirrors UserProfileResponse but without email, phone, informations.
// Using a separate type (not omit/extend) keeps things explicit and
// prevents accidental access to fields the backend never sends.

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

// ─── Update requests ──────────────────────────────────────────────────────────

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

// ─── API wrapper shape (matches Spring Boot ResponseUtil.success) ─────────────

interface ApiResponse<T> {
  data: T;
  message: string;
}

// ─── Service ──────────────────────────────────────────────────────────────────

export const userService = {
  // ── Own profile ────────────────────────────────────────────────
  getProfile: async (): Promise<UserProfileResponse> => {
    const { data } =
      await api.get<ApiResponse<UserProfileResponse>>("/users/profile");
    return data.data;
  },

  updateProfile: async (
    payload: UpdateProfileRequest,
  ): Promise<UserProfileResponse> => {
    const { data } = await api.put<ApiResponse<UserProfileResponse>>(
      "/users/profile",
      payload,
    );
    return data.data;
  },

  // ── Public profile ─────────────────────────────────────────────
  getPublicProfile: async (id: number): Promise<PublicUserProfileResponse> => {
    const { data } = await api.get<ApiResponse<PublicUserProfileResponse>>(
      `/users/${id}`,
    );
    return data.data;
  },

  // ── Sections (lazy-loaded, keyed by userId) ────────────────────
  // These work for both own and public profiles since the URL uses
  // the target user's ID either way.

  getExperiences: async (userId: number): Promise<Experience[]> => {
    const { data } = await api.get<ApiResponse<Experience[]>>(
      `/users/${userId}/experiences`,
    );
    return data.data;
  },

  getEducation: async (userId: number): Promise<Education[]> => {
    const { data } = await api.get<ApiResponse<Education[]>>(
      `/users/${userId}/education`,
    );
    return data.data;
  },

  getSkills: async (userId: number): Promise<Skill[]> => {
    const { data } = await api.get<ApiResponse<Skill[]>>(
      `/users/${userId}/skills`,
    );
    return data.data;
  },
};
