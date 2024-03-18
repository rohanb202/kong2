import "@/styles/globals.css";
import SEO from '../next-seo.config';
import { DefaultSeo } from 'next-seo';
import {
  RecoilRoot  
} from "recoil";
export default function App({ Component, pageProps }) {
  return (
    <>
    <DefaultSeo {...SEO}/>
    <RecoilRoot>
        <Component {...pageProps} />
    </RecoilRoot>
  </>
  );
}
