import { AppRouter } from "./AppRouter";
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "sonner";

export function App() {
  return (
    <>
      <TooltipProvider>
        <AppRouter />
        <Toaster />
      </TooltipProvider>
    </>
  );
}

export default App;
