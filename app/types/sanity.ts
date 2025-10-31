export interface HeroData {
  _id: string
  title: string
  subtitle: string
  description: string
  countdownDate: string
  videoUrl: string
  videoPoster?: string
}

export interface EarlyRegData {
  _id: string
  title: string
  countdownDate: string
  image: string | SanityImage
  preRegistrationText: string
}

export interface TestimonialData {
  _key: string
  name: string
  quote: string
  instagram: string
  avatar: string
  list: string[]
}

export interface TestimonialCardsData {
  _id: string
  title: string
  description: string
  testimonials: TestimonialData[]
}

export interface RegistrationFormData {
  _id: string
  title: string
  buttonText: string
  footerText: string
  courses: RegCourseData[]
}

export interface LoginPageData {
  _id: string
  title: string
  backgroundImage: string | SanityImage
  logo: string | SanityImage
  emailLabel: string
  passwordLabel: string
  rememberMeText: string
  submitButtonText: string
  forgotPasswordText: string
}

export interface RegCourseData {
  _id: string
  id: number
  name: string
  title: string
  logo: string | SanityImage
  image: string | SanityImage
  isAvailable: boolean
  statusText: string
  description: string
  price: number
  isNew: boolean
  included: string[]
}

export interface CourseQuizData {
  _id: string
  title: string
  preRegisterButtonText: string
  watchTrailerButtonText: string
}

export interface VideoData {
  _key: string
  videoUrl: string
  name: string
  role: string
}

export interface SuccessRateData {
  _id: string
  title: string
  description: string
  videos: VideoData[]
}

export interface TeamMemberData {
  _key: string
  imageUrl: string
  name: string
  role: string
}

export interface TeamPageData {
  _id: string
  title: string
  description: string
  team: TeamMemberData[]
}

export interface SanityImage {
  asset?: {
    _ref: string
    _type: 'reference'
    _weak?: boolean
  }
  media?: unknown
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
  alt?: string
  _type: 'image'
}

export interface TextMediaCardData {
  _key: string
  title: string
  description: string
  image: SanityImage
  video: string
}

export interface TextMediaCardsData {
  _id: string
  heading: string
  subheading: string
  sliderItems: string[]
  cards: TextMediaCardData[]
}

export interface CtaMediaData {
  _key: string
  image: string | SanityImage
}

export interface CtaMediaSectionData {
  _id: string
  title: string
  description: string
  background: string
  media: CtaMediaData[]
}

export interface PageLoadingAnimationData {
  _id: string
  title: string
  images: Array<string | SanityImage>
  animationDuration: number
  percentageIncrement: number
  minIncrement: number
  maxIncrement: number
}

export interface IndustryExpertsMediaData {
  _key: string
  image: string | SanityImage
}

export interface IndustryExpertsSectionData {
  _id: string
  title: string
  description: string
  background: string
  media: IndustryExpertsMediaData[]
}

export interface PriceOption {
  _key: string
  id: number
  badge: string
  payments: string
  price: number
  accessRole: string
  savedPrice: number
  image: string | SanityImage
}

export interface PricingData {
  _id: string
  title: string
  description: string
  options: PriceOption[]
}

export interface FeedBackData {
  title: string
  isVideo: string
  name: string
  createdDate: string
  content: string
  imageLink: string
  videoLink: string
  logo?: string
}

export interface CommunityFeedbackData {
  _id: string
  title: string
  description: string
  feedbacks: FeedBackData[]
}

export interface FilmItem {
  itemId: number
  title: string
  videoLink: string
}

export interface FilmGridData {
  _id: string
  title: string
  description: string
  videos: FilmItem[]
}

export interface Faq {
  _key: string
  question: string
  answer: string
}

export interface FaqData {
  _id: string
  title: string
  description: string
  faqs: Faq[]
}

export interface CourseData {
  _key: string
  id: number
  logo: string
  description: string
  price: number
  isNew: boolean
  included: string[]
  image: string | SanityImage,
    videoLink?: string
  previewImage?: string
}

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

export interface CourseCardsData {
  _id: string
  title: string
  description: string
  courses: CourseData[]
}

export interface TextMedia {
  title: string
  description: string
  image: string | SanityImage
  video: string
}

export interface ReviewData {
  _key: string
  user: {
    name: string
    avatar: string
  }
  rating: number
  text: string
  createdAt: string
}

export interface ReviewsData {
  _id: string
  title: string
  description: string
  reviews: ReviewData[]
}

export interface StatData {
  _key: string
  title: string
  content: string
}

export interface StatsData {
  _id: string
  title: string
  description: string
  stats: StatData[]
}

export interface IconTextItem {
  _key: string
  icon: string
  title: string
}

export interface IconTextBlocksData {
  _id: string
  title: string
  description: string
  items: IconTextItem[]
}

export interface SiteSettings {
  title: string
  description: string
  logo: SanityImage
}

export interface PlanData {
  _key: string
  name: string
  type: string
  priceLabel: string
  price: string
  image?: string
}

export type FeatureData = {
  _key: string
  name: string
  first: boolean
  second: boolean
}

export interface PricingTablesData {
  _id: string
  title: string
  description: string
  plans: PlanData[]
  features: FeatureData[]
}
