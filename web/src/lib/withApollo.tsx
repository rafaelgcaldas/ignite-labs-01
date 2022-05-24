import { NextPage } from "next";

import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache } from "@apollo/client";


export const withApollo = (Component: NextPage) => {
 return function Provider(props: any) {
   return (
    <ApolloProvider client={getApolloClient()}>
      <Component {...props} />
    </ApolloProvider>
   )
 }
}

function getApolloClient() {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3333/graphql',
    fetch
  })
  
  const cache = new InMemoryCache();
  
  return new ApolloClient({
    link: from([httpLink]),
    cache
  })
}
