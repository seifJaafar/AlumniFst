import { useParams, useNavigate, Link } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Calendar,
  Clock,
  MapPin,
  Users,
  ArrowLeft,
  Mail,
  Video,
} from "lucide-react";
import { format } from "date-fns";
import { mockEvents } from "@/services/mockData";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const event = mockEvents.find((e) => e.id === id);

  if (!event) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Event not found</h2>
          <Button onClick={() => navigate("/events")}>Back to Events</Button>
        </div>
      </PageContainer>
    );
  }

  const spotsLeft = event.capacity - event.registered;
  const progress = (event.registered / event.capacity) * 100;
  const isAlmostFull = spotsLeft <= 20;
  const isFull = spotsLeft === 0;

  const handleRegister = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    toast({
      title: "Registration Successful!",
      description: `You've been registered for ${event.title}`,
    });
  };

  return (
    <PageContainer>
      <Button
        variant="ghost"
        onClick={() => navigate("/events")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Events
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {event.imageUrl && (
            <div className="aspect-video overflow-hidden rounded-lg">
              <img
                src={event.imageUrl}
                alt={event.title}
                className="object-cover w-full h-full"
              />
            </div>
          )}

          <div>
            <div className="flex items-start gap-3 mb-4">
              <Badge
                variant={event.isOnline ? "secondary" : "default"}
                className="text-sm"
              >
                {event.category}
              </Badge>
              {event.isOnline && <Badge variant="outline">Online Event</Badge>}
              {isAlmostFull && !isFull && (
                <Badge variant="destructive">Almost Full</Badge>
              )}
              {isFull && <Badge variant="destructive">Sold Out</Badge>}
            </div>

            <h1 className="text-4xl font-bold mb-4">{event.title}</h1>

            <div className="flex flex-wrap gap-4 text-muted-foreground mb-6">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5" />
                <span>{format(new Date(event.date), "PPPP")}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="h-5 w-5" />
                <span>{event.time}</span>
              </div>
              <div className="flex items-center gap-2">
                {event.isOnline ? (
                  <Video className="h-5 w-5" />
                ) : (
                  <MapPin className="h-5 w-5" />
                )}
                <span>{event.location}</span>
              </div>
            </div>

            <Separator className="my-6" />

            <div className="prose prose-slate max-w-none">
              <h2 className="text-2xl font-semibold mb-4">About This Event</h2>
              <p className="text-muted-foreground whitespace-pre-line">
                {event.fullDescription}
              </p>
            </div>
          </div>

          {event.agenda && event.agenda.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Event Agenda</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.agenda.map((item, index) => (
                    <div key={index} className="flex gap-4">
                      <div className="text-sm font-medium text-primary min-w-[80px]">
                        {item.time}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm">{item.activity}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}

          {event.speakers && event.speakers.length > 0 && (
            <Card>
              <CardHeader>
                <CardTitle>Speakers</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {event.speakers.map((speaker, index) => (
                    <div key={index} className="flex items-start gap-4">
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${speaker.name}`}
                        />
                        <AvatarFallback>
                          {speaker.name.charAt(0)}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h4 className="font-semibold">{speaker.name}</h4>
                        <p className="text-sm text-muted-foreground">
                          {speaker.role}
                        </p>
                        <p className="text-sm mt-1">
                          <span className="font-medium">Topic:</span>{" "}
                          {speaker.topic}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          )}
        </div>

        <div className="lg:col-span-1">
          <Card className="sticky top-6">
            <CardHeader>
              <CardTitle>Registration</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex items-center justify-between text-sm mb-2">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-4 w-4" />
                    <span>
                      {event.registered} / {event.capacity} registered
                    </span>
                  </div>
                  <span
                    className={`font-medium ${isAlmostFull ? "text-destructive" : "text-muted-foreground"}`}
                  >
                    {spotsLeft} spots left
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className={`h-2 rounded-full transition-all ${
                      isAlmostFull ? "bg-destructive" : "bg-primary"
                    }`}
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              <Separator />

              <div className="space-y-3">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">
                    Organized by
                  </p>
                  <p className="font-medium">{event.organizer}</p>
                </div>

                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Mail className="h-4 w-4" />
                  <a
                    href={`mailto:${event.organizerEmail}`}
                    className="hover:text-primary"
                  >
                    {event.organizerEmail}
                  </a>
                </div>
              </div>

              <Separator />

              <Button
                onClick={handleRegister}
                className="w-full"
                size="lg"
                disabled={isFull}
              >
                {isFull ? "Event Full" : "Register Now"}
              </Button>

              <p className="text-xs text-center text-muted-foreground">
                You will receive confirmation via email
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
