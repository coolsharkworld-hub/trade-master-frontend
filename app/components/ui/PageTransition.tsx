'use client'

import { AnimatePresence, motion } from 'framer-motion'

import { ReactNode, useContext, useRef } from 'react'
import { Provider } from 'react-redux'

import { LayoutRouterContext } from 'next/dist/shared/lib/app-router-context.shared-runtime'
import { usePathname } from 'next/navigation'

import { store } from '@/app/store'

function FrozenRouter(props: { children: ReactNode }) {
  const context = useContext(LayoutRouterContext ?? {})
  const frozen = useRef(context).current

  if (!frozen) {
    return <>{props.children}</>
  }

  return <LayoutRouterContext.Provider value={frozen}>{props.children}</LayoutRouterContext.Provider>
}

const variants = {
  hidden: { opacity: 0, y: 100 },
  enter: {
    opacity: 1,
    y: 0
  },
  exit: { opacity: 0, y: -100 }
}

export const PageTransition = ({ children }: { children: ReactNode }) => {
  const key = usePathname()

  return (
    <Provider store={store}>
      <AnimatePresence mode='popLayout'>
        <motion.div
          key={key}
          initial='hidden'
          animate='enter'
          exit='exit'
          variants={variants}
          transition={{ ease: 'easeInOut', duration: 0.75 }}
        >
          <FrozenRouter>{children}</FrozenRouter>
        </motion.div>
      </AnimatePresence>
    </Provider>
  )
}
