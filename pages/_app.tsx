import '../styles/globals.css'
import { useEffect, useState } from 'react'
import type { AppProps } from 'next/app'
import { useRouter } from 'next/router'
import { ProgressBar } from 'pkg-components'
import { Layout } from '../containers/Layout'

function MyApp({ Component, pageProps }: AppProps) {
  const [animating, setAnimating] = useState<boolean>(false)
  const router = useRouter()


  useEffect(() => {
    const handleStop = () => {
      setAnimating(false)
    }
    router.events.on('routeChangeStart', () => {
      setAnimating(true)
    })
    router.events.on('routeChangeComplete', handleStop)
    router.events.on('routeChangeError', handleStop)

    return () => {
      router.events.off('routeChangeStart', () => {
        setAnimating(true)
      })
      router.events.off('routeChangeComplete', handleStop)
      router.events.off('routeChangeError', handleStop)
    }
  }, [router])

  return (
    <>
      <Layout>
        <ProgressBar progress={animating} />
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp
