import { useRouter } from 'next/router';
import Head from 'next/head';

import { SubmitHandler, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import * as yup from 'yup';

import {
  Flex,
  Button,
  Stack,
} from '@chakra-ui/react';

import { Input } from '../components/Form/Input';

type SignInFormData = {
  email: string;
  password: string;
}

const signInFormSchema = yup.object().shape({
  email: yup.string().required('E-mail obrigatório').email('E-mail inválido'),
  password: yup.string().required('Senha obrigatória')
});

export default function SignIn() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting, errors }
  } = useForm({
    resolver: yupResolver(signInFormSchema)
  });

  const router = useRouter();

  const handleSignIn: SubmitHandler<SignInFormData> = async (values) => {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    router.push('dashboard');
  }

  return (
    <>
      <Head>
        <title>dashgo | SignIn</title>
      </Head>

      <Flex
        width="100vw"
        height="100vh"
        align="center"
        justify="center"
      >
        <Flex
          as="form"
          width="100%"
          maxWidth={360}
          bg="gray.800"
          p="8"
          borderRadius="8"
          flexDir="column"
          onSubmit={handleSubmit(handleSignIn)}
        >
          <Stack spacing="4">
            <Input
              name="email"
              type="email"
              label="E-mail"
              error={errors.email}
              {...register('email')}
            />
            <Input
              name="password"
              type="password"
              label="Senha"
              error={errors.password}
              {...register('password')}
            />
          </Stack>

          <Button
            type="submit"
            mt="6"
            size="lg"
            colorScheme="pink"
            isLoading={isSubmitting}
          >
            Entrar
          </Button>
        </Flex>
      </Flex>
    </>
  );
}
