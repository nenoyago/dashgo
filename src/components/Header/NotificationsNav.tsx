
import { HStack, IconButton, Icon } from '@chakra-ui/react';

import { RiNotificationLine, RiUserAddLine } from 'react-icons/ri';

import { ActiveLink } from '../ActiveLink';

export function NotificationsNav() {
  return (
    <HStack
      spacing={["2", "4"]}
      mx={["6", "8"]}
      pr={["6", "8"]}
      py="1"
      color="gray.300"
      borderRightWidth={1}
      borderColor="gray.700"
    >

      <ActiveLink color="gray.300" href="/notifications" passHref>
        <IconButton
          aria-label="Open notification"
          icon={<Icon as={RiNotificationLine} />}
          fontSize="20"
          variant="unstyled"
          onClick={() => { }}
          _hover={{
            color: 'pink.400'
          }}
        />
      </ActiveLink>

      <ActiveLink color="gray.300" href="/users/create" passHref>
        <IconButton
          aria-label="Create user"
          icon={<Icon as={RiUserAddLine} />}
          fontSize="20"
          variant="unstyled"
          onClick={() => { }}
          _hover={{
            color: 'pink.400'
          }}
        />
      </ActiveLink>

    </HStack>
  );
}