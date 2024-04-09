export type Edge<T> = {
  node: T;
};

export type PageInfo = {
  endCursor: string;
  hasNextPage: boolean;
};
