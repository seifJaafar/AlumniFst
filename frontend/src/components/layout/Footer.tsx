import { Link } from "react-router-dom";
import {
  GraduationCap,
  Facebook,
  Twitter,
  Linkedin,
  Instagram,
} from "lucide-react";

export const Footer = () => {
  return (
    <footer className="border-t bg-card mt-auto">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <div className="flex items-center space-x-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">Alumni Network</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Connecting alumni, students, and creating opportunities for
              professional growth.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="/alumni" className="hover:text-primary">
                  Alumni Directory
                </Link>
              </li>
              <li>
                <Link to="/events" className="hover:text-primary">
                  Events
                </Link>
              </li>
              <li>
                <Link to="/opportunities" className="hover:text-primary">
                  Job Opportunities
                </Link>
              </li>
              <li>
                <Link to="/mentorship" className="hover:text-primary">
                  Mentorship
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>
                <Link to="#" className="hover:text-primary">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">
                  Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="#" className="hover:text-primary">
                  Terms of Service
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Connect With Us</h3>
            <div className="flex space-x-4">
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Linkedin className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary">
                <Instagram className="h-5 w-5" />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>
            &copy; {new Date().getFullYear()} Alumni Network. All rights
            reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
