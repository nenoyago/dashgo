import { api } from "../api";

import { useMutation } from 'react-query';
import { queryClient } from "../queryClient";

type CreateUserFormData = {
  email: string;
  password: string;
}

export async function createUser(user: CreateUserFormData) {
  const response = await api.post('/users', {
    user: {
      ...user,
      created_at: new Date()
    }
  });

  return response.data.user;
}

export function useCreateUser() {
  return useMutation(
    async (user: CreateUserFormData) => createUser(user), {
    onSuccess: () => {
      queryClient.invalidateQueries('users');
    }
  });
}
