import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

export function Register() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    nome: "",
    cognome: "",
  });

  /**
   * Gestisce l'invio del modulo di registrazione.
   * Invia i dati al server backend sulla porta 5000.
   */
  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      toast.error("Le password non corrispondono!");
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:5000/users/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username_email: formData.email,
          password: formData.password,
          nome: formData.nome,
          cognome: formData.cognome,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json() as { message?: string };
        throw new Error(errorData.message || "Errore durante la registrazione");
      }

      toast.success("Registrazione avvenuta con successo!");
      navigate("/login");
    } catch (error) {
      console.error("Registration error:", error);
      const errorMessage = error instanceof Error ? error.message : "Errore di connessione al server.";
      toast.error(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex h-screen w-full items-center justify-center px-4">
      <Card className="mx-auto max-w-sm">
        <CardHeader>
          <CardTitle className="text-2xl">Registrati</CardTitle>
          <CardDescription>
            Registrati per accedere al tuo account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleRegister} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
                value={formData.email}
                onChange={(e) =>
                  setFormData({ ...formData, email: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                placeholder="****"
                required
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="confirmPassword">Conferma Password</Label>
              <Input
                id="confirmPassword"
                type="password"
                placeholder="****"
                required
                value={formData.confirmPassword}
                onChange={(e) =>
                  setFormData({ ...formData, confirmPassword: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="nome">Nome</Label>
              <Input
                id="nome"
                type="text"
                placeholder="Mario"
                required
                value={formData.nome}
                onChange={(e) =>
                  setFormData({ ...formData, nome: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="cognome">Cognome</Label>
              <Input
                id="cognome"
                type="text"
                placeholder="Rossi"
                required
                value={formData.cognome}
                onChange={(e) =>
                  setFormData({ ...formData, cognome: e.target.value })
                }
                disabled={isLoading}
              />
            </div>
            <Button type="submit" className="w-full" disabled={isLoading}>
              {isLoading ? "Registrazione in corso..." : "Registrati"}
            </Button>
            <p className="mt-2 text-center text-sm">
              Hai già un account?{" "}
              <Link className="underline" to="/login">
                Accedi qui
              </Link>
            </p>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}

export default Register;
