import { useState } from "react";
import { useParams } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  MapPin,
  Building2,
  Mail,
  Linkedin,
  Github,
  Globe,
  Pencil,
  Phone,
  Award,
  ShieldCheck,
  GraduationCap,
  X,
} from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import {
  useProfile,
  usePublicProfile,
  useUpdateProfile,
} from "@/hooks/useProfile";
import { ProfileEditForm } from "@/components/profile/ProfileEditForm";
import { ExperienceSection } from "@/components/profile/ExperiencesSection";
import { EducationSection } from "@/components/profile/EducationSection";
import { SkillsSection } from "@/components/profile/SkillsSection";
import { getInitials, ROLE_META } from "@/lib/ProfileHelpers";
import { toast } from "@/hooks/use-toast";
import type {
  UserProfileResponse,
  PublicUserProfileResponse,
} from "@/types/profile.types";

// ─── Types ────────────────────────────────────────────────────────────────────

// Both response shapes are accepted by the header — the public variant
// simply has fewer fields (no email/phone/informations). The header
// already gates those behind isOwner so there's no risk of rendering
// undefined values.
type AnyProfile = UserProfileResponse | PublicUserProfileResponse;

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function ProfileHeaderSkeleton() {
  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      <Skeleton className="h-36 w-full rounded-none" />
      <div className="px-6 pb-5">
        <div className="flex items-end justify-between -mt-10 mb-4">
          <Skeleton className="h-24 w-24 rounded-full ring-4 ring-background" />
          <Skeleton className="h-9 w-28 rounded-lg mt-12" />
        </div>
        <Skeleton className="h-6 w-48 mb-2" />
        <Skeleton className="h-4 w-64 mb-4" />
        <Skeleton className="h-4 w-40" />
      </div>
    </div>
  );
}

// ─── Cover gradient ───────────────────────────────────────────────────────────

const COVER_GRADIENTS: Record<string, string> = {
  ALUMNI:
    "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-emerald-900 via-slate-900 to-teal-800",
  ADMIN:
    "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-rose-950 via-slate-900 to-slate-800",
  ETUDIANT:
    "bg-[conic-gradient(at_top_left,_var(--tw-gradient-stops))] from-sky-900 via-slate-900 to-indigo-900",
};

// ─── Profile Header ───────────────────────────────────────────────────────────

interface ProfileHeaderProps {
  profile: AnyProfile;
  isOwner: boolean;
  onEditClick: () => void;
  isEditing: boolean;
}

