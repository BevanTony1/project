import '../styles/globals.scss'
import Navbar from '../components/Navbar'
import type { AppProps } from 'next/app'
import Head from 'next/head'
import customTheme from '../styles/theme'
import { ChakraProvider } from '@chakra-ui/react'
import { Provider } from "next-auth/client"


function MyApp({ Component, pageProps }: AppProps) {



  return (
      <Provider session={pageProps.session}>
      <ChakraProvider theme={customTheme}>
      <Head>
        <title>Service</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        </Head>
      <Navbar />
        <Component {...pageProps} />
    </ChakraProvider>
    </Provider>
  )
}
export default MyApp
