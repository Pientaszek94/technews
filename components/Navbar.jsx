import moment from 'moment'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import { getSearchedPost } from '../services'
import Logo from './Logo'


function Navbar() {
  
  const [scrolling, setScrolling] = useState('')
  const [prevScroll, setPrevScroll] = useState(0)
  const [hide, setHide] = useState(true)
  const [click, setClick] = useState(false)
  const [phrase, setPhrase] = useState('')
  const [searchedPosts, setSearchedPosts] = useState([])


  const handleScroll = () => {
    setScrolling(Number(window.scrollY));
  };

  
  useEffect(() => {

    
    setPrevScroll(scrolling)

    if(scrolling<80||prevScroll<80){
      setHide(false)
    }
    else{
      if(prevScroll>scrolling){
        console.log("UP!!!")
        setHide(false)
      }
      else{
        console.log("DOWN!!!")
        setHide(true);
      }

    }
    
    window.addEventListener("scroll", handleScroll); 
    return () => window.removeEventListener("scroll", handleScroll);
  },[scrolling]);


  useEffect(()=>{
    if(phrase!==""){
      getSearchedPost(phrase)
      .then((result)=>{
        setSearchedPosts(result);
      })
    }
  },[phrase])
  

  
  console.log("szukane posty: ", searchedPosts)


  return (
        <div className='z-20 lg:w-32 w-full lg:h-screen h-28  flex lg:flex-col 
        flex-row justify-center items-start sticky lg:fixed sticky top-0'>
            
            <div className={`bg-blue-400 rounded-lg ${click?"lg:w-1/2":"lg:w-28"} w-5/6  
            lg:h-96  flex lg:flex-col flex-row overflow-hidden lg:overflow-visible
            lg:justify-around justify-between items-center lg:fixed sticky ${hide?"h-0":"h-"}`} >

                    <Logo/>
                     
                    <div className='text-white lg:inline-block'>
                      
                        <div className='flex flex-col justify-center items-center lg:mx-10 lg:my-0 my-10'>

                            <div className='flex flex-row justify-center items-center '>
                              <span className="material-symbols-outlined cursor-pointer" 
                              onClick={()=>{setClick((prevSt)=> !prevSt)
                              setPhrase("")}}>search</span>
                              
                              <input type='text' onChange={(e)=>setPhrase(e.target.value)} value={phrase} 
                              className={`bg-blue-400 ${click?"lg:w-96 w-40":"w-0"} lg:rounded-t-lg 
                              border-b-2 border-white input inline-block`}/>

                            </div>
                          {
                            phrase!==""&&(
                              <div className={`bg-white h-40 ${click?"lg:w-96 w-40":"w-0"} z-40 
                             rounded-b-lg overflow-y-scroll relative left-3`}>
                                  {
                                    searchedPosts!==[]?
                                      searchedPosts.map((post)=>(
                                      <Link key={post.title} href={`/post/${post.slug}`}>

                                       <div key={post.title} className='text-black 
                                       border-b-2 hover:bg-gray-200 px-2 cursor-pointer'>

                                          <h1 className='lg:text-lg text-sm font-semibold'>{post.title}</h1>

                                          <h2 className='lg:text-sm text-xs text-gray-400'>
                                            {moment(post.createdAt).format('MMM DD, YYYY')}
                                          </h2>

                                       </div> 
                                      
                                      </Link>
                                      )):null
                                  }
                              </div>
                            )
                          }

                        </div>
                    </div>
                    <ul className='flex flex-col justify-center items-center px-4'>
                      <li className='lg:w-4 lg:h-4 w- h-2 flex justify-center items-center m-2'>
                        <a href="https://www.facebook.com/" className="fa fa-facebook text-white h-4 w-4 rounded-full"></a> 
                      </li>
                      <li className='lg:w-4 lg:h-4 w-2 h-2 flex justify-center items-center m-2'>
                        <a href="https://www.instagram.com/" className="fa fa-instagram text-white rounded-full w-full lg:m-2  mx-2 h-4"></a>   
                      </li>
                    </ul>
            </div>
        </div>
  )
}

export default Navbar