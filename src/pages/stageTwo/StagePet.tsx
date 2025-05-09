import Image from 'next/image'
import React from 'react'

const StagePet = () => {
  return (
    <div className='w-full h-full flex items-center justify-center'>
      <Image
        src="/info-pet-stage-2.png"
        alt="StagePet"
        width={320}
        height={420}
        className='w-full h-auto object-contain'
        priority
      />
    </div>
  )
}

export default StagePet