'use client'

import { TeamSlider } from '@/app/components'
import { teamData } from '@/app/constants'
import { TeamPageData } from '@/app/types/sanity'

interface Props {
  data?: TeamPageData
}

export default function TeamPage({ data }: Props) {
  // Use Sanity data or fallback to constants
  const sectionData = data || {
    title: 'Course Instructors',
    description: '',
    team: teamData.map((member, index) => ({ _key: `member-${index}`, ...member }))
  }

  const teamMembers = sectionData.team || teamData.map((member, index) => ({ _key: `member-${index}`, ...member }))

  return (
    <section className='flex justify-center flex-col my-20 w-full'>
      <div className='flex items-center flex-col text-center mb-28'>
        <h2 className='text-white text-5xl lg:text-8xl mx-2'>{sectionData.title}</h2>
        <p className='text-white text-xl lg:text-2xl mt-4'>{sectionData.description}</p>
      </div>
      <div className='cursor-grab active:cursor-grabbing'>
        <TeamSlider teamMembers={teamMembers} />
      </div>
    </section>
  )
}
