import { joiResolver } from '@hookform/resolvers/joi';
import {
  type Control,
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  type UseFormHandleSubmit,
  type UseFormProps,
  type UseFormReset,
  type ValidationMode,
} from 'react-hook-form';
import { useForm } from 'react-hook-form';

import { type ValidationSchema } from '#libs/types/types';

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DefaultValues<T>;
  validationSchema?: ValidationSchema;
  mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  control: Control<T, null>;
  errors: FieldErrors<T>;
  handleSubmit: UseFormHandleSubmit<T>;
  reset: UseFormReset<T>;
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
    reset,
  } = useForm<T>(parameters);

  return {
    control,
    errors,
    handleSubmit,
    reset,
  };
};

export { useAppForm };
