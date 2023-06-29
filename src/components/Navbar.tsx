import { Container, Flex, Text } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export const Navbar = () => {
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  return (
    <Flex
      height="max-content"
      py={6}
      w="100vw"
      bg={'#5CDB95'}
      align={'center'}
      justify={'space-between'}
      boxShadow="0px 4px 39px rgba(0, 0, 0, 0.1)"
    >
      <Container
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        maxW="7xl"
        h="100%"
      >
        <Text fontWeight={700} fontSize="21px" color="#05386B">
          SOL RESOLVER
        </Text>

        <WalletMultiButton
          style={{
            color: 'white',
            background: '#05386B',
          }}
        ></WalletMultiButton>
      </Container>
    </Flex>
  );
};
