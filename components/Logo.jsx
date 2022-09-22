import Link from 'next/link'
import React from 'react'

function Logo() {
  return (

    <Link href="/">
      <div className='realtive logo' >
          
          <h1 className='lg:m-4 m-2 text-white text-center 
          leading-4 text-sm lg:text-lg'>Tech<br/>News</h1> 
      </div>
    
    </Link>
  )
}

export default Logo