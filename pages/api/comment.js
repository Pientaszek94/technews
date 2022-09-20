import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI="https://api-ap-southeast-2.hygraph.com/v2/cl894rpjx210p01uh531e266n/master"

const graphCMSToken="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjM2MTM5MjAsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aGVhc3QtMi5oeWdyYXBoLmNvbS92Mi9jbDg5NHJwangyMTBwMDF1aDUzMWUyNjZuL21hc3RlciIsIm1hbmFnZW1lbnQtbmV4dC5ncmFwaGNtcy5jb20iXSwiaXNzIjoiaHR0cHM6Ly9tYW5hZ2VtZW50LmdyYXBoY21zLmNvbS8iLCJzdWIiOiIyODczMDQzMS1iMTcxLTQyYjktYThkNi0zYTU1Y2NkNjdjOTUiLCJqdGkiOiJjbDgxbjNtbjYxanF5MDF0MTI2ZWRnd2t6In0.0qgKrp0R8rSnlx2E135iouM5dIvoLm2F7OhtQOTt0h1WsME0-1HTPeIC4j-ljAkpzA3eglolcR6Py9Zi-_z13CT5hWzVZz_UT21B50ciD28t7ph1XtZ_5OhCNZpN5q5aogOeC5oJktYH7tDDzoAUwIcEm0vMQw_nWbhvqXGrQmpjdwEhhHFRwiRIVBGM5IcWl8WkMksoqJUm3VbmgRGE6Ugxfppx5tKjbr_2EfFFGb45LlTJi3GkCDgzeVvm7H2IdQYoOcfzmVa579gRoOOzTy4bTLBtoO7PT5SdsH_FOkQobnuUynSXnMReGiMKZ05QoH_2EG8PV2dHa62jB5K2Hl0sG1bzLeCrpu0v_eHVOuQ4zGItkSC-eaSr_a891624k4nzGMwg3kXYKx44creTCaSjA1MPR8PtZ5yFK7DwwUVjw0FyjBuvxbOZy2tnzOELQYGPFLyRoJ3HCP335owxCOs0o0tRhd9vxi4Lyf5E99Hxg_BItedW7s4eP1bQKSwmRVFYoQBaJdtKGgKY_n2uxFZ70sNfurbbu5zb-9khW-gfXqJiobKdbTMV2FUSt5sfSRfaKb6Ws5QkyQ3bq5qvcTUBc9HAfL4m6XojmglixkJh-1AYkoGfibR1aU4b45JrY3k97aiP4wK8SOUleUG8FclAu38dZeqwgpiCwDlk_NU"

export default async function Comment(req, res) {
  
  const graphQLClient= new GraphQLClient(graphqlAPI,{
    headers:{
      authorization: `Bearer ${graphCMSToken}`
    }
  })

  const query = gql`mutation CreateComment($name: String!, $email: String!, $comment: String!, $slug: String!) {
    createComment(data: {name: $name, email: $email, comment: $comment, post: {connect: {slug: $slug}}}){ id }}
`;

try {

  const result= await graphQLClient.request(query, req.body)
  return res.status(200).send(result)
  
} catch (error) {
      console.log("TO JEST PROBLEM: ", error)
      return res.status(500).send(error.message)
}

}
