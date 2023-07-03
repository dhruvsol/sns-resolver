/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import {
  Box,
  Container,
  Flex,
  Spinner,
  Table,
  TableCaption,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tfoot,
  Th,
  Thead,
  Tr,
  VStack,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { WalletMultiButton } from '@solana/wallet-adapter-react-ui';
import { type NextPage } from 'next';
import { useEffect, useState } from 'react';
import { DefaultHead } from '~/components/DefaultHead';
import { Navbar } from '~/components/Navbar';
import Card from '~/components/card';
import { api } from '~/utils/api';
import { getUserNames } from '~/utils/getUserNames';
import WalletConnectIcon from '../../imgs/wallet-connet.svg';
import Image from 'next/image';
import { Player } from '@lottiefiles/react-lottie-player';
const Create: NextPage = () => {
  const [userNames, setUserNames] = useState<string[]>();
  const [loading, setLoading] = useState<boolean>(false);
  const { publicKey, connected } = useWallet();
  const getAll = api.user.getAll.useQuery({
    wallet: (publicKey?.toBase58() as string) ?? '',
  });
  useEffect(() => {
    const fetchUser = async () => {
      if (!publicKey) return;
      setLoading(true);
      const res = await getUserNames(publicKey?.toBase58() as string);
      const name: string[] = [];
      res.forEach((user) => {
        if (user.walletName) {
          name.push(user.walletName as string);
        }
      });

      setUserNames(name);
      setLoading(false);
    };
    void fetchUser();
  }, [publicKey, connected]);

  if (!publicKey) {
    return (
      <>
        <Navbar />
        <Flex bg="#0C0C0F" w={'full'} minH={'100vh'}>
          <Container maxW="7xl">
            <Text
              color="white"
              fontFamily={'Poppins'}
              fontSize="2xl"
              fontWeight={600}
            >
              Your Domains
            </Text>
            <Flex
              bg="#0C0C0F"
              display={'flex'}
              justify={'start'}
              align={'center'}
              gap={10}
              pt={32}
              flexDirection={'column'}
            >
              <Image src={WalletConnectIcon} alt="wallet connect" />
              <Text color="#FFFFFF" fontSize="2xl" fontWeight={600}>
                Connect your wallet to get started
              </Text>
              <WalletMultiButton
                style={{
                  color: 'white',
                  background: '#695CFF',
                  borderRadius: 80,
                }}
              />
            </Flex>
          </Container>
        </Flex>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <Flex bg="#0C0C0F" w={'full'} minH={'100vh'}>
          <Container maxW="7xl">
            <Text
              color="white"
              fontFamily={'Poppins'}
              fontSize="2xl"
              fontWeight={600}
            >
              Your Domains
            </Text>
            <Flex
              bg="#0C0C0F"
              display={'flex'}
              justify={'start'}
              align={'center'}
              gap={3}
              pt={32}
              flexDirection={'column'}
            >
              <Player
                src="https://assets8.lottiefiles.com/packages/lf20_oguf0mw4.json"
                background="transparent"
                loop
                controls
                autoplay
                style={{ height: '300px', width: '300px' }}
              ></Player>
              <Text color="#FFFFFF" fontSize="2xl" fontWeight={600}>
                Loading...
              </Text>
            </Flex>
          </Container>
        </Flex>
      </>
    );
  }
  return (
    <>
      <DefaultHead />
      <Navbar />
      <Flex bg="#0C0C0F" w={'full'} minH={'100vh'}>
        {userNames?.length === 0 ? (
          <Flex
            display={'flex'}
            justify={'start'}
            align={'center'}
            minH={'100vh'}
            w={'full'}
            pt={32}
            flexDir={'column'}
          >
            <Flex>
              <svg
                width="222"
                height="200"
                viewBox="0 0 222 200"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100.452 200C155.931 200 200.905 155.228 200.905 100C200.905 44.7715 155.931 0 100.452 0C44.9741 0 0 44.7715 0 100C0 155.228 44.9741 200 100.452 200Z"
                  fill="url(#paint0_linear_16_1503)"
                />
                <rect
                  x="7.70129"
                  y="105.333"
                  width="192.869"
                  height="60"
                  rx="10.6667"
                  fill="white"
                />
                <path
                  d="M57.0346 135.333C57.0346 124.656 48.3788 116 37.7013 116C27.0237 116 18.3679 124.656 18.3679 135.333C18.3679 146.011 27.0237 154.667 37.7013 154.667C48.3788 154.667 57.0346 146.011 57.0346 135.333Z"
                  fill="#695CFF"
                />
                <path
                  d="M36.5012 141.592C38.1564 141.592 39.7639 141.038 41.0679 140.019L45.1679 144.119L46.4866 142.8L42.3852 138.699C43.4157 137.367 43.9645 135.725 43.9423 134.041C43.9201 132.356 43.3281 130.73 42.2629 129.425C41.1976 128.12 39.7219 127.215 38.0763 126.856C36.4307 126.498 34.7121 126.707 33.2007 127.45C31.6893 128.194 30.4742 129.427 29.7533 130.949C29.0325 132.471 28.8485 134.193 29.2313 135.833C29.6141 137.473 30.5412 138.935 31.8613 139.981C33.1815 141.027 34.817 141.595 36.5012 141.592ZM36.5012 128.534C37.6088 128.534 38.6915 128.862 39.6124 129.477C40.5334 130.093 41.2511 130.967 41.675 131.991C42.0988 133.014 42.2097 134.14 41.9936 135.226C41.7776 136.312 41.2442 137.31 40.461 138.093C39.6779 138.877 38.68 139.41 37.5937 139.626C36.5075 139.842 35.3815 139.731 34.3582 139.307C33.3349 138.883 32.4603 138.166 31.845 137.245C31.2297 136.324 30.9012 135.241 30.9012 134.134C30.9012 132.648 31.4912 131.224 32.5414 130.174C33.5916 129.124 35.016 128.534 36.5012 128.534Z"
                  fill="white"
                />
                <path
                  d="M106.368 122.667H71.7014C69.4923 122.667 67.7014 124.458 67.7014 126.667C67.7014 128.876 69.4923 130.667 71.7014 130.667H106.368C108.577 130.667 110.368 128.876 110.368 126.667C110.368 124.458 108.577 122.667 106.368 122.667Z"
                  fill="#D0CCFF"
                />
                <path
                  d="M130.368 140H71.7014C69.4923 140 67.7014 141.791 67.7014 144C67.7014 146.209 69.4923 148 71.7014 148H130.368C132.577 148 134.368 146.209 134.368 144C134.368 141.791 132.577 140 130.368 140Z"
                  fill="#ECEBFF"
                />
                <rect
                  x="29.1312"
                  y="34.6667"
                  width="192.869"
                  height="60"
                  rx="10.6667"
                  fill="white"
                />
                <path
                  d="M78.4646 64.6667C78.4646 53.9892 69.8088 45.3334 59.1313 45.3334C48.4538 45.3334 39.798 53.9892 39.798 64.6667C39.798 75.3442 48.4538 84 59.1313 84C69.8088 84 78.4646 75.3442 78.4646 64.6667Z"
                  fill="#695CFF"
                />
                <path
                  d="M57.9312 70.9255C59.5863 70.9252 61.1938 70.3714 62.4978 69.3521L66.5978 73.4521L67.9165 72.1335L63.8152 68.0321C64.8456 66.6999 65.3944 65.0579 65.3722 63.3738C65.35 61.6897 64.758 60.0628 63.6928 58.7582C62.6276 57.4536 61.1519 56.5482 59.5062 56.1897C57.8606 55.8311 56.142 56.0405 54.6306 56.7837C53.1192 57.5269 51.9041 58.7601 51.1833 60.2823C50.4625 61.8045 50.2785 63.526 50.6613 65.1662C51.0441 66.8063 51.9711 68.2685 53.2913 69.3143C54.6114 70.3602 56.2469 70.9281 57.9312 70.9255ZM57.9312 57.8668C59.0387 57.8668 60.1215 58.1952 61.0424 58.8106C61.9633 59.4259 62.6811 60.3005 63.1049 61.3238C63.5288 62.347 63.6397 63.473 63.4236 64.5593C63.2075 65.6456 62.6741 66.6434 61.891 67.4266C61.1078 68.2098 60.11 68.7431 59.0237 68.9592C57.9374 69.1753 56.8114 69.0644 55.7881 68.6405C54.7649 68.2167 53.8903 67.4989 53.2749 66.578C52.6596 65.6571 52.3312 64.5744 52.3312 63.4668C52.3312 61.9816 52.9212 60.5572 53.9714 59.507C55.0216 58.4568 56.446 57.8668 57.9312 57.8668Z"
                  fill="white"
                />
                <path
                  d="M127.798 52.0001H93.1312C90.9221 52.0001 89.1312 53.791 89.1312 56.0001C89.1312 58.2093 90.9221 60.0001 93.1312 60.0001H127.798C130.007 60.0001 131.798 58.2093 131.798 56.0001C131.798 53.791 130.007 52.0001 127.798 52.0001Z"
                  fill="#D0CCFF"
                />
                <path
                  d="M151.798 69.3335H93.1312C90.9221 69.3335 89.1312 71.1244 89.1312 73.3335C89.1312 75.5426 90.9221 77.3335 93.1312 77.3335H151.798C154.007 77.3335 155.798 75.5426 155.798 73.3335C155.798 71.1244 154.007 69.3335 151.798 69.3335Z"
                  fill="#ECEBFF"
                />
                <defs>
                  <linearGradient
                    id="paint0_linear_16_1503"
                    x1="100.452"
                    y1="0"
                    x2="100.452"
                    y2="200"
                    gradientUnits="userSpaceOnUse"
                  >
                    <stop stop-color="#EBEBFF" />
                    <stop offset="1" stop-color="#C2C2FF" />
                  </linearGradient>
                </defs>
              </svg>
            </Flex>
            <Text color="white" fontSize="2xl" fontWeight={600}>
              No Domains Found
            </Text>
          </Flex>
        ) : (
          <VStack
            minH="100vh"
            w={'full'}
            maxW="7xl"
            mx="auto"
            align="start"
            py={5}
            px={5}
          >
            <Text color="white" fontSize="2xl" fontWeight={600}>
              Your Domains
            </Text>
            <Flex wrap={'wrap'} w={'full'} justify="space-between" gap={5}>
              <TableContainer
                borderRadius={10}
                bg={'rgba(255, 255, 255, 0.04)'}
                w={'full'}
              >
                <Table variant={'unstyled'}>
                  <Thead>
                    <Tr color={'#B4B4BB'} borderBottom={'1px solid #34343B'}>
                      <Th>Domain</Th>
                      <Th>Provider</Th>
                      <Th>Redirect Destination</Th>
                      <Th>Edit</Th>
                    </Tr>
                  </Thead>
                  <Tbody>
                    {userNames?.map((name, index) => {
                      return (
                        <Card
                          domain={name}
                          type="SNS"
                          index={index}
                          id={getAll.data?.find((e) => e.domain === name)?.id}
                          redirect={
                            getAll.data?.find((e) => e.domain === name)
                              ?.redirect ?? ''
                          }
                        />
                      );
                    })}
                  </Tbody>
                </Table>
              </TableContainer>
            </Flex>
          </VStack>
        )}
      </Flex>
    </>
  );
};

export default Create;
