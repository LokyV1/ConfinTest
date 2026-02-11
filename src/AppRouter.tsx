import { Routes, Route } from "react-router-dom";
import { DataTable, Chart } from "./components/DashboardComponents";
import { Login } from "./components/auth/Login";
import { Layout } from "./components/Layout";
import { SettingsPage } from "./components/SettingsPage";

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

function Impostazioni() {
  return (
    <div className="center" style={{ marginTop: "20px", padding: "0 20px" }}>
      <SettingsPage />
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
        <Route path="/impostazioni" element={<Impostazioni />} />
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
