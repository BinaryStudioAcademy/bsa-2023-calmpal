type StepsConfiguration = ReadonlyMap<
  string,
  {
    stepCategories: string[];
    question: string;
    type: string;
    next?: boolean;
    previous?: boolean;
    submit?: boolean;
  }
>;

export { type StepsConfiguration };
