import React from 'react'
import Link from 'next/link'
import moment from 'moment/moment'

function PostCard({post}) {
  return (

    // CONTAINER
    <Link href={`/post/${post.slug}`}>

        <div className='grid grid-cols-10 overflow-hidden rounded-lg bg-white shadow-lg p-0 mb-6 mt-4 cursor-pointer'>


          {/* LEFT SIDE OF THE POST CARD */}
          <div style={{ backgroundImage: `url('${post.featuredImage.url}')`,
            backgroundPosition:"50% 50%",
            backgroundRepeat: "no-repeat",
            backgroundSize:"cover" 
            }} className='col-span-4 flex flex-col justify-center items-center '>


          </div>

          {/* RIGHT SDIE OF THE CARD */}
          <div className=' p-4 col-span-6 p-2'>

            <h1 className='font-semibold text-lg'>{post.title}</h1>
                  
            <div className='font-medium my-2  text-gray-400 w-full flex flex-row justify-center items-center'>

                      
                          <div className='inline-block text-sm'>
                              <div className='inline'>
                                  <img src={post.author.photo.url} 
                                  alt={post.author.name}
                                  width="40px"
                                  height="40px"
                                  className='inline rounded-full'/>

                                  <span className=' border-r-4 border-gray-300 px-2 mx-2'>{post.author.name}</span>

                              </div>

                                  <span className=" whitespace-nowrap">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                          </div>

            </div>

            
          </div>
            
        </div>
    </Link> 
  )
}

export default PostCard