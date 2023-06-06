import { Button, Flex, Text } from "@chakra-ui/react"

export const Navbar = () => {

  return (
    <Flex
      align="center"
      p="0 3rem"
      borderBottom="1px solid"
      borderColor="#B9B8FF"
      height="55px"
      w="100vw"
      justify="space-between"
      boxShadow="0px 4px 39px rgba(0, 0, 0, 0.1)"
    >
      <Text
        fontWeight={700}
        fontSize="21px"
        color="#7C89FF">
        SOL RESOLVER
      </Text>

      <Button
        color="#AEADE1"
        borderColor="#AEADE1"
        border="2px solid"
        background="none"
        borderRadius="20px"
        w="150px"
      >ENTER APP</Button>
    </Flex>
  )
}