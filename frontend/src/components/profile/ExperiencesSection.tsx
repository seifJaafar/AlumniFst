import { Briefcase } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { useExperiences } from "@/hooks/useProfile";
import { formatDateRange } from "@/lib/ProfileHelpers";

interface ExperienceSectionProps {
  userId: number | undefined;
  onAdd: () => void;
}

export function ExperienceSection({ userId, onAdd }: ExperienceSectionProps) {
  const { data: experiences = [], isLoading } = useExperiences(userId);

  return (
    <SectionShell
      title="Experience"
      icon={Briefcase}
      isLoading={isLoading}
      isEmpty={experiences.length === 0}
      emptyLabel="No experience added yet."
      onAdd={onAdd}
      addLabel="Add experience"
    >
      <div className="space-y-6">
        {experiences.map((exp, i) => (
          <div
            key={exp.id}
            className="relative pl-8 pb-6 border-l-2 border-border last:border-0 last:pb-0"
          >
            <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary border-[3px] border-background" />
            <h3 className="font-semibold text-sm leading-tight">{exp.title}</h3>
            <p className="text-sm text-muted-foreground">{exp.company}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {formatDateRange(exp.startDate, exp.endDate, exp.current)}
            </p>
            {exp.description && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {exp.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
