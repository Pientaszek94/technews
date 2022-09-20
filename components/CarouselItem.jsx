import React, { useEffect, useState } from 'react'
import { getLastCategorysPost } from '../services'
import moment from 'moment'
import Link from 'next/link'

function CarouselItem({name}) {

    const [posts, setPosts] = useState([])

    useEffect(()=>{
        getLastCategorysPost(name)
        .then((result)=>{
            const {posts}=result
            setPosts(posts)
        })
    })

    
    // console.log("kategoria", posts);
  return (
    <div className='w-80 h-80 my-4 flex flex-col justify-center items-center mx-2'>
    {
        posts!==null?posts.map((post)=>(

            <Link key={post.createdAt} href={`/post/${post.slug}`}>
                

                <div  className="cursor-pointer w-full h-full flex flex-col justify-center items-center rounded-lg"  
                style={{ backgroundImage: `url('${post.featuredImage.url}')`,
                backgroundPosition:"50% 50%",
                backgroundRepeat: "no-repeat",
                backgroundSize:"cover",
                    }}>
                    <div className='bg-black/50 rounded-lg w-full h-full flex flex-col justify-center items-center px-4 relative' >
                    <h1 className='bg-blue-400 text-white font-bold rounded-full px-4 absolute top-0 -translate-y-1/2'>{name}</h1>
                        <h1 className='text-center text-white whitespace-wrap '>
                        {post.title}
                        </h1>
                        <div className="text-gray-400">
                        <span className=' border-r-4 border-gray-600 px-2 text-sm mx-2 whitespace-nowrap'>

                        <img src={post.author.photo.url} 
                                    alt={post.author.name}
                                    width="30px"
                                    height="30px"
                                    className='inline rounded-full'/>
                                    
                            {post.author.name}

                        </span>
                            <span className='text-sm' >

                                    {moment(post.createdAt).format('MMM DD, YYYY')}

                            </span>
                        </div>


                    </div>
                </div>
            </Link>            
        )):null
    }

    </div>
  )
}

export default CarouselItem;