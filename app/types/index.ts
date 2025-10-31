export interface Review {
  user: {
    name: string
    avatar: string
  }
  rating: number
  text: string
  createdAt: string
}
export type Plan = {
  id: string
  name: string
  priceLabel: string
  price: string
  logo?: boolean
}

export type Feature = {
  name: string
  aod: boolean
  filmSchool: boolean
  featurePrice?: {
    aod?: string
    filmSchool?: string
  }
}

export type PricingTableType = {
  plans: Plan[]
  features: Feature[]
}

export interface Country {
  code: string
  name: string
  dialCode: string
  flag: string
}

export interface CourseType {
  name: string
  title: string
  status: string
}

export interface FormData {
  firstName: string
  lastName: string
  email: string
  password: string
  phone: string
  course: string
}

export interface ApiCountry {
  cca2: string
  name: { common: string }
  idd: { root: string; suffixes: string[] }
  flags: { png: string }
}

export interface FormField {
  id: string
  name: keyof FormData
  type: string
  label: string
  required: boolean
}
