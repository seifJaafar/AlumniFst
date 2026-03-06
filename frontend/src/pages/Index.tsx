import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Users,
  Calendar,
  Briefcase,
  Heart,
  ArrowRight,
  Quote,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";
import { mockTestimonials, mockEvents } from "@/services/mockData";
import { format } from "date-fns";

export default function Index() {
  const { user } = useAuth();

  const features = [
    {
      icon: Users,
      title: "Alumni Directory",
      description: "Connect with thousands of alumni worldwide",
      link: "/alumni",
    },
    {
      icon: Calendar,
      title: "Events",
      description: "Join networking events and reunions",
      link: "/events",
    },
    {
      icon: Briefcase,
      title: "Job Opportunities",
      description: "Discover career opportunities from alumni",
      link: "/opportunities",
    },
    {
      icon: Heart,
      title: "Mentorship",
      description: "Get guidance from experienced professionals",
      link: "/mentorship",
    },
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary via-secondary to-primary/80 text-white py-24">
        <div className="container">
          <div className="max-w-3xl">
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              Welcome to the Alumni Network
            </h1>
            <p className="text-xl mb-8 text-white/90">
              Connect, collaborate, and grow with our global community of alumni
              and students
            </p>
            {!user ? (
              <div className="flex gap-4">
                <Button size="lg" variant="secondary" asChild>
                  <Link to="/register">Get Started</Link>
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-white/10 hover:bg-white/20 text-white border-white/30"
                  asChild
                >
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            ) : (
              <Button size="lg" variant="secondary" asChild>
                <Link to="/alumni">
                  Explore Directory
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What We Offer
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Everything you need to stay connected and grow your professional
              network
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature) => (
              <Card
                key={feature.title}
                className="hover:shadow-lg transition-shadow"
              >
                <CardHeader>
                  <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center mb-4">
                    <feature.icon className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>{feature.title}</CardTitle>
                  <CardDescription>{feature.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <Button
                    variant="ghost"
                    asChild
                    className="w-full justify-between"
                  >
                    <Link to={feature.link}>
                      Learn More
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">2,847</div>
              <div className="text-muted-foreground">Alumni Members</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">48</div>
              <div className="text-muted-foreground">Events This Year</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-primary mb-2">127</div>
              <div className="text-muted-foreground">Job Opportunities</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-secondary mb-2">89</div>
              <div className="text-muted-foreground">Active Mentorships</div>
            </div>
          </div>
        </div>
      </section>

      {/* Upcoming Events */}
      <section className="py-20 bg-muted/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming Events
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Don't miss out on these exciting opportunities to connect and
              learn
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            {mockEvents.slice(0, 3).map((event) => (
              <Card
                key={event.id}
                className="hover:shadow-lg transition-shadow"
              >
                {event.imageUrl && (
                  <div className="aspect-video overflow-hidden rounded-t-lg">
                    <img
                      src={event.imageUrl}
                      alt={event.title}
                      className="object-cover w-full h-full hover:scale-105 transition-transform"
                    />
                  </div>
                )}
                <CardHeader>
                  <div className="flex items-center justify-between mb-2">
                    <Badge>{event.category}</Badge>
                    {event.isOnline && <Badge variant="outline">Online</Badge>}
                  </div>
                  <CardTitle className="line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-2">
                    {event.description}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Calendar className="h-4 w-4" />
                      <span>{format(new Date(event.date), "PP")}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <Users className="h-4 w-4" />
                      <span>
                        {event.registered} / {event.capacity} registered
                      </span>
                    </div>
                  </div>
                  <Button asChild className="w-full" variant="outline">
                    <Link to={`/events/${event.id}`}>Learn More</Link>
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button asChild size="lg">
              <Link to="/events">
                View All Events
                <ArrowRight className="ml-2 h-5 w-5" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              What Alumni Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Hear from our community members about their experiences
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {mockTestimonials.map((testimonial) => (
              <Card key={testimonial.id} className="relative">
                <CardContent className="pt-12 pb-6">
                  <Quote className="h-8 w-8 text-primary/20 absolute top-4 left-4" />
                  <p className="text-muted-foreground mb-6 italic">
                    "{testimonial.content}"
                  </p>
                  <div className="flex items-center gap-3">
                    <Avatar>
                      <AvatarImage
                        src={testimonial.avatar}
                        alt={testimonial.name}
                      />
                      <AvatarFallback>
                        {testimonial.name.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{testimonial.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.role}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {testimonial.company} • Class of {testimonial.year}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-br from-primary/10 via-secondary/10 to-primary/5">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Join Our Community?
            </h2>
            <p className="text-lg text-muted-foreground mb-8">
              Connect with thousands of alumni, discover opportunities, and grow
              your professional network today.
            </p>
            {!user ? (
              <div className="flex gap-4 justify-center">
                <Button size="lg" asChild>
                  <Link to="/register">Sign Up Free</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link to="/login">Login</Link>
                </Button>
              </div>
            ) : (
              <Button size="lg" asChild>
                <Link to="/alumni">
                  Explore Network
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Link>
              </Button>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
