import { defineQuery } from 'next-sanity'

export const settingsQuery = defineQuery(`*[_type == "settings"][0]{
  _id,
  title,
  description,
  logo,
}`)

// Hero Section Query
export const heroQuery = defineQuery(`*[_type == "hero"][0]{
  _id,
  title,
  subtitle,
  description,
  countdownDate,
  videoUrl,
  videoPoster
}`)

// Page Loading Animation Query
export const pageLoadingAnimationQuery = defineQuery(`*[_type == "pageLoadingAnimation"][0]{
  _id,
  title,
  images[],
  animationDuration,
  percentageIncrement,
  minIncrement,
  maxIncrement
}`)

// Registration Form Section Query
export const registrationFormQuery = defineQuery(`*[_type == "registrationForm"][0]{
  _id,
  title,
  buttonText,
  footerText,
  courses[]->{
    _id,
    id,
    name,
    title,
    logo,
    image,
    isAvailable,
    statusText,
    description,
    price,
    isNew,
    included
  }
}`)

// Login Page Query
export const loginPageQuery = defineQuery(`*[_type == "loginPage"][0]{
  _id,
  title,
  backgroundImage,
  logo,
  emailLabel,
  passwordLabel,
  rememberMeText,
  submitButtonText,
  forgotPasswordText
}`)

// Course Quiz Section Query
export const courseQuizQuery = defineQuery(`*[_type == "courseQuiz"][0]{
  _id,
  title,
  preRegisterButtonText,
  watchTrailerButtonText
}`)

export const earlyRegistrationQuery = defineQuery(`*[_type == "earlyRegistration"][0]{
  _id,
  title,
  countdownDate,
  preRegistrationText,
  image,
}`)

// Text Media Cards Section Query
export const textMediaCardsQuery = defineQuery(`*[_type == "textMediaCards"][0]{
  _id,
  heading,
  subheading,
  sliderItems,
  cards[]{
    _key,
    title,
    description,
    image,
    video
  }
}`)

// CTA Media Section Query
export const ctaMediaQuery = defineQuery(`*[_type == "ctaMedia"][0]{
  _id,
  title,
  description,
  background,
  media[]{
    _key,
    image
  }
}`)

// Icon Text Blocks Section Query
export const iconTextBlocksQuery = defineQuery(`*[_type == "iconTextBlocks"][0]{
  _id,
  title,
  description,
  items[]{
    _key,
    icon,
    title
  }
}`)

// Course Cards Section Query
export const courseCardsQuery = defineQuery(`*[_type == "courseCards"][0]{
  _id,
  title,
  description,
  courses[]{
    _key,
    id,
    logo,
    description,
    price,
    isNew,
    included,
    image,
    videoLink,
    previewImage
  }
}`)

// Vision Selection Section Query
export const pricingQuery = defineQuery(`*[_type == "pricing"][0]{
  _id,
  title,
  description,
  options[]{
    _key,
    id,
    badge,
    payments,
    price,
    accessRole,
    savedPrice,
    image
  }
}`)

// Testimonial Cards Section Query
export const testimonialCardsQuery = defineQuery(`*[_type == "testimonialCards"][0]{
  _id,
  title,
  description,
  testimonials[]{
    _key,
    name,
    quote,
    instagram,
    avatar,
    list
  }
}`)

// Stats Section Query
export const statsQuery = defineQuery(`*[_type == "stats"][0]{
  _id,
  title,
  description,
  stats[]{
    _key,
    title,
    content
  }
}`)

// Reviews Section Query
export const reviewsQuery = defineQuery(`*[_type == "reviews"][0]{
  _id,
  title,
  description,
  reviews[]{
    _key,
    user{
      name,
      avatar
    },
    rating,
    text,
    createdAt
  }
}`)

// Success Rate Section Query
export const successRateQuery = defineQuery(`*[_type == "successRate"][0]{
  _id,
  title,
  description,
  videos[]{
    _key,
    videoUrl,
    name,
    role
  }
}`)

