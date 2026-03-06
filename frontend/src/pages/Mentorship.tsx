import { PageContainer } from "@/components/layout/PageContainer";
import { MentorCard } from "@/components/mentorship/MentorCard";
import { mockAlumni } from "@/services/mockData";
import { toast } from "@/hooks/use-toast";

export default function Mentorship() {
  const mentors = mockAlumni.filter((a) => a.isMentor);

  const handleRequestMentorship = (mentorId: string) => {
    toast({
      title: "Request Sent",
      description: "Your mentorship request has been sent successfully.",
    });
  };

  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Mentorship Program</h1>
          <p className="text-muted-foreground">
            Connect with experienced alumni mentors to guide your career journey
          </p>
        </div>

        <div className="bg-secondary/10 border border-secondary/20 rounded-lg p-6">
          <h2 className="text-xl font-semibold mb-2">How It Works</h2>
          <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
            <li>Browse available mentors and their expertise areas</li>
            <li>Send a mentorship request to your preferred mentor</li>
            <li>Wait for the mentor to accept your request</li>
            <li>Schedule sessions and start your mentorship journey</li>
          </ol>
        </div>

        <div>
          <h2 className="text-2xl font-bold mb-4">Available Mentors</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {mentors.map((mentor) => (
              <MentorCard
                key={mentor.id}
                mentor={mentor}
                onRequestMentorship={handleRequestMentorship}
              />
            ))}
          </div>
        </div>
      </div>
    </PageContainer>
  );
}
