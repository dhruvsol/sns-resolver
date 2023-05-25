import { type AppType } from "next/app";
import { api } from "~/utils/api";
import { ChakraProvider } from '@chakra-ui/react'
import "~/styles/globals.css";
import { Wallet } from "~/context/walletContext";

const MyApp: AppType = ({ Component, pageProps }) => {


  return (
    <Wallet>
      <ChakraProvider>
        <Component {...pageProps} />
      </ChakraProvider>
    </Wallet>
  )

};

export default api.withTRPC(MyApp);
