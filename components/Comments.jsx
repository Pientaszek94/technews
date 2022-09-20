import React, { useEffect, useState} from 'react'
import { getComments } from '../services'
import Comment from './Comment'

function Comments({slug}) {

    const [comments, setComments] = useState([])

    useEffect(()=>{

        getComments(slug)
        .then((newComments)=>{
            setComments(newComments)
        })

    },[comments])

  return (
    <div className='w-full bg-blue-200/40 rounded-lg'>
        <div className='p-4'>
            <h1 className='font-bold text-lg'>
                Your Comments
            </h1>
            <div className='bg-blue-100 rounded-lg'>
                {
                    comments.length===0?(<div className='flex flex-col justify-center items-center h-40 w-full text-center' >Nobody left the comment on this article, yet. <br/> 
                    Send the comment, and be the first!</div>):
                    comments.map((comment)=>(
                        <Comment comment={comment} key={comment.name}/>
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default Comments