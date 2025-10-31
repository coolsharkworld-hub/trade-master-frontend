import Coursequiz from '@/app/sections/Register/Coursequiz'
import EarlyRegistration from '@/app/sections/Register/EarlyRegistration'
import RegistrationForm from '@/app/sections/Register/RegistrationForm'
import { getAllSectionsData } from '@/sanity/lib/api'

export default async function Register() {
  const sectionsData = await getAllSectionsData()

  return (
    <div className='overflow-hidden bg-black'>
      <EarlyRegistration data={sectionsData.earlyRegistration} />
      <RegistrationForm data={sectionsData.registrationForm} />
      <Coursequiz data={sectionsData.courseQuiz} />
    </div>
  )
}
