import { Flex, Text } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const Navbar = () => {
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  return (
    <Flex
      align="center"
      p="0 3rem"
      borderBottom="1px solid"
      borderColor="#353462"
      height="55px"
      w="100vw"
      justify="space-between"
      boxShadow="0px 4px 39px rgba(0, 0, 0, 0.1)"
    >
      <Text fontWeight={700} fontSize="21px" color="#605EB2">
        SOL RESOLVER
      </Text>

      <WalletMultiButton></WalletMultiButton>
    </Flex>
  );
};
