

import { useEffect, useState } from "react"
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
import { useRouter } from "next/router";

const frameworks = [
    {
      value: "next.js",
      label: "Next.js",
    },
    {
      value: "sveltekit",
      label: "SvelteKit",
    },
    {
      value: "nuxt.js",
      label: "Nuxt.js",
    },
    {
      value: "remix",
      label: "Remix",
    },
    {
      value: "astro",
      label: "Astro",
    },
  ]

export default function SearchBox() {
  const [open, setOpen] = useState(false)
  const [value, setValue] = useState("")
  const [filteredDocuments, setFilteredDocuments] = useState({items:[]});
  const router=useRouter();
  const pathname = router.pathname
  const [searchTerm, setSearchTerm] = useState('');   
  const handleChange = (event) => {      
    setSearchTerm(event.target.value);
  }
    async function GlobalSearch(){
        const res=await fetch(`/api/models?search=${searchTerm}`);
        const data=await res.json();
        setFilteredDocuments(data);
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
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="justify-start md:w-80 w-[80%] "
        >
            Search Models...
         
        </Button>
      </PopoverTrigger>
      <PopoverContent className="p-0 md:w-80">
        <Command>
         
          <Input className="border-0 ring-0" value={searchTerm} onChange={handleChange}   placeholder="Search Models..."/>
          
          {searchTerm && <CommandEmpty>No models found.</CommandEmpty>}
          <CommandGroup>
            {filteredDocuments?.items?.map((data) => (
                
                <CommandList>
                    
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
        </Command>
      </PopoverContent>
    </Popover>
  )
}
