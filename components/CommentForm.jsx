import React, { useRef, useState, useEffect } from 'react'
import {submitComment} from '../services'
import Comments from './Comments'

function CommentForm({slug}) {



    const [error, setError] = useState(false)
    const [localStorage, setLocalStorage] = useState(null)
    const [showSuccessMessage, setShowSuccessMessage] = useState(null)
    const nameEl=useRef()
    const emailEl=useRef()
    const commentEl=useRef();
    const storeDataEl=useRef()

    useEffect(() => {

    
        nameEl.current.value= window.localStorage.getItem('name')
        emailEl.current.value= window.localStorage.getItem('email')
        storeDataEl.current.value= window.localStorage.getItem('name') || window.localStorage.getItem('email')
      
    },[]);
  
  
    const handleCommentSubmission=()=>{
        setError(false)
  
        const {value: comment}=commentEl.current;
        const {value: name}=nameEl.current
        const {value: email}=emailEl.current;
        const {checked: storeData}=storeDataEl.current;
  
        if(!comment||!name||!email){
          setError(true)
          return;
        }
  
        const commentObj={name, email, comment, slug}
  
        if(storeData){
          window.localStorage.setItem("name", name);
          window.localStorage.setItem('email', email);
        }
        else{
          window.localStorage.removeItem("name");
          window.localStorage.removeItem("email");
        }
  
        submitComment(commentObj)
        .then((res)=>{
          setShowSuccessMessage(true)
          console.log("Response", res);
          setTimeout(()=>{
              setShowSuccessMessage(false)
          }, 3000)
        })
  
    }


  return (
    <div className="lg:w-full bg-white py-4 rounded-lg">
        <div className='p-4 border-b-4'>
            <h1 className='font-bold'>Leave a Comment</h1>
            <input type="text" ref={nameEl} name="name" id="email" placeholder='Name' className='py-4 my-2 bg-blue-100 w-full h-2 rounded-lg input'/>
            <input type="email" ref={emailEl} name="email" id="email" placeholder='Email' className='py-4 my-2 bg-blue-100 w-full h-2 rounded-lg input'/>
            <textarea rows="1" ref={commentEl} name="comment" id="comment" placeholder='Comment' className='py-4 my-2 bg-blue-100 w-full rounded-lg input'/>

            {error && <p className="text-xs text-red-500">Please fill in all fields</p>}

            <div className='mb-4'>
                <input ref={storeDataEl} type="checkbox" value={true} id="storeData" name="storeData"/>
                <label className="text-gray-500 cursor-pointer" htmlFor="storeData"> Save my name, email for the next time.</label>
            </div>

            <button type="button" onClick={handleCommentSubmission}
            className='bg-[#202a5e] text-white font-semibold rounded-lg px-4 p-2'>
                Send a Comment
            </button>

            {showSuccessMessage && <span className="text-xl float-right font-semibold mt-3 text-green-500">Comment submitted for review</span>}
        </div>
        <Comments slug={slug}/>
    </div>
  )
}

export default CommentForm