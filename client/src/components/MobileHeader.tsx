import { useState } from "react";
import {
  X,
  Sun,
  Moon,
  Home,
  Briefcase,
  Star,
  Mail,
  Heart,
  Github,
  Linkedin,
  Youtube,
  Instagram,
  Twitter,
  Globe,
} from "lucide-react";
import { useTheme } from "./ThemeProvider";
import { useLocation } from "wouter";

interface MobileHeaderProps {
  onNavigate: (section: string) => void;
  activeSection?: string;
}

export default function MobileHeader({
  onNavigate,
  activeSection = "",
}: MobileHeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const [, setLocation] = useLocation();

  // Custom hamburger icon similar to Tabler's "menu-deep"
  const MenuDeepIcon = ({ className = "w-6 h-6" }: { className?: string }) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
    >
      <path d="M4 6h16" />
      <path d="M7 12h13" />
      <path d="M10 18h10" />
    </svg>
  );

  const navItems = [
    { id: "introduction", label: "Introduction", icon: Home },
    { id: "portfolio", label: "Portfolio", icon: Briefcase },
    { id: "testimonials", label: "Testimonials", icon: Star },
    { id: "contact", label: "Contact Me", icon: Mail },
    { id: "donation", label: "Donation", icon: Heart },
  ];

  const socialLinks = [
    { icon: Github, href: "#" },
    { icon: Linkedin, href: "#" },
    { icon: Youtube, href: "#" },
    { icon: Instagram, href: "#" },
    { icon: Twitter, href: "#" },
    { icon: Globe, href: "#" },
  ];

  const handleNavigate = (sectionId: string) => {
    if (sectionId === "portfolio") {
      setLocation("/portfolio");
    } else if (sectionId === "testimonials") {
      setLocation("/testimonials");
    } else if (sectionId === "introduction") {
      setLocation("/");
    } else if (sectionId === "contact") {
      setLocation("/contact");
    } else if (sectionId === "donation") {
      setLocation("/donation");
    } else {
      onNavigate(sectionId);
    }
    setIsMenuOpen(false);
  };

  return (
    <div
      className={`lg:hidden shadow-sm border-b fixed top-0 left-0 right-0 z-50 ${
        theme === "dark"
          ? "bg-gray-800 border-gray-700"
          : "bg-white border-gray-200"
      }`}
    >
      <div className="flex items-center justify-between px-4 py-3">
        <div className="flex items-center space-x-3">
          <img
            src="/public/assets/hero-image.jpg"
            alt="Kurniawan Dwi Saputra"
            className="w-10 h-10 rounded-full object-cover"
          />
          <div>
            <h3
              className={`font-semibold ${
                theme === "dark" ? "text-white" : "text-gray-900"
              }`}
            >
              Kurniawan Dwi Saputra
            </h3>
            <p
              className={`text-sm ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              Fullstack Developer
            </p>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className={`block cursor-pointer rounded-lg p-2 transition-colors ${
              theme === "dark"
                ? "hover:bg-gray-700 text-slate-200"
                : "hover:bg-gray-100 text-slate-600"
            }`}
            aria-label="Toggle theme"
          >
            {theme === "dark" ? (
              <Sun className="w-5 h-5 text-yellow-400" />
            ) : (
              <Moon className="w-5 h-5 text-gray-600" />
            )}
          </button>
          {/* Menu Toggle Button */}
          <button
            className={`block cursor-pointer rounded-lg p-3 ${
              theme === "dark"
                ? "text-slate-200 hover:bg-gray-700"
                : "text-slate-600 hover:bg-gray-100"
            }`}
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Menu"
            title="Menu"
          >
            {isMenuOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <MenuDeepIcon className="w-6 h-6" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div
          className={`border-t ${
            theme === "dark"
              ? "bg-gray-800 border-gray-700"
              : "bg-white border-gray-200"
          }`}
        >
          {/* Navigation */}
          <nav className="py-2">
            {navItems.map((item) => {
              const IconComponent = item.icon;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavigate(item.id)}
                  className={`flex items-center space-x-3 w-full text-left px-4 py-2 transition-colors ${
                    activeSection === item.id
                      ? theme === "dark"
                        ? "text-white bg-gray-700"
                        : "text-blue-600 bg-blue-50"
                      : theme === "dark"
                      ? "text-gray-300 hover:bg-gray-700"
                      : "text-gray-700 hover:bg-gray-50"
                  }`}
                >
                  <IconComponent className="w-5 h-5" />
                  <span>{item.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Social section */}
          <div className="px-4 py-4">
            <p
              className={`text-xs mb-3 ${
                theme === "dark" ? "text-gray-400" : "text-gray-500"
              }`}
            >
              SOCIAL MEDIA
            </p>
            <div className="grid grid-cols-6 gap-3">
              {socialLinks.map((social, index) => {
                const IconComponent = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className={`transition-colors ${
                      theme === "dark"
                        ? "text-gray-400 hover:text-white"
                        : "text-gray-500 hover:text-gray-700"
                    }`}
                  >
                    <IconComponent className="w-4 h-4" />
                  </a>
                );
              })}
            </div>
            <p
              className={`text-xs mt-4 ${
                theme === "dark" ? "text-gray-500" : "text-gray-400"
              }`}
            >
              © 2025 Muhammad Surya J
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
