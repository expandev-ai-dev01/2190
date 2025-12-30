import { useMutation } from '@tanstack/react-query';
import { userService } from '../services/userService';
import type { RegisterFormOutput } from '../types/forms';

export const useRegister = () => {
  const {
    mutateAsync: register,
    isPending: isRegistering,
    error,
  } = useMutation({
    mutationFn: (data: RegisterFormOutput) => userService.register(data),
  });

  return {
    register,
    isRegistering,
    error,
  };
};
