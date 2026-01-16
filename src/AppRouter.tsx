import { Routes, Route } from "react-router-dom";
import { Chart, DataTable } from "./components/DashboardComponents";

function Home() {
  return (
    <div className="center" style={{ marginTop: "20px", padding: "0 20px" }}>
      <DataTable />
    </div>
  );
}

function Grafici() {
  return (
    <div className="center" style={{ marginTop: "20px", padding: "0 20px" }}>
      <Chart />
    </div>
  );
}

function Docs() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[50vh] p-8">
      <h1 className="text-4xl font-bold mb-4">Documentazione</h1>
      <p className="text-muted-foreground text-center max-w-2xl">
        Benvenuti nella sezione documentazione. Qui troverai tutte le
        informazioni necessarie per utilizzare al meglio i nostri componenti.
      </p>
    </div>
  );
}

export function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/grafici" element={<Grafici />} />
      <Route path="/docs" element={<Docs />} />
      {/* Fallback route */}
      <Route
        path="*"
        element={
          <div className="flex justify-center p-10 font-bold">
            Pagina non trovata
          </div>
        }
      />
    </Routes>
  );
}
