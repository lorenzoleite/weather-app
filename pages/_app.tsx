import '../styles/globals.css';
import type { AppProps } from 'next/app';
import { ChakraProvider } from '@chakra-ui/react';
import UserConfigProvider from '../src/context/UserConfig';

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <UserConfigProvider>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </UserConfigProvider>
  );
}
export default MyApp;
