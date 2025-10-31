'use client'

import { FeedbackGrid, SectionHeader } from '@/app/components'
import { feedbacks } from '@/app/constants'
import { CommunityFeedbackData } from '@/app/types/sanity'

interface Props {
  data: CommunityFeedbackData
}

export default function CommunityFeedback({ data }: Props) {
  const sectionData = data || {
    title: `Your community for<br><span style="color: rgb(255, 162, 0);">Feedback.</span>`,
    description: '',
    feedbacks: feedbacks.map((feedback, index) => ({ _key: `feedback-${index}`, ...feedback }))
  }

  const feedbacksData =
    sectionData.feedbacks || feedbacks.map((feedback, index) => ({ _key: `feedback-${index}`, ...feedback }))

  return (
    <div className='px-6 py-14'>
      <SectionHeader title={sectionData.title} />
      <FeedbackGrid feedbacks={feedbacksData} />
    </div>
  )
}
