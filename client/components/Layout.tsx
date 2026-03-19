import { Link, useNavigate, useLocation } from "react-router-dom";
import { Menu, X, LogOut } from "lucide-react";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const navLinks = [
    { label: "Home", href: "/" },
    { label: "Courses", href: "/courses" },
    { label: "Badges", href: "/badges" },
    { label: "Games", href: "/games" },
    { label: "Dashboard", href: "/dashboard" },
  ];

  const isActive = (href: string) => {
    return location.pathname === href;
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Navigation */}
      <nav className="sticky top-0 z-50 bg-white border-b border-border shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link
              to="/"
              className="flex items-center gap-2 font-bold text-2xl text-primary hover:opacity-80 transition"
            >
              <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                <span className="text-white text-lg">⭐</span>
              </div>
              <span className="hidden sm:inline">IntelliQuest</span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex gap-1">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  title={`Navigate to ${link.label}`}
                  className={`px-4 py-2 rounded-lg font-medium transition text-sm ${
                    isActive(link.href)
                      ? "bg-primary text-white shadow-md"
                      : "text-foreground hover:bg-muted hover:text-primary"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex items-center gap-3">
              {isLoggedIn && user ? (
                <>
                  <div className="hidden sm:flex items-center gap-3 px-4 py-2 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-2xl">{user.avatar}</span>
                    <div className="text-sm">
                      <p className="font-semibold text-foreground">{user.name}</p>
                      <p className="text-xs text-muted-foreground">
                        Class {user.class}
                      </p>
                    </div>
                  </div>
                  <button
                    onClick={handleLogout}
                    className="hidden sm:inline-flex items-center gap-2 px-4 py-2 text-primary font-medium hover:bg-red-50 hover:text-red-600 transition rounded-lg border border-primary"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="hidden sm:inline-flex px-4 py-2 text-primary font-medium hover:bg-primary hover:text-white transition rounded-lg border border-primary"
                  >
                    Sign In
                  </Link>
                  <Link
                    to="/login"
                    className="px-4 py-2 bg-primary text-white font-medium hover:bg-blue-700 transition rounded-lg hidden sm:inline-flex"
                  >
                    Join Now
                  </Link>
                </>
              )}

              {/* Mobile Menu Button */}
              <button
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 hover:bg-muted rounded-lg transition"
              >
                {mobileMenuOpen ? (
                  <X size={24} className="text-foreground" />
                ) : (
                  <Menu size={24} className="text-foreground" />
                )}
              </button>
            </div>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 border-t border-border">
              {isLoggedIn && user && (
                <div className="px-4 py-3 bg-blue-50 border-b border-border flex items-center gap-3">
                  <span className="text-2xl">{user.avatar}</span>
                  <div className="flex-1">
                    <p className="font-semibold text-foreground text-sm">
                      {user.name}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      Class {user.class}
                    </p>
                  </div>
                </div>
              )}
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  className={`block px-4 py-3 rounded transition font-medium ${
                    isActive(link.href)
                      ? "bg-primary text-white"
                      : "text-foreground hover:bg-muted"
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-4 py-3 flex gap-2 flex-col border-t border-border">
                {isLoggedIn && user ? (
                  <button
                    onClick={() => {
                      handleLogout();
                      setMobileMenuOpen(false);
                    }}
                    className="w-full px-4 py-2 text-red-600 font-medium hover:bg-red-50 transition rounded-lg border border-red-200 flex items-center justify-center gap-2"
                  >
                    <LogOut size={18} />
                    Logout
                  </button>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="w-full px-4 py-2 text-primary font-medium hover:bg-muted transition rounded-lg border border-primary text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Sign In
                    </Link>
                    <Link
                      to="/login"
                      className="w-full px-4 py-2 bg-primary text-white font-medium hover:bg-blue-700 transition rounded-lg text-center"
                      onClick={() => setMobileMenuOpen(false)}
                    >
                      Join Now
                    </Link>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-grow">{children}</main>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-border mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-8 h-8 bg-gradient-to-br from-primary to-secondary rounded-lg flex items-center justify-center">
                  <span className="text-white text-lg">⭐</span>
                </div>
                <span className="font-bold text-lg">IntelliQuest</span>
              </div>
              <p className="text-sm text-muted-foreground">
                Gamified learning platform for Class 5-8 students.
              </p>
            </div>

            {/* Links */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">
                Platform
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <Link to="/" className="hover:text-primary transition">
                    Home
                  </Link>
                </li>
                <li>
                  <Link to="/courses" className="hover:text-primary transition">
                    Courses
                  </Link>
                </li>
                <li>
                  <Link to="/badges" className="hover:text-primary transition">
                    Badges
                  </Link>
                </li>
              </ul>
            </div>

            {/* Support */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">
                Support
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Contact
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Help Center
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    FAQ
                  </a>
                </li>
              </ul>
            </div>

            {/* Legal */}
            <div>
              <h4 className="font-semibold text-foreground mb-4 text-sm">
                Legal
              </h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Terms of Service
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  <a href="#" className="hover:text-primary transition">
                    Cookie Policy
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Divider */}
          <div className="border-t border-border pt-8">
            <p className="text-sm text-muted-foreground text-center">
              © 2024 IntelliQuest. All rights reserved. Building the future of
              education, one badge at a time.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
