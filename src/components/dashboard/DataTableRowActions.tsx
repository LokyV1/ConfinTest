import * as React from "react";
import { MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
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
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { toast } from "sonner";
import type { Azienda } from "@/types";

interface DataTableRowActionsProps {
  row: any;
  onDelete: (id: string) => void;
  onUpdate: (azienda: Azienda) => void;
}

export function DataTableRowActions({
  row,
  onDelete,
  onUpdate,
}: DataTableRowActionsProps) {
  const azienda = row.original;
  const [isEditDialogOpen, setIsEditDialogOpen] = React.useState(false);
  const [editedAzienda, setEditedAzienda] = React.useState(azienda);

  return (
    <div className="flex items-center gap-2">
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        <AlertDialog>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="h-8 w-8 p-0 hover:bg-muted transition-colors"
              >
                <span className="sr-only">Apri menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
              <DropdownMenuLabel>Azioni</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer">
                  Modifica azienda
                </DropdownMenuItem>
              </DialogTrigger>
              <DropdownMenuSeparator />
              <AlertDialogTrigger asChild>
                <DropdownMenuItem
                  className="text-destructive focus:text-destructive cursor-pointer"
                  onSelect={(e) => e.preventDefault()}
                >
                  Elimina
                </DropdownMenuItem>
              </AlertDialogTrigger>
            </DropdownMenuContent>
          </DropdownMenu>

          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Modifica Azienda</DialogTitle>
              <DialogDescription>
                Aggiorna le informazioni dell'azienda.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-nome" className="text-right text-sm">
                  Nome
                </Label>
                <Input
                  id="edit-nome"
                  value={editedAzienda.nome}
                  onChange={(e) =>
                    setEditedAzienda({
                      ...editedAzienda,
                      nome: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-città" className="text-right text-sm">
                  Città
                </Label>
                <Input
                  id="edit-città"
                  value={editedAzienda.città || ""}
                  onChange={(e) =>
                    setEditedAzienda({
                      ...editedAzienda,
                      città: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-email" className="text-right text-sm">
                  Email
                </Label>
                <Input
                  id="edit-email"
                  value={editedAzienda.email || ""}
                  onChange={(e) =>
                    setEditedAzienda({
                      ...editedAzienda,
                      email: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-pec" className="text-right text-sm">
                  PEC
                </Label>
                <Input
                  id="edit-pec"
                  value={editedAzienda.pec || ""}
                  onChange={(e) =>
                    setEditedAzienda({
                      ...editedAzienda,
                      pec: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-telefono" className="text-right text-sm">
                  Tel.
                </Label>
                <Input
                  id="edit-telefono"
                  value={editedAzienda.telefono || ""}
                  onChange={(e) =>
                    setEditedAzienda({
                      ...editedAzienda,
                      telefono: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-vat" className="text-right text-sm">
                  VAT
                </Label>
                <Input
                  id="edit-vat"
                  value={editedAzienda.vat || ""}
                  onChange={(e) =>
                    setEditedAzienda({
                      ...editedAzienda,
                      vat: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-cap" className="text-right text-sm">
                  CAP
                </Label>
                <Input
                  id="edit-cap"
                  value={editedAzienda.cap || ""}
                  onChange={(e) =>
                    setEditedAzienda({
                      ...editedAzienda,
                      cap: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="edit-nazione" className="text-right text-sm">
                  Nazione
                </Label>
                <Input
                  id="edit-nazione"
                  value={editedAzienda.nazione || ""}
                  onChange={(e) =>
                    setEditedAzienda({
                      ...editedAzienda,
                      nazione: e.target.value,
                    })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => setIsEditDialogOpen(false)}
              >
                Annulla
              </Button>
              <Button
                onClick={() => {
                  onUpdate(editedAzienda);
                  setIsEditDialogOpen(false);
                }}
              >
                Salva
              </Button>
            </DialogFooter>
          </DialogContent>

          <AlertDialogContent className="sm:max-w-[425px]">
            <AlertDialogHeader>
              <AlertDialogTitle className="text-xl font-semibold text-foreground">
                Conferma eliminazione
              </AlertDialogTitle>
              <AlertDialogDescription className="text-muted-foreground mt-2">
                Sei sicuro di voler eliminare l'azienda{" "}
                <strong className="text-foreground">{azienda.nome}</strong>?
                Questa operazione è irreversibile.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter className="mt-6 flex gap-2">
              <AlertDialogCancel className="hover:bg-accent transition-colors">
                Annulla
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  onDelete(azienda.id);
                  toast.error(`Azienda ${azienda.nome} eliminata`);
                }}
                className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-sm"
              >
                Elimina definitivamente
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </Dialog>
    </div>
  );
}
