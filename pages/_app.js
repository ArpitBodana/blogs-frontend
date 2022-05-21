import '../styles/globals.css'
import Menubar from '../components/Menubar'
import Background from '../components/Background'
import Loader from '../components/Loader'
import Router from 'next/router'
import {useState} from 'react'

function MyApp({ Component, pageProps }) {
  const[loading,setLoading]=useState(false)

  Router.events.on('routeChangeStart',(url)=>{
    setLoading(true)
  })
  Router.events.on('routeChangeComplete',(url)=>{
    setLoading(false)
  })
  
  return (
    <>
      <Menubar />
      {loading&&<Loader/>}
      <Background/>
      <Component {...pageProps} />
    </>
  )

}

export default MyApp
