import { useRouter } from "next/router";

import { useCallback ,useState,useEffect} from "react";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
  } from "@/components/ui/pagination"
import Link from 'next/link';
export default function PaginationElement({page,totalDoc,perPage}) {
  const router = useRouter();
  const pathname = router.pathname
  const searchParams = router.query;
  const [select,setSelect]=useState();
  useEffect(()=>{    
    if(!select)return;
    router.push(pathname + '?' + createQueryString('page', select))
    console.log(select);
  },[select])
    // Get a new searchParams string by merging the current
  // searchParams with a provided key/value pair
  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams)
      params.set(name, value)
      
      return params.toString()
    },
    [searchParams]
  )



  let prevPage=page-1>0?page-1:1;  
  const totalPages=Math.ceil(totalDoc/perPage);
  let nextPage=totalPages<=page+1?totalPages:page+1;
  // console.log(page);
  const generatePageNumbers = () => {
    const pageNumbers = [];
    let currentPage=(page-3<=0)?1:page-3;
    let maxiPage=(currentPage==1?page+3:currentPage+3);
    for (let i = currentPage; i <=Math.min(page+3, totalPages); i++) {
      pageNumbers.push(i);
    }
    
    return pageNumbers;
  };
    return (
      <Pagination>
        <PaginationContent className="cursor-pointer">
          <PaginationItem onClick={()=>{setSelect(prevPage)}}>
            <PaginationPrevious  />
          </PaginationItem>
          
          {(page>5)?<PaginationItem>
            <PaginationLink onClick={()=>{setSelect(1)}}>{1}</PaginationLink>
          </PaginationItem>:null}
          {(page>5)?<PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>:null}
          {
            generatePageNumbers().map((pageNumber)=>(
              
              <PaginationItem  key={pageNumber}>
                  <PaginationLink className={`${page==pageNumber?"bg-neutral-100 rounded-md":""}`} onClick={()=>{setSelect(pageNumber)}} >
                    {pageNumber}
                  </PaginationLink>
              </PaginationItem>
            ))
          }
          
          {(page+3>=totalPages)?null:<PaginationItem>
            <PaginationEllipsis />
          </PaginationItem>}
          {(page+3>=totalPages)?null:<PaginationItem>
            <PaginationLink onClick={()=>{setSelect(totalPages)}}>{totalPages}</PaginationLink>
          </PaginationItem>}
          <PaginationItem>
            <PaginationNext onClick={()=>{setSelect(nextPage)}} />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    )
  }  