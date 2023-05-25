import { Flex, Text } from "@chakra-ui/react";
import { type NextPage } from "next";
import { DefaultHead } from "~/components/DefaultHead";
import { Navbar } from "~/components/Navbar";

const Home: NextPage = () => {

  return (
    <>
      <DefaultHead />
      <Navbar />
      <Flex bg="#0E0E10" align="center" justify="center" w="100%" h="100%" minH="100vh" minW="100vw">
        <Text fontSize="50px" color="white" fontWeight="bold" maxW="70%" textAlign="center">Create Shortened Link Redirects For Your SNS Domain Name</Text>
      </Flex>
    </>
  );
};

export default Home;
