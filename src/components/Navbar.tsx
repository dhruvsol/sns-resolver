import { Container, Flex, Text } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import Logo from '../imgs/logo.svg';
import Image from 'next/image';
import Link from 'next/link';
export const Navbar = () => {
  const { connected, publicKey } = useWallet();
  const router = useRouter();

  return (
    <Flex
      position={'fixed'}
      top={'10px'}
      zIndex={100}
      left={'0'}
      height="max-content"
      py={6}
      w="100vw"
      bg={'transparent'}
      align={'center'}
      justify={'space-between'}
      boxShadow="0px 4px 39px rgba(0, 0, 0, 0.1)"
    >
      <Container
        display={'flex'}
        justifyContent={'space-between'}
        alignItems={'center'}
        maxW="7xl"
        p={5}
        px={{
          base: 5,
          md: 10,
        }}
        borderRadius={80}
        bg={` linear-gradient(0deg, rgba(105, 92, 255, 0.08), rgba(105, 92, 255, 0.08)),
linear-gradient(180deg, rgba(105, 92, 255, 0) 0%, rgba(105, 92, 255, 0.16) 100%),
linear-gradient(180deg, rgba(105, 92, 255, 0) 0%, rgba(105, 92, 255, 0.04) 100%)`}
        h="100%"
      >
        <Link href={'/'}>
          <Flex gap={3}>
            <Image width={55} height={55} src={Logo} alt="logo" />
            <Text fontWeight={700} fontSize="lg" color="white">
              SOL <br /> RESOLVER
            </Text>
          </Flex>
        </Link>

        <WalletMultiButton
          style={{
            color: 'white',
            background: '#695CFF',
            borderRadius: 80,
          }}
        ></WalletMultiButton>
      </Container>
    </Flex>
  );
};
