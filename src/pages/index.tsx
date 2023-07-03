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
          <Flex gap="2rem">
            <Flex w={'full'} h={'full'} gap={8} flexDir={'column'}>
              <Flex alignItems={'start'} justifyContent={'start'}>
                <Text color="white" fontWeight={700} fontSize={'7xl'}>
                  Connect Your <br /> Solana Domain <br /> to Any Destination
                </Text>
              </Flex>
              <Flex w={'14rem'} h={'3rem'}>
                {publicKey ? (
                  <>
                    <Button
                      color={'white'}
                      w={'full'}
                      h={'full'}
                      bg={'#05386B'}
                      _hover={{
                        bg: '#05386B9A',
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
                      background: '#05386B',
                      width: '100%',
                      height: '100%',
                    }}
                  >
                    Get Started
                  </WalletMultiButton>
                )}
              </Flex>
            </Flex>
            <Image
              src={Flow}
              alt="Icon"
              style={{
                zIndex: 0,
              }}
            />
          </Flex>
          {/* <Flex flexFlow="column" maxW="1000px" gap="2rem">
            <Text
              fontSize="70px"
              color="#9694FF"
              fontWeight={600}
              textAlign={smallSize ? 'start' : 'start'}
            >
              Connect Your{' '}
              <span
                style={{
                  display: 'inline-block',
                  background:
                    '-webkit-linear-gradient(45deg, #336CFF 37.98%, #FF78D9 70.1%)',
                  //@ts-ignore
                  '-webkit-background-clip': 'text',
                  '-webkit-text-fill-color': 'transparent',
                }}
              >
                Solana
              </span>
              Domain to Any Destination
            </Text>

            <Text
              fontSize="30px"
              color="#6C7399"
              fontWeight={500}
              textAlign={smallSize ? 'start' : 'start'}
            >
              Effortlessly redirect your SNS or ANS domain to your preferred
              website - GitHub, Twitter, Linktree, or your own personal site.
            </Text>
            <Button
              background="linear-gradient(180deg, #5748FF 0%, rgba(87, 72, 255, 0.7) 100%);"
              color="#F9F9F9"
              w="35%"
              borderRadius="100px"
              onClick={() => {
                router.push('/create/new');
              }}
              rightIcon={<ChevronRightIcon />}
              h="77px"
              mt="1rem"
              fontSize="25px"
              _hover={{
                background:
                  'linear-gradient(180deg, #5748FF 0%, rgba(87, 72, 255, 0.7) 100%);',
              }}
            >
              Get Started
            </Button>
          </Flex> */}
        </Container>
      </Flex>
      {/* <Image
        src={BottomGlow}
        alt="Icon"
        style={{
          position: 'fixed',
          bottom: '-5rem',
          width: '100vw',
          zIndex: 0,
        }}
      /> */}
    </>
  );
};

export default Home;
