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
        <Td>{index + 1}.</Td>

        <Td>
          <Text>{domain}</Text>
        </Td>
        <Td>
          {redirect ? (
            <Text>
              {redirect !== '' && redirect?.length! < 35
                ? redirect
                : redirect?.substring(0, 30) + '...'}
            </Text>
          ) : (
            <Text>{'No redirect yet'}</Text>
          )}
        </Td>
        <Td>
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
        </Td>

        <Td>
          {!redirect ? (
            <Button
              _hover={{
                bg: '#05386B',
                color: '#FFFFFF',
              }}
              bg="#05386B"
              color="#FFFFFF"
              onClick={onOpen}
            >
              Set redirect
            </Button>
          ) : (
            <Button
              _hover={{
                bg: '#05386B',
                color: '#FFFFFF',
              }}
              bg="#05386B"
              color="#FFFFFF"
              onClick={editOnOpen}
            >
              Edit
            </Button>
          )}
        </Td>
      </Tr>

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
                bg={'#05386B'}
                color={'white'}
                _hover={{
                  bg: '#05386B',
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
                bg={'#05386B'}
                color={'white'}
                _hover={{
                  bg: '#05386B',
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
