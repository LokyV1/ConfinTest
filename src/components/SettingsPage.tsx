import { type ReactNode, useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import { ScrollArea } from "./ui/scroll-area";
import { Trash } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "./ui/table";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";
import { users } from "@/data/users";
import { toast } from "sonner";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
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

type User = {
  id: string;
  name: string;
  cognome: string;
  email: string;
  password?: string;
  role: string;
};

const AddUserDrawer = ({
  children,
  onAddUser,
}: {
  children: ReactNode;
  onAddUser: (user: User) => void;
}) => {
  const [nome, setNome] = useState("");
  const [cognome, setCognome] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isAdmin, setIsAdmin] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleAddUser = () => {
    if (!nome || !cognome || !email || !password) {
      toast.error("Compila tutti i campi");
      return;
    }

    const newUser: User = {
      id: Math.random().toString(36).substr(2, 9),
      name: nome,
      cognome: cognome,
      email: email,
      password: password,
      role: isAdmin ? "admin" : "user",
    };

    onAddUser(newUser);
    toast.success("Utente aggiunto");

    // Reset form
    setNome("");
    setCognome("");
    setEmail("");
    setPassword("");
    setIsAdmin(false);
    setIsOpen(false);
  };

  return (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Aggiungi Utente</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0 space-y-4">
            <Input
              placeholder="Nome"
              id="nome"
              value={nome}
              onChange={(e) => setNome(e.target.value)}
            />
            <Input
              placeholder="Cognome"
              id="cognome"
              value={cognome}
              onChange={(e) => setCognome(e.target.value)}
            />
            <Input
              placeholder="Email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <Input
              placeholder="Password"
              name="password"
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="flex items-center space-x-2">
              <Switch
                id="admin"
                checked={isAdmin}
                onCheckedChange={setIsAdmin}
              />
              <Label htmlFor="admin">Admin</Label>
            </div>
            <Button className="w-full" onClick={handleAddUser}>
              Aggiungi
            </Button>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Annulla</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

const ConfirmDeleteUser = ({
  children,
  onConfirm,
}: {
  children: ReactNode;
  onConfirm: () => void;
}) => {
  return (
    <AlertDialog>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <AlertDialogTrigger asChild>{children}</AlertDialogTrigger>
          </TooltipTrigger>
          <TooltipContent>
            <p>Elimina utente</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Elimina utente</AlertDialogTitle>
          <AlertDialogDescription>
            Sei sicuro di voler eliminare questo utente? <br />
            Questa operazione non può essere annullata.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annulla</AlertDialogCancel>
          <AlertDialogAction
            onClick={onConfirm}
            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
          >
            Elimina
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

const RemoveUserDrawer = ({
  children,
  userList,
  onRemoveUser,
}: {
  children: ReactNode;
  userList: User[];
  onRemoveUser: (id: string) => void;
}) => {
  const handleDelete = (id: string) => {
    onRemoveUser(id);
    toast.success("Utente rimosso");
  };

  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-[1000px]">
          <DrawerHeader>
            <DrawerTitle>
              <b>Rimuovi Utente</b>
            </DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0 space-y-4">
            <Label>Seleziona l'utente da rimuovere</Label>
            <div className="border rounded-md">
              <ScrollArea className="h-[300px]">
                <Table>
                  <TableHeader className="bg-background sticky top-0 z-10">
                    <TableRow className="sticky top-0">
                      <TableHead>Nome</TableHead>
                      <TableHead>Cognome</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead className="w-[100px]">Operazioni</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {userList.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>{user.name}</TableCell>
                        <TableCell>{user.cognome}</TableCell>
                        <TableCell>{user.email}</TableCell>
                        <TableCell>
                          <ConfirmDeleteUser
                            onConfirm={() => handleDelete(user.id)}
                          >
                            <Button variant="destructive" size="icon">
                              <Trash className="h-4 w-4" />
                            </Button>
                          </ConfirmDeleteUser>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </ScrollArea>
            </div>
          </div>
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline">Chiudi</Button>
            </DrawerClose>
          </DrawerFooter>
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export function SettingsPage() {
  const [userList, setUserList] = useState<User[]>(users);

  const addUser = (user: User) => {
    setUserList((prev) => [...prev, user]);
  };

  const removeUser = (id: string) => {
    setUserList((prev) => prev.filter((user) => user.id !== id));
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4">
        <Card className="m-5">
          <CardHeader>
            <CardTitle>Impostazioni</CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-between">
            <Label>Impostazione 1</Label>
            <Switch></Switch>
          </CardContent>
          <CardContent className="flex items-center justify-between">
            <Label>Impostazione 2</Label>
            <Switch></Switch>
          </CardContent>
          <CardContent className="flex items-center justify-between">
            <Label>Impostazione 3</Label>
            <Switch></Switch>
          </CardContent>
        </Card>
        <Card className="m-5">
          <CardHeader>
            <CardTitle className="text-center">Gestisci Utenti</CardTitle>
          </CardHeader>
          <CardContent>
            <AddUserDrawer onAddUser={addUser}>
              <Button variant="default" className="justify-center w-full mb-2">
                Aggiungi Utente
              </Button>
            </AddUserDrawer>
            <RemoveUserDrawer userList={userList} onRemoveUser={removeUser}>
              <Button variant="default" className="justify-center w-full mb-2">
                Rimuovi Utente
              </Button>
            </RemoveUserDrawer>
            <Button variant="default" className="justify-center w-full mb-2">
              Modifica Utente
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
