import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth, UserRole } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";

export const RegisterForm = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState<UserRole>("ETUDIANT");
  const [promotion, setPromotion] = useState("");
  const [promotionYear, setPromotionYear] = useState("");

  const { register, isLoading } = useAuth();
  const navigate = useNavigate();

  const needsPromotion = role === "ALUMNI" || role === "ETUDIANT";
  const needsPromotionYear = role === "ALUMNI";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await register({
        firstName,
        lastName,
        email,
        password,
        role,
        ...(needsPromotion && { promotion }),
        ...(needsPromotionYear && { promotionYear: parseInt(promotionYear) }),
      });
      toast({
        title: "Welcome!",
        description: "Account created successfully.",
      });
      navigate("/login");
    } catch (error) {
      const message =
        error?.response?.data?.message ??
        error?.message ??
        "Failed to create account.";

      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      });
    }
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle>Register</CardTitle>
        <CardDescription>
          Create your account to join the alumni network
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input
                id="firstName"
                placeholder="John"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input
                id="lastName"
                placeholder="Doe"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              minLength={8}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Select value={role} onValueChange={(v) => setRole(v as UserRole)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ETUDIANT">Student</SelectItem>
                <SelectItem value="ALUMNI">Alumni</SelectItem>
                <SelectItem value="ADMIN">Administrator</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {needsPromotion && (
            <div className="space-y-2">
              <Label htmlFor="promotion">Promotion</Label>
              <Input
                id="promotion"
                placeholder="e.g. L3-INFO"
                value={promotion}
                onChange={(e) => setPromotion(e.target.value)}
                required
              />
            </div>
          )}

          {needsPromotionYear && (
            <div className="space-y-2">
              <Label htmlFor="promotionYear">Graduation Year</Label>
              <Input
                id="promotionYear"
                type="number"
                placeholder="e.g. 2022"
                value={promotionYear}
                onChange={(e) => setPromotionYear(e.target.value)}
                required
                min={1900}
                max={2100}
              />
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Creating account..." : "Register"}
          </Button>

          <p className="text-sm text-center text-muted-foreground">
            Already have an account?{" "}
            <Button
              variant="link"
              className="p-0"
              onClick={() => navigate("/login")}
            >
              Login here
            </Button>
          </p>
        </form>
      </CardContent>
    </Card>
  );
};