// PricingTable Section Query
export const pricingTableQuery = defineQuery(`*[_type == "pricingTable"][0]{
  _id,
  title,
  description,
  plans[]{
    _key,
    type,
    name,
    priceLabel,
    price,
    image
  },
  features[]{
    _key,
    name,
    first,
    second
  }
}`)

// Team Page Section Query
export const teamPageQuery = defineQuery(`*[_type == "teamPage"][0]{
  _id,
  title,
  description,
  team[]{
    _key,
    imageUrl,
    name,
    role
  }
}`)

// Community Feedback Section Query
export const communityFeedbackQuery = defineQuery(`*[_type == "communityFeedback"][0]{
  _id,
  title,
  description,
  feedbacks[]{
    _key,
    title,
    isVideo,
    name,
    createdDate,
    content,
    imageLink,
    videoLink
  }
}`)

// Industry Experts Section Query
export const industryExpertsQuery = defineQuery(`*[_type == "industryExperts"][0]{
  _id,
  title,
  description,
  media[]{
    _key,
    image
  }
}`)

// Film Making Goals Section Query
export const filmMakingGoalsQuery = defineQuery(`*[_type == "filmMakingGoals"][0]{
  _id,
  title,
  description,
  options[]{
    _key,
    id,
    badge,
    payments,
    price,
    accessRole,
    savedPrice,
    image
  }
}`)

// FAQ Section Query
export const faqQuery = defineQuery(`*[_type == "faq"][0]{
  _id,
  title,
  description,
  faqs[]{
    _key,
    question,
    answer
  }
}`)

const postFields = /* groq */ `
  _id,
  "status": select(_originalId in path("drafts.**") => "draft", "published"),
  "title": coalesce(title, "Untitled"),
  "slug": slug.current,
  excerpt,
  coverImage,
  "date": coalesce(date, _updatedAt),
  "author": author->{firstName, lastName, picture},
`

const linkReference = /* groq */ `
  _type == "link" => {
    "page": page->slug.current,
    "post": post->slug.current
  }
`

const linkFields = /* groq */ `
  link {
      ...,
      ${linkReference}
      }
`

export const getPageQuery = defineQuery(`
  *[_type == 'page' && slug.current == $slug][0]{
    _id,
    _type,
    name,
    slug,
    heading,
    subheading,
    "pageBuilder": pageBuilder[]{
      ...,
      _type == "callToAction" => {
        ${linkFields},
      },
      _type == "infoSection" => {
        content[]{
          ...,
          markDefs[]{
            ...,
            ${linkReference}
          }
        }
      },
    },
  }
`)

export const sitemapData = defineQuery(`
  *[_type == "page" || _type == "post" && defined(slug.current)] | order(_type asc) {
    "slug": slug.current,
    _type,
    _updatedAt,
  }
`)

export const allPostsQuery = defineQuery(`
  *[_type == "post" && defined(slug.current)] | order(date desc, _updatedAt desc) {
    ${postFields}
  }
`)

export const morePostsQuery = defineQuery(`
  *[_type == "post" && _id != $skip && defined(slug.current)] | order(date desc, _updatedAt desc) [0...$limit] {
    ${postFields}
  }
`)

export const postQuery = defineQuery(`
  *[_type == "post" && slug.current == $slug] [0] {
    content[]{
    ...,
    markDefs[]{
      ...,
      ${linkReference}
    }
  },
    ${postFields}
  }
`)

export const postPagesSlugs = defineQuery(`
  *[_type == "post" && defined(slug.current)]
  {"slug": slug.current}
`)

export const pagesSlugs = defineQuery(`
  *[_type == "page" && defined(slug.current)]
  {"slug": slug.current}
`)

// Film Grid Section Query
export const filmGridQuery = defineQuery(`*[_type == "filmGrid"][0]{
  _id,
  title,
  description,
  videos[]{
    _key,
    itemId,
    title,
    videoLink
  }
}`)
