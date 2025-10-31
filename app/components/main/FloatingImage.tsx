'use client'

import clsx from 'clsx'

interface FloatingImageProps {
  img: {
    id: number
    src: string
    width: number
    height: number
  }
  className?: string
}

export const FloatingImage = ({ img, className }: FloatingImageProps) => {
  return (
    <div
      className={clsx('absolute', className)}
      style={{
        width: img.width,
        height: img.height,
        boxShadow: '0 10px 30px rgba(0,0,0,0.35)',
        willChange: 'transform, filter, opacity'
      }}
    >
      <img
        src={img.src}
        alt={`floating-${img.id}`}
        className='w-full h-full object-cover sm:w-[5%] sm:h-[5%] md:w-full md:h-full'
        draggable={false}
        loading='lazy'
      />
    </div>
  )
}
