import { getAccessToken, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import { GetServerSideProps } from "next";

import { withApollo } from "../../lib/withApollo";
import { useGetProductsQuery } from "../../graphql/generated/graphql";
import { getServerPageGetProducts, ssrGetProducts } from "../../graphql/generated/page";



function Home({ data }) {
  const { user } = useUser();
  // const { data, loading, error } = useGetProductsQuery();
  
  return (
    <div>
      <h1>Ok</h1>

      <pre>
        {JSON.stringify(data, null ,2)}
      </pre>

      <pre>
        {JSON.stringify(user, null ,2)}
      </pre>

    </div>
  )
}

export const getServerSideProps: GetServerSideProps = withPageAuthRequired({
  getServerSideProps: async (ctx) => {
    return getServerPageGetProducts({}, ctx);
  }
});

export default withApollo(
  ssrGetProducts.withPage()(Home)
);