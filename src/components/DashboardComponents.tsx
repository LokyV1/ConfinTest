import * as React from "react";
import {
  ArrowUpIcon,
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
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
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
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
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import {
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
  type ColumnDef,
  type ColumnFiltersState,
  type SortingState,
  type VisibilityState,
} from "@tanstack/react-table";
import { toast } from "sonner";

export function ButtonDemo() {
  return (
    <div className="flex flex-wrap items-center gap-2 md:flex-row">
      <Button variant="outline">Bottone</Button>
      <Button variant="outline" size="icon" aria-label="Submit">
        <ArrowUpIcon />
      </Button>
    </div>
  );
}

export function Sonner() {
  return (
    <Button
      variant="outline"
      onClick={() =>
        toast("Titolo toast", {
          description: "Descrizione evento",
          action: {
            label: "Tasto azione",
            onClick: () => console.log("Tasto azione premuto"),
          },
        })
      }
    >
      Show Toast
    </Button>
  );
}

export function AlertDialogMessage() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="outline">Mostra Dialog</Button>
      </AlertDialogTrigger>

      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sei sicuro?</AlertDialogTitle>
          <AlertDialogDescription>
            Questa azione non può essere annullata. Questo cancellerà
            permanentemente il tuo account e rimuoverà i tuoi dati dai nostri
            server.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction>Continua</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export function SwitchButton() {
  return (
    <div className="flex items-center space-x-2">
      <Switch id="airplane-mode" />
      <Label htmlFor="airplane-mode">Testo Switch</Label>
    </div>
  );
}

const chartData = [
  { month: "Gennaio", vendite: 186 },
  { month: "Febbraio", vendite: 305 },
  { month: "Marzo", vendite: 237 },
  { month: "Aprile", vendite: 73 },
  { month: "Maggio", vendite: 209 },
  { month: "Giugno", vendite: 214 },
  { month: "Luglio", vendite: 196 },
  { month: "Agosto", vendite: 222 },
  { month: "Settembre", vendite: 256 },
  { month: "Ottobre", vendite: 265 },
  { month: "Novembre", vendite: 289 },
  { month: "Dicembre", vendite: 400 },
];

export type Azienda = {
  id: string;
  nome: string;
  città?: string;
  email?: string;
  pec?: string;
  telefono?: string;
  vat?: string;
  cap?: string;
  nazione?: string;
};

export function DataTable() {
  const [data, setData] = React.useState<Azienda[]>([
    {
      id: "1",
      nome: "Apple Inc.",
      città: "Cupertino",
      email: "info@apple.com",
      pec: "apple@legalmail.it",
      telefono: "+1 408-996-1010",
      vat: "IT12345678901",
      cap: "95014",
      nazione: "USA",
    },
    {
      id: "2",
      nome: "Google LLC",
      città: "Mountain View",
      email: "contact@google.com",
      pec: "google@legalmail.it",
      telefono: "+1 650-253-0000",
      vat: "IT09876543210",
      cap: "94043",
      nazione: "USA",
    },
    {
      id: "3",
      nome: "Microsoft Corp.",
      città: "Redmond",
      email: "hello@microsoft.com",
      pec: "microsoft@legalmail.it",
      telefono: "+1 425-882-8080",
      vat: "IT11223344556",
      cap: "98052",
      nazione: "USA",
    },
    {
      id: "4",
      nome: "Amazon.com",
      città: "Seattle",
      email: "support@amazon.com",
      pec: "amazon@legalmail.it",
      vat: "IT66554433221",
      cap: "98109",
      nazione: "USA",
    },
    {
      id: "5",
      nome: "Ferrari S.p.A.",
      città: "Maranello",
      email: "info@ferrari.it",
      pec: "ferrari@pec.it",
      telefono: "+39 0536 949111",
      vat: "IT00159560366",
      cap: "41053",
      nazione: "Italia",
    },
    {
      id: "6",
      nome: "Tesla Inc.",
      città: "Austin",
      email: "tesla@energy.com",
      vat: "IT99887766554",
      cap: "78725",
      nazione: "USA",
    },
  ]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    [],
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const handleUpdate = (updatedAzienda: Azienda) => {
    setData((prev) =>
      prev.map((a) => (a.id === updatedAzienda.id ? updatedAzienda : a)),
    );
    toast.success("Azienda aggiornata con successo");
  };

  const columns: ColumnDef<Azienda>[] = [
    {
      accessorKey: "nome",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome Azienda
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="font-medium">{row.getValue("nome")}</div>
      ),
    },
    {
      accessorKey: "città",
      header: "Città",
      cell: ({ row }) => <div>{row.getValue("città") || "-"}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => <div>{row.getValue("email") || "-"}</div>,
    },
    {
      accessorKey: "pec",
      header: "PEC",
      cell: ({ row }) => <div>{row.getValue("pec") || "-"}</div>,
    },
    {
      accessorKey: "telefono",
      header: "Telefono",
      cell: ({ row }) => <div>{row.getValue("telefono") || "-"}</div>,
    },
    {
      accessorKey: "vat",
      header: "VAT",
      cell: ({ row }) => <div>{row.getValue("vat") || "-"}</div>,
    },
    {
      accessorKey: "cap",
      header: "CAP",
      cell: ({ row }) => <div>{row.getValue("cap") || "-"}</div>,
    },
    {
      accessorKey: "nazione",
      header: "Nazione",
      cell: ({ row }) => <div>{row.getValue("nazione") || "-"}</div>,
    },
    {
      id: "azioni",
      enableHiding: false,
      cell: ({ row }) => (
        <DataTableRowActions
          row={row}
          onDelete={handleDelete}
          onUpdate={handleUpdate}
        />
      ),
    },
  ];

  const table = useReactTable({
    data,
    columns,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageSize: 5, //numero di righe per pagina
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-full">
      <div className="flex items-center py-4 gap-4">
        <Input
          placeholder="Filtra per nome"
          value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("nome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <AddAziendaDialog onAdd={(newAz) => setData([...data, newAz])} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Colonne <ChevronDown />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="overflow-hidden rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext(),
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        {/* <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} di{" "}
          {table.getFilteredRowModel().rows.length} righe visualizzate.
        </div> */}
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Indietro
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Avanti
          </Button>
        </div>
      </div>
    </div>
  );
}

const chartConfig = {
  vendite: {
    label: "Vendite",
    color: "hsl(var(--chart-1))",
  },
};

interface DataTableRowActionsProps {
  row: any;
  onDelete: (id: string) => void;
  onUpdate: (azienda: Azienda) => void;
}

function DataTableRowActions({
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

export function Chart() {
  return (
    <div className="w-full max-w-3xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4">Grafico Vendite Mensili</h2>
      <ChartContainer config={chartConfig} className="min-h-[300px] w-full">
        <BarChart data={chartData}>
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="month"
            tickLine={false}
            tickMargin={10}
            axisLine={false}
            tickFormatter={(value) => value.slice(0, 3)}
          />
          <ChartTooltip content={<ChartTooltipContent />} />
          <Bar dataKey="vendite" fill="var(--color-vendite)" radius={5} />
        </BarChart>
      </ChartContainer>
    </div>
  );
}

function AddAziendaDialog({ onAdd }: { onAdd: (az: Azienda) => void }) {
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAz.nome) {
      toast.error("Il nome è obbligatorio");
      return;
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
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nome" className="text-right">
                Nome
              </Label>
              <Input
                id="nome"
                value={newAz.nome}
                onChange={(e) => setNewAz({ ...newAz, nome: e.target.value })}
                className="col-span-3"
                placeholder="Google Inc."
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="città" className="text-right">
                Città
              </Label>
              <Input
                id="città"
                value={newAz.città}
                onChange={(e) => setNewAz({ ...newAz, città: e.target.value })}
                className="col-span-3"
                placeholder="Mountain View"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="email" className="text-right">
                Email
              </Label>
              <Input
                id="email"
                type="email"
                value={newAz.email}
                onChange={(e) => setNewAz({ ...newAz, email: e.target.value })}
                className="col-span-3"
                placeholder="info@google.com"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="pec" className="text-right">
                PEC
              </Label>
              <Input
                id="pec"
                value={newAz.pec}
                onChange={(e) => setNewAz({ ...newAz, pec: e.target.value })}
                className="col-span-3"
                placeholder="pec@azienda.it"
              />
            </div>
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
                placeholder="+39 0123 4567"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="vat" className="text-right">
                VAT/P.IVA
              </Label>
              <Input
                id="vat"
                value={newAz.vat}
                onChange={(e) => setNewAz({ ...newAz, vat: e.target.value })}
                className="col-span-3"
                placeholder="IT12345678901"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="cap" className="text-right">
                CAP
              </Label>
              <Input
                id="cap"
                value={newAz.cap}
                onChange={(e) => setNewAz({ ...newAz, cap: e.target.value })}
                className="col-span-3"
                placeholder="00100"
              />
            </div>
            <div className="grid grid-cols-4 items-center gap-4">
              <Label htmlFor="nazione" className="text-right">
                Nazione
              </Label>
              <Input
                id="nazione"
                value={newAz.nazione}
                onChange={(e) =>
                  setNewAz({ ...newAz, nazione: e.target.value })
                }
                className="col-span-3"
                placeholder="Italia"
              />
            </div>
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
            >
              Annulla
            </Button>
            <Button type="submit">Aggiungi</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
