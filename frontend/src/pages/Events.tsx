import { PageContainer } from "@/components/layout/PageContainer";
import { EventList } from "@/components/events/EventList";
import { mockEvents } from "@/services/mockData";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";

export default function Events() {
  const { user } = useAuth();
  const canCreateEvent = user?.role === "alumni" || user?.role === "admin";

  return (
    <PageContainer>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold mb-2">Events</h1>
            <p className="text-muted-foreground">
              Discover and join alumni events and activities
            </p>
          </div>
          {canCreateEvent && (
            <Button asChild>
              <Link to="/events/create">
                <Plus className="h-4 w-4 mr-2" />
                Create Event
              </Link>
            </Button>
          )}
        </div>
        <EventList events={mockEvents} />
      </div>
    </PageContainer>
  );
}
