import {request, gql} from "graphql-request"


const graphqlAPI="https://api-ap-southeast-2.hygraph.com/v2/cl894rpjx210p01uh531e266n/master"

export const getPosts= async()=>{
    const query= gql`
    
    query MyQuery{
  postsConnection(orderBy: createdAt_DESC) {
    edges {
      node {
        categories {
          name
          slug
        }
        excerpt
        author {
          bio
          id
          name
          photo {
            url
          }
        }
        createdAt
        slug
        title
        featuredImage {
          url
        }
      }
    }
  }
}
    
    `

    const result= await request(graphqlAPI, query);

    return result.postsConnection.edges;
}

export const getSearchedPost= async(phrase)=>{
  const query=gql`
 query GetSearchedPost($phrase: String){
  posts(where: {title_contains: $phrase}) {
    title
    featuredImage {
      url
    }
    createdAt
  }
}
  `
  const result= await request(graphqlAPI, query, {phrase});
  return result.posts
}



export const getRecentPosts=async()=>{


    const query= gql`
    
    query GetRecentPosts(){
        posts(orderBy: createdAt_DESC,
        last:4){
            title
            slug
            createdAt
            featuredImage{
                url
            }

        }
    }
    
    `

    const result= await request(graphqlAPI, query);

    return result.posts;
}

export const getSimilarPosts = async(categories, slug)=>{
  const query=gql`
  query GetPostDetails($slug: String, $categories: [String!]){
      posts(
      where:{slug_not: $slug, AND:{categories_some:{slug_in: $categories}}}
      last:3
      ){
          title
          featuredImage{
              url
          }
          createdAt
          slug
      }
  }
  `
  const result=await request(graphqlAPI, query, {categories, slug})

  return result.posts;
}

export const getPost=async(slug)=>{
  const query=gql` 
 query GetPostDetails($slug:String) {
post(where:{ slug: $slug}) {
      createdAt
      slug
      title
      excerpt
      featuredImage {
        url
      }
      categories {
        name
        slug
      }
      author {
        bio
        id
        name
        photo {
          url
        }
      }
      content{
        raw
      }
    }
}
`


const result= await request(graphqlAPI, query, {slug})

return result.post;
}

export const getCategories= async()=>{

  const query=gql`
  
  query GetCategories {
  categories{
    name
    slug
    posts {
      title
      slug
      categories{
        name
      }
      createdAt
      featuredImage{
        url
      }
      author {
        bio
        name
        photo{
          url
        }
      }
    }
  }
}

  
  `
  const result= await request(graphqlAPI, query)

  return result.categories;
}


export const getCategorysPosts = async(slug)=>{

  const query=gql`
  query GetResult($slug:String!) {
  category(where: {slug: $slug}) {
    name
    slug
    posts {
      title
      slug
      categories{
        name
      }
      featuredImage{
        url
      }
      createdAt
      author {
        bio
        name
        photo{
          url
        }
      }
    }
  }
}
  `
const result= await request(graphqlAPI, query, {slug})

return result.category;
}

export const submitComment = async(obj)=>{
  const result= await fetch('/api/comment', {
    method: "POST",
    headers:{
      "Content-Type":"application/json"
    },
    body: JSON.stringify(obj)
  })

  return result.json;
}


export const getComments= async(slug)=>{


  const query=gql`
  query GetComments($slug: String!){
    comments(where:{post:{slug: $slug}}){
      name
      comment
      createdAt
    }
  }
  `
  const result= await request(graphqlAPI, query, {slug});
  return result.comments;

}


export const getLastCategorysPost=async(category)=>{

  const query=gql`
  query getLastCategorysPost($category: String!) {
  category(where: {name: $category}) {
    posts(last: 1) {
      title
      createdAt
      slug
      featuredImage {
        url
      }
      author {
        name
        photo{
          url
        }
      }
    }
  }
}
  `
const result= await request(graphqlAPI, query, {category})
return result.category

}