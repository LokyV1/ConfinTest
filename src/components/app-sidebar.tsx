import { Home, ChartNoAxesCombined } from "lucide-react";
import { Link } from "react-router-dom";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { NavUser } from "./ui/nav-user";
import { User } from "lucide-react";

// Menu items.
const items = [
  {
    title: "Home",
    url: "/",
    icon: Home,
  },
  {
    title: "Grafici",
    url: "/grafici",
    icon: ChartNoAxesCombined,
  },
  {
    title: "Login",
    url: "/login",
    icon: User,
  },
];

export function AppSidebar() {
  const { setOpenMobile, isMobile, setOpen } = useSidebar();
  return (
    <Sidebar variant="modal">
      <SidebarContent>
        <SidebarHeader>
          <NavUser />
        </SidebarHeader>
        <SidebarGroup>
          <SidebarGroupLabel>Tabelle</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <SidebarMenuButton asChild>
                    <Link
                      to={item.url}
                      onClick={() => {
                        if (isMobile) {
                          setOpenMobile(false);
                        } else {
                          setOpen(false);
                        }
                      }}
                    >
                      <item.icon />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
        <SidebarFooter></SidebarFooter>
      </SidebarContent>
    </Sidebar>
  );
}
