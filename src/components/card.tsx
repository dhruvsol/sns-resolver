import { EditIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  HStack,
  Text,
  VStack,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Input,
  useToast,
  useClipboard,
  Tr,
  Td,
  Link,
  Flex,
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import Image from 'next/image';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getURL } from '~/util/helper';
import { api } from '~/utils/api';
import SNSIcon from '~/imgs/sns.svg';
import { BiCopy } from 'react-icons/bi';
interface Props {
  type: 'ABC' | 'SNS';
  domain: string;
  redirect?: string;
  id?: string;
  index: number;
}

const Card = ({ domain, type, redirect, id, index }: Props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { publicKey } = useWallet();
  const toast = useToast();
  const utils = api.useContext();
  const addRedirectMutation = api.user.create.useMutation({
    onSuccess: () => {
      onClose();

      utils.user.getAll.invalidate();
    },
  });
  const updateRedirectMutation = api.user.update.useMutation({
    onSuccess: () => {
      editOnClose();
      utils.user.getAll.invalidate();
    },
  });
  const router = useRouter();
  const { onCopy } = useClipboard(getURL() + domain);

  const [redirectUrl, setRedirectUrl] = useState<string>('');
  const {
    isOpen: editIsOpen,
    onClose: editOnClose,
    onOpen: editOnOpen,
  } = useDisclosure();
  return (
    <>
      <Tr>
        <Td>
          <Text color={'white'}>{domain}</Text>
        </Td>
        <Td>
          <Flex align={'center'} gap={3}>
            <Image src={SNSIcon} alt={'logo sns'} width={30} />

            <Text color={'white'}>SNS Bonfida</Text>
          </Flex>
        </Td>
        <Td>
          {redirect ? (
            <>
              <Flex align={'center'} gap={2}>
                <Text color={'white'}>
                  {redirect !== '' && redirect?.length! < 35
                    ? redirect
                    : redirect?.substring(0, 30) + '...'}
                </Text>
                <Button
                  onClick={() => {
                    onCopy();
                    toast({
                      title: 'Copied.',
                      description: 'Link copied to clipboard',
                      status: 'success',
                      duration: 3000,
                      isClosable: true,
                    });
                  }}
                  color={'white'}
                  variant={'unstyled'}
                >
                  <BiCopy />
                </Button>
              </Flex>
            </>
          ) : (
            <Text>{'No redirect yet'}</Text>
          )}
        </Td>
        {/* <Td>
          <Button
            _hover={{
              bg: '#05386B',
              color: '#FFFFFF',
            }}
            bg="#05386B"
            color="#FFFFFF"
            onClick={() => {
              onCopy();
              toast({
                title: 'Copied.',
                description: 'Link copied to clipboard',
                status: 'success',
                duration: 3000,
                isClosable: true,
              });
            }}
          >
            Copy
          </Button>
        </Td> */}

        <Td>
          {!redirect ? (
            <Text color={'white'}>--</Text>
          ) : (
            <>
              <EditIcon
                onClick={() => {
                  setRedirectUrl(redirect as string);
                  editOnOpen();
                }}
                color={'#ABA3FF'}
                cursor="pointer"
              />
            </>
          )}
        </Td>
      </Tr>

      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent
            h={'max-content'}
            bg={'#141417'}
            boxShadow={'0px 4px 96px 0px rgba(0, 0, 0, 0.24)'}
            backdropFilter={'blur(20px)'}
            border={'1px solid rgba(105, 92, 255, 0.08)'}
          >
            <ModalHeader color={'white'}>Add Redirect link</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HStack justify={'start'} gap={7} mb={7}>
                <VStack gap={'0px'} spacing={'0'} align={'start'}>
                  <Text
                    fontSize={'xs'}
                    color={'#78787F'}
                    textTransform={'uppercase'}
                  >
                    Domain Name
                  </Text>
                  <Text p={0} fontSize={'md'} color={'white'}>
                    {domain}
                  </Text>
                </VStack>
                <VStack gap={'0px'} spacing={'0'} align={'start'}>
                  <Text
                    fontSize={'xs'}
                    color={'#78787F'}
                    textTransform={'uppercase'}
                  >
                    Provider
                  </Text>
                  <Text p={0} fontSize={'md'} color={'white'}>
                    SNS
                  </Text>
                </VStack>
              </HStack>
              <VStack gap={1} align={'start'}>
                <Text
                  textTransform={'uppercase'}
                  color={'#78787F'}
                  fontSize={'sm'}
                >
                  destination link
                </Text>
                <Input
                  border={'1px solid #78787F'}
                  onChange={(e) => {
                    setRedirectUrl(e.target.value);
                  }}
                  placeholder="Redirect URL"
                />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                color={'#78787F'}
                _hover={{
                  bg: 'transparent',
                  color: '#78787F',
                }}
                variant="ghost"
                onClick={onClose}
              >
                Close
              </Button>
              <Button
                mr={3}
                bg={'#695CFF'}
                color={'white'}
                _hover={{
                  bg: '#695CFF',
                  color: '#FFFFFF',
                }}
                isLoading={addRedirectMutation.isLoading}
                onClick={() => {
                  addRedirectMutation.mutate({
                    domain: domain,
                    publickey: publicKey?.toBase58() as string,
                    redirect: redirectUrl,
                  });
                }}
              >
                Add Link
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {editIsOpen && (
        <Modal isOpen={editIsOpen} onClose={editOnClose}>
          <ModalOverlay />
          <ModalContent
            h={'max-content'}
            bg={'#141417'}
            boxShadow={'0px 4px 96px 0px rgba(0, 0, 0, 0.24)'}
            backdropFilter={'blur(20px)'}
            border={'1px solid rgba(105, 92, 255, 0.08)'}
          >
            <ModalHeader color={'white'}>Edit Redirect</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <HStack justify={'start'} gap={7} mb={7}>
                <VStack gap={'0px'} spacing={'0'} align={'start'}>
                  <Text
                    fontSize={'xs'}
                    color={'#78787F'}
                    textTransform={'uppercase'}
                  >
                    Domain Name
                  </Text>
                  <Text p={0} fontSize={'md'} color={'white'}>
                    {domain}
                  </Text>
                </VStack>
                <VStack gap={'0px'} spacing={'0'} align={'start'}>
                  <Text
                    fontSize={'xs'}
                    color={'#78787F'}
                    textTransform={'uppercase'}
                  >
                    Provider
                  </Text>
                  <Text p={0} fontSize={'md'} color={'white'}>
                    SNS
                  </Text>
                </VStack>
              </HStack>
              <VStack gap={1} align={'start'}>
                <Text
                  textTransform={'uppercase'}
                  color={'#78787F'}
                  fontSize={'sm'}
                >
                  destination link
                </Text>
                <Input
                  border={'1px solid #78787F'}
                  value={redirectUrl}
                  color={'white'}
                  onChange={(e) => {
                    setRedirectUrl(e.target.value);
                  }}
                  placeholder="Redirect URL"
                />
              </VStack>
            </ModalBody>

            <ModalFooter>
              <Button
                color={'#78787F'}
                _hover={{
                  bg: 'transparent',
                  color: '#78787F',
                }}
                variant="ghost"
                onClick={editOnClose}
              >
                Close
              </Button>
              <Button
                mr={3}
                bg={'#695CFF'}
                color={'white'}
                _hover={{
                  bg: '#695CFF',
                  color: '#FFFFFF',
                }}
                isLoading={updateRedirectMutation.isLoading}
                onClick={() => {
                  if (!id) return;
                  updateRedirectMutation.mutate({
                    redirect: redirectUrl,
                    id: id as string,
                  });
                }}
              >
                Update Link
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Card;
