import { Flex, IconButton, Icon, useBreakpointValue } from '@chakra-ui/react';

import { Logo } from './Logo';
import { SearchBox } from './SearchBox';
import { NotificationsNav } from './NotificationsNav';
import { Profile } from './Profile';

import { useSidebarDrawer } from '../../contexts/SidebarDrawerContext';
import { RiMenuLine } from 'react-icons/ri';

export function Header() {
  const { onOpen } = useSidebarDrawer();

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  return (
    <Flex
      as="header"
      width="100%"
      maxWidth={1480}
      height="20"
      mx="auto"
      mt="4"
      px="6"
      align="center"
    >

      {!isWideVersion && (
        <IconButton
          aria-label="Open navigation"
          icon={<Icon as={RiMenuLine} />}
          fontSize="24"
          variant="unstyled"
          onClick={onOpen}
          mr="2"
        />
      )}

      <Logo />

      {isWideVersion && <SearchBox />}

      <Flex
        ml="auto"
        align="center"
      >
        <NotificationsNav />
        <Profile showProfileData={isWideVersion} />
      </Flex>
    </Flex>
  );
}