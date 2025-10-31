import { loginPageTestData } from '@/app/constants/loginPageData'
import LoginPage from '@/app/sections/LoginPage'
import { getLoginPageData } from '@/sanity/lib/api'

export default async function Login() {
  let loginPageData

  try {
    loginPageData = await getLoginPageData()
  } catch (error) {
    console.log('Using test data for development')
    loginPageData = loginPageTestData
  }

  return <LoginPage data={loginPageData} />
}
