import { NextPage } from "next";

import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache, NormalizedCacheObject } from "@apollo/client";


export const withApollo = (Component: NextPage) => {
 return function Provider(props: any) {
   return (
    <ApolloProvider client={getApolloClient(props.apolloState)}>
      <Component {...props} />
    </ApolloProvider>
   )
 }
}

function getApolloClient(ssrCache?: NormalizedCacheObject) {
  const httpLink = createHttpLink({
    uri: 'http://localhost:3333/graphql',
    fetch
  })
  
  const cache = new InMemoryCache().restore(ssrCache ?? {});
  
  return new ApolloClient({
    link: from([httpLink]),
    cache
  })
}
