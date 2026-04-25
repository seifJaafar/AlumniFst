import { Sparkles } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { SectionShell } from "./SectionShell";
import { useSkills } from "@/hooks/useProfile";

interface SkillsSectionProps {
  userId: number | undefined;
  onAdd: () => void;
}

export function SkillsSection({ userId, onAdd }: SkillsSectionProps) {
  const { data: skills = [], isLoading } = useSkills(userId);

  return (
    <SectionShell
      title="Skills"
      icon={Sparkles}
      isLoading={isLoading}
      isEmpty={skills.length === 0}
      emptyLabel="No skills added yet."
      onAdd={onAdd}
      addLabel="Add skill"
    >
      <div className="flex flex-wrap gap-2">
        {skills.map((skill) => (
          <Badge key={skill.id} variant="secondary" className="text-sm">
            {skill.name}
          </Badge>
        ))}
      </div>
    </SectionShell>
  );
}
