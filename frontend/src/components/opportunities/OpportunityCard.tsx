import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Building2,
  MapPin,
  DollarSign,
  Calendar,
  Briefcase,
} from "lucide-react";
import { formatDistanceToNow } from "date-fns";

interface OpportunityCardProps {
  opportunity: {
    id: string;
    title: string;
    company: string;
    location: string;
    type: string;
    salary: string;
    description: string;
    postedDate: string;
    deadline: string;
    sector: string;
  };
}

export const OpportunityCard = ({ opportunity }: OpportunityCardProps) => {
  return (
    <Card className="hover:shadow-lg transition-shadow">
      <CardContent className="p-6">
        <div className="flex items-start justify-between mb-3">
          <Badge>{opportunity.type}</Badge>
          <Badge variant="outline">{opportunity.sector}</Badge>
        </div>

        <h3 className="font-semibold text-lg mb-2">{opportunity.title}</h3>

        <div className="space-y-2 mb-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Building2 className="h-4 w-4 shrink-0" />
            <span>{opportunity.company}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <MapPin className="h-4 w-4 shrink-0" />
            <span>{opportunity.location}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <DollarSign className="h-4 w-4 shrink-0" />
            <span>{opportunity.salary}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Briefcase className="h-4 w-4 shrink-0" />
            <span>{opportunity.type}</span>
          </div>
        </div>

        <p className="text-sm text-muted-foreground mb-4 line-clamp-3">
          {opportunity.description}
        </p>

        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <div className="flex items-center gap-1">
            <Calendar className="h-3 w-3" />
            <span>
              Posted{" "}
              {formatDistanceToNow(new Date(opportunity.postedDate), {
                addSuffix: true,
              })}
            </span>
          </div>
        </div>
      </CardContent>

      <CardFooter className="bg-muted/30 p-4">
        <Button asChild className="w-full">
          <Link to={`/opportunities/${opportunity.id}`}>View Details</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
