import { GraduationCap } from "lucide-react";
import { SectionShell } from "./SectionShell";
import { useEducation } from "@/hooks/useProfile";

interface EducationSectionProps {
  userId: number | undefined;
  onAdd: () => void;
}

export function EducationSection({ userId, onAdd }: EducationSectionProps) {
  const { data: education = [], isLoading } = useEducation(userId);

  return (
    <SectionShell
      title="Education"
      icon={GraduationCap}
      isLoading={isLoading}
      isEmpty={education.length === 0}
      emptyLabel="No education added yet."
      onAdd={onAdd}
      addLabel="Add education"
    >
      <div className="space-y-6">
        {education.map((edu) => (
          <div
            key={edu.id}
            className="relative pl-8 pb-6 border-l-2 border-border last:border-0 last:pb-0"
          >
            <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary border-[3px] border-background" />
            <h3 className="font-semibold text-sm leading-tight">
              {edu.school}
            </h3>
            <p className="text-sm text-muted-foreground">
              {edu.degree} · {edu.field}
            </p>
            <p className="text-xs text-muted-foreground mt-0.5">
              {edu.startYear} –{" "}
              {edu.current || !edu.endYear ? "Present" : edu.endYear}
            </p>
            {edu.description && (
              <p className="text-sm text-muted-foreground mt-2 leading-relaxed">
                {edu.description}
              </p>
            )}
          </div>
        ))}
      </div>
    </SectionShell>
  );
}
