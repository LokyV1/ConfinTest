import * as React from "react";
import {
  ArrowUpDown,
  ChevronDown,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
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
import { Skeleton } from "@/components/ui/skeleton";
import type { Azienda } from "@/types";
import { initialAziende } from "@/data/mockData";
import { AddAziendaDialog } from "./AddAziendaDialog";
import { DataTableRowActions } from "./DataTableRowActions";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";

export function DataTable() {
  const [data, setData] = React.useState<Azienda[]>([]);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    // Simula caricamento dati con delay di 2 secondi. 
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
      header: "Città",
      cell: ({ row }) => <div>{row.getValue("città") || "-"}</div>,
    },
    {
      accessorKey: "email",
      header: "Email",
      cell: ({ row }) => {
        const email = row.getValue("email") as string;
        return (
          <Tooltip delayDuration={0}>
            <TooltipTrigger>
              <Button
                className="flex items-center gap-2"
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
        <div className="relative max-w-sm">
          <Input
            placeholder="Filtra per nome"
            value={(table.getColumn("nome")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("nome")?.setFilterValue(event.target.value)
            }
            className="pr-10"
          />
          {((table.getColumn("nome")?.getFilterValue() as string) ?? "").length >
            0 && (
            <Button
              variant="ghost"
              size="sm"
              className="absolute right-0 top-0 h-full px-3 hover:bg-transparent"
              onClick={() => table.getColumn("nome")?.setFilterValue("")}
            >
              <X className="h-4 w-4 text-muted-foreground" />
            </Button>
          )}
        </div>
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
                      <Skeleton className="h-6 w-full" />
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
        <div className="text-sm text-muted-foreground">
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
