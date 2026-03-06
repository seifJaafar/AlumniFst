import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Building2, GraduationCap, Award } from "lucide-react";

interface MentorCardProps {
  mentor: {
    id: string;
    name: string;
    avatar?: string;
    promotion: number;
    company: string;
    position: string;
    sector: string;
    bio: string;
  };
  onRequestMentorship?: (mentorId: string) => void;
}

export const MentorCard = ({
  mentor,
  onRequestMentorship,
}: MentorCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={mentor.avatar} alt={mentor.name} />
            <AvatarFallback>{mentor.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{mentor.name}</h3>
            <p className="text-sm text-muted-foreground">{mentor.position}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <GraduationCap className="h-3 w-3" />
              <span>Class of {mentor.promotion}</span>
            </div>
          </div>
          <Badge className="bg-secondary">
            <Award className="h-3 w-3 mr-1" />
            Mentor
          </Badge>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4 shrink-0" />
            <span className="truncate">{mentor.company}</span>
          </div>
          <Badge variant="secondary">{mentor.sector}</Badge>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-3">
          {mentor.bio}
        </p>
      </CardContent>

      <CardFooter className="bg-muted/30 p-4">
        <Button
          className="w-full"
          onClick={() => onRequestMentorship?.(mentor.id)}
        >
          Request Mentorship
        </Button>
      </CardFooter>
    </Card>
  );
};
