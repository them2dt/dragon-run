import React from 'react';
import buffer from 'buffer';
globalThis.Buffer = buffer.Buffer;
//3rd-party
import { RouterProvider, createBrowserRouter } from 'react-router-dom';
import { ConnectionProvider } from '@solana/wallet-adapter-react';
import OverlayProvider from '@context/OverlayProvider';
import { ThemeProvider, createTheme } from '@mui/material';
import muiTheme from 'constants/theme/muiTheme';
import FirestoreProvider from '@context/FirestoreProvider';
//routes
import ErrorPage from './pages/ErrorPage';
import Index from './pages/Index';
import SettingsProvider from '@context/SettingsProvider';

declare global {
  interface Window {
    xnft: any;
  }
}

const themeProviderTheme = createTheme(muiTheme);

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
      <ThemeProvider theme={themeProviderTheme}>
        <FirestoreProvider>
          <SettingsProvider>
            <OverlayProvider>
              <RouterProvider router={router} />
            </OverlayProvider>
          </SettingsProvider>
        </FirestoreProvider>
      </ThemeProvider>
    </ConnectionProvider>
  );
}

export default App;
