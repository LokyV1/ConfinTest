# ConfinTest 🚀

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![Typescript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)](https://www.typescriptlang.org/)

**ConfinTest** è una dashboard moderna sviluppata con React e Vite, progettata per la gestione e visualizzazione dei dati con un'interfaccia utente basata su Shadcn UI.

---

## ✨ Funzionalità

- **📊 Dashboard Interattiva**: Visualizzazione dei dati tramite grafici dinamici e reattivi.
- **📑 Data Table Avanzata**: Gestione delle tabelle con ricerca, paginazione e selezione delle righe.
- **🎨 UI Moderna**: Design pulito e professionale realizzato con Tailwind CSS e componenti Shadcn/UI.
- **🧭 Routing lato client**: Navigazione fluida tra le sezioni (Home, Grafici, Documentazione) tramite React Router.
- **🌓 Supporto Temi**: Predisposizione per modalità Light/Dark.

---

## 🛠️ Tech Stack

- **Core:** React 19, TypeScript, Vite
- **Styling:** Tailwind CSS, Lucide React (Icone)
- **Components:** Shadcn/UI, Radix UI
- **Data Fetching/State:** Quart, Postgres
- **Visualizzazione:** Recharts
- **Routing:** React Router DOM
- **Feedback:** Sonner (Toast notifications)

---

## 🚀 Installazione e Setup

### Prerequisiti

Assicurati di avere installato [Node.js](https://nodejs.org/) (versione 18 o superiore consigliata).

### Passaggi

1.  **Clona il repository**

    ```bash
    git clone [url-del-tuo-repo]
    cd ConfinTest
    ```

2.  **Installa le dipendenze**

    ```bash
    npm install
    ```

3.  **Avvia il server di sviluppo**
    ```bash
    npm run dev
    ```
    L'applicazione sarà disponibile all'indirizzo `http://localhost:5173`.

---

## 📖 Script Disponibili

Nel file `package.json` trovi i seguenti script configurati:

- `npm run dev`: Avvia il server di sviluppo Vite.
- `npm run build`: Compila l'applicazione per la produzione (eseguendo il check TypeScript).
- `npm run lint`: Esegue l'analisi statica del codice per trovare errori.
- `npm run preview`: Avvia una preview locale della build di produzione.

---

## 📂 Struttura Cartelle Principali

- `src/components`: Contiene tutti i componenti UI riutilizzabili e i moduli della dashboard.
- `src/AppRouter.tsx`: Configurazione delle rotte dell'applicazione.
- `src/App.tsx`: Punto di ingresso principale con i provider globali.
- `public/`: Asset statici pubblici.

---
