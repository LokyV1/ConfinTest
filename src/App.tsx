import { Toaster } from "sonner";
import { AppRouter } from "./AppRouter";
import { TooltipProvider } from "@/components/ui/tooltip";

export function App() {
  return (
    <TooltipProvider>
      <Toaster />
      <AppRouter />
    </TooltipProvider>
  );
}

export default App;
