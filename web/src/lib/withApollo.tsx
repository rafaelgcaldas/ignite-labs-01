import { GetServerSidePropsContext, NextPage } from "next";

import { ApolloClient, ApolloProvider, createHttpLink, from, InMemoryCache, NormalizedCacheObject } from "@apollo/client";


export type ApolloClientContext = GetServerSidePropsContext;

export const withApollo = (Component: NextPage) => {
 return function Provider(props: any) {
   return (
    <ApolloProvider client={getApolloClient(props.apolloState)}>
      <Component {...props} />
    </ApolloProvider>
   )
 }
}

export function getApolloClient(ssrCache?: NormalizedCacheObject) {
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
