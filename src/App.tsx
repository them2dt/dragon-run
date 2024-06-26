import React from "react";
import buffer from "buffer";
// 3rd-party
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import OverlayProvider from "@context/OverlayProvider";
import { ThemeProvider } from "@mui/material";
import muiTheme from "theme/muiTheme";
import FirestoreProvider from "@context/FirestoreProvider";
// routes
import ErrorPage from "./pages/ErrorPage";
import Index from "./pages/Index";
import SettingsProvider from "@context/SettingsProvider";
import SolanaProvider from "@context/SolanaProvider";
import GameDataProvider from "@context/GameDataProvider";
import AlertProvider from "@context/AlertProvider";

globalThis.Buffer = buffer.Buffer;

declare global {
  interface Window {
    xnft: any;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Index /> }]
  }
]);

function App() {
  const endpoint = import.meta.env.VITE_RPC_URL;

  return (
    <AlertProvider>
      <ConnectionProvider endpoint={endpoint}>
        <ThemeProvider theme={muiTheme}>
          <FirestoreProvider>
            <SettingsProvider>
              <SolanaProvider>
                <GameDataProvider>
                  <OverlayProvider>
                    <RouterProvider router={router} />
                  </OverlayProvider>
                </GameDataProvider>
              </SolanaProvider>
            </SettingsProvider>
          </FirestoreProvider>
        </ThemeProvider>
      </ConnectionProvider>
    </AlertProvider>
  );
}

export default App;
