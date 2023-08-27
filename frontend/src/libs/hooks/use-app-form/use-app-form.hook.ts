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
  type UseFormWatch,
  type ValidationMode,
} from 'react-hook-form';

import { type ValidationSchema } from '#libs/types/types.js';

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DefaultValues<T>;
  validationSchema?: ValidationSchema;
  mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  register: UseFormRegister<T>;
  watch: UseFormWatch<T>;
  control: Control<T, null>;
  errors: FieldErrors<T>;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<T>;
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
    register,
    watch,
    control,
    handleSubmit,
    formState: { errors, isValid },
  } = useForm<T>(parameters);

  return {
    register,
    watch,
    control,
    errors,
    isValid,
    handleSubmit,
  };
};

export { useAppForm };
