import Link from 'next/link'
import React from 'react'

function Logo() {
  return (

    <Link href="/">
      <div className='realtive logo ' >
          
          <h1 className='m-4 text-white text-center 
          leading-4'>Flash<br/>News</h1> 
      </div>
    
    </Link>
  )
}

export default Logo