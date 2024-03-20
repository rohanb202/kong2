import React from 'react';
import { useRouter } from 'next/router';
import ClipLoader from "react-spinners/ClipLoader";
const LOADER_THRESHOLD = 250;

export default function NavigationLoader(props) {

  const {text = "Loading..."} = props;
  const [isLoading, setLoading] = React.useState(false);
  const router = useRouter();
  
  React.useEffect(() => {

    let timer;
  
    const start = () => timer = setTimeout(() => setLoading(true), LOADER_THRESHOLD);
  
    const end = () => {
      if (timer) {
        clearTimeout(timer);
      }
      setLoading(false);
    };
  
    router.events.on('routeChangeStart', start);
    router.events.on('routeChangeComplete', end);
    router.events.on('routeChangeError', end);
  
    return () => {
      router.events.off('routeChangeStart', start);
      router.events.off('routeChangeComplete', end);
      router.events.off('routeChangeError', end);

      if(timer) {
        clearTimeout(timer.current);
      }
    };
  
  }, [router.events]);
  
  if (!isLoading) return null;
  
  return (
    <div className="flex items-center justify-center w-full h-screen overflow-hidden">
        <ClipLoader
                    
                    loading={isLoading}
                    
                    size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
    </div>
  );
}