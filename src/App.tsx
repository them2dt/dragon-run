import buffer from "buffer";
globalThis.Buffer = buffer.Buffer;
//3rd-party
import { RouterProvider, createBrowserRouter } from "react-router-dom";
//routes
import ErrorPage from "./pages/ErrorPage";
import Game from "./pages/Index";
import { ConnectionProvider } from "@solana/wallet-adapter-react";
import OverlayProvider from "./context/OverlayProvider";

declare global {
  interface Window {
    xnft: any;
  }
}

const router = createBrowserRouter([
  {
    path: "/",
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Game /> }],
  },
]);

function App() {
  return (
    <ConnectionProvider endpoint={import.meta.env.VITE_RPC_URL}>
      <OverlayProvider>
        <RouterProvider router={router} />
      </OverlayProvider>
    </ConnectionProvider>
  );
}

export default App;
