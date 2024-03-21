import { ArrowDownTrayIcon, HeartIcon } from "@heroicons/react/24/outline";
import {  HeartIcon as HeartIconSolid } from "@heroicons/react/24/solid";
import rehypeRaw from "rehype-raw";

// import Markdown from "react-markdown";
import dynamic from 'next/dynamic'
let Markdown=dynamic(()=>import("react-markdown"),{  ssr: true, })
import gfm from "remark-gfm";
import SyntaxHighlighter from "react-syntax-highlighter";
import CategoryButton from "@/components/CategoryButton";
import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Navbar from "@/components/Navbar";
import metadataParser from "markdown-yaml-metadata-parser";
import { NextSeo } from "next-seo";

// export async function getServerSideProps(context){
import Link from "next/link";
import { useRecoilState } from "recoil";
import { userState } from "@/atoms/userAtom";
import useDebounce from "@/utils/UseDebounce";
export async function getServerSideProps(context){
  try{
    const res=await fetch(`${process.env.local?process.env.local:"https://kong2.vercel.app"}/api/models/${context.query.id}`);

    const data=await res.json();
    return {
      props:{
        model:data,
      }
    }
  }catch(e){
    console.error("Error fetching data:", error);
    return {
      props:{
        model:null,
      }
    }
  }

}
// export async function getStaticPaths() {
//   // Assuming you have a function to fetch user IDs
//   const res = await fetch(`${process.env.local ? process.env.local : "https://kong2.vercel.app"}/api/models`);
//   const data=await res.json();
//   const paths = data?.items.map((modelData) => ({
//     params: { id: modelData._id.toString() },
//   }));
//   return { paths, fallback: 'blocking' }; // Use fallback: 'blocking' for ISR
// }

// export async function getStaticProps({ params }) {
//   try {
//     const res = await fetch(`${process.env.local ? process.env.local : "https://kong2.vercel.app"}/api/models/${params.id}`);
//     const data = await res.json();
//     return {
//       props: {
//         model: data,
//       },
//       revalidate: 60, // Revalidate every 60 seconds (adjust as needed)
//     };
//   } catch (error) {
//     console.error("Error fetching data:", error);
//     return {
//       props: {
//         model: null,
//       },
//       revalidate: 60, // Revalidate every 60 seconds (adjust as needed)
//     };
//   }
// }
// function extractMetaData(text) {
//   const metaData = {};
//   if(!text){
//     return {content:null, metadata:null};
//   }
//   const metaRegExp = /^---[\r\n](((?!---).|[\r\n])*)[\r\n]---$/m;
//   // get metadata
//   const rawMetaData = metaRegExp.exec(text);

//   let keyValues;

//   if (rawMetaData) {
//     // rawMeta[1] are the stuff between "---"
//     keyValues = rawMetaData[1].split("\n");

