import React, {useState, useMemo} from 'react'
import { getCategories, getCategorysPosts } from '../../services'
import Pagination from '../../components/Pagination'; 
import { PostCard, PostWidget, Categories} from '../../components';
import {useRouter } from 'next/router';


export async function getStaticPaths(){
    const categories=await getCategories();
    
    return {
      paths: categories.map(({slug})=>({params:{slug}})),
      fallback: false
    }
}

export async function getStaticProps({params}){

  const data=await getCategorysPosts(params.slug)

  return{
    props:{category: data}
  }

}

let pageSize=6

function CategorySite({category}) {

  console.log("Kategoria", category);


  const [currentPage, setCurrentPage] = useState(1);

  const router=useRouter()
  


  const currentPageData= useMemo(()=>{

    const firstPageIndex=(currentPage-1)*pageSize;
    const lastPageIndex=firstPageIndex+pageSize;

    return category.posts.slice(firstPageIndex, lastPageIndex);

  },[currentPage, category])




  return (
            <div className='container mx-auto lg:px-28 px-10 mb-8'>
                
                <div className='grid py-12 grid-col-1 lg:grid-cols-12 gap-6'>
                  <div className='lg:col-span-8 col-span-1'>

                        <h1 className='font-bold text-lg bg-white 
                        rounded-lg flex flex-row justify-center 
                        items-center p-2 post-title '>     
                        Category: {category.name}</h1>

                          <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={category.posts.length}
                            pageSize={pageSize}
                            onPageChange={page => setCurrentPage(page)}
                          />
                      {
                        currentPageData.map((post, index)=>(
                        <PostCard post={post} key={post.title}/>
                        ))
                      }
                        <Pagination
                            className="pagination-bar"
                            currentPage={currentPage}
                            totalCount={category.posts.length}
                            pageSize={pageSize}
                            onPageChange={page => setCurrentPage(page)}
                          />
                  </div>

                  <div className='lg:col-span-4 col-span-1'>

                    <div className='lg:sticky relative top-12'>

                        <PostWidget/>
                        <Categories/>

                    </div>
                    
                  </div>

                </div>
            </div>
  )
}

export default CategorySite