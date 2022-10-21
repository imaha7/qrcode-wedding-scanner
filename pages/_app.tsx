import '../styles/globals.css'
import React, { useRef } from 'react';
import type { AppProps } from 'next/app'
import { createTheme, ThemeProvider } from '@mui/material/styles'
import { Hydrate, QueryClient, QueryClientProvider } from "@tanstack/react-query";

function MyApp({ Component, pageProps }: AppProps) {
  const theme = createTheme({
    typography: {
      fontFamily: "Montserrat",
    }
  });
  const queryClient = useRef(new QueryClient());

  return (
    <QueryClientProvider client={queryClient.current}>
      {/* <Hydrate state={pageProps.dehydratedState}> */}
        <ThemeProvider theme={theme}>
          <Component {...pageProps} />
        </ThemeProvider>
      {/* </Hydrate> */}
    </QueryClientProvider>
  );
}

export default MyApp
