import Head from 'next/head';
import Link from 'next/link';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/router';

import * as yup from 'yup';

import {
  Box,
  Flex,
  Heading,
  Divider,
  VStack,
  SimpleGrid,
  HStack,
  Button
} from '@chakra-ui/react';

import { Header } from '../../components/Header';
import { Sidebar } from '../../components/Sidebar';
import { Input } from '../../components/Form/Input';
import { useCreateUser } from '../../services/hooks/useCreateUser';


type CreateUserFormData = {
  email: string;
  password: string;
}

const createUserFormSchema = yup.object().shape({
  name: yup.string().required('Nome obrigatório'),
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória').min(6, 'No minimo 6 caracteres'),
  password_confirmation: yup.string().oneOf([
    null,
    yup.ref('password')
  ], 'As senhas precisam ser iguais')
});

export default function CreateUser() {
  const router = useRouter();
  const createUser = useCreateUser();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: yupResolver(createUserFormSchema)
  });

  const handleCreateUser: SubmitHandler<CreateUserFormData> = async (values) => {
    await createUser.mutateAsync(values);

    router.push('/users');
  }

  return (
    <>
      <Head>
        <title>dashgo | Criar usuário</title>
      </Head>

      <Box>
        <Header />

        <Flex width="100%" maxWidth={1480} my="6" mx="auto" px="6">
          <Sidebar />

          <Box
            as="form"
            flex="1"
            borderRadius={8}
            bg="gray.800"
            p={["6", "8"]}
            onSubmit={handleSubmit(handleCreateUser)}
          >
            <Heading size="lg" fontWeight="normal" color="gray.300">Criar usuário</Heading>

            <Divider my="6" borderColor="gray.700" />

            <VStack spacing="8">
              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
                <Input name="name" label="Nome completo" error={errors.name} {...register('name')} />
                <Input name="email" type="email" label="E-mail" error={errors.email} {...register('email')} />
              </SimpleGrid>

              <SimpleGrid minChildWidth="240px" spacing={["6", "8"]} width="100%">
                <Input
                  name="password"
                  type="password"
                  label="Senha"
                  error={errors.password}
                  {...register('password')}
                />
                <Input
                  name="password_confirmation"
                  type="password"
                  label="Confirmação da senha"
                  error={errors.password_confirmation}
                  {...register('password_confirmation')}
                />
              </SimpleGrid>
            </VStack>

            <Flex mt="8" justify="flex-end">
              <HStack spacing="4">
                <Link href="/users" passHref>
                  <Button colorScheme="whiteAlpha">Cancelar</Button>
                </Link>
                <Button
                  colorScheme="pink" type="submit" isLoading={createUser.isLoading}>Salvar</Button>
              </HStack>
            </Flex>
          </Box>
        </Flex>
      </Box>
    </>
  );
}