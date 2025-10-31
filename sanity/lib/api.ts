import { client } from './client'
import {
  communityFeedbackQuery,
  courseCardsQuery,
  courseQuizQuery,
  // Make sure this is imported
  ctaMediaQuery,
  earlyRegistrationQuery,
  faqQuery,
  filmGridQuery,
  filmMakingGoalsQuery,
  heroQuery,
  iconTextBlocksQuery,
  industryExpertsQuery,
  loginPageQuery,
  pageLoadingAnimationQuery,
  pricingQuery,
  pricingTableQuery,
  registrationFormQuery,
  reviewsQuery,
  settingsQuery,
  statsQuery,
  successRateQuery,
  teamPageQuery,
  testimonialCardsQuery,
  textMediaCardsQuery
} from './queries'

export async function getSettings() {
  return await client.fetch(settingsQuery)
}

export async function getPageLoadingAnimationData() {
  return await client.fetch(pageLoadingAnimationQuery)
}

export async function getRegistrationFormData() {
  return await client.fetch(registrationFormQuery)
}

export async function getHeroData() {
  return await client.fetch(heroQuery)
}

export async function getTextMediaCardsData() {
  return await client.fetch(textMediaCardsQuery)
}

export async function getCtaMediaData() {
  return await client.fetch(ctaMediaQuery)
}

export async function getIconTextBlocksData() {
  return await client.fetch(iconTextBlocksQuery)
}

export async function getCourseCardsData() {
  return await client.fetch(courseCardsQuery)
}

export async function getPricingData() {
  return await client.fetch(pricingQuery)
}

export async function getTestimonialCardsData() {
  return await client.fetch(testimonialCardsQuery)
}

export async function getStatsData() {
  return await client.fetch(statsQuery)
}

export async function getReviewsData() {
  return await client.fetch(reviewsQuery)
}

export async function getSuccessRateData() {
  return await client.fetch(successRateQuery)
}

export async function getPricingTableData() {
  return await client.fetch(pricingTableQuery)
}

export async function getTeamPageData() {
  return await client.fetch(teamPageQuery)
}

export async function getCommunityFeedbackData() {
  return await client.fetch(communityFeedbackQuery)
}

export async function getIndustryExpertsData() {
  return await client.fetch(industryExpertsQuery)
}

export async function getFilmMakingGoalsData() {
  return await client.fetch(filmMakingGoalsQuery)
}

export async function getFilmGridData() {
  return await client.fetch(filmGridQuery)
}

export async function getFaqData() {
  return await client.fetch(faqQuery)
}

export async function getEarlyRegistrationData() {
  return await client.fetch(earlyRegistrationQuery)
}

// Add this function for course quiz
export async function getCourseQuizData() {
  return await client.fetch(courseQuizQuery)
}

export async function getLoginPageData() {
  return await client.fetch(loginPageQuery)
}

// Fetch all sections data at once
export async function getAllSectionsData() {
  const [
    settings,
    hero,
    textMediaCards,
    ctaMedia,
    iconTextBlocks,
    courseCards,
    pricing,
    testimonialCards,
    stats,
    reviews,
    successRate,
    pricingTable,
    teamPage,
    communityFeedback,
    industryExperts,
    filmMakingGoals,
    filmGrid,
    earlyRegistration,
    courseQuiz, // Add this
    faq,
    registrationForm,
    pageLoadingAnimation
  ] = await Promise.all([
    getSettings(),
    getHeroData(),
    getTextMediaCardsData(),
    getCtaMediaData(),
    getIconTextBlocksData(),
    getCourseCardsData(),
    getPricingData(),
    getTestimonialCardsData(),
    getStatsData(),
    getReviewsData(),
    getSuccessRateData(),
    getPricingTableData(),
    getTeamPageData(),
    getCommunityFeedbackData(),
    getIndustryExpertsData(),
    getFilmMakingGoalsData(),
    getFilmGridData(),
    getEarlyRegistrationData(),
    getCourseQuizData(), // Add this
    getFaqData(),
    getRegistrationFormData(),
    getPageLoadingAnimationData()
  ])

  return {
    settings,
    hero,
    textMediaCards,
    ctaMedia,
    iconTextBlocks,
    courseCards,
    pricing,
    testimonialCards,
    stats,
    reviews,
    successRate,
    pricingTable,
    teamPage,
    communityFeedback,
    industryExperts,
    filmMakingGoals,
    filmGrid,
    earlyRegistration,
    courseQuiz, // Add this to the return object
    faq,
    registrationForm,
    pageLoadingAnimation
  }
}
