import "@/styles/globals.css";
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';
import {
  RecoilRoot  
} from "recoil";
import NavigationLoader from "@/utils/NavLoader";
import { ThemeProvider } from "@/utils/theme-provider";


export default function App({ Component, pageProps }) {
  return (
    <>
    <DefaultSeo {...SEO}/>
    <RecoilRoot>
      
    <ThemeProvider
            attribute="class"
            defaultTheme="light"
            enableSystem
            disableTransitionOnChange
          >

      <NavigationLoader/>
       
        <Component {...pageProps} />
        </ThemeProvider>
    </RecoilRoot>
  </>
  );
}
