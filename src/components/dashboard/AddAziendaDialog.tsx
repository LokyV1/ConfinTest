import * as React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";
import { Settings } from "lucide-react";
import { toast } from "sonner";
import type { Azienda } from "@/types";

export function AddAziendaDialog({ onAdd }: { onAdd: (az: Azienda) => void }) {
  const [open, setOpen] = React.useState(false);
  const [newAz, setNewAz] = React.useState<Partial<Azienda>>({
    nome: "",
    città: "",
    email: "",
    pec: "",
    telefono: "",
    vat: "",
    cap: "",
    nazione: "",
  });

  const [visibleFields, setVisibleFields] = React.useState({
    nome: true,
    città: true,
    email: true,
    pec: true,
    telefono: true,
    vat: true,
    cap: true,
    nazione: true,
  });

  const toggleField = (field: keyof typeof visibleFields) => {
    setVisibleFields((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAz.nome) {
      toast.error("Il nome è obbligatorio");
      return;
    }
    if (!newAz.nazione) {
      newAz.nazione = "Italia";
    }
    onAdd({
      ...newAz,
      id: Math.random().toString(36).substr(2, 9),
    } as Azienda);
    setOpen(false);
    setNewAz({
      nome: "",
      città: "",
      email: "",
      pec: "",
      telefono: "",
      vat: "",
      cap: "",
      nazione: "",
    });
    toast.success("Azienda aggiunta con successo");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="default">Aggiungi Azienda</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Aggiungi Nuova Azienda</DialogTitle>
          <DialogDescription>
            Inserisci i dettagli della nuova azienda.
          </DialogDescription>
          <div className="pt-2">
            <Tooltip>
              <TooltipTrigger asChild>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="outline" size="sm" className="h-8 gap-1">
                      <Settings className="h-3.5 w-3.5" />
                      <span>Personalizza campi</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="start" className="w-56">
                    {(Object.keys(visibleFields) as Array<keyof typeof visibleFields>).map(
                      (field) => (
                        <DropdownMenuCheckboxItem
                          key={field}
                          checked={visibleFields[field]}
                          onCheckedChange={() => toggleField(field)}
                          className="capitalize"
                        >
                          {field}
                        </DropdownMenuCheckboxItem>
                      )
                    )}
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Mostra/nascondi campi del form</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
            {visibleFields.nome && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nome" className="text-right">
                  Nome *
                </Label>
                <Input
                  id="nome"
                  value={newAz.nome}
                  onChange={(e) =>
                    setNewAz({ ...newAz, nome: e.target.value })
                  }
                  className="col-span-3"
                  required
                />
              </div>
            )}
            {visibleFields.città && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="città" className="text-right">
                  Città
                </Label>
                <Input
                  id="città"
                  value={newAz.città}
                  onChange={(e) =>
                    setNewAz({ ...newAz, città: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            )}
            {visibleFields.email && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="email" className="text-right">
                  Email
                </Label>
                <Input
                  id="email"
                  type="email"
                  value={newAz.email}
                  onChange={(e) =>
                    setNewAz({ ...newAz, email: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            )}
            {visibleFields.pec && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="pec" className="text-right">
                  PEC
                </Label>
                <Input
                  id="pec"
                  type="email"
                  value={newAz.pec}
                  onChange={(e) =>
                    setNewAz({ ...newAz, pec: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            )}
            {visibleFields.telefono && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="telefono" className="text-right">
                  Telefono
                </Label>
                <Input
                  id="telefono"
                  value={newAz.telefono}
                  onChange={(e) =>
                    setNewAz({ ...newAz, telefono: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            )}
            {visibleFields.vat && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="vat" className="text-right">
                  VAT
                </Label>
                <Input
                  id="vat"
                  value={newAz.vat}
                  onChange={(e) =>
                    setNewAz({ ...newAz, vat: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            )}
            {visibleFields.cap && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="cap" className="text-right">
                  CAP
                </Label>
                <Input
                  id="cap"
                  value={newAz.cap}
                  onChange={(e) =>
                    setNewAz({ ...newAz, cap: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            )}
            {visibleFields.nazione && (
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="nazione" className="text-right">
                  Nazione
                </Label>
                <Input
                  id="nazione"
                  value={newAz.nazione}
                  placeholder="Italia"
                  onChange={(e) =>
                    setNewAz({ ...newAz, nazione: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annulla
            </Button>
            <Button type="submit">Salva Azienda</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
