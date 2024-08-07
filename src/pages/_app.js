import "@/styles/globals.css";
import '../styles/globals2.css'
import "@/styles/igstyle.css"
import "@/styles/globals.scss"

export default function App({ Component, pageProps }) {
  return <Component {...pageProps} />;
}


// import "@/styles/globals.css";
// import '../styles/globals2.css'
// import "@/styles/igstyle.css"
// import "@/styles/globals.scss"
// import {Layout} from '@/components'
// import { useRouter } from 'next/router'

// export default function App({ Component, pageProps }) {
//   const router = useRouter()

//   if (router.pathname === '/blog') {
//     return (
//       <Layout>
//         <Component {...pageProps} />
//       </Layout>
//     )
//   }

//   return <Component {...pageProps} />
// }