
import { useState, useEffect } from "react";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useLocation } from "react-router-dom";

const Header = () => {
  const [isDark, setIsDark] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { toast } = useToast();
  const location = useLocation();

  useEffect(() => {
    // Check if user has a theme preference in localStorage or prefers dark mode
    const savedTheme = localStorage.getItem("theme") || 
      (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    
    if (savedTheme === "dark") {
      document.documentElement.classList.add("dark");
      setIsDark(true);
    } else {
      document.documentElement.classList.remove("dark");
      setIsDark(false);
    }
  }, []);

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
      toast({
        title: "Light mode activated",
        description: "The dashboard is now in light mode.",
      });
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
      toast({
        title: "Dark mode activated",
        description: "The dashboard is now in dark mode.",
      });
    }
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const menuItems = [
    { name: "Dashboard", path: "/dashboard" },
    { name: "Goals", path: "/goals" },
    { name: "Insights", path: "/insights" },
    { name: "Tips", path: "/tips" },
    { name: "Profile", path: "/profile" },
  ];

  // Close mobile menu when changing routes
  useEffect(() => {
    setIsMenuOpen(false);
  }, [location.pathname]);

  return (
    <header className="w-full py-4 px-6 glass-card mb-8 sticky top-0 z-50">
      <div className="flex justify-between items-center">
        {/* Logo and Brand */}
        <Link to="/dashboard" className="flex items-center">
          <div className="h-9 w-9 rounded-lg bg-finance-navy dark:bg-finance-teal flex items-center justify-center mr-3">
            <span className="text-white font-bold text-xl">$</span>
          </div>
          <h1 className="text-xl font-bold hidden md:block">Money Mentor</h1>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8">
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <Link
                key={item.name}
                to={item.path}
                className={`text-sm font-medium hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:bg-primary after:h-0.5 after:w-0 hover:after:w-full after:transition-all ${
                  isActive ? 'text-primary after:w-full' : ''
                }`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* Theme Toggle and Mobile Menu */}
        <div className="flex items-center space-x-4">
          <button
            onClick={toggleTheme}
            className="p-2 rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle theme"
          >
            {isDark ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          
          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="p-2 md:hidden rounded-full hover:bg-secondary transition-colors"
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="pt-4 pb-2 md:hidden animate-fade-in">
          <div className="flex flex-col space-y-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <Link
                  key={item.name}
                  to={item.path}
                  className={`text-sm font-medium p-2 hover:bg-secondary rounded-md transition-colors ${
                    isActive ? 'bg-secondary/50' : ''
                  }`}
                >
                  {item.name}
                </Link>
              );
            })}
          </div>
        </nav>
      )}
    </header>
  );
};

export default Header;
