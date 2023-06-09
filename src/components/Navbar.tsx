import { Button, Flex, Text } from "@chakra-ui/react"

export const Navbar = () => {

  return (
    <Flex
      align="center"
      p="0 3rem"
      borderBottom="1px solid"
      borderColor="#353462"
      height="55px"
      w="100vw"
      justify="space-between"
      boxShadow="0px 4px 39px rgba(0, 0, 0, 0.1)"
    >
      <Text
        fontWeight={700}
        fontSize="21px"
        color="#605EB2">
        SOL RESOLVER
      </Text>

      <Button
        color="#605EB2"
        borderColor="#353462"
        border="2px solid"
        background="none"
        borderRadius="20px"
        _hover={{background:"transparent"}}
        w="150px"
      >ENTER APP</Button>
    </Flex>
  )
}