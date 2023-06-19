/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { Box, Flex, Spinner, Text, VStack } from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { type NextPage } from 'next';
import { useEffect, useState } from 'react';
import { DefaultHead } from '~/components/DefaultHead';
import { Navbar } from '~/components/Navbar';
import Card from '~/components/card';
import { api } from '~/utils/api';
import { getUserNames } from '~/utils/getUserNames';

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
        <Flex
          display={'flex'}
          justify={'center'}
          align={'center'}
          minH={'100vh'}
        >
          <Text color="#595877" fontSize="2xl" fontWeight={600}>
            Connect your Wallet
          </Text>
        </Flex>
      </>
    );
  }

  if (loading) {
    return (
      <>
        <Navbar />
        <Flex
          display={'flex'}
          justify={'center'}
          align={'center'}
          minH={'100vh'}
        >
          <Text
            display={'flex'}
            justifyContent={'center'}
            align={'center'}
            flexDirection={'column'}
            color="#595877"
            fontSize="2xl"
            fontWeight={600}
          >
            <Box>
              <Spinner h={42} w={42} size={'xl'} />
            </Box>
            <Box>
              <Text>Loading...</Text>
            </Box>
          </Text>
        </Flex>
      </>
    );
  }
  return (
    <>
      <DefaultHead />
      <Navbar />
      {userNames?.length === 0 ? (
        <Flex
          display={'flex'}
          justify={'center'}
          align={'center'}
          minH={'100vh'}
        >
          <Text color="#595877" fontSize="2xl" fontWeight={600}>
            No Domains Found
          </Text>
        </Flex>
      ) : (
        <VStack minH="100vh" maxW="7xl" mx="auto" align="start" py={5}>
          <Text color="#595877" fontSize="2xl" fontWeight={600}>
            Your Domains
          </Text>
          <Flex wrap={'wrap'} justify="space-between" gap={5}>
            {userNames?.map((name) => {
              return (
                <Card
                  domain={name}
                  type="SNS"
                  id={getAll.data?.find((e) => e.domain === name)?.id}
                  redirect={
                    getAll.data?.find((e) => e.domain === name)?.redirect ?? ''
                  }
                />
              );
            })}
          </Flex>
        </VStack>
      )}
    </>
  );
};

export default Create;
