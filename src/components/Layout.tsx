import { Outlet } from "react-router-dom";
import Navbar from "@/components/ui/navbar";
import Footer from "@/components/ui/footer";
import { Toaster } from "@/components/ui/sonner";

export function Layout() {
  return (
    <>
      <Navbar />
      <Outlet />
      <Footer />
      <Toaster />
    </>
  );
}
