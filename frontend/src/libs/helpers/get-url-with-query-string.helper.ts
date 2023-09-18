import { type AppQueryStringKey, type AppRoute } from '#libs/enums/enums.js';
import { type ValueOf } from '#libs/types/types.js';

type QueryParameters = Record<ValueOf<typeof AppQueryStringKey>, string>;

const getUrlWithQueryString = (
  url: ValueOf<typeof AppRoute>,
  parameters: QueryParameters,
): ValueOf<typeof AppRoute> => {
  const queryParameters = new URLSearchParams(parameters);

  return `${url}?${queryParameters.toString()}` as ValueOf<typeof AppRoute>;
};

export { getUrlWithQueryString };
