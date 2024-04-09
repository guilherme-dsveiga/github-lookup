import { Provider } from "react-redux";
import store from "./store/index.tsx";
import { ApolloProvider } from "@apollo/client";
import { client } from "./graphql/client.ts";
import { router } from "./routes/index.tsx";
import { RouterProvider } from "react-router-dom";

function App() {
  return (
    <ApolloProvider client={client}>
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ApolloProvider>
  );
}

export default App;
