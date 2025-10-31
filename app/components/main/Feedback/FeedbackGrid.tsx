'use client'

import { FeedBackData } from '@/app/types/sanity'

import { FeedbackCard } from './FeedbackCard'

interface FeedbackGridProps {
  feedbacks: FeedBackData[]
}

export const FeedbackGrid = ({ feedbacks }: FeedbackGridProps) => (
  <div className='grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-3 items-start'>
    {feedbacks.map(feedback => (
      <FeedbackCard key={feedback.title} {...feedback} />
    ))}
  </div>
)
