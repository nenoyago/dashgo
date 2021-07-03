import { Flex, Text, Divider, Box, IconButton, Icon, useBreakpointValue, Link } from '@chakra-ui/react';

import { RiGithubFill } from 'react-icons/ri';

export function Footer() {
  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <Box m="auto" width="100%" maxWidth={1480} p="6" mb="0">
      <Divider my="4" borderColor="gray.700" />
      <Flex direction="row" justify="space-between" align="center">
        <Box>
          <Text fontSize="sm" color="gray.200">Yago Neno &copy; {new Date().getFullYear()}</Text>
          <Text fontSize="sm" color="gray.300">developer.neno@gmail.com</Text>
        </Box>

        <Box>
          <Text fontSize={["sm", "lg"]} color="gray.50">dashgo<Text as="span" color="pink.500">.</Text></Text>
        </Box>

        {isWideVersion &&
          <Box>
            <Link href="https://github.com/nenoyago" target="_blank">
              <IconButton
                colorScheme="blackAlpha"
                aria-label="Github"
                fontSize="20"
                icon={<Icon as={RiGithubFill} />}
              />
            </Link>
          </Box>}
      </Flex>
    </Box >
  );
}