/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Button,
  Container,
  Flex,
  Grid,
  Text,
  useMediaQuery,
} from '@chakra-ui/react';
import { type NextPage } from 'next';
import Image from 'next/image';
import { DefaultHead } from '~/components/DefaultHead';
import { Navbar } from '~/components/Navbar';
import HomePageIcon from '~/imgs/homepage_icon.svg';
import Flow from '~/imgs/flow.svg';
import BottomGlow from '~/imgs/bottomglow.svg';
import { useRouter } from 'next/router';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { useWallet } from '@solana/wallet-adapter-react';

const Home: NextPage = () => {
  const [smallSize] = useMediaQuery('(min-width: 1500px)');
  const router = useRouter();
  const { publicKey } = useWallet();

  return (
    <>
      <DefaultHead />
      <Navbar />

      <Flex bg="#0C0C0F" minH={'100vh'} mb="2rem">
        <Container maxW="7xl" py={20}>
          <Flex gap="2rem" align={'center'}>
            <Flex
              w={'full'}
              align={'center'}
              h={'full'}
              gap={8}
              flexDir={'column'}
            >
              <Flex
                alignItems={'center'}
                flexDir={'column'}
                justifyContent={'start'}
              >
                <Text
                  textAlign={'center'}
                  color="white"
                  fontWeight={500}
                  fontSize={'6xl'}
                >
                  Connect Your{' '}
                  <span
                    style={{
                      color: '#695CFF',
                    }}
                  >
                    Solana
                  </span>
                  <br />
                  Domain to Any Destination
                </Text>
                <Text
                  color={'#B4B4BB'}
                  fontSize={'2xl'}
                  maxW={'3xl'}
                  textAlign={'center'}
                  fontWeight={400}
                >
                  Effortlessly redirect your SNS or ANS domain to your preferred
                  website - GitHub, Twitter, Linktree, or your own personal
                  site.
                </Text>
              </Flex>
              <Flex>
                {publicKey ? (
                  <>
                    <Button
                      color={'white'}
                      w={'full'}
                      h={'full'}
                      bg={'#695CFF'}
                      _hover={{
                        bg: '#695CFF9A',
                      }}
                      onClick={() => {
                        router.push('/create/new');
                      }}
                    >
                      Create A Link
                    </Button>
                  </>
                ) : (
                  <WalletMultiButton
                    style={{
                      color: 'white',
                      background: '#695CFF',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    Get Started
                  </WalletMultiButton>
                )}
              </Flex>
            </Flex>
          </Flex>
        </Container>
      </Flex>
    </>
  );
};

export default Home;
