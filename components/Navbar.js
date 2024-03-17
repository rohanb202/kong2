
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
import SearchBox from "./SearchBox"
import {Bars3Icon} from "@heroicons/react/24/outline";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer"

export default function Navbar() {
  return (
    <>
    <div className="flex items-center justify-between p-4 space-x-2 border-b-2 ">
        <div className="flex items-center content-center justify-center space-x-10">
            <div className="text-xl font-bold">
                <Link href="/">
                    Kong
                </Link>
            </div>            
            <div className="hidden w-full max-w-sm md:block">                
                <SearchBox/>
            </div>
 
        </div>
        <div className="block w-full max-w-sm md:hidden">                
                <SearchBox/>
        </div>
        <div className="items-center hidden space-x-10 md:flex">
            <div>
                Explore
            </div>
            <div>
                <Link href="/models">
                Models
                </Link>
            </div>
            <div>
                Login
            </div>
            <div>
                Sign Up
            </div>
        </div>
        <Drawer >
            <DrawerTrigger asChild>
                <Button className="md:hidden" variant="outline">
                    <Bars3Icon className="w-5"/>
                 </Button>
            </DrawerTrigger>
            <DrawerContent>
            <div className="flex flex-col items-center p-5 space-y-5 border-b-2">
                <div>
                    Explore
                </div>
                <DrawerClose asChild>
                    <Link href={'/models'}>
                        <Button className="w-[90vw] ">                            
                                Models
                        </Button>
                    </Link>                
                </DrawerClose>
                <div>
                    Login
                </div>
                <div>
                    Sign Up
                </div>
            </div>
            </DrawerContent>
        </Drawer>
        
    </div>
   
    </>
  )
}

