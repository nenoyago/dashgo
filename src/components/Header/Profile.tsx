import { Flex, Box, Text, Avatar } from '@chakra-ui/react';

interface ProfileProps {
  showProfileData: boolean;
}

export function Profile({ showProfileData = true }: ProfileProps) {
  return (
    <Flex align="center">
      {showProfileData &&
        <Box mr="4" textAlign="right">
          <Text>Yago Neno</Text>
          <Text color="gray.300" fontSize="small">
            developer.neno@gmail.com
        </Text>
        </Box>}
      <Avatar size="md" name="Yago Neno" src="https://github.com/nenoyago.png" />
    </Flex>
  );
}