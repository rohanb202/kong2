
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
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
  } from "@/components/ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useRouter } from "next/router";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
export default function Navbar() {
    const [user, setUser] = useRecoilState(userState);
    const router=useRouter();
    function handleLogut(){
        setUser(null);
        router.push('/');
    }
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
                <Link href="/models">
                Models
                </Link>
            </div>
            {!user && <div>
                <Link href="/login">
                    Login
                </Link>
            </div>}
            { !user && <div>
                <Link href="/register">
                    Sign Up
                </Link>
            </div>}
           {user && 
           <DropdownMenu>
                <DropdownMenuTrigger>
                    <Avatar className="w-8 h-8 ">
                        <AvatarImage  src="https://github.com/shadcn.png" />
                        <AvatarFallback>K</AvatarFallback>                
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <Link href={`/${user.name}`}>
                            @{user.name}
                        </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                    <Link href={`/models/new`}>
                            + New Model
                        </Link> 
                    </DropdownMenuItem>                    
                    <DropdownMenuItem>
                    <button onClick={handleLogut}>
                            Logout
                    </button> 
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
            }
        </div>
        <Drawer >
            <DrawerTrigger asChild>
                <Button className="md:hidden" variant="outline">
                    <Bars3Icon className="w-5"/>
                 </Button>
            </DrawerTrigger>
            <DrawerContent>
            <div className="flex flex-col items-center p-5 space-y-5 border-b-2">
            {user && 
                <div className="flex flex-col items-center justify-start w-full">                    
                    <Avatar >
                        <AvatarImage  src="https://github.com/shadcn.png" />
                        <AvatarFallback>K</AvatarFallback>
                    </Avatar>
                    <Link href={`/${user.name}`}>
                        <Button className="font-semibold text-black bg-white hover:bg-black/10">                            
                        @{user.name}
                        </Button>
                    </Link>                    
                </div>
            
            }  
            {user && <DrawerClose asChild>
                    <Link href={`/models/new`}>
                        <Button className="w-[90vw] ">                            
                                + New Model
                        </Button>
                    </Link>                
                </DrawerClose>}              
                <DrawerClose asChild>
                    <Link href={'/models'}>
                        <Button className="w-[90vw] ">                            
                                Models
                        </Button>
                    </Link>                
                </DrawerClose>
                {user && <DrawerClose asChild>
                    
                        <Button onClick={handleLogut} className="w-[90vw] ">                            
                                Log out
                        </Button>
                                   
                </DrawerClose>}  
                {!user && <DrawerClose asChild>
                    <Link href={'/login'}>
                        <Button className="w-[90vw] ">                            
                                Login
                        </Button>
                    </Link>                
                </DrawerClose>}
                
               { !user && <DrawerClose asChild>
                    <Link href={'/register'}>
                        <Button className="w-[90vw] ">                            
                                Register
                        </Button>
                    </Link>                
                </DrawerClose>}
                
            </div>
            </DrawerContent>
        </Drawer>
        
    </div>
   
    </>
  )
}

