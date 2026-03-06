import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Building2, Linkedin, GraduationCap } from "lucide-react";

interface AlumniProfileCardProps {
  alumni: {
    id: string;
    name: string;
    avatar?: string;
    promotion: number;
    company: string;
    position: string;
    country: string;
    city: string;
    sector: string;
    isMentor?: boolean;
  };
}

export const AlumniProfileCard = ({ alumni }: AlumniProfileCardProps) => {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start gap-4 mb-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={alumni.avatar} alt={alumni.name} />
            <AvatarFallback>{alumni.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{alumni.name}</h3>
            <p className="text-sm text-muted-foreground">{alumni.position}</p>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mt-1">
              <GraduationCap className="h-3 w-3" />
              <span>Class of {alumni.promotion}</span>
            </div>
          </div>
        </div>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4 shrink-0" />
            <span className="truncate">{alumni.company}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span className="truncate">
              {alumni.city}, {alumni.country}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          <Badge variant="secondary">{alumni.sector}</Badge>
          {alumni.isMentor && <Badge className="bg-secondary">Mentor</Badge>}
        </div>
      </CardContent>

      <CardFooter className="bg-muted/30 p-4 flex gap-2">
        <Button variant="outline" size="sm" asChild className="flex-1">
          <Link to={`/alumni/${alumni.id}`}>View Profile</Link>
        </Button>
        <Button variant="ghost" size="sm">
          <Linkedin className="h-4 w-4" />
        </Button>
      </CardFooter>
    </Card>
  );
};
