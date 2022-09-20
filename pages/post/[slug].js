import React from 'react'
import { Content, Author, CommentForm, Categories, PostWidget } from '../../components';
import { getPost, getPosts } from '../../services'
import moment from 'moment';
import Router from 'next/router';


export async function getStaticPaths(){ 
    const posts=await getPosts();

    return {
        paths: posts.map(({node:{slug}})=>({params: {slug}})),
        fallback: false
    }
}

export async function getStaticProps({params:{slug}}){

    const data=await getPost(slug)

    return{
        props:{post: data}
    }

}

const router=Router;


function PostSite({post}) {
    
return (

    <div className='grid grid-cols-1 lg:grid-cols-12 gap- lg:px-20 z-0'>


            <div className='lg:mx-20 mx-0 lg:col-span-8  flex flex-col items-center'>
                <div className='w-full overflow-hidden bg-white rounded-lg flex flex-col items-center mt-4'>
                    <div className='flex flex-row justify-center items-center cursor-pointer' onClick={()=> router.back()}>
                        <span className="material-symbols-outlined">
                            arrow_back
                        </span> Go back
                    </div>
                    <img src={post.featuredImage.url} className="w-full" alt={post.title}/>

                    <div className='rounded-lg  bg-white w-5/6 flex flex-col justify-center items-center  shadow-lg -translate-y-1/4'>

                        <h1 className='font-semibold post-title lg:text-lg text- text-black p-2 px-4 leading-8'>{post.title}</h1>

                        <div className="font-medium text-gray-400">
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 inline mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 
                                    21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                </svg>
                                <span className="align-middle text-sm">{moment(post.createdAt).format('MMM DD, YYYY')}</span>
                        </div>

                    </div>

                    <div className='flex flex-col w-10/12 items-center'>


                        <h4 className='italic border-l-4 border-yellow-400'>&quot;{post.excerpt}&quot;</h4>

                    </div>

                    <div className='p-6'>
                        <Content post={post}/>
                    </div>
                </div>
                <Author author={post.author}/>
                

                
            </div>
            <div className='lg:col-span-4'>
                <div className='lg:sticky top-4'>
                    <PostWidget slug={post.slug} categories={post.categories.map((cat)=>cat.slug)}/>
                    <Categories/>
                    <CommentForm slug={post.slug}/>

                </div>
            </div>

    </div>

  )
}

export default PostSite