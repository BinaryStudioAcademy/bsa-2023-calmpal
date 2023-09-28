type HandleFieldChangeType = {
  category: string;
  currentCategories: string[];
  stateValue: string[];
  defaultCategories: string[];
  isOther?: boolean;
  categoryChange: (value: string[]) => void;
  stateChange: (value: string[]) => void;
};

export { type HandleFieldChangeType };
