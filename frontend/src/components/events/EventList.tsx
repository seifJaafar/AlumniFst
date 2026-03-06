import { useState } from "react";
import { EventCard } from "./EventCard";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Event {
  id: string;
  title: string;
  description: string;
  category: string;
  date: string;
  time: string;
  location: string;
  imageUrl?: string;
  capacity: number;
  registered: number;
  isOnline: boolean;
}

interface EventListProps {
  events: Event[];
}

export const EventList = ({ events }: EventListProps) => {
  const [filterCategory, setFilterCategory] = useState("all");
  const [filterTime, setFilterTime] = useState<"all" | "upcoming" | "past">(
    "upcoming",
  );

  const categories = Array.from(new Set(events.map((e) => e.category))).sort();
  const now = new Date();

  const filteredEvents = events
    .filter((event) => {
      const eventDate = new Date(event.date);
      const matchesCategory =
        filterCategory === "all" || event.category === filterCategory;
      const matchesTime =
        filterTime === "all" ||
        (filterTime === "upcoming" && eventDate >= now) ||
        (filterTime === "past" && eventDate < now);

      return matchesCategory && matchesTime;
    })
    .sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return filterTime === "past" ? dateB - dateA : dateA - dateB;
    });

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <Tabs
          value={filterTime}
          onValueChange={(v) => setFilterTime(v as typeof filterTime)}
        >
          <TabsList>
            <TabsTrigger value="upcoming">Upcoming</TabsTrigger>
            <TabsTrigger value="past">Past</TabsTrigger>
            <TabsTrigger value="all">All Events</TabsTrigger>
          </TabsList>
        </Tabs>

        <div className="w-full md:w-64">
          <Label>Category</Label>
          <Select value={filterCategory} onValueChange={setFilterCategory}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Categories</SelectItem>
              {categories.map((category) => (
                <SelectItem key={category} value={category}>
                  {category}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredEvents.length} event
        {filteredEvents.length !== 1 ? "s" : ""}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredEvents.map((event) => (
          <EventCard key={event.id} event={event} />
        ))}
      </div>

      {filteredEvents.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No events found matching your filters.</p>
        </div>
      )}
    </div>
  );
};