//     // which returns a list of key values: ["key1: value", "key2: value"]
//     keyValues.forEach((keyValue) => {
//       // split each keyValue to keys and values
//       const [key, value] = keyValue.split(":");
//       metaData[key] = value?.trim();
//     });
//   }
//   return {content:rawMetaData, metaData};
// }
const MarkComponent = ({ value, language }) => {
  return (
    <SyntaxHighlighter language={language ?? null}>
      {value ?? ""}
    </SyntaxHighlighter>
  );
};
// const Cateogories = Array.from({ length: 5 }, (_, index) => ({
//   id: index + 1,
//   text: `Item ${index + 1}`,
// }));
export default function ModelView({model}) {
  
  const router = useRouter();
  
  const [likes,setLikes]=useState({});
  const [likeBtn,setLikeBtn]=useState(null);
  const [likeCnt,setLikeCnt]=useState(0);
  const [downloadCnt,setDownloadCnt]=useState((model?.downloads)?model?.downloads:0);
  const [clickedLikes,setClickedLikes]=useState(0);
  const [clickedDownload,setClickedDownload]=useState(0);
  const [user,setUser]=useRecoilState(userState);


  
  async function getLikes(){
    try{
      // console.log(`/api/likes?modelId=${model?._id}&userId=${user?._id}`);
      const res=await fetch(`/api/likes?modelId=${model?._id}&userId=${user?._id}`);
      const data=await res.json();      
      setLikes(data);
      setLikeBtn(data?.liked); 
      setLikeCnt((data?.totalLikesCount)?data?.totalLikesCount:0); 
        

    }catch(err){
      
    }

  }
  async function postLike() {
    try {
        const res = await fetch(`/api/likes`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({modelId:model?._id, userId:user?._id })
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to post like:", error);
        throw error;
    }
  }
  async function deleteLike() {
    try {
        const res = await fetch(`/api/likes?modelId=${model?._id}&userId=${user?._id}`, {
            method: 'DELETE'
        });
        const data = await res.json();
        return data;
    } catch (error) {
        console.error("Failed to delete like:", error);
        throw error;
    }
  }
  async function updateDownloadCount() {
    try {
      // console.log("what");
        const response = await fetch(`/api/models/${model?._id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ downloadCnt })
        });

        if (!response.ok) {
          console.error('Update request failed with status:', response.status);
          // throw new Error('Failed to update download count');
      }

        const data = await response.json();
        // console.log(data);
        return data;
    } catch (error) {
        console.error('Error updating download count:', error);
        throw error;
    }
}async function updateViewCount() {
  try {
    const response = await fetch(`/api/models/${model?._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ viewCount:1 })
    });

    if (!response.ok) {
      // throw new Error('Failed to update view count');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error updating view count:', error);
    throw error;
  }
}

  useEffect(()=>{
    if(model.error){
      router.push(`/404`);
    }
    getLikes();    
    updateViewCount();
  },[])
  function likeBtnHandler(){
    if(!user)return;
    // console.log(likeCnt);
    if(!likeBtn){
      setLikeCnt(likeCnt+1);
    }else{
      setLikeCnt(likeCnt-1);
    }
    setLikeBtn(!likeBtn);
    setClickedLikes(clickedLikes+1);
  }
  function DownloadHandler(){
    setDownloadCnt(downloadCnt+1);
    setClickedDownload(clickedDownload+1); 
    
  }
  useDebounce(() => {
      if(likeBtn===null || likeBtn===undefined || !clickedLikes)return;
      if(likeBtn){
        postLike();
      }else{
        deleteLike();
      }
      
      // console.log(downloadCnt);
      
          
    }, [clickedLikes], 800
  );
  useDebounce(()=>{
    if(!clickedDownload)return;
    
    updateDownloadCount();
  },[clickedDownload],800)
  
  const [modelEdit, setModelEdit] = useState(model?.mark_down);
  const [edit, setEdit] = useState(null);
  async function updateModelMarkdown() {
    
  
    try {
      const response = await fetch('/api/models/new', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${user?.token}` 
        },
        body: JSON.stringify({
          modelId: model._id,
          mark_down:modelEdit,
        })
      });
      
      if (!response.ok) {
        // throw new Error('Failed to update model markdown');
      }
  
      const data = await response.json();
      // console.log(data);
      // return data; // Assuming the API returns some data upon successful update
    } catch (error) {
      console.error('Error updating model markdown:', error);
      // throw error;
    }
  }
  useDebounce(()=>{
    if(edit || !user){
      return;
    }
    // console.log(user.token,model._id,modelEdit);
    updateModelMarkdown();
  },[edit],800)
  // const [loading, setLoading] = useState(false);
  // async function fetchModel() {
  //   try{
  //     setLoading(true);
  //     const res = await fetch(`/api/models/${router.query.id}`);
  //     const data = await res.json();
  //     setModel(data);
  //   }catch(err){

  //   }finally{
  //     setLoading(false);

  //   }
    
  // }
  
  // useEffect(() => {
  //   if (!router.query.id) return;
  //   // console.log(router.query);
  //   // console.log(`/api/models/${router.query.id}`);
  //   fetchModel();

  //   // metadataParser((model?.mark_down?model?.mark_down:"")).content
  //   // console.log(extractMetaData(model?.mark_down));
  //   // console.log(model);
  // }, [router.query]);
  //   useEffect(()=>{
  // console.log(metadataParser((model?.mark_down?model?.mark_down:"")));

  //   },[model])
  // console.log(metadataParser((model?.mark_down?model?.mark_down:"")).metadata);
  return (
    <>
      <NextSeo
        title={`${model.title}`}
        description={
          model?.title +
          "by " +
          model?.author +
          JSON.stringify(
            metadataParser(model?.mark_down ? model?.mark_down : "").metadata,
          )
        }
        openGraph={{
          type: "website",
          locale: "en_IE",
          url: `kong2.vercel.app/${model.author}/${model._id}`,
        }}
      />
      {/* {loading &&
      <div className="flex items-center justify-center w-full h-screen">
       <ClipLoader loading={loading} size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  />
      </div>} */}
      { !model.error && <div className="md:overflow-x-hidden">
        <Navbar />
        <div className="">
          <div className="flex flex-col items-center gap-2 px-5 pt-4 md:flex-row">
            <div className="text-xl md:text-2xl">
              <Link href={`/${model?.author}`}>
                <span className="hover:text-blue-700">{model?.author}</span>
              </Link>{" "}
              <span>/</span>
              <Link href={`/${model?.author}/${model._id}`}>
                <span className="font-semibold hover:text-blue-700">
                  {model?.title}
                </span>
              </Link>
            </div>
            <div className="flex items-center justify-center gap-2">
              <div className="flex items-center gap-1 p-1 text-sm border-2 rounded-md">
                <div className="flex items-center pr-1 space-x-1 border-r border-1">
                  <button alt="like" className={`${!user?"cursor-default":""} flex items-center gap-1 `} onClick={likeBtnHandler}>
                    {!likeBtn && <HeartIcon className="w-4" />}
                    {likeBtn && <HeartIconSolid className="w-4" />}
                    <h3>Like</h3>
                  </button>
                  
                </div>
                <h3>{likeCnt}</h3>
              </div>
              <div className="flex items-center gap-1 p-1 text-sm border-2 rounded-md">
                <div className="flex items-center pr-1 space-x-1 border-r border-1">
                  <button alt="downloads" className={`flex items-center gap-1`} onClick={DownloadHandler}>
                    <ArrowDownTrayIcon className="w-4"/>
                    <h3>Downloads</h3>
                  </button>
                  
                </div>
                <h3>{downloadCnt}</h3>
              </div>
            </div>
          </div>
          <div className="">
            <div className="flex flex-wrap items-center justify-center gap-2 p-2 px-4 md:justify-start">
              {model?.tags?.map((category, i) => (
                <Link key={model._id + i} href={`/models?tag=${category}`}>
                  <button alt="tags" 
                    className={`p-2 my-1 rounded-md dark:border-[1px] dark:bg-[rgb(18,18,18)] bg-slate-900 text-white text-xs md:text-sm `}
                  >
                    {category}
                  </button>
                </Link>
              ))}
            </div>
            <div className="w-screen border-[1px] border-b border-slate-700 dark:border-white"></div>
          </div>
        </div>
        <div className="flex flex-col justify-center ">
        
          {/* <div className="h-full border-2 border-b border-gray-500"></div> */}
          <div className="md:w-[80%] w-full md:mx-auto px-1 md:p-20 relative   bg-white dark:bg-[rgb(18,18,18)] md:border-b-[1px] md:border-l-2 md:border-r-2 border-slate-700 dark:border-white">
            
          <span className="prose-sm prose dark:bg-[rgb(18,18,18)] dark:prose-code:text-red-400  prose-slate md:prose-lg max-w-none dark:prose-invert">
            <div className='flex justify-end '> 
              {user?.userID===model?.author && <button onClick={()=>{setEdit(!edit)}} className='p-1 text-white bg-black border-t border-l border-r border-black rounded-md dark:border-white'>{edit?"Save":"Edit"} Card</button>}
            </div> 
               {!edit && <Markdown className='p-5 md:border-[2px] dark:border-white border-black ' rehypePlugins={[rehypeRaw]}  remarkPlugins={[gfm]}    components={MarkComponent}
                     >
                      {
                    metadataParser(modelEdit?  modelEdit : "")
                      .content
                  }
                      </Markdown>} 
                      {edit &&  <textarea className='w-full h-screen min-h-screen bg-red-100 dark:text-white dark:bg-[rgb(18,18,18)]' value={modelEdit} onChange={(e)=>setModelEdit(e.target.value)}/>}
                
              {
                // <Markdown
                //   className="mx-auto dark:bg-[rgb(18,18,18)]"
                  // components={MarkComponent}
                  // remarkPlugins={[gfm]}
                  // rehypePlugins={[rehypeRaw]}
                // >
                  // {
                  //   metadataParser(model?.mark_down ? model?.mark_down : "")
                  //     .content
                  // }
                // </Markdown>
              }
            </span>
          </div>
        </div>
        <div></div>
      </div>}
    </>
  );
}
