import { joiResolver } from '@hookform/resolvers/joi';
import {
  type Control,
  type DefaultValues,
  type FieldErrors,
  type FieldValues,
  useForm,
  type UseFormHandleSubmit,
  type UseFormProps,
  type UseFormReset,
  type UseFormSetValue,
  type UseFormWatch,
  type ValidationMode,
} from 'react-hook-form';

import { type ValidationSchema } from '#libs/types/types';

type Parameters<T extends FieldValues = FieldValues> = {
  defaultValues: DefaultValues<T>;
  validationSchema?: ValidationSchema;
  mode?: keyof ValidationMode;
};

type ReturnValue<T extends FieldValues = FieldValues> = {
  watch: UseFormWatch<T>;
  control: Control<T, null>;
  errors: FieldErrors<T>;
  isValid: boolean;
  handleSubmit: UseFormHandleSubmit<T>;
  setValue: UseFormSetValue<T>;
  isDirty: boolean;
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
    watch,
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid, isDirty },
  } = useForm<T>(parameters);

  return {
    watch,
    control,
    errors,
    isValid,
    isDirty,
    handleSubmit,
    setValue,
    reset,
  };
};

export { useAppForm };
