import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Check, X, Loader2 } from "lucide-react";
import type {
  UserProfileResponse,
  UpdateProfileRequest,
} from "@/types/profile.types";

interface ProfileEditFormProps {
  initial: UserProfileResponse;
  onSave: (data: UpdateProfileRequest) => void;
  onCancel: () => void;
  isSaving: boolean;
}

export function ProfileEditForm({
  initial,
  onSave,
  onCancel,
  isSaving,
}: ProfileEditFormProps) {
  const [form, setForm] = useState<UpdateProfileRequest>({
    phone: initial.phone ?? "",
    bio: initial.bio ?? "",
    country: initial.country ?? "",
    city: initial.city ?? "",
    linkedinUrl: initial.linkedinUrl ?? "",
    githubUrl: initial.githubUrl ?? "",
    avatarUrl: initial.avatarUrl ?? "",
    sector: initial.sector ?? "",
  });

  const set =
    (key: keyof UpdateProfileRequest) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
      setForm((prev) => ({ ...prev, [key]: e.target.value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleaned = Object.fromEntries(
      Object.entries(form).map(([k, v]) => [k, v === "" ? undefined : v]),
    ) as UpdateProfileRequest;
    onSave(cleaned);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {(
          [
            { key: "phone", label: "Phone", placeholder: "+213 ..." },
            {
              key: "sector",
              label: "Sector",
              placeholder: "e.g. Software Engineering",
            },
            { key: "city", label: "City", placeholder: "City" },
            { key: "country", label: "Country", placeholder: "Country" },
            {
              key: "linkedinUrl",
              label: "LinkedIn URL",
              placeholder: "https://linkedin.com/in/...",
            },
            {
              key: "githubUrl",
              label: "GitHub URL",
              placeholder: "https://github.com/...",
            },
          ] as const
        ).map(({ key, label, placeholder }) => (
          <div key={key} className="space-y-1.5">
            <Label htmlFor={key}>{label}</Label>
            <Input
              id={key}
              value={(form[key] as string) ?? ""}
              onChange={set(key)}
              placeholder={placeholder}
              maxLength={500}
            />
          </div>
        ))}

        <div className="space-y-1.5 sm:col-span-2">
          <Label htmlFor="avatarUrl">Avatar URL</Label>
          <Input
            id="avatarUrl"
            value={form.avatarUrl ?? ""}
            onChange={set("avatarUrl")}
            placeholder="https://..."
            maxLength={500}
          />
        </div>
      </div>

      <div className="space-y-1.5">
        <Label htmlFor="bio">Bio</Label>
        <Textarea
          id="bio"
          value={form.bio ?? ""}
          onChange={set("bio")}
          maxLength={2000}
          rows={4}
          placeholder="Tell us about yourself..."
        />
        <p className="text-xs text-muted-foreground text-right">
          {(form.bio ?? "").length}/2000
        </p>
      </div>

      <div className="flex gap-3 pt-2">
        <Button type="submit" disabled={isSaving} className="gap-2">
          {isSaving ? (
            <Loader2 className="h-4 w-4 animate-spin" />
          ) : (
            <Check className="h-4 w-4" />
          )}
          Save Changes
        </Button>
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isSaving}
          className="gap-2"
        >
          <X className="h-4 w-4" />
          Cancel
        </Button>
      </div>
    </form>
  );
}
