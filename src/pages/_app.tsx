import { AppProps } from 'next/app';
import { ChakraProvider, Flex } from '@chakra-ui/react';

import { theme } from '../styles/theme';

import { ReactQueryDevtools } from 'react-query/devtools'
import { QueryClientProvider } from 'react-query';
import { SidebarDrawerProvider } from '../contexts/SidebarDrawerContext';

import { useRouter } from 'next/router';
import { makeServer } from '../services/mirage';

import { queryClient } from '../services/queryClient';

import { Footer } from '../components/Footer';

if (process.env.NODE_ENV === 'development') {
  makeServer();
}

function MyApp({ Component, pageProps }: AppProps) {
  const { asPath } = useRouter();

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider theme={theme}>
        <SidebarDrawerProvider>
          <Flex direction="column" h="100vh" w="100%">
            <Component {...pageProps} />
            {asPath !== '/' && <Footer />}
          </Flex>
        </SidebarDrawerProvider>
      </ChakraProvider>

      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}

export default MyApp;
