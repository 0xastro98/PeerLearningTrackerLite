import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css'
import type { AppProps } from 'next/app'
import {Cabin} from 'next/font/google'
import {AuthProvider} from '../contexts/AuthContext'

const cabin = Cabin({subsets : ['latin']})

function MyApp({ Component, pageProps }: AppProps) {
  return(
    <>
    <main className={cabin.className}>
      <AuthProvider>
        <Component {...pageProps} />
      </AuthProvider>
    </main>
    </>
  )
}

export default MyApp
