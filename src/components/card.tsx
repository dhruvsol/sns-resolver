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
                <Link isExternal href={redirect}>
                  <svg
                    width="15"
                    height="15"
                    viewBox="0 0 19 18"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.16675 18C1.76675 18 1.41675 17.85 1.11675 17.55C0.816748 17.25 0.666748 16.9 0.666748 16.5V1.5C0.666748 1.1 0.816748 0.75 1.11675 0.45C1.41675 0.15 1.76675 0 2.16675 0H8.39175C8.60425 0 8.78237 0.0722914 8.92612 0.216875C9.06987 0.361475 9.14175 0.540641 9.14175 0.754375C9.14175 0.968125 9.06987 1.14583 8.92612 1.2875C8.78237 1.42917 8.60425 1.5 8.39175 1.5H2.16675V16.5H17.1667V10.275C17.1667 10.0625 17.239 9.88438 17.3836 9.74063C17.5282 9.59688 17.7074 9.525 17.9211 9.525C18.1349 9.525 18.3126 9.59688 18.4542 9.74063C18.5959 9.88438 18.6667 10.0625 18.6667 10.275V16.5C18.6667 16.9 18.5167 17.25 18.2167 17.55C17.9167 17.85 17.5667 18 17.1667 18H2.16675ZM6.695 11.9652C6.5595 11.8217 6.48758 11.65 6.47925 11.45C6.47091 11.25 6.54175 11.075 6.69175 10.925L16.1167 1.5H11.3917C11.1792 1.5 11.0011 1.42771 10.8574 1.28313C10.7136 1.13853 10.6417 0.959359 10.6417 0.745625C10.6417 0.531875 10.7136 0.354167 10.8574 0.2125C11.0011 0.0708333 11.1792 0 11.3917 0H17.9167C18.1292 0 18.3074 0.071875 18.4511 0.215625C18.5949 0.359375 18.6667 0.5375 18.6667 0.75V7.275C18.6667 7.4875 18.5945 7.66563 18.4499 7.80938C18.3053 7.95312 18.1261 8.025 17.9124 8.025C17.6986 8.025 17.5209 7.95312 17.3792 7.80938C17.2376 7.66563 17.1667 7.4875 17.1667 7.275V2.575L7.74175 12C7.60105 12.1333 7.42837 12.2 7.22372 12.2C7.01907 12.2 6.84283 12.1217 6.695 11.9652Z"
                      fill="#ABA3FF"
                    />
                  </svg>
                </Link>
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
