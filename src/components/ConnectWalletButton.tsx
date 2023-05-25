/* eslint-disable @next/next/no-img-element */
// Components
import React from 'react';
import {
  useWallet,
  type Wallet as SolanaWallet,
} from '@solana/wallet-adapter-react';

// Layouts
import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Flex,
  Text,
  Button,
  Box,
  useToast,
} from '@chakra-ui/react';

// Icons
import { ChevronDownIcon } from '@chakra-ui/icons';

// Util
import { truncatedPublicKey } from '~/util/helper';


const ConnectWalletButton = () => {
  // eslint-disable-next-line @typescript-eslint/unbound-method
  const { wallets, select, connected, publicKey, wallet, connect } = useWallet();
  const toast = useToast()

  const copyPublicKey = () => {
    void navigator.clipboard.writeText(publicKey?.toBase58() || '');
    toast({ status: "success", title: 'Copied Address' })
  };

  const onConnectWallet = async (wallet: SolanaWallet) => {
    console.log(wallet)
    try {
      console.log('Connection event', wallet.readyState);
      select(wallet.adapter.name);
      await connect();
    } catch (e) {
      console.log("Wallet Error: ", e);
    }
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        w="15rem"
        borderRadius="0.5rem"
        h="2.5rem"
        variant="filled"
        color="white"
        bg="linear-gradient(93.65deg, #2546BB 3.63%, #2E22B9 98.31%)"
        rightIcon={
          connected && wallet ? (
            <Box h="1.5rem" w="1.5rem" mr="1rem">
              <img
                src={wallet.adapter.icon}
                alt={`${wallet.adapter.name} Icon`}
              />
            </Box>
          ) : <ChevronDownIcon color="white" w="2rem" h="2rem" />
        }
      >
        {!connected && <Text fontSize="1.3rem" mt="2px">Connect Wallet</Text>}
        {connected && wallet !== null && (
          <Text fontSize="1.3rem">
            {truncatedPublicKey(publicKey?.toString() || "", 4)}
          </Text>
        )}
      </MenuButton>

      {connected && (
        <MenuList
          w="15rem"
          p="0.5rem"
          bg="linear-gradient(243.86deg, rgba(38, 42, 55, 0.5) 0%, rgba(36, 55, 78, 0) 100.97%)"
          borderRadius="1rem"
          borderColor="gray.200"
          border="1px solid"
        >
          <MenuItem
            style={{ backdropFilter: "blur(10px)" }}
            h="4rem"
            _hover={{ background: "linear-gradient(243.86deg, rgba(38, 42, 55, 0.8) 10%,rgba(38, 42, 55, 0.4) 100%)" }}
            bg="linear-gradient(243.86deg, rgba(38, 42, 55, 0.5) 0%, rgba(36, 55, 78, 0) 100.97%)"
            onClick={copyPublicKey}>
            <Text fontSize="1.3rem"
              ml={2}
              fontWeight={600}
              color="gray.500">Copy Address</Text>
          </MenuItem>
          <MenuItem
            style={{ backdropFilter: "blur(10px)" }}
            h="4rem"
            _hover={{ background: "linear-gradient(243.86deg, rgba(38, 42, 55, 0.8) 10%,rgba(38, 42, 55, 0.4) 100%)" }}
            bg="linear-gradient(243.86deg, rgba(38, 42, 55, 0.5) 0%, rgba(36, 55, 78, 0) 100.97%)"
            // eslint-disable-next-line @typescript-eslint/no-misused-promises
            onClick={async () => {
              if (wallet == null) {
                return;
              }
              await wallet.adapter.disconnect();
            }}
          >
            <Text fontSize="1.3rem"
              ml={2}
              fontWeight={600}
              color="gray.500">
              Disconnect
            </Text>
          </MenuItem>
        </MenuList>
      )}


      {!connected && wallets && (
        <MenuList
          w="15rem"
          p="0.5rem"
          bg="linear-gradient(243.86deg, rgba(38, 42, 55, 0.5) 0%, rgba(36, 55, 78, 0) 100.97%)"
          boxShadow="0px 0px 10px #00000070"
          borderRadius="1rem"
          borderColor="gray.200"
          border="1px solid"
        >
          {wallets.map((wallet: SolanaWallet) => {
            return (
              <MenuItem
                key={wallet.adapter.name}
                style={{ backdropFilter: "blur(10px)" }}
                h="4rem"
                _hover={{ background: "linear-gradient(243.86deg, rgba(38, 42, 55, 0.8) 10%,rgba(38, 42, 55, 0.4) 100%)" }}
                bg="linear-gradient(243.86deg, rgba(38, 42, 55, 0.5) 0%, rgba(36, 55, 78, 0) 100.97%)"
                // eslint-disable-next-line @typescript-eslint/no-misused-promises
                onClick={async () => {
                  try {
                    await onConnectWallet(wallet)
                  } catch (e: unknown) {
                    console.log(e)
                  }
                }}
              >
                <Flex gap="1rem">
                  <Box w="2rem" h="2rem">
                    <img
                      width={100}
                      loading="lazy"
                      src={
                        wallet.adapter.icon
                      }
                      alt={`${wallet.adapter.name} Icon`}
                    />
                  </Box>
                  <Text
                    fontSize="1.3rem"
                    ml={2}
                    fontWeight={600}
                    color="gray.500"
                  >
                    {wallet.adapter.name}
                  </Text>
                </Flex>
              </MenuItem>
            );
          })}
        </MenuList>
      )}
    </Menu>
  );
};

export default ConnectWalletButton