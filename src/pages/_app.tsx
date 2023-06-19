import { type AppType } from 'next/app';
import { api } from '~/utils/api';
import { ChakraProvider } from '@chakra-ui/react';
import '~/styles/globals.css';
import { Wallet } from '~/context/walletContext';

require('@solana/wallet-adapter-react-ui/styles.css');
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Wallet>
        <Component {...pageProps} />
      </Wallet>
    </ChakraProvider>
  );
};

export default api.withTRPC(MyApp);
