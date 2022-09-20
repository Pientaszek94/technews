import Head from 'next/head'
import Image from 'next/image'
import {useMemo, useState } from 'react';
import {Carousel, Categories, PostCard} from '../components';
import { getPosts } from '../services'
import Pagination from '../components/Pagination';


export async function getStaticProps(){

  const posts=(await getPosts())||[];

  return {
    props:{
      posts
    }
  }

}


let pageSize= 5;


export default function Home({posts}) {
  console.log("Posty: ", posts)


  const [currentPage, setCurrentPage] = useState(1);


  const currentPageData= useMemo(()=>{

    const firstPageIndex=(currentPage-1)*pageSize;
    const lastPageIndex=firstPageIndex+pageSize;

    return posts.slice(firstPageIndex, lastPageIndex);

  },[currentPage])

  return (
    <div className='container mx-auto lg:px-28 mb-8 z-0'>
      <Head>
        <title>Flash News</title>
        <meta name="description" content="Keep being posted" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Carousel/>

      <div className='grid py-12 grid-col-1 lg:grid-cols-12 gap-6 px-10'>
        <div className='lg:col-span-8 col-span-1'>

          <h1 className='text-center text-white new-articles'>New Articles</h1>
                <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={posts.length}
                  pageSize={pageSize}
                  onPageChange={page => setCurrentPage(page)}
                />
            {
              currentPageData.map((post, index)=>(
              <PostCard post={post.node} key={post.node.title}/>
              ))
            }
               <Pagination
                  className="pagination-bar"
                  currentPage={currentPage}
                  totalCount={posts.length}
                  pageSize={pageSize}
                  onPageChange={page => setCurrentPage(page)}
                />
        </div>

        <div className='lg:col-span-4 col-span-1'>

          <div className='lg:sticky relative top-12'>

              <Categories/>

          </div>
          
        </div>

      </div>



    </div>
  )
}
