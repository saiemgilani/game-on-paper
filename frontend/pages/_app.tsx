
import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import TopBar from '../components/TopBar'
import { Footer } from '../components/Footer'

const MyApp = ({ Component, pageProps }: AppProps): React.ReactNode => {
  const [style, setStyle] = useState<React.CSSProperties>({ visibility: 'hidden' })
  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side')
    if (jssStyles) {
      jssStyles.parentElement.removeChild(jssStyles)
    }
    setStyle({})
  }, [])

  return (
    <>
      <div>
          <div>
            <TopBar />
            <Component {...pageProps} />
          </div>
          <Footer />
      </div>
    </>
  )
}

export default MyApp
