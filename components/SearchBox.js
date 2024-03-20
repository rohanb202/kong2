

import { useRouter } from "next/router";
import { useState ,useEffect ,useCallback} from 'react';
import { Check, ChevronsUpDown } from "lucide-react"
import {Link} from "next/link";
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  
} from "@/components/ui/command"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Input } from "./ui/input"
import useDebounce from "@/utils/UseDebounce"
import ClipLoader from "react-spinners/ClipLoader";
import { ScrollArea } from "@/components/ui/scroll-area"
import {useTheme} from "next-themes";



export default function SearchBox() {
  const {theme}=useTheme();
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [filteredDocuments, setFilteredDocuments] = useState({items:[]});
  const [loading,setLoading]=useState(false);
  const router=useRouter();
  const pathname = router.pathname
  const [searchTerm, setSearchTerm] = useState('');   
  const handleChange = (event) => {  
    setLoading(true);    
    setSearchTerm(event.target.value);
  }
    async function GlobalSearch(){
      try{
        
        const res=await fetch(`/api/models?search=${searchTerm}&doc=all`);
        const data=await res.json();
        setFilteredDocuments(data);

      }catch(e){

      }finally{
        setLoading(false);
      }
        
    }
    
    useDebounce(() => {
        if(!searchTerm){
            setFilteredDocuments({items: []});
            return;
        }

        GlobalSearch(); 
        // console.log(searchTerm);
        // console.log(filteredDocuments);
             
      }, [searchTerm], 800
    );
  useEffect(()=>{
    // console.log(pathname);
    if(!value) return;
    router.push(`/${value}`);
  },[value])
   
  return (    
    <Popover className="" open={open} onOpenChange={setOpen}>
      <PopoverTrigger alt="search" asChild>
        <Button
          alt="searchTrigger"
          aria-label="search?"
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-start md:w-80 w-[80%] "
        >
            Search Models...
         
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 md:w-80">
        <Command alt="search?">
         
          <Input className="border-[1px]  ring-0" value={searchTerm} onChange={handleChange}   placeholder="..."/>
          
          {searchTerm && !loading && <CommandEmpty>No models found.</CommandEmpty>}
          {searchTerm && loading && <CommandEmpty><ClipLoader
                    
                    loading={loading}
                    color={`${theme=='dark'?"#ffffff":"#000000"}`}
                    size={40}
                    aria-label="Loading Spinner"
                    data-testid="loader"
                  /> </CommandEmpty> }
        <ScrollArea className="h-60">
          <CommandGroup>
            {filteredDocuments?.items?.map((data) => (
                
                <CommandList key={data._id}>
                    
                    <CommandItem
                        key={data._id}
                        value={`${data.author}/${data._id}`}
                        onSelect={(currentValue) => {
                        setValue(currentValue === value ? "" : currentValue)
                        setOpen(false)
                        }}
                    >
                        {/* <Check
                        className={cn(
                            "mr-2 h-4 w-4",
                            value === `${data.author}/${data.title}` ? "opacity-100" : "opacity-0"
                        )}
                        /> */}
                        
                        {data.author}/{data.title}
                        
                    </CommandItem>
                    
              </CommandList>
              
            ))}
            
          </CommandGroup>
          </ScrollArea>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
