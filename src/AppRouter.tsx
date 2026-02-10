import { Routes, Route } from "react-router-dom";
import { DataTable } from "./components/dashboard/DataTable";
import { SalesChart as Chart } from "./components/dashboard/SalesChart";
import { Login } from "./components/auth/Login";
import { Layout } from "./components/Layout";

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

export function AppRouter() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route element={<Layout />}>
        <Route path="/" element={<Home />} />
        <Route path="/grafici" element={<Grafici />} />
        {/* Route per pagina non trovata */}
        <Route
          path="*"
          element={
            <div className="flex justify-center p-10 font-bold">
              Pagina non trovata
            </div>
          }
        />
      </Route>
    </Routes>
  );
}
