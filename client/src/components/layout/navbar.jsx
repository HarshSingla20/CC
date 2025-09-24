import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, Sprout, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";
import { LanguageToggle } from "@/components/ui/language-toggle";
import { motion } from "framer-motion";
import { useAuth } from "@/context/AuthContext.jsx";

const navItems = [
  { name: "Home", path: "/" },
  { name: "Dashboard", path: "/dashboard" },
  { name: "Schemes", path: "/schemes" },
  { name: "Market", path: "/market" },
  { name: "Weather", path: "/weather" },
  { name: "AI Help", path: "/chat" },
];

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, logout } = useAuth();

  const isActive = (path) => location.pathname === path;

  const handleLogin = () => {
    setIsOpen(false);
    navigate("/login");
  };

  const handleSignup = () => {
    setIsOpen(false);
    navigate("/signup");
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav className="bg-background/95 backdrop-blur-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="flex items-center space-x-2 focus-ring rounded-md p-1">
            <motion.div
              whileHover={{ rotate: 360 }}
              transition={{ duration: 0.3 }}
              className="p-2 rounded-lg bg-gradient-primary"
            >
              <Sprout className="h-6 w-6 text-primary-foreground" />
            </motion.div>
            <span className="text-xl font-bold text-primary">NelVaani</span>
          </Link>

          <div className="hidden md:flex items-center space-x-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`px-3 py-2 rounded-md text-sm font-medium transition-colors focus-ring ${
                  isActive(item.path)
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          <div className="hidden md:flex items-center space-x-2">
            <LanguageToggle />
            <ThemeToggle />

            {!user ? (
              <>
                <motion.div whileHover={{ scale: 1.1, rotate: 5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Button variant="outline" onClick={handleLogin}>
                    Login
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.1, rotate: -5 }} transition={{ type: "spring", stiffness: 300 }}>
                  <Button variant="default" onClick={handleSignup}>
                    Signup
                  </Button>
                </motion.div>
              </>
            ) : (
              <>
                <span className="px-3 py-2 text-sm font-medium">{user.name || "User"}</span>
                <Button variant="destructive" className="flex items-center space-x-1" onClick={handleLogout}>
                  <LogOut className="h-4 w-4" /> <span>Logout</span>
                </Button>
              </>
            )}
          </div>

          <div className="md:hidden">
            <Button variant="ghost" size="icon" onClick={() => setIsOpen(!isOpen)} className="focus-ring">
              {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </Button>
          </div>
        </div>

        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden"
          >
            <div className="px-2 pt-2 pb-3 space-y-1 bg-card rounded-lg shadow-medium mt-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors focus-ring ${
                    isActive(item.path)
                      ? "bg-primary text-primary-foreground"
                      : "text-muted-foreground hover:text-foreground hover:bg-muted"
                  }`}
                >
                  {item.name}
                </Link>
              ))}

              <div className="flex flex-col space-y-2 px-3 py-2">
                <div className="flex items-center justify-between">
                  <LanguageToggle />
                  <ThemeToggle />
                </div>

                {!user ? (
                  <>
                    <Button variant="outline" className="w-full" onClick={handleLogin}>
                      Login
                    </Button>
                    <Button variant="default" className="w-full" onClick={handleSignup}>
                      Signup
                    </Button>
                  </>
                ) : (
                  <>
                    {/* <span className="px-3 py-2 text-base font-medium">{user.name || "User"}</span> */}
                    <Button
                      variant="destructive"
                      className="w-full flex items-center justify-center space-x-1"
                      onClick={handleLogout}
                    >
                      <LogOut className="h-4 w-4" /> <span>Logout</span>
                    </Button>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </nav>
  );
}
