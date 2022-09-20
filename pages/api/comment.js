import { GraphQLClient, gql } from "graphql-request"

const graphqlAPI="https://api-ap-southeast-2.hygraph.com/v2/cl8aqmqln01or01ui0b3jem5a/master"

const graphCMSToken="eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCIsImtpZCI6ImdjbXMtbWFpbi1wcm9kdWN0aW9uIn0.eyJ2ZXJzaW9uIjozLCJpYXQiOjE2NjM3MTExMDMsImF1ZCI6WyJodHRwczovL2FwaS1hcC1zb3V0aGVhc3QtMi5oeWdyYXBoLmNvbS92Mi9jbDhhcW1xbG4wMW9yMDF1aTBiM2plbTVhL21hc3RlciIsIm1hbmFnZW1lbnQtbmV4dC5ncmFwaGNtcy5jb20iXSwiaXNzIjoiaHR0cHM6Ly9tYW5hZ2VtZW50LmdyYXBoY21zLmNvbS8iLCJzdWIiOiJhMWNkYjkxYi0wODRiLTRkY2YtODk3Yi1kZTNhNzdlMzdkYjQiLCJqdGkiOiJjbDgxbjNtbjYxanF5MDF0MTI2ZWRnd2t6In0.U-Bmu5qcpFnunv2sSCi9RK7wDUic1FG2hSp9RHlcwH44DO_G2XZd3_dMvOhu3wM3oFTWZetkOy54mE-Kihr9vcQDqsQiBjSFnYBvJT7KilBD4xMa6fDV-WaYpmavyX6xDgVxuJ5k_uizPJA6pPtB-Ne1veG24bJBB4yUfaTUab8j4guYobMIt49UcZsnFzYyXiMNElLjt5z4dTN3UkscgeB23o407E7iCpH3nG68cJl_mGTPoDF0UCWHJjbNi14hqtUS0YpuBGSOmDihpGimOAe-vEiNDyTPTU5olYJH9y34kQ0nBxN63JyohaNk2Q9ZZSTf3be9UQJXAniLYJxYhR5oMbP0eN0E9Pp9qbQpKZ4U0Par8g2lt1djGAaj3that0WsDd9HikzKvLCBUZmQztMWkrpAObeZgvwEhDp3ZnNBu9EZPM-sFLtY18skzPVzGoaXCchJycPH_6vuid9ARXM_8KMZ7cQSfzn4IjIMAJpVkpoixVpP5FjOoxdKQeFEXMD6xlA9fAboWFg3rl3ev_SoNCSG0Sl1aMwzNFAUVFwqiyupAaz0-phzglJhxMKIggPisYkjoTjfxBbfz8Xz6xCZCromDOLwRrlY20-sHlxFGdwpeRo6ZRc6mpm8TJh1tv3qDRg4_yL0APZEfPyYrCXYf5Lp-1L2SuLTpIcqXbw"

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
