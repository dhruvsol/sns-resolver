import { Box, Button, HStack, Text, VStack } from '@chakra-ui/react';
import React from 'react';

interface Props {
  type: 'ABC' | 'SNS';
  domain: string;
  redirect?: string;
}

const Card = ({ domain, type, redirect }: Props) => {
  return (
    <>
      <Box border="2px solid #DFE2FF" h="13rem" w="23rem" rounded="2xl">
        <Box
          bg="#7367FE"
          w={'max-content'}
          mx={'0.5px'}
          my={'0.5px'}
          py={1}
          px={3}
          roundedTopLeft={'xl'}
          roundedBottomRight={'xl'}
          color={'#FFFFFF'}
          fontSize={'sm'}
          fontWeight={800}
        >
          {type}
        </Box>
        <VStack>
          <Text color="#5A5975" fontSize="2xl" fontWeight={700}>
            {domain}
          </Text>
          <Text color="#83869C" fontSize="lg" fontWeight={700}>
            {redirect || 'No redirect yet'}
          </Text>
          <Box pt={7}>
            {redirect ? (
              <>
                <Button
                  _hover={{
                    bg: '#7367FE',
                    color: '#FFFFFF',
                  }}
                  bg="#7367FE"
                  color="#FFFFFF"
                >
                  View
                </Button>
              </>
            ) : (
              <>
                <Button
                  _hover={{
                    bg: '#7367FE',
                    color: '#FFFFFF',
                  }}
                  bg="#7367FE"
                  color="#FFFFFF"
                >
                  Set redirect
                </Button>
              </>
            )}
          </Box>
        </VStack>
      </Box>
    </>
  );
};

export default Card;
