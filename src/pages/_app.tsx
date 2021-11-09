import { ChakraProvider } from "@chakra-ui/react"
import { AppProps } from "next/app"
import { QueryClientProvider} from 'react-query'
import { ReactQueryDevtools } from 'react-query/devtools'
import { ToastContainer} from 'react-toastify'

import { makeServer } from "../services/mirage"
import { queryClient } from "../services/queryClient"

import { SidebarDrawerProvider } from "../contexts/SidebarDrawerContext"

import { theme } from "../styles/theme"
import 'react-toastify/dist/ReactToastify.css';

if(process.env.NODE_ENV === 'development'){
  makeServer();
}


function MyApp({ Component, pageProps } : AppProps) {

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <ChakraProvider theme={theme}>
          <SidebarDrawerProvider>
            <Component {...pageProps} />
          </SidebarDrawerProvider>
        </ChakraProvider>
        <ReactQueryDevtools />
      </QueryClientProvider>
      <ToastContainer theme="colored"/>
    </>
  )
      
}

export default MyApp
