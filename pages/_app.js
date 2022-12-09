import '../styles/globals.css'
import Layout from '../components/layout/Layout'
import React from 'react'

function MyApp({ Component, pageProps }) {
  return (
    <React.StrictMode>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </React.StrictMode>
  )
}

export default MyApp
