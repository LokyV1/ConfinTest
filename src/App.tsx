import "./App.css";
import { ArrowUpIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
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
import { toast, Toaster } from "sonner";
import "sonner/dist/styles.css";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";
import * as React from "react";
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
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { AppRouter } from "./AppRouter";

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

export type Pagamento = {
  id: string;
  amount: number;
  stato: "In attesa" | "In corso" | "Completato" | "Annullato";
  Nome: string;
};

export function DataTable() {
  const [data, setData] = React.useState<Pagamento[]>([
    {
      id: "m5gr84i9",
      amount: 316,
      stato: "Completato",
      Nome: "Azienda1",
    },
    {
      id: "3u1reuv4",
      amount: 242,
      stato: "Completato",
      Nome: "Azienda2",
    },
    {
      id: "derv1ws0",
      amount: 837,
      stato: "In corso",
      Nome: "Azienda3",
    },
    {
      id: "5kma53ae",
      amount: 874,
      stato: "Completato",
      Nome: "Azienda4",
    },
    {
      id: "bhqegj4p",
      amount: 721,
      stato: "Annullato",
      Nome: "Azienda5",
    },
    {
      id: "bhqefj4t",
      amount: 721,
      stato: "Annullato",
      Nome: "Azienda6",
    },
    {
      id: "bhqefj4p",
      amount: 721,
      stato: "Annullato",
      Nome: "Azienda7",
    },
    {
      id: "bhqebj4p",
      amount: 721,
      stato: "Annullato",
      Nome: "Azienda8",
    },
    {
      id: "b2qecj4p",
      amount: 721,
      stato: "Annullato",
      Nome: "Azienda9",
    },
    {
      id: "bhq1cj4p",
      amount: 721,
      stato: "Annullato",
      Nome: "Azienda10",
    },
  ]);
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});

  const handleDelete = (id: string) => {
    setData((prevData) => prevData.filter((item) => item.id !== id));
  };

  const columns: ColumnDef<Pagamento>[] = [
    {
      id: "select",
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "stato",
      header: "Stato",
      cell: ({ row }) => (
        <div className="capitalize">{row.getValue("stato")}</div>
      ),
    },
    {
      accessorKey: "Nome",
      header: ({ column }) => {
        return (
          <Button
            variant="ghost"
            onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
          >
            Nome
            <ArrowUpDown />
          </Button>
        );
      },
      cell: ({ row }) => (
        <div className="lowercase">{row.getValue("Nome")}</div>
      ),
    },
    {
      accessorKey: "Quantità",
      header: () => <div className="text-right">Quantità</div>,
      cell: ({ row }) => {
        const amount = parseFloat(row.getValue("amount"));
        const formatted = new Intl.NumberFormat("en-US", {
          style: "currency",
          currency: "USD",
        }).format(amount);
        return <div className="text-right font-medium">{formatted}</div>;
      },
    },
    {
      id: "azioni",
      enableHiding: false,
      cell: ({ row }) => {
        const pagamento = row.original;
        return (
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
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() => {
                    navigator.clipboard.writeText(pagamento.id);
                    toast.success("ID copiato negli appunti");
                  }}
                >
                  Copia ID pagamento
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="cursor-pointer">
                  Dettagli pagamento
                </DropdownMenuItem>
                <DropdownMenuItem className="cursor-pointer">
                  Dettagli cliente
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <AlertDialogTrigger asChild>
                  <DropdownMenuItem
                    className="text-destructive focus:text-destructive cursor-pointer"
                    onSelect={(e) => e.preventDefault()}
                  >
                    Elimina
                  </DropdownMenuItem>
                </AlertDialogTrigger>
                <DropdownMenuSeparator />
              </DropdownMenuContent>
            </DropdownMenu>
            <AlertDialogContent className="sm:max-w-[425px]">
              <AlertDialogHeader>
                <AlertDialogTitle className="text-xl font-semibold text-foreground">
                  Conferma eliminazione
                </AlertDialogTitle>
                <AlertDialogDescription className="text-muted-foreground mt-2">
                  Sei sicuro di voler eliminare il pagamento di{" "}
                  <strong className="text-foreground">{pagamento.Nome}</strong>?
                  Questa operazione è irreversibile e i dati verranno rimossi
                  permanentemente.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter className="mt-6 flex gap-2">
                <AlertDialogCancel className="hover:bg-accent transition-colors">
                  Annulla
                </AlertDialogCancel>
                <AlertDialogAction
                  onClick={() => {
                    handleDelete(pagamento.id);
                    toast.error(`Pagamento di ${pagamento.Nome} eliminato`);
                  }}
                  className="bg-destructive text-destructive-foreground hover:bg-destructive/90 transition-colors shadow-sm"
                >
                  Elimina definitivamente
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        );
      },
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
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });
  return (
    <div className="w-full">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filtra per nome"
          value={(table.getColumn("Nome")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("Nome")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
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
                            header.getContext()
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
                        cell.getContext()
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
        <div className="text-muted-foreground flex-1 text-sm">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
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
    color: "hsl(var(--chart-1))",
  },
};

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

export function App() {
  return (
    <>
      <Toaster />
      <AppRouter />
    </>
  );
}

export default App;
