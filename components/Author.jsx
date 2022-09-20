import Image from 'next/image'
import React from 'react'

function Author({author}) {
  return (
    <div className='w-full lg:w-2/3 bg-black/40 text-white rounded-lg py-10  my-8 flex flex-col justify-center items-center'>
          <Image
        unoptimized
        
        alt={author.name}
        height="100px"
        width="100px"
        className="align-middle rounded-full"
        src={author.photo.url}
      />

        <h1 className='post-title text-center'>{author.name}</h1>
        <h3 className='italic p-4 px-8 '>&quot;{author.bio}&quot;</h3>
    
    </div>
  )
}

export default Author