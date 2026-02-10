import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "./app-sidebar";

export function Layout() {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="w-full relative">
        <SidebarTrigger className="absolute left-2 top-4 z-[60]" />
        <Navbar />
        <Outlet />
        <Footer />
        <Toaster />
      </main>
    </SidebarProvider>
  );
}
