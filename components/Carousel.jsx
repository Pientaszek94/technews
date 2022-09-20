import React from 'react'
import CarouselItem from './CarouselItem'

function Carousel() {
  return (
      <div className='carousel overflow-x-scroll w-full lg:mt-4 xl:flex flex-col justify-center items-center'>
        <div className='w-max flex flex-row justify-center items-center'>
            <CarouselItem name="moto" /> 
            <CarouselItem name="tech" />
            <CarouselItem name="nonsense" />
        </div>

      </div>
  )
}

export default Carousel