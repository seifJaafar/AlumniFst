import { useState } from "react";
import { AlumniProfileCard } from "./AlumniProfileCard";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { Search } from "lucide-react";

interface Alumni {
  id: string;
  name: string;
  email: string;
  promotion: number;
  company: string;
  position: string;
  sector: string;
  country: string;
  city: string;
  avatar?: string;
  isMentor?: boolean;
}

interface AlumniProfileListProps {
  alumni: Alumni[];
}

export const AlumniProfileList = ({ alumni }: AlumniProfileListProps) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterPromotion, setFilterPromotion] = useState("all");
  const [filterCountry, setFilterCountry] = useState("all");
  const [filterSector, setFilterSector] = useState("all");

  const promotions = Array.from(new Set(alumni.map((a) => a.promotion))).sort(
    (a, b) => b - a,
  );
  const countries = Array.from(new Set(alumni.map((a) => a.country))).sort();
  const sectors = Array.from(new Set(alumni.map((a) => a.sector))).sort();

  const filteredAlumni = alumni.filter((alum) => {
    const matchesSearch =
      alum.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alum.position.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesPromotion =
      filterPromotion === "all" ||
      alum.promotion.toString() === filterPromotion;
    const matchesCountry =
      filterCountry === "all" || alum.country === filterCountry;
    const matchesSector =
      filterSector === "all" || alum.sector === filterSector;

    return matchesSearch && matchesPromotion && matchesCountry && matchesSector;
  });

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="md:col-span-4">
          <Label htmlFor="search">Search</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="search"
              placeholder="Search by name, company, or position..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        <div>
          <Label>Promotion Year</Label>
          <Select value={filterPromotion} onValueChange={setFilterPromotion}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Years</SelectItem>
              {promotions.map((year) => (
                <SelectItem key={year} value={year.toString()}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Country</Label>
          <Select value={filterCountry} onValueChange={setFilterCountry}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Countries</SelectItem>
              {countries.map((country) => (
                <SelectItem key={country} value={country}>
                  {country}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <Label>Sector</Label>
          <Select value={filterSector} onValueChange={setFilterSector}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Sectors</SelectItem>
              {sectors.map((sector) => (
                <SelectItem key={sector} value={sector}>
                  {sector}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="text-sm text-muted-foreground">
        Showing {filteredAlumni.length} of {alumni.length} alumni
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAlumni.map((alum) => (
          <AlumniProfileCard key={alum.id} alumni={alum} />
        ))}
      </div>

      {filteredAlumni.length === 0 && (
        <div className="text-center py-12 text-muted-foreground">
          <p>No alumni found matching your filters.</p>
        </div>
      )}
    </div>
  );
};
