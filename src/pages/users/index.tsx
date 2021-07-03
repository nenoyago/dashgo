import Head from 'next/head';
import Link from 'next/link';

import { useState } from 'react';
import { useUsers } from '../../services/hooks/useUsers';

import {
  Box,
  Flex,
  Heading,
  Button,
  Icon,
  Table, Thead, Tr, Th, Tbody, Td,
  Checkbox,
  Text,
  Spinner,
  Link as ChakraLink,
  Stack,
  Skeleton,
  useBreakpointValue
} from '@chakra-ui/react';

import { RiAddLine, RiPencilLine } from 'react-icons/ri';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Pagination } from '../../components/Pagination';

import { queryClient } from '../../services/queryClient';
import { api } from '../../services/api';

export default function UserList() {
  const [page, setPage] = useState(1);
  const { data, isLoading, isFetching, error } = useUsers(page);

  const isWideVersion = useBreakpointValue({
    base: false,
    lg: true
  });

  async function handlePrefetchUser(userId: string) {
    await queryClient.prefetchQuery(['user', userId], async () => {
      const response = await api.get(`/users/${userId}`);

      return response.data;
    }, {
      staleTime: 1000 * 60 * 10 // 10 minutes
    });
  }

  return (
    <>
      <Head>
        <title>dashgo | Usuários</title>
      </Head>

      <Box>
        <Header />

        <Flex width="100%" maxWidth={1480} my="6" mx="auto" px="6">
          <Sidebar />

          <Box flex="1" borderRadius={8} bg="gray.800" p="8">
            <Flex mb="8" justify="space-between" align="center">
              <Heading size="lg" fontWeight="normal" color="gray.300">
                Usuários
                {!isLoading && isFetching && <Spinner size="sm" color="gray.500" ml="4" />}
              </Heading>
              <Link href="/users/create" passHref>
                <Button
                  as="a"
                  size="sm"
                  fontSize="sm"
                  colorScheme="pink"
                  cursor="pointer"
                  leftIcon={<Icon as={RiAddLine} fontSize="20" />}
                >
                  Criar novo
            </Button>
              </Link>

            </Flex>

            {isLoading ? (
              <Stack>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(() => (
                  <Skeleton startColor="gray.400" endColor="gray.600" height="16" />
                ))}
              </Stack>
            ) : error ? (
              <Flex justify="center">
                <Text>Falha ao obter dados dos usuários.</Text>
              </Flex>
            ) : (
              <>
                <Table colorScheme="whiteAlpha">
                  <Thead>
                    <Tr>
                      <Th px={["4", "4", "6"]}>
                        <Checkbox colorScheme="pink" />
                      </Th>
                      <Th>Usuário</Th>
                      {isWideVersion &&
                        <>
                          <Th>Data de cadastro</Th>
                          <Th width="8">#</Th>
                        </>}
                    </Tr>
                  </Thead>
                  <Tbody>
                    {data.users.map(user => (
                      <Tr key={user.id}>
                        <Td px={["4", "4", "6"]}>
                          <Checkbox colorScheme="pink" />
                        </Td>
                        <Td>
                          <Box>
                            <ChakraLink color="purple.400" onMouseEnter={() => handlePrefetchUser(user.id)}>
                              <Text fontWeight="bold">{user.name}</Text>
                            </ChakraLink>
                            <Text fontSize="sm" color="gray.300">{user.email}</Text>
                          </Box>
                        </Td>
                        {isWideVersion && <Td>{user.createdAt}</Td>}
                        <Td>
                          {isWideVersion &&
                            <Button
                              as="a"
                              size="sm"
                              fontSize="sm"
                              colorScheme="purple"
                              cursor="pointer"
                              leftIcon={<Icon as={RiPencilLine} fontSize="16" />}
                            >
                              Editar
                          </Button>}
                        </Td>
                      </Tr>
                    ))}
                  </Tbody>
                </Table>

                <Pagination
                  totalCountOfRegisters={data.totalCount}
                  currentPage={page}
                  onPageChange={setPage}
                />
              </>
            )}
          </Box >
        </Flex >
      </Box >
    </>
  );
}