import { PageContainer } from "@/components/layout/PageContainer";
import { OpportunityList } from "@/components/opportunities/OpportunityList";
import { mockOpportunities } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Opportunities() {
  const { user } = useAuth();
  const canPost = user?.role === "alumni" || user?.role === "admin";

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Job Opportunities</h1>
            <p className="text-muted-foreground">
              Explore career opportunities shared by alumni
            </p>
          </div>
          {canPost && (
            <Button asChild>
              <Link to="/opportunities/create">
                <Plus className="h-4 w-4 mr-2" />
                Post Opportunity
              </Link>
            </Button>
          )}
        </div>
        <OpportunityList opportunities={mockOpportunities} />
      </div>
    </PageContainer>
  );
}
