import Link from 'next/link';
import React, { useEffect, useState} from 'react'
import {getCategories} from '../services'

function Categories() {

  const [categories, setCategories] = useState([])
  const [frase, setFrase] = useState("")
  const [click, setClick] = useState(false)


  useEffect(()=>{
    getCategories()
    .then((newCategories)=> setCategories(newCategories));
    
  },[frase, categories])


  return (
    <div className='relative'>

    <div className={`rounded-lg bg-white shadow-inner shadow-lg ${click?"h-fit":"h-28"} ease  overflow-hidden  lg:p-2 lg:p-8 pb-12 p-4 mb-6 mt-4`}>
          <h2 className='font-semibold text-left'>
            Categories
          </h2>
          
          <input type="text" autoComplete='off'
          placeholder='Any ideas?' name="frase" onChange={(e)=> setFrase(e.target.value)}
          className='py-4 my-2 bg-blue-100 w-full h-2 rounded-lg input'/>

          <div className=''>
          {
            categories.filter((cat)=>{
              let phrase=cat.name.toLowerCase().includes(frase.toLowerCase())
              if(frase==="") return cat
              else if(phrase) return cat
            }).map((cat)=>(
              <Link key={cat.id} href={`/categories/${cat.slug}`}>
                  <div className='inline-block text-white m-0.5 
                   px-4 bg-[#202a5e] leading-2 rounded-full 
                   cursor-pointer transition duration-500 ease 
                   hover:bg-blue-400'>
                    
                    <h1 className='font-semibold'>{cat.name}</h1>

                  </div>
              </Link>
            ))
          }

          </div>
    </div>
          <div className='w-full h-8 absolute bottom-0 
          flex flex-col justify-center items-center translate-y-1/2'>

            <div onClick={()=>setClick(prevState=>!prevState)} className='w-8 h-8 bg-[#dd3053] rounded-full flex flex-col justify-center items-center'>
                    <div  className={`${click?"-rotate-45 border-r-2 border-t-2":"-rotate-45 border-l-2 border-b-2"} border-white w-2 h-2`}>

                    </div>
            </div>

          </div>
    </div>
  )
}

export default Categories