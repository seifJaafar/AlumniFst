import { useParams, useNavigate } from "react-router-dom";
import { PageContainer } from "@/components/layout/PageContainer";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  ArrowLeft,
  MapPin,
  Building2,
  Mail,
  Linkedin,
  Briefcase,
  GraduationCap,
  Award,
  Calendar,
} from "lucide-react";
import { mockAlumni } from "@/services/mockData";
import { toast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/AuthContext";

export default function AlumniDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const alumni = mockAlumni.find((a) => a.id === id);

  if (!alumni) {
    return (
      <PageContainer>
        <div className="text-center py-12">
          <h2 className="text-2xl font-bold mb-4">Profile not found</h2>
          <Button onClick={() => navigate("/alumni")}>Back to Alumni</Button>
        </div>
      </PageContainer>
    );
  }

  const handleConnect = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    toast({
      title: "Connection Request Sent",
      description: `Your request to connect with ${alumni.name} has been sent.`,
    });
  };

  const handleRequestMentorship = () => {
    if (!user) {
      navigate("/login");
      return;
    }
    toast({
      title: "Mentorship Request Sent",
      description: `Your mentorship request to ${alumni.name} has been sent.`,
    });
  };

  const formatDate = (date: string | null, isCurrent: boolean) => {
    if (isCurrent || !date) return "Present";
    const [year, month] = date.split("-");
    const monthNames = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    return `${monthNames[parseInt(month) - 1]} ${year}`;
  };

  return (
    <PageContainer>
      <Button
        variant="ghost"
        onClick={() => navigate("/alumni")}
        className="mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to Alumni
      </Button>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <Card>
            <CardContent className="p-8">
              <div className="flex flex-col md:flex-row gap-6">
                <Avatar className="h-32 w-32">
                  <AvatarImage src={alumni.avatar} alt={alumni.name} />
                  <AvatarFallback className="text-3xl">
                    {alumni.name.charAt(0)}
                  </AvatarFallback>
                </Avatar>

                <div className="flex-1">
                  <div className="flex items-start justify-between mb-3">
                    <div>
                      <h1 className="text-3xl font-bold mb-1">{alumni.name}</h1>
                      <p className="text-lg text-muted-foreground mb-2">
                        {alumni.position}
                      </p>
                    </div>
                    {alumni.isMentor && (
                      <Badge className="bg-secondary">
                        <Award className="h-3 w-3 mr-1" />
                        Mentor
                      </Badge>
                    )}
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <Building2 className="h-4 w-4" />
                      <span>{alumni.company}</span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <MapPin className="h-4 w-4" />
                      <span>
                        {alumni.city}, {alumni.country}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-muted-foreground">
                      <GraduationCap className="h-4 w-4" />
                      <span>Class of {alumni.promotion}</span>
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    <Button
                      onClick={handleConnect}
                      className="flex-1 md:flex-none"
                    >
                      Connect
                    </Button>
                    {alumni.isMentor && (
                      <Button
                        onClick={handleRequestMentorship}
                        variant="secondary"
                        className="flex-1 md:flex-none"
                      >
                        Request Mentorship
                      </Button>
                    )}
                    <Button variant="outline" size="icon" asChild>
                      <a
                        href={alumni.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <Linkedin className="h-4 w-4" />
                      </a>
                    </Button>
                    <Button variant="outline" size="icon" asChild>
                      <a href={`mailto:${alumni.email}`}>
                        <Mail className="h-4 w-4" />
                      </a>
                    </Button>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* About */}
          <Card>
            <CardHeader>
              <CardTitle>About</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">{alumni.bio}</p>
            </CardContent>
          </Card>

          {/* Work Experience */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Briefcase className="h-5 w-5" />
                Experience
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {alumni.workExperience?.map((work) => (
                  <div
                    key={work.id}
                    className="relative pl-8 pb-6 border-l-2 border-muted last:border-0 last:pb-0"
                  >
                    <div className="absolute left-[-9px] top-0 h-4 w-4 rounded-full bg-primary border-4 border-background" />

                    <div className="space-y-2">
                      <div>
                        <h3 className="font-semibold text-lg">
                          {work.position}
                        </h3>
                        <p className="text-muted-foreground">{work.company}</p>
                      </div>

                      <div className="flex items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          <span>
                            {formatDate(work.startDate, false)} -{" "}
                            {formatDate(work.endDate, work.current)}
                          </span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          <span>{work.location}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground">
                        {work.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5" />
                Education
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {alumni.education?.map((edu) => (
                  <div key={edu.id} className="space-y-2">
                    <div>
                      <h3 className="font-semibold text-lg">
                        {edu.institution}
                      </h3>
                      <p className="text-muted-foreground">
                        {edu.degree} in {edu.field}
                      </p>
                    </div>

                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <Calendar className="h-3 w-3" />
                      <span>
                        {edu.startDate} - {edu.endDate}
                      </span>
                    </div>

                    <p className="text-sm text-muted-foreground">
                      {edu.description}
                    </p>

                    {alumni.education?.indexOf(edu) !==
                      alumni.education.length - 1 && (
                      <Separator className="mt-6" />
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {alumni.skills?.map((skill, index) => (
                  <Badge key={index} variant="secondary">
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Industry */}
          <Card>
            <CardHeader>
              <CardTitle>Industry</CardTitle>
            </CardHeader>
            <CardContent>
              <Badge className="text-sm">{alumni.sector}</Badge>
            </CardContent>
          </Card>

          {/* Contact Info */}
          <Card>
            <CardHeader>
              <CardTitle>Contact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a
                  href={`mailto:${alumni.email}`}
                  className="text-primary hover:underline"
                >
                  {alumni.email}
                </a>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Linkedin className="h-4 w-4 text-muted-foreground" />
                <a
                  href={alumni.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:underline"
                >
                  LinkedIn Profile
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
