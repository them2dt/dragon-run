import React from 'react';
import buffer from 'buffer';
globalThis.Buffer = buffer.Buffer;
//3rd-party
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
//routes
import ErrorPage from './pages/ErrorPage';
import Index from './pages/Index';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import OverlayProvider from './context/OverlayProvider';

declare global {
  interface Window {
    xnft: any;
  }
}

const router = createBrowserRouter([
  {
    path: '/',
    errorElement: <ErrorPage />,
    children: [{ index: true, element: <Index /> }],
  },
]);

function App() {
  const [endpoint, setEndpoint] = React.useState('https://api.devnet.solana.com');

  const customEndpoint = import.meta.env.VITE_RPC_URL;

  if (customEndpoint) {
    setEndpoint(customEndpoint);
  }

  return (
    <ConnectionProvider endpoint={endpoint}>
      <OverlayProvider>
        <RouterProvider router={router} />
      </OverlayProvider>
    </ConnectionProvider>
  );
}

export default App;
