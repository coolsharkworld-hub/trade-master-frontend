import { Provider } from 'react-redux'

import CommunityFeedback from '@/app/sections/CommunityFeedback'
import CourseCards from '@/app/sections/CourseCards'
import CtaMedia from '@/app/sections/CtaMedia'
import FilmGrid from '@/app/sections/FilmGrid'
import FilmMakingGoal from '@/app/sections/FilmMakingGoals'
import Hero from '@/app/sections/Hero'
import IconTextBlocks from '@/app/sections/IconTextBlocks'
import IndustryExperts from '@/app/sections/IndustryExperts'
import PricingTable from '@/app/sections/PricingTable'
import Reviews from '@/app/sections/Reviews'
import Stats from '@/app/sections/Stats'
import SuccessRate from '@/app/sections/SuccessRate'
import TeamPage from '@/app/sections/TeamPage'
import TestimonialCards from '@/app/sections/TestimonialCards'
import TextMediaCards from '@/app/sections/TextMediaCards'
import VisionSelection from '@/app/sections/VisionSelection'
import { getAllSectionsData } from '@/sanity/lib/api'

export default async function Page() {
  // Fetch all sections data from Sanity
  const sectionsData = await getAllSectionsData()

  return (
    <div className='overflow-hidden overflow-y-hidden bg-black'>
      <Hero data={sectionsData.hero} />
      <TextMediaCards data={sectionsData.textMediaCards} />
      <IconTextBlocks data={sectionsData.iconTextBlocks} />
      <CtaMedia data={sectionsData.ctaMedia} />
      <CourseCards data={sectionsData.courseCards} />
      <VisionSelection data={sectionsData.pricing} />
      <TestimonialCards data={sectionsData.testimonialCards} />
      <Stats data={sectionsData.stats} />
      <Reviews data={sectionsData.reviews} />
      <SuccessRate data={sectionsData.successRate} />
      <PricingTable data={sectionsData.pricingTable} />
      <TeamPage data={sectionsData.teamPage} />
      <CommunityFeedback data={sectionsData.communityFeedback} />
      <IndustryExperts data={sectionsData.industryExperts} />
      <FilmMakingGoal data={sectionsData.filmMakingGoals} />
      <FilmGrid data={sectionsData.filmGrid} />
    </div>
  )
}
