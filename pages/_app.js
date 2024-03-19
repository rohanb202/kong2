import "@/styles/globals.css";
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';
import {
  RecoilRoot  
} from "recoil";
import NavigationLoader from "@/utils/NavLoader";
export default function App({ Component, pageProps }) {
  return (
    <>
    <DefaultSeo {...SEO}/>
    <RecoilRoot>
      <NavigationLoader/>
        <Component {...pageProps} />
    </RecoilRoot>
  </>
  );
}
