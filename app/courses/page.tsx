import { CoursesSection } from '@/app/sections/Courses'
import { getCourseCardsData } from '@/sanity/lib/api'

export default async function CoursesPage() {
  const data = await getCourseCardsData()

  return <CoursesSection data={data} />
}
