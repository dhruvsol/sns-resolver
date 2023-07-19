/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChevronRightIcon } from '@chakra-ui/icons';
import {
  Button,
  Center,
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
import { useState } from 'react';

const Home: NextPage = () => {
  const [smallSize] = useMediaQuery('(min-width: 1500px)');
  const [loading, setLoading] = useState<boolean>(false);
  const router = useRouter();
  const { publicKey } = useWallet();
  const handleCreate = async () => {
    try {
      setLoading(true);
      await router.push('/create/new');
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <>
      <DefaultHead />
      <Navbar />

      <Flex
        overflow={'hidden'}
        bg="#0C0C0F"
        minH={'100vh'}
        mb="2rem"
        position={'relative'}
      >
        <Center
          minW={'100vw'}
          h="100vh"
          position="absolute"
          _before={{
            content: '""',
            zIndex: 2,
            position: 'absolute',
            bottom: 0,
            left: 0,
            transform: 'translateY(50%)',
            width: 'full',
            height: '8rem',
            rounded: '100%',
            bg: '#A450FF',
            filter: 'blur(100px)',
          }}
          _after={{
            content: '""',
            position: 'absolute',
            bottom: 0,
            left: 0,
            zIndex: 1,
            transform: 'translateY(50%)',
            width: '100vw',
            height: '16rem',
            rounded: '100%',
            border: '1px solid red',
            bg: '#695CFF70',
            filter: 'blur(800px)',
          }}
        >
          <svg
            transform="translateX(50%)"
            viewBox="0 0 1440 1024"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g style={{ mixBlendMode: 'soft-light' }}>
              <path
                d="M397.765 -112V736.359L0.00159019 895.491M462.189 -112V736.359L0.00197376 967.476M526.611 -112V736.359L0.00136121 1087.41M591.04 -112V736.359L0.307974 1326.89H1438.45L848.736 736.359V-112M655.462 -112V736.359L359.842 1326.89M719.886 -112L719.382 1326.89M784.314 -112V736.359L1078.92 1326.89M913.165 -112V736.359L1440 1087.96M977.587 -112V736.359L1440 967.783M1042.01 -112V736.359L1440 895.692M1106.44 -112V736.359L1440 847.635M1170.86 -112V736.359L1440 813.315M1235.28 -112V736.359L1440 787.575M1299.71 -112V736.359L1440 767.555M1364.14 -112V736.359L1440 751.544M1428.56 -112V736.359L1440 738.438M0.00101487 813.21L268.914 736.359V-112M333.337 -112V736.359L0.000553957 847.497M204.492 -112V736.359L0 787.499M140.062 -112V736.359L0.00209317 767.491M75.6399 -112V736.359L0.000553957 751.488M11.2102 -112V736.359L0.000661167 738.398M0.00109863 671.986H1440M0.00109863 607.607H1440M0.00109863 543.235H1440M0.00109863 478.862H1440M0.00109863 414.482H1440M0.00109863 350.11H1440M0.00109863 285.737H1440M0.00109863 221.357H1440M0.00109863 156.984H1440M0.00109863 92.6122H1440M0.00109863 28.232H1440M0.00109863 -36.1404H1440M0.00109863 -100.519H1440M1440 1019.58H0.000671387M1440 969.822H0.000671387M1440 930.789H0.000671387M1440 1085.17H0.000671387M1440 899.343H0.000671387M1440 873.472H0.000671387M1440 742.144H0.000671387M1440 736.36H0.000671387M1440 755.425H0.000671387M1440 748.474H0.000671387M1440 817.592H0.000671387M1440 851.81H0.000671387M1440 1175.61H0.000671387M1440 771.616H0.000671387M1440 763.101H0.000671387M1440 803.845H0.000671387M1440 791.778H0.000671387M1440 781.114H0.000671387M1440 833.413H0.000671387"
                stroke="url(#paint0_linear_88_869)"
                stroke-linecap="round"
                stroke-linejoin="round"
              />
            </g>
            <defs>
              <linearGradient
                id="paint0_linear_88_869"
                x1="720"
                y1="221"
                x2="720"
                y2="1036"
                gradientUnits="userSpaceOnUse"
              >
                <stop stop-color="white" stop-opacity="0" />
                <stop offset="1" stop-color="white" />
              </linearGradient>
            </defs>
          </svg>
        </Center>
        <Container maxW="7xl" py={'16rem'}>
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
                gap={{
                  base: 8,
                  md: 5,
                }}
              >
                <Text
                  textAlign={'center'}
                  color="white"
                  fontWeight={500}
                  fontSize={{
                    base: '2xl',
                    md: '5xl',
                  }}
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
                  fontSize={{
                    base: 'md',
                    md: 'xl',
                  }}
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
                      h={14}
                      bg={'#695CFF'}
                      _hover={{
                        bg: '#695CFF9A',
                      }}
                      onClick={handleCreate}
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
