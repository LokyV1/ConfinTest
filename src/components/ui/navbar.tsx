import React from "react";
import { Link } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "./navigation-menu";
import { cn } from "@/lib/utils";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { ModeToggle } from "../mode-toggle";
import { Button } from "./button";

const ListItem = React.forwardRef<
  HTMLAnchorElement,
  React.ComponentPropsWithoutRef<typeof Link> & { title: string }
>(({ className, title, children, to, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          to={to}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

const Navbar = () => (
  <div className="w-full flex items-center justify-between py-4 px-8 border-b sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
    <div className="absolute left-8 top-1/2 -translate-y-1/2">
      <SidebarTrigger />
    </div>
    <div className="flex items-center justify-center flex-1">
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/">Home</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink
              asChild
              className={navigationMenuTriggerStyle()}
            >
              <Link to="/grafici">Grafici</Link>
            </NavigationMenuLink>
          </NavigationMenuItem>
        </NavigationMenuList>
      </NavigationMenu>
      <Button asChild>
        <Link to="/login">Login</Link>
      </Button>
    </div>
    <div className="absolute right-8 top-1/2 -translate-y-1/2">
      <ModeToggle />
    </div>
  </div>
);

export default Navbar;
