import { Routes, Route } from "react-router-dom";
import {
  AlertDialogMessage,
  ButtonDemo,
  SwitchButton,
  Sonner,
  Chart,
  DataTable,
} from "./App";

const styles = {
  button: {
    margin: "10px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: "10px",
  },
} as const;

function Home() {
  return (
    <>
      <div className="center" style={styles.button}>
        <AlertDialogMessage />
        <ButtonDemo />
      </div>

      <div className="center" style={styles.button}>
        <SwitchButton />
      </div>
      <div className="center" style={styles.button}>
        <Sonner />
      </div>

      <div className="center" style={{ marginTop: "20px" }}>
        <Chart />
      </div>

      <div className="center" style={{ marginTop: "20px" }}>
        <DataTable />
      </div>
    </>
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
