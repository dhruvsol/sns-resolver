/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Flex, Text, VStack } from '@chakra-ui/react';
import { type NextPage } from 'next';
import { DefaultHead } from '~/components/DefaultHead';
import { Navbar } from '~/components/Navbar';
import Card from '~/components/card';

const Create: NextPage = () => {
  return (
    <>
      <DefaultHead />
      <Navbar />

      <VStack minH="100vh" maxW="7xl" mx="auto" align="start" py={5}>
        <Text color="#595877" fontSize="2xl" fontWeight={600}>
          Your Domains
        </Text>
        <Flex wrap={'wrap'} justify="space-between" gap={5}>
          <Card domain="hello" type="SNS" redirect="" />
          <Card domain="hello" type="SNS" redirect="" />
          <Card domain="hello" type="SNS" redirect="" />
          <Card domain="hello" type="SNS" redirect="" />
          <Card domain="hello" type="SNS" redirect="" />
          <Card domain="hello" type="SNS" redirect="" />
          <Card domain="hello" type="SNS" redirect="" />
          <Card domain="hello" type="SNS" redirect="" />
          <Card domain="hello" type="SNS" redirect="" />
        </Flex>
      </VStack>
    </>
  );
};

export default Create;
