import Image from 'next/image'
import React from 'react'

const StagePet = () => {
  return (
    <div className='flex items-center justify-center w-full h-full'>
      <Image
        src="/info-pet-stage-2.png"
        alt="StagePet"
        width={320}
        height={420}
        className='object-contain w-auto h-screen max-h-[546px]'
        priority
      />
    </div>
  )
}

export default StagePet