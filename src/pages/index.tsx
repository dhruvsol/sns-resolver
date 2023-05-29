/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Button, Flex, Grid, Text, useMediaQuery } from "@chakra-ui/react";
import { type NextPage } from "next";
import Image from "next/image";
import { DefaultHead } from "~/components/DefaultHead";
import { Navbar } from "~/components/Navbar";
import HomePageIcon from '~/imgs/homepage_icon.svg'
import Lines from '~/imgs/lines.svg'

const Home: NextPage = () => {

  const [smallSize] = useMediaQuery('(min-width: 1500px)')

  return (
    <>
      <DefaultHead />
      <Navbar />

      <Grid mb="2rem" placeContent="center">

        <Image src={Lines} alt="Icon" style={{
          position: "absolute",
          width: "120vw",
          zIndex: 0,
        }} />

        <Flex 
        my="7rem" 
        flexFlow={smallSize ? "row" : 'column'} 
        align={smallSize ? "end" : 'center'} 
        gap="2rem"
         zIndex={10}>

          <Flex flexFlow="column" maxW="1000px">

            <Text
              fontSize="70px"
              color="#595877"
              fontWeight={500}
              textAlign={smallSize ? "start" : 'center'} 
            >
              Connect Your Solana
              Domain to Any Destination
            </Text>

            <Text
              mt="1rem"
              fontSize="30px"
              color="#7279A1"
              fontWeight={500}
              textAlign={smallSize ? "start" : 'center'} 

            >
              Effortlessly redirect your SNS or ANS domain to your preferred website - GitHub, Twitter, Linktree, or your own personal site.
            </Text>

          </Flex>
          <Button
            background="linear-gradient(180deg, #7D72FF 0%, rgba(38, 19, 255, 0.66) 100%)"
            color="#F9F9F9"
            minW="366px"
            borderRadius="30px"
            h="77px"
            fontSize="35px"
            _hover={{ background: "linear-gradient(180deg, #7D72FF 0%, rgba(38, 19, 255, 0.66) 100%)" }}
          >Get Started</Button>
        </Flex>


        <Image src={HomePageIcon} alt="Icon" />
      </Grid>

    </>
  );
};

export default Home;
