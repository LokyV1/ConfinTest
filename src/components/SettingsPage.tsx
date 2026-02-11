import type { ReactNode } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Label } from "./ui/label";
import { Switch } from "./ui/switch";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "./ui/drawer";

const AddUserDrawer = ({ children }: { children: ReactNode }) => {
  return (
    <Drawer>
      <DrawerTrigger asChild>{children}</DrawerTrigger>
      <DrawerContent>
        <div className="mx-auto w-full max-w-sm">
          <DrawerHeader>
            <DrawerTitle>Aggiungi Utente</DrawerTitle>
          </DrawerHeader>
          <div className="p-4 pb-0 space-y-4">
            <Input placeholder="Nome" />
            <Input placeholder="Cognome" />
            <Input placeholder="Email" />
            <Input placeholder="Password" name="password" type="password" />
            <Button className="w-full">Aggiungi</Button>
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

export function SettingsPage() {
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
            <AddUserDrawer>
              <Button variant="default" className="justify-center w-full mb-2">
                Aggiungi Utente
              </Button>
            </AddUserDrawer>
            <Button variant="default" className="justify-center w-full mb-2">
              Rimuovi Utente
            </Button>
            <Button variant="default" className="justify-center w-full mb-2">
              Modifica Utente
            </Button>
          </CardContent>
        </Card>
      </div>
    </>
  );
}
