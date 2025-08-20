import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const Navbar = () => {
  const location = useLocation();

  const navItems = [
    { name: "Home", path: "/" },
    { name: "Vegetables", path: "/vegetables" },
    { name: "My Orders", path: "/orders" },
  ];

  return (
    <nav className="border-b border-border/50 bg-card/95 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="container mx-auto px-4">
        <div className="flex items-center gap-8 py-3">
          {navItems.map((item) => (
            <Link key={item.path} to={item.path}>
              <Button
                variant="ghost"
                className={cn(
                  "text-sm font-medium transition-colors hover:text-primary",
                  location.pathname === item.path
                    ? "text-primary bg-primary/10"
                    : "text-muted-foreground"
                )}
              >
                {item.name}
              </Button>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;