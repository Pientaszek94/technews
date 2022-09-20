import moment from 'moment'
import React from 'react'

function Comment({comment}) {
  return (
    <div className='rounded-lg flex flex-row justify-start items-start my-6 border-b-2 border-blue-300'>
        <h2 className='px-4 font-semibold'>{comment.name}:</h2>
        <div className=' w-full flex flex-col justify-between items-start'>
            <p>
                {comment.comment}
            </p>
            <h3 className='text-gray-400 text-sm'>{moment(comment.createdAt).format(`MMM DD, YYYY`)}</h3>
        </div>
    </div>
  )
}

export default Comment