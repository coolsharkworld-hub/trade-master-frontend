import { SpeedInsights } from '@vercel/speed-insights/next'
import type { Metadata } from 'next'
import { VisualEditing, toPlainText } from 'next-sanity'
import { Inter } from 'next/font/google'
import { draftMode } from 'next/headers'

import { Footer, Header } from '@/app/components'
import { PageTransition } from '@/app/components/ui/PageTransition'
import SmoothScroll from '@/app/components/ui/SmoothScroll'
// Import the SmoothScroll component
import { getSettings } from '@/sanity/lib/api'
import { getAllSectionsData } from '@/sanity/lib/api'
import * as demo from '@/sanity/lib/demo'
import { SanityLive, sanityFetch } from '@/sanity/lib/live'
import { settingsQuery } from '@/sanity/lib/queries'
import { getImageUrl, resolveOpenGraphImage } from '@/sanity/lib/utils'

import { handleError } from './client-utils'
import { PageLoadingAnimation } from './components/ui/PageLoadingAnimation'
import { pageLoadingAnimationTestData } from './constants/pageLoadingAnimationData'
import './globals.css'

/**
 * Generate metadata for the page.
 * Learn more: https://nextjs.org/docs/app/api-reference/functions/generate-metadata#generatemetadata-function
 */
export async function generateMetadata(): Promise<Metadata> {
  const { data: settings } = await sanityFetch({
    query: settingsQuery,
    // Metadata should never contain stega
    stega: false
  })
  const title = settings?.title || demo.title
  const description = settings?.description || demo.description

  const ogImage = resolveOpenGraphImage(settings?.ogImage)

  let metadataBase: URL | undefined = undefined
  try {
    metadataBase = settings?.ogImage?.metadataBase ? new URL(settings.ogImage.metadataBase) : undefined
  } catch {
    // ignore
  }
  return {
    metadataBase,
    title: {
      template: `%s | ${title}`,
      default: title
    },
    description: toPlainText(description),
    openGraph: {
      images: ogImage ? [ogImage] : []
    }
  }
}

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
  display: 'swap'
})

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const { isEnabled: isDraftMode } = await draftMode()

  const settings = await getSettings()
  const sectionsData = await getAllSectionsData()

  const logo = getImageUrl(settings.logo) || '/logo.svg'

  return (
    <html lang='en' className={`${inter.variable} bg-black text-black`}>
      <body className='bg-black overflow-y-hidden'>
        <PageLoadingAnimation data={sectionsData.pageLoadingAnimation} />
        {/* Wrap your entire content with SmoothScroll */}
        <SmoothScroll>
          <section className='min-h-screen pt-24'>
            {isDraftMode && (
              <>
                <VisualEditing />
              </>
            )}
            <SanityLive onError={handleError} />
            <Header logo={logo} />
            <main>
              <PageTransition>{children}</PageTransition>
            </main>
            <Footer logo={logo} />
          </section>
        </SmoothScroll>

        <SpeedInsights />
      </body>
    </html>
  )
}
