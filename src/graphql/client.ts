import { ApolloClient, InMemoryCache } from "@apollo/client";

export const client = new ApolloClient({
  uri: "https://api.github.com/graphql",
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_GITHUB_KEY}`,
  },
  cache: new InMemoryCache(),
});
