
import React, { useEffect, useState } from 'react'
import { AppProps } from 'next/app'
import TopBar from '../components/TopBar'
import { Footer } from '../components/Footer'
import { ThemeProvider } from '../theme'

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
        <ThemeProvider>
          <div>
            <TopBar />
            <Component {...pageProps} />
          </div>
          <Footer />
        </ThemeProvider>
      </div>
    </>
  )
}

export default MyApp