function ProfileHeader({
  profile,
  isOwner,
  onEditClick,
  isEditing,
}: ProfileHeaderProps) {
  const roleInfo = ROLE_META[profile.role];
  const RoleIcon = roleInfo.icon;
  const fullName = `${profile.firstName} ${profile.lastName}`;
  const coverClass = COVER_GRADIENTS[profile.role] ?? COVER_GRADIENTS.ETUDIANT;
  const location = [profile.city, profile.country].filter(Boolean).join(", ");

  const subtitle =
    profile.role === "ALUMNI"
      ? profile.jobTitle
      : profile.role === "ADMIN"
        ? profile.department
        : profile.promotion
          ? `Promotion ${profile.promotion}`
          : null;

  // Type-narrow to access owner-only fields safely
  const ownerProfile = isOwner ? (profile as UserProfileResponse) : null;

  return (
    <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
      {/* Cover */}
      <div className={`h-36 w-full relative ${coverClass}`}>
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="px-5 sm:px-7 pb-5">
        {/* Avatar + action buttons */}
        <div className="flex items-end justify-between -mt-12 mb-3 relative z-10">
          <Avatar className="h-24 w-24 rounded-full ring-4 ring-background shadow-lg">
            <AvatarImage
              src={profile.avatarUrl ?? undefined}
              alt={fullName}
              className="object-cover"
            />
            <AvatarFallback className="text-2xl font-semibold bg-muted">
              {getInitials(profile.firstName, profile.lastName)}
            </AvatarFallback>
          </Avatar>

          <div className="flex items-center gap-2 pb-1">
            {profile.linkedinUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-9 gap-1.5"
              >
                <a
                  href={profile.linkedinUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="h-3.5 w-3.5" /> LinkedIn
                </a>
              </Button>
            )}
            {profile.githubUrl && (
              <Button
                variant="outline"
                size="sm"
                asChild
                className="h-9 gap-1.5"
              >
                <a
                  href={profile.githubUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="h-3.5 w-3.5" /> GitHub
                </a>
              </Button>
            )}
            {/* Edit button — owner only */}
            {isOwner && (
              <Button
                size="sm"
                variant={isEditing ? "secondary" : "default"}
                className="h-9 gap-1.5"
                onClick={onEditClick}
              >
                {isEditing ? (
                  <>
                    <X className="h-3.5 w-3.5" /> Cancel
                  </>
                ) : (
                  <>
                    <Pencil className="h-3.5 w-3.5" /> Edit
                  </>
                )}
              </Button>
            )}
          </div>
        </div>

        {/* Name + badges */}
        <div className="space-y-1 mb-3">
          <div className="flex items-center flex-wrap gap-2">
            <h1 className="text-xl font-bold tracking-tight">{fullName}</h1>
            <Badge
              className={`gap-1 text-xs ${roleInfo.colorClass}`}
              variant="outline"
            >
              <RoleIcon className="h-3 w-3" />
              {roleInfo.label}
            </Badge>
            {profile.role === "ALUMNI" && profile.mentor && (
              <Badge
                className="gap-1 text-xs bg-amber-100 text-amber-800 dark:bg-amber-900/30 dark:text-amber-300"
                variant="outline"
              >
                <Award className="h-3 w-3" /> Mentor
              </Badge>
            )}
          </div>
          {subtitle && (
            <p className="text-sm text-muted-foreground">{subtitle}</p>
          )}
          {profile.role === "ALUMNI" && profile.entreprise && (
            <div className="flex items-center gap-1.5 text-sm text-muted-foreground">
              <Building2 className="h-3.5 w-3.5 shrink-0" />
              {profile.entreprise}
            </div>
          )}
        </div>

        {/* Meta chips
            email + phone: only shown to the owner (not present in PublicUserProfileResponse)
            location, sector, graduationYear: always visible                                */}
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground">
          {ownerProfile?.email && (
            <span className="flex items-center gap-1">
              <Mail className="h-3 w-3" /> {ownerProfile.email}
            </span>
          )}
          {location && (
            <span className="flex items-center gap-1">
              <MapPin className="h-3 w-3" /> {location}
            </span>
          )}
          {ownerProfile?.phone && (
            <span className="flex items-center gap-1">
              <Phone className="h-3 w-3" /> {ownerProfile.phone}
            </span>
          )}
          {profile.sector && (
            <span className="flex items-center gap-1">
              <Globe className="h-3 w-3" /> {profile.sector}
            </span>
          )}
          {profile.role === "ALUMNI" && profile.graduationYear && (
            <span className="flex items-center gap-1">
              <GraduationCap className="h-3 w-3" /> Class of{" "}
              {profile.graduationYear}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const { id } = useParams<{ id?: string }>();
  const targetId = id ? parseInt(id, 10) : undefined;

  // useAuth() is synchronous (reads from localStorage) — no loading state,
  // no extra network request. userId is available immediately.
  const { user } = useAuth();

  const isOwnRoute = !targetId;

  // isOwner covers two cases:
  //   1. /profile         — own route, no id in URL
  //   2. /profile/:id     — id in URL but it matches the logged-in user
  // Note: auth context uses `userId`, profile responses use `id` — keep consistent.
  const isOwner = isOwnRoute || user?.userId === targetId;

  const ownQuery = useProfile(); // /api/users/profile
  const publicQuery = usePublicProfile(targetId); // /api/users/:id (disabled when targetId undefined)

  const profile = isOwnRoute ? ownQuery.data : publicQuery.data;
  const isLoading = isOwnRoute ? ownQuery.isLoading : publicQuery.isLoading;

  const { mutate: updateProfile, isPending: isSaving } = useUpdateProfile();
  const [editing, setEditing] = useState(false);

  // ── Loading ──────────────────────────────────────────────────────
  if (isLoading) {
    return (
      <PageContainer>
        <div className="max-w-3xl mx-auto space-y-4">
          <ProfileHeaderSkeleton />
          <Skeleton className="h-32 w-full rounded-xl" />
          <Skeleton className="h-48 w-full rounded-xl" />
        </div>
      </PageContainer>
    );
  }

  if (!profile) {
    return (
      <PageContainer>
        <div className="max-w-3xl mx-auto text-center py-24">
          <p className="text-muted-foreground">Profile not found.</p>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer>
      <div className="max-w-3xl mx-auto space-y-4">
        <ProfileHeader
          profile={profile}
          isOwner={isOwner}
          onEditClick={() => setEditing((v) => !v)}
          isEditing={editing}
        />

        {/* Edit form — renders only for the owner */}
        {isOwner && editing && (
          <Card className="border-primary/30 shadow-sm">
            <CardHeader className="pb-3">
              <CardTitle className="text-sm font-semibold text-primary">
                Editing Profile
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ProfileEditForm
                // ProfileEditForm needs UserProfileResponse (full type with email/phone)
                // Safe to cast here because isOwner + isOwnRoute means ownQuery.data was used
                initial={profile as UserProfileResponse}
                onSave={(payload) =>
                  updateProfile(payload, { onSuccess: () => setEditing(false) })
                }
                onCancel={() => setEditing(false)}
                isSaving={isSaving}
              />
            </CardContent>
          </Card>
        )}

        {profile.bio && (
          <Card>
            <CardHeader className="pb-3">
              <CardTitle className="text-base">About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
                {profile.bio}
              </p>
            </CardContent>
          </Card>
        )}

        {/* Admin notes — owner only, not present on public profile */}
        {isOwner &&
          profile.role === "ADMIN" &&
          (profile as UserProfileResponse).informations && (
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="flex items-center gap-2 text-base">
                  <ShieldCheck className="h-4 w-4" /> Admin Notes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {(profile as UserProfileResponse).informations}
                </p>
              </CardContent>
            </Card>
          )}

        {/* Lazy sections — onAdd undefined for non-owners, SectionShell hides + button */}
        <ExperienceSection
          userId={profile.id}
          onAdd={isOwner ? () => toast({ title: "Coming soon" }) : undefined}
        />

        <EducationSection
          userId={profile.id}
          onAdd={isOwner ? () => toast({ title: "Coming soon" }) : undefined}
        />

        <SkillsSection
          userId={profile.id}
          onAdd={isOwner ? () => toast({ title: "Coming soon" }) : undefined}
        />
      </div>
    </PageContainer>
  );
}
