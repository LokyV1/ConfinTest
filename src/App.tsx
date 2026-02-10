import { AppRouter } from "./AppRouter";
import { TooltipProvider } from "@/components/ui/tooltip";

export function App() {
  return (
    <TooltipProvider>
      <AppRouter />
    </TooltipProvider>
  );
}

export default App;
