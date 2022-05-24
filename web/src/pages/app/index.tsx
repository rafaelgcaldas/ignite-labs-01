import { getAccessToken, useUser, withPageAuthRequired } from "@auth0/nextjs-auth0"
import { GetServerSideProps } from "next";

import { gql, useQuery } from "@apollo/client";
import { withApollo } from "../../lib/withApollo";


const PRODUCTS_QUERY = gql`
  
`

function Home() {
  const { user } = useUser();
  const { data, loading, error } = useQuery(PRODUCTS_QUERY);
  
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
  getServerSideProps: async ({ req, res }) => {
    console.log(getAccessToken(req, res));

    return {
      props: {}
    }
  }
});

export default withApollo(Home);