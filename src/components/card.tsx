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
} from '@chakra-ui/react';
import { useWallet } from '@solana/wallet-adapter-react';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import { getURL } from '~/util/helper';
import { api } from '~/utils/api';

interface Props {
  type: 'ABC' | 'SNS';
  domain: string;
  redirect?: string;
  id?: string;
}

const Card = ({ domain, type, redirect, id }: Props) => {
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
          {redirect ? (
            <Text color="#83869C" fontSize="lg" fontWeight={700}>
              {redirect !== '' && redirect?.length! < 35
                ? redirect
                : redirect?.substring(0, 30) + '...'}
            </Text>
          ) : (
            <Text color="#83869C" fontSize="lg" fontWeight={700}>
              {'No redirect yet'}
            </Text>
          )}
          <Box pt={7}>
            {redirect ? (
              <>
                <HStack gap={8}>
                  <Button
                    _hover={{
                      bg: '#7367FE',
                      color: '#FFFFFF',
                    }}
                    bg="#7367FE"
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
                  <Button
                    _hover={{
                      bg: '#7367FE',
                      color: '#FFFFFF',
                    }}
                    bg="#7367FE"
                    color="#FFFFFF"
                    onClick={editOnOpen}
                  >
                    Edit
                  </Button>
                </HStack>
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
                  onClick={onOpen}
                >
                  Set redirect
                </Button>
              </>
            )}
          </Box>
        </VStack>
      </Box>
      {isOpen && (
        <Modal isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Add Redirect for {domain}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                onChange={(e) => {
                  setRedirectUrl(e.target.value);
                }}
                placeholder="Redirect URL"
              />
            </ModalBody>

            <ModalFooter>
              <Button
                mr={3}
                bg={'#7367FE'}
                color={'white'}
                _hover={{
                  bg: '#7367FE',
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
                Add
              </Button>
              <Button variant="ghost" onClick={onClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
      {editIsOpen && (
        <Modal isOpen={editIsOpen} onClose={editOnClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Edit Redirect for {domain}</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Input
                onChange={(e) => {
                  setRedirectUrl(e.target.value);
                }}
                placeholder="Redirect URL"
              />
            </ModalBody>

            <ModalFooter>
              <Button
                mr={3}
                bg={'#7367FE'}
                color={'white'}
                _hover={{
                  bg: '#7367FE',
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
                Update
              </Button>
              <Button variant="ghost" onClick={editOnClose}>
                Close
              </Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default Card;
