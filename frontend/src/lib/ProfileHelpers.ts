import type { UserRole } from "../types/profile.types";
import { GraduationCap, ShieldCheck, BookOpen } from "lucide-react";
import React from "react";

export function getInitials(first: string, last: string) {
  return `${first.charAt(0)}${last.charAt(0)}`.toUpperCase();
}

export function formatDateRange(
  startDate: string,
  endDate: string | null,
  isCurrent: boolean,
) {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const fmt = (d: string) => {
    const [year, month] = d.split("-");
    return `${months[parseInt(month) - 1]} ${year}`;
  };

  const start = fmt(startDate);
  const end = isCurrent || !endDate ? "Present" : fmt(endDate);
  return `${start} – ${end}`;
}

export const ROLE_META: Record<
  UserRole,
  { label: string; colorClass: string; icon: React.ElementType }
> = {
  ALUMNI: {
    label: "Alumni",
    colorClass:
      "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-300",
    icon: GraduationCap,
  },
  ADMIN: {
    label: "Admin",
    colorClass:
      "bg-rose-100 text-rose-800 dark:bg-rose-900/30 dark:text-rose-300",
    icon: ShieldCheck,
  },
  ETUDIANT: {
    label: "Étudiant",
    colorClass: "bg-sky-100 text-sky-800 dark:bg-sky-900/30 dark:text-sky-300",
    icon: BookOpen,
  },
};
