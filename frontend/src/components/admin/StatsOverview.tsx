import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Calendar, Briefcase, Heart } from "lucide-react";

interface StatsOverviewProps {
  stats: {
    totalAlumni: number;
    totalEvents: number;
    activeJobs: number;
    activeMentorships: number;
  };
}

export const StatsOverview = ({ stats }: StatsOverviewProps) => {
  const statCards = [
    {
      title: "Total Alumni",
      value: stats.totalAlumni,
      icon: Users,
      color: "text-primary",
    },
    {
      title: "Total Events",
      value: stats.totalEvents,
      icon: Calendar,
      color: "text-secondary",
    },
    {
      title: "Active Jobs",
      value: stats.activeJobs,
      icon: Briefcase,
      color: "text-primary",
    },
    {
      title: "Active Mentorships",
      value: stats.activeMentorships,
      icon: Heart,
      color: "text-secondary",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <Card key={stat.title}>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-5 w-5 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-bold">
              {stat.value.toLocaleString()}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
