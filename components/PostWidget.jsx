import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getRecentPosts, getSimilarPosts } from '../services'

function PostWidget({slug, categories}) {


    const [relatedPosts, setRelatedPosts] = useState([])

    useEffect(()=>{

    if(slug){
      getSimilarPosts(categories, slug)
      .then((newPosts)=>{
        setRelatedPosts(newPosts)
      })
    }
    else{

      getRecentPosts()
      .then(result=>{
          setRelatedPosts(result);
      })

    }
    },[])


    console.log("Recent Posts", relatedPosts)

  return (
    <div className='rounded-lg bg-white shadow-lg lg:p-2 lg:p-8 pb-12 p-4 mb-6 mt-4'>
          <h2 className='font-semibold text-left'>
            {slug?"You may also like": "Recent Posts"}
          </h2>

          <div className=''>
            {
              relatedPosts.map((post)=>(
                <Link key={post.createdAt} href={`/post/${post.slug}`}>
                  <div  className='flex flex-row border-b-2 border-gray-100 items-center cursor-pointer mt-2'>
                    <div className='w-16 flex-none 
                    rounded-lg overflow-hidden inline-block py-2'>

                        <img alt={post.title}
                        height="50px"
                        className="align-middle rounded-lg inline"
                        src={post.featuredImage.url}/>

                    </div>

                    <h2 className='text-sm px-2'>{post.title}</h2>
                  </div>

                </Link>
              ))
            }
          </div>
    </div>
  )
}

export default PostWidget