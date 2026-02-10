import * as React from "react";
import {
  ArrowUpDown,
  ChevronDown,
  MoreHorizontal,
  Settings,
} from "lucide-react";
import { Button } from "@/components/ui/button";
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
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Skeleton } from "@/components/ui/skeleton";

const initialAziende: Azienda[] = [
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
  {
    id: "7",
    nome: "Google LLC",
    città: "Mountain View",
    email: "info@google.com",
    pec: "google@legalmail.it",
    telefono: "+1 650-253-0000",
    vat: "IT12345678901",
    cap: "94043",
    nazione: "USA",
  },
  {
    id: "8",
    nome: "Meta Platforms Inc.",
    città: "Menlo Park",
    email: "contact@meta.com",
    vat: "IT23456789012",
    cap: "94025",
    nazione: "USA",
  },
  {
    id: "9",
    nome: "Apple Inc.",
    città: "Cupertino",
    email: "support@apple.com",
    pec: "apple@legalmail.it",
    telefono: "+1 408-996-1010",
    vat: "IT34567890123",
    cap: "95014",
    nazione: "USA",
  },
  {
    id: "10",
    nome: "Netflix Inc.",
    città: "Los Gatos",
    email: "media@netflix.com",
    vat: "IT45678901234",
    cap: "95032",
    nazione: "USA",
  },
  {
    id: "11",
    nome: "Spotify AB",
    città: "Stoccolma",
    email: "office@spotify.com",
    vat: "IT56789012345",
    cap: "111 53",
    nazione: "Svezia",
  },
  {
    id: "12",
    nome: "Samsung Electronics",
    città: "Suwon",
    email: "global@samsung.com",
    telefono: "+82 31-200-1114",
    vat: "IT67890123456",
    cap: "16677",
    nazione: "Corea del Sud",
  },
  {
    id: "13",
    nome: "Sony Group Corp.",
    città: "Tokyo",
    email: "info@sony.jp",
    vat: "IT78901234567",
    cap: "108-0075",
    nazione: "Giappone",
  },
  {
    id: "14",
    nome: "Toyota Motor Corp.",
    città: "Toyota",
    email: "contact@toyota.jp",
    vat: "IT89012345678",
    cap: "471-8571",
    nazione: "Giappone",
  },
  {
    id: "15",
    nome: "Volkswagen AG",
    città: "Wolfsburg",
    email: "vw@volkswagen.de",
    pec: "vw@legalmail.it",
    vat: "IT90123456789",
    cap: "38440",
    nazione: "Germania",
  },
  {
    id: "16",
    nome: "Siemens AG",
    città: "Monaco di Baviera",
    email: "contact@siemens.com",
    telefono: "+49 89 636-00",
    vat: "IT01234567890",
    cap: "80333",
    nazione: "Germania",
  },
  {
    id: "17",
    nome: "Eni S.p.A.",
    città: "Roma",
    email: "info@eni.it",
    pec: "eni@pec.eni.it",
    telefono: "+39 06 59821",
    vat: "IT00905811006",
    cap: "00144",
    nazione: "Italia",
  },
  {
    id: "18",
    nome: "Enel S.p.A.",
    città: "Roma",
    email: "info@enel.com",
    pec: "enel@pec.enel.it",
    vat: "IT00811720580",
    cap: "00198",
    nazione: "Italia",
  },
  {
    id: "19",
    nome: "Leonardo S.p.A.",
    città: "Roma",
    email: "info@leonardo.com",
    pec: "leonardo@pec.leonardo.com",
    telefono: "+39 06 324731",
    vat: "IT00401920585",
    cap: "00195",
    nazione: "Italia",
  },
  {
    id: "20",
    nome: "Pirelli & C. S.p.A.",
    città: "Milano",
    email: "info@pirelli.com",
    pec: "pirelli@pec.pirelli.it",
    vat: "IT00860340157",
    cap: "20126",
    nazione: "Italia",
  },
];

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
  const [data, setData] = React.useState<Azienda[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simula caricamento dati con delay di 3 secondi.
    // TODO: DA RIMUOVERE IN PRODUZIONE
    const timer = setTimeout(() => {
      setData(initialAziende);
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);
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
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Città
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => <div>{row.getValue("città") || "-"}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return (
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                className="flex items-center gap-2 h-auto py-1 px-2"
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(email);
                  toast.success("Email copiata!");
                }}
              >
                {email || "-"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copia</p>
            </TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      accessorKey: "pec",
      header: "PEC",
      cell: ({ row }) => {
        const pec = row.getValue("pec") as string;
        return (
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                className="flex items-center gap-2 h-auto py-1 px-2"
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(pec);
                  toast.success("PEC copiata!");
                }}
              >
                {pec || "-"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copia</p>
            </TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      accessorKey: "vat",
      header: "VAT",
      cell: ({ row }) => {
        const vat = row.getValue("vat") as string;
        return (
          <Tooltip delayDuration={300}>
            <TooltipTrigger asChild>
              <Button
                className="flex items-center gap-2 h-auto py-1 px-2"
                variant="ghost"
                onClick={() => {
                  navigator.clipboard.writeText(vat);
                  toast.success("VAT copiata!");
                }}
              >
                {vat || "-"}
              </Button>
            </TooltipTrigger>
            <TooltipContent>
              <p>Copia</p>
            </TooltipContent>
          </Tooltip>
        );
      },
    },
    {
      accessorKey: "telefono",
      header: "Telefono",
      cell: ({ row }) => <div>{row.getValue("telefono") || "-"}</div>,
    },
    {
      accessorKey: "cap",
      header: "CAP",
      cell: ({ row }) => <div>{row.getValue("cap") || "-"}</div>,
    },
    {
      accessorKey: "nazione",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nazione
            <ArrowUpDown className="ml-2 h-4 w-4" />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="text-center">{row.getValue("nazione") || "-"}</div>
      ),
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

  const [inputPage, setInputPage] = React.useState(
    table.getState().pagination.pageIndex + 1,
  );

  // Sincronizza l'input quando cambi pagina con i tasti Avanti/Indietro
  React.useEffect(() => {
    setInputPage(table.getState().pagination.pageIndex + 1);
  }, [table.getState().pagination.pageIndex]);

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
            {isLoading ? (
              // Mostra gli skeleton durante il caricamento
              Array.from({ length: 5 }).map((_, i) => (
                <TableRow key={`skeleton-${i}`}>
                  {columns.map((_, j) => (
                    <TableCell key={`skeleton-cell-${i}-${j}`}>
                      <Skeleton className="h-6 w-full bg-slate-200" />
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : table.getRowModel().rows?.length ? (
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
        <div className="flex-1 text-sm text-muted-foreground">
          Pagina {table.getState().pagination.pageIndex + 1} di{" "}
          {table.getPageCount()}
        </div>
        <div className="flex-1 text-sm text-muted-foreground">
          <span>
            <Input
              id="pagecounter"
              style={{ maxWidth: "60px" }}
              type="number"
              value={inputPage}
              onChange={(e) => setInputPage(Number(e.target.value))}
            />
          </span>
        </div>
        <div>
          <span>
            <Button
              id="pagesender"
              variant="outline"
              size="sm"
              onClick={() => {
                const targetPage = inputPage - 1;
                if (targetPage >= 0 && targetPage < table.getPageCount()) {
                  table.setPageIndex(targetPage);
                } else {
                  toast.error("Pagina non valida");
                }
              }}
            >
              Vai
            </Button>
          </span>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-sm text-muted-foreground">
            Totale: {table.getFilteredRowModel().rows.length} elementi
          </span>
        </div>

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
    color: "var(--chart-1)",
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
              <DropdownMenuSeparator />
              <DialogTrigger asChild>
                <DropdownMenuItem className="cursor-pointer">
                  Modifica azienda
                </DropdownMenuItem>
              </DialogTrigger>
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
                  <DropdownMenuContent align="start">
                    <DropdownMenuCheckboxItem
                      checked={visibleFields.nome}
                      onCheckedChange={() => toggleField("nome")}
                    >
                      Nome
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={visibleFields.città}
                      onCheckedChange={() => toggleField("città")}
                    >
                      Città
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={visibleFields.email}
                      onCheckedChange={() => toggleField("email")}
                    >
                      Email
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={visibleFields.pec}
                      onCheckedChange={() => toggleField("pec")}
                    >
                      Pec
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={visibleFields.telefono}
                      onCheckedChange={() => toggleField("telefono")}
                    >
                      Telefono
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={visibleFields.vat}
                      onCheckedChange={() => toggleField("vat")}
                    >
                      Vat
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={visibleFields.cap}
                      onCheckedChange={() => toggleField("cap")}
                    >
                      Cap
                    </DropdownMenuCheckboxItem>
                    <DropdownMenuCheckboxItem
                      checked={visibleFields.nazione}
                      onCheckedChange={() => toggleField("nazione")}
                    >
                      Nazione
                    </DropdownMenuCheckboxItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TooltipTrigger>
              <TooltipContent>
                <p>Personalizza i campi della tabella</p>
              </TooltipContent>
            </Tooltip>
          </div>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4 max-h-[60vh] overflow-y-auto px-1">
            {visibleFields.nome && (
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
                  placeholder="Mountain View"
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
                  placeholder="info@google.com"
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
                  value={newAz.pec}
                  onChange={(e) => setNewAz({ ...newAz, pec: e.target.value })}
                  className="col-span-3"
                  placeholder="pec@azienda.it"
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
                  placeholder="+39 0123 4567"
                />
              </div>
            )}
            {visibleFields.vat && (
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
            )}
            {visibleFields.cap && (
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
            )}
            {visibleFields.nazione && (
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
            )}
          </div>
          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              onClick={() => setOpen(false)}
              style={{ marginTop: "10px" }}
            >
              Annulla
            </Button>
            <Button type="submit" style={{ marginTop: "10px" }}>
              Aggiungi
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
