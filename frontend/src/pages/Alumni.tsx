import { PageContainer } from "@/components/layout/PageContainer";
import { AlumniProfileList } from "@/components/alumni/AlumniProfileList";
import { mockAlumni } from "@/services/mockData";

export default function Alumni() {
  return (
    <PageContainer>
      <div className="space-y-6">
        <div>
          <h1 className="text-4xl font-bold mb-2">Alumni Directory</h1>
          <p className="text-muted-foreground">
            Connect with fellow alumni from around the world
          </p>
        </div>
        <AlumniProfileList alumni={mockAlumni} />
      </div>
    </PageContainer>
  );
}
