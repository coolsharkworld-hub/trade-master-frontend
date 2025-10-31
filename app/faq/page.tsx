import { FaqSection } from '@/app/sections/Faq'
import { getFaqData } from '@/sanity/lib/api'

export default async function FaqPage() {
  const data = await getFaqData()

  return <FaqSection data={data} />
}
