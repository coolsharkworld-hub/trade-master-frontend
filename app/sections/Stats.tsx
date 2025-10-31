'use client'

import { Variants, motion } from 'framer-motion'

import { useInView } from 'react-intersection-observer'

import { stats } from '@/app/constants'
import { StatsData } from '@/app/types/sanity'

interface Props {
  data?: StatsData
}

// Animation variants for the container
const containerVariants: Variants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2,
      delayChildren: 0.3
    }
  }
}

// Animation variants for each stat item - changed from x to y for down-to-top animation
const itemVariants: Variants = {
  hidden: {
    opacity: 0,
    y: 50 // Start from 50px down
  },
  visible: {
    opacity: 1,
    y: 0, // Move to original position
    transition: {
      duration: 0.6,
      ease: [0.25, 0.46, 0.45, 0.94] // Using easeOutQuad equivalent
    }
  }
}

export default function Stats({ data }: Props) {
  const sectionData = data || {
    title: 'Over 6500+ filmmakers have had their careers impacted by AOD',
    description: '',
    stats: stats.map((stat, index) => ({ _key: `stat-${index}`, ...stat }))
  }

  const statItems = sectionData.stats || stats.map((stat, index) => ({ _key: `stat-${index}`, ...stat }))

  const [ref, inView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  return (
    <motion.section
      ref={ref}
      initial='hidden'
      animate={inView ? 'visible' : 'hidden'}
      variants={containerVariants}
      className='testimonial-cards flex justify-center flex-col py-30 md:py-35 items-center px-4'
    >
      <motion.div variants={itemVariants} className='flex justify-center mb-14 md:mb-28 w-full'>
        <h2 className='text-white sm:text-5xl lg:text-7xl lg:text-center text-left max-w-6xl leading-tight'>
          {sectionData.title}
        </h2>
      </motion.div>

      <motion.div variants={containerVariants} className='flex flex-col md:flex-row lg:flex-row gap-12 w-full'>
        {statItems.map((stat, index) => (
          <motion.div
            key={stat._key || index}
            variants={itemVariants}
            className='flex flex-col items-left lg:items-center flex-1'
          >
            <div className='text-left lg:text-2xl sm:text-base uppercase lg:text-center mb-2 tracking-widest'>
              {stat.title}
            </div>
            <div className='text-left lg:text-8xl sm:text-5xl text-sonic-silver lg:text-center '>{stat.content}</div>
          </motion.div>
        ))}
      </motion.div>
    </motion.section>
  )
}
