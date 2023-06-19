/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { ChevronRightIcon } from '@chakra-ui/icons';
import { Button, Flex, Grid, Text, useMediaQuery } from '@chakra-ui/react';
import { type NextPage } from 'next';
import Image from 'next/image';
import { DefaultHead } from '~/components/DefaultHead';
import { Navbar } from '~/components/Navbar';
import HomePageIcon from '~/imgs/homepage_icon.svg';
import Flow from '~/imgs/flow.svg';
import BottomGlow from '~/imgs/bottomglow.svg';
import { useRouter } from 'next/router';

const Home: NextPage = () => {
  const [smallSize] = useMediaQuery('(min-width: 1500px)');
  const router = useRouter();
  return (
    <>
      <DefaultHead />
      <Navbar />

      <Grid minH={'100vh'} mb="2rem" placeContent="center">
        <Flex
          my="7rem"
          flexFlow={smallSize ? 'row' : 'column'}
          align={smallSize ? 'end' : 'start'}
          gap="2rem"
          zIndex={10}
        >
          <Flex flexFlow="column" maxW="1000px" gap="2rem">
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
          </Flex>

          <Image
            src={Flow}
            alt="Icon"
            style={{
              zIndex: 0,
            }}
          />
        </Flex>
      </Grid>
      <Image
        src={BottomGlow}
        alt="Icon"
        style={{
          position: 'fixed',
          bottom: '-5rem',
          width: '100vw',
          zIndex: 0,
        }}
      />
    </>
  );
};

export default Home;
