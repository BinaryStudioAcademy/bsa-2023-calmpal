import { joiResolver } from '@hookform/resolvers/joi';
import {
  type Control,
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  useForm,
  type UseFormHandleSubmit,
  type UseFormProps,
  type UseFormRegister,
  type ValidationMode,
} from 'react-hook-form';

import { type ValidationSchema } from '#libs/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DefaultValues<T>;
  validationSchema?: ValidationSchema;
  mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  getValues: () => T;
  reset: () => void;
  register: UseFormRegister<T>;
};

const useAppForm = <T extends FieldValues = FieldValues>({
  defaultValues,
  mode = 'onSubmit',
  validationSchema,
}: Parameters<T>): ReturnValue<T> => {
  let parameters: UseFormProps<T> = {
    mode,
    defaultValues,
  };

  if (validationSchema) {
    parameters = {
      ...parameters,
      resolver: joiResolver(validationSchema),
    };
  }

  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
    reset,
    register,
  } = useForm<T>(parameters);

  return {
    register,
    control,
    errors,
    handleSubmit,
    getValues,
    reset,
  };
};

export { useAppForm };
