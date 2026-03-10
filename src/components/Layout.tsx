import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";
import { TooltipProvider } from "@radix-ui/react-tooltip";

export function Layout() {
  return (
    <TooltipProvider>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full relative">
          <Navbar />
          <Outlet />
          <Footer />
          <Toaster />
        </main>
      </SidebarProvider>
    </TooltipProvider>
  );
}
