'use client'

import { motion } from 'framer-motion'

import { FC, useEffect, useState } from 'react'

import clsx from 'clsx'

interface TextSliderLoopProps {
  items: string[]
  interval?: number
  className?: string
}

export const TextSliderLoop: FC<TextSliderLoopProps> = ({ items, interval = 2000, className }) => {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const loop = setInterval(() => {
      setCurrentIndex(prevIndex => (prevIndex + 1) % items.length)
    }, interval)

    return () => clearInterval(loop)
  }, [items.length, interval])

  const animationVariants = {
    hidden: { y: '100%', opacity: 0 },
    visible: { y: '0%', opacity: 1 },
    exit: { y: '-100%', opacity: 0 }
  }

  return (
    <div className={clsx('overflow-hidden h-8 w-full flex justify-center mt-3', className)}>
      <motion.div
        key={currentIndex}
        initial='hidden'
        animate='visible'
        exit='exit'
        variants={animationVariants}
        transition={{
          duration: 0.8,
          ease: 'easeOut'
        }}
        className='absolute'
      >
        {items[currentIndex]}
      </motion.div>
    </div>
  )
}
