import '../styles/globals.css'
import type { AppProps } from 'next/app'
import { CacheProvider } from '@emotion/react'
import { StyledEngineProvider } from '@mui/material/styles'
import createCache from '@emotion/cache'

const cache = createCache({
  key: 'css',
  prepend: true,
});

function MyApp({ Component, pageProps }: AppProps) {
  
  return (
    <CacheProvider value={cache}>
      <StyledEngineProvider injectFirst>
        <Component {...pageProps} />
      </StyledEngineProvider>
    </CacheProvider>
  )

}

export default MyApp
