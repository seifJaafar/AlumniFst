import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/userService";
import { profileKeys } from "@/lib/queryKeys";
import type {
  UpdateProfileRequest,
  Experience,
  Education,
  Skill,
} from "@/types/profile.types";
import { toast } from "@/hooks/use-toast";

// ─── Own profile (full data) ──────────────────────────────────────────────────
// useCurrentUser is NOT needed here — identity (userId, role) comes from
// useAuth() in AuthContext, which reads localStorage at boot. Zero extra
// network requests.

export function useProfile() {
  return useQuery({
    queryKey: profileKeys.me(),
    queryFn: () => userService.getProfile(),
    staleTime: 1000 * 60 * 5,
  });
}

// ─── Public profile (safe data, any user by ID) ───────────────────────────────

export function usePublicProfile(userId: number | undefined) {
  return useQuery({
    queryKey: profileKeys.public(userId!),
    queryFn: () => userService.getPublicProfile(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

// ─── Own profile mutation ─────────────────────────────────────────────────────

export function useUpdateProfile() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (payload: UpdateProfileRequest) =>
      userService.updateProfile(payload),
    onSuccess: (updated) => {
      // Sync both cache slots so own-profile and public-profile views
      // reflect the change without a refetch.
      queryClient.setQueryData(profileKeys.me(), updated);
      queryClient.setQueryData(profileKeys.public(updated.id), updated);
      toast({
        title: "Profile updated",
        description: "Your changes have been saved.",
      });
    },
    onError: (err: Error) => {
      toast({
        title: "Update failed",
        description: err.message,
        variant: "destructive",
      });
    },
  });
}

// ─── Experiences ──────────────────────────────────────────────────────────────

export function useExperiences(userId: number | undefined) {
  return useQuery<Experience[]>({
    queryKey: profileKeys.experiences(userId!),
    queryFn: () => userService.getExperiences(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

// ─── Education ────────────────────────────────────────────────────────────────

export function useEducation(userId: number | undefined) {
  return useQuery<Education[]>({
    queryKey: profileKeys.education(userId!),
    queryFn: () => userService.getEducation(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}

// ─── Skills ───────────────────────────────────────────────────────────────────

export function useSkills(userId: number | undefined) {
  return useQuery<Skill[]>({
    queryKey: profileKeys.skills(userId!),
    queryFn: () => userService.getSkills(userId!),
    enabled: !!userId,
    staleTime: 1000 * 60 * 5,
  });
}
