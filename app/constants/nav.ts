type NavItem = {
  title: string
  link: string
  imageURL?: string
  new?: boolean
}

type NavSection = {
  header: string
  children: NavItem[]
}

export const footerNav: NavSection[] = [
  {
    header: 'pages',
    children: [
      { title: 'home', link: '/' },
      { title: 'courses', link: '/courses' },
      { title: 'certification', link: '/certification' },
      { title: 'funding', link: '/funding' },
      { title: 'competition', link: '/competition' },
      { title: 'enterprise', link: '/enterprise' },
      { title: 'about', link: '/about' },
      { title: 'faq', link: '/faq' },
      { title: 'contact', link: '/contact' }
    ]
  },
  {
    header: 'courses',
    children: [
      {
        title: 'documentary foundations',
        link: '/documentaryfoundation',
        imageURL:
          'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2Fc6610c4b5f450b96dee446fa48b5744acfc2af94-1320x1840.jpg%3Fq%3D75%26fit%3Dclip%26auto%3Dformat&w=480&q=80'
      },
      {
        title: 'advanced documentary',
        link: '/advanceddocumentary',
        imageURL:
          'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2Ffdb1ba4eab241a0c1a91618438dcaaa5a9b92a1d-1320x1840.jpg%3Fq%3D75%26fit%3Dclip%26auto%3Dformat&w=480&q=80'
      },
      {
        title: 'create & earn',
        link: '/createearn',
        imageURL:
          'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2F72f56a74796f726fee4ab828a7af4067e6bb86af-1320x1840.jpg%3Fq%3D75%26fit%3Dclip%26auto%3Dformat&w=480&q=80'
      },
      {
        title: 'the perfect cut',
        link: '/perfectcut',
        imageURL:
          'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2F9b2c4a382cfc458f05b6b5bd48f99c255f7ae893-1320x1840.jpg%3Fq%3D75%26fit%3Dclip%26auto%3Dformat&w=480&q=80'
      },
      {
        title: 'the cinematic eye',
        link: '/cinematiceye',
        imageURL:
          'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2Fb8f1ba00148bafdb5b682ef65db0557033fb0b99-1320x1840.jpg%3Fq%3D75%26fit%3Dclip%26auto%3Dformat&w=480&q=80'
      },
      {
        title: 'cinepath pro',
        link: '/cinepathpro',
        imageURL:
          'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2Fd94ef1928fd89ca2eb55dba9cd9275c4ee6d1372-1320x1840.jpg%3Fq%3D75%26fit%3Dclip%26auto%3Dformat&w=480&q=80',
        new: true
      },
      {
        title: 'producting foundations',
        link: '/productingfoundation',
        imageURL:
          'https://theartofdocumentary.com/_next/image?url=https%3A%2F%2Fcdn.sanity.io%2Fimages%2F0v9eq93x%2Fproduction%2Feb747926ce6b6f419a3efb20456da1eebe4cefdf-1320x1840.jpg%3Fq%3D75%26fit%3Dclip%26auto%3Dformat&w=480&q=80',
        new: true
      }
    ]
  },
  {
    header: 'socials',
    children: [
      { title: 'youtube', link: '/youtube' },
      { title: 'instagram', link: '/instagram' }
    ]
  }
]

export const bottomFooterNav = [
  { title: 'Site by dashdigital studio', link: '/dashdigital studio' },
  { title: 'Privacy policy', link: '/privacypolicy' },
  { title: 'terms of use', link: '/termsofuse' }
]

export const sidebarNav = [
  { title: 'Privacy policy', link: '/privacypolicy' },
  { title: 'terms of use', link: '/termsofuse' }
]
