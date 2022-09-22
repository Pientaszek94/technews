import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI="https://api-ap-southeast-2.hygraph.com/v2/cl8d1nm7c17z801ul2f2whzuw/master"

const graphCMSToken="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjM4NTA1NTMsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aGVhc3QtMi5oeWdyYXBoLmNvbS92Mi9jbDhkMW5tN2MxN3o4MDF1bDJmMndoenV3L21hc3RlciIsIm1hbmFnZW1lbnQtbmV4dC5ncmFwaGNtcy5jb20iXSwiaXNzIjoiaHR0cHM6Ly9tYW5hZ2VtZW50LmdyYXBoY21zLmNvbS8iLCJzdWIiOiI4MDNmMzUyOS1jZTMwLTQ3ZjYtYjYyMy1jMzY1NWFhNmU3YjQiLCJqdGkiOiJjbDgxbjNtbjYxanF5MDF0MTI2ZWRnd2t6In0.py9A4hdZpF_PgQ8DZgAZSyumlz-wnEziUJ2S6Qh9CjsIp-dSFxTvMDNbuZ6F2OT5qXVLtQDcmHHYiT1EObLV4wjGntp77gIbyZv1DPW7x225Zy7n0VhWnaFp_lXZbft3ogMtDmlV6LfAxqORL8ukMyefKRloKiusdLf_5nzbxTxOLNv757nXjWskvyShjhanU77UBZpGXWzYAROJIvG-2k9GfVr1hOi_iwC08PSdNwepwMTSOtPVsB04V5WYpSaBUiUMtrjTJCbBqha6T4ea0KOpXroGZh3AtUCc1WT2nGCkeEOMkqKqQ6sQRYrAFVs50JnJud5aVyOXq2yd7mno6Lu4mG2jl1yFnwq8wtDGQv_k71j7f-lhQNXSs6XqsZrjMrQFUNw9bbBAAbS2L6arkkmH0jU27Sb5_e1flcUSq-6a0DrudFclOZsTuBl00TVyT3yCWfvEUiEtWmfd35MIAL5O63sn7MCIooBUhZ2DTn2I0yht-EjhFLBnzJkcM8wnKjhRvOEKtOJVksoulgvikgD5v2KP4kxKCMWTBCRRzjyjIElxfa_OrJzDjIVtGI5aL_WF8q04u4RRVP-JiZnNepMZakxpysC_yB6KAwJNbCIjTalnvEYdM8Y3dZgrZ3OhbvYRFiV-hNqPprgvaVqU_90F5hpAl3Xp2_8xqAsUyPs"

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
