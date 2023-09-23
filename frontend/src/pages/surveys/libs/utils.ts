import { LAST_INDEX } from '#libs/constants/index.constant.js';

const hasOther = (category: string[]): boolean => {
  return category.includes('Other');
};

const getOtherDefault = (categories: string[]): string => {
  return hasOther(categories) && categories.at(LAST_INDEX) !== 'Other'
    ? (categories.at(LAST_INDEX) as string)
    : '';
};

const getOthersCategories = (
  categories: string[],
  payload: string[],
): string[] => {
  return payload.filter((category) => {
    return !categories.includes(category);
  });
};

export { getOtherDefault, getOthersCategories, hasOther };
