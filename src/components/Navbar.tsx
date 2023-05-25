import { Box, Flex } from "@chakra-ui/react"
import ConnectWalletButton from "./ConnectWalletButton"

export const Navbar = () => {
  return (
    <Flex
      w="100vw"
      border="2px solid"
      borderColor="#262640"
      h="4rem"
      align="center"
      justify="space-between"
      bg="#101115"
      p="0 2rem"
      >
      <Box></Box>
      <ConnectWalletButton />
    </Flex>
  )

}