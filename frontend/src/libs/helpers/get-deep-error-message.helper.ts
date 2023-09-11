import {
  type FormFieldErrors,
  type FormFieldValues,
  type FormPath,
} from '#libs/types/types.js';

const getDeepErrorMessage = <T extends FormFieldValues>(
  errors: FormFieldErrors<T>[FormPath<T>],
): string | null => {
  if (!errors) {
    return null;
  }

  if (errors.message) {
    return errors.message as string;
  }

  const message = Object.values(errors)
    .map((property: { message?: string }) => {
      return property.message;
    })
    .find(Boolean);

  return message ?? null;
};

export { getDeepErrorMessage };
