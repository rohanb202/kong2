
import { Button } from "@/components/ui/button"

import Link from 'next/link'
import SearchBox from "./SearchBox"
import {Bars3Icon} from "@heroicons/react/24/outline";
import {
  Drawer,
  DrawerClose,
  DrawerContent, 
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
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import {useTheme} from"next-themes";

export default function Navbar() {
    const [user, setUser] = useRecoilState(userState);
    const {theme,setTheme}=useTheme();
   
    const router=useRouter();
    function handleLogut(){
        setUser(null);
        router.push('/');
        
    }
  return (
    <>
    <div className="flex items-center justify-between p-4 space-x-2 overflow-hidden bg-white border-b-2 dark:bg-[rgb(18,18,18)]">
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
            <div className="flex items-center space-x-2">
                <Label htmlFor="airplane-mode">Theme</Label>
                <Switch aria-label="switch-theme" alt="switch-theme" onClick={()=>{setTheme(theme=='dark'?'light':'dark')}} id="theme-switch" />
                
            </div>          
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
                        <AvatarImage alt="profileImg" src="https://github.com/shadcn.png" />
                        <AvatarFallback>K</AvatarFallback>                
                    </Avatar>
                </DropdownMenuTrigger>
                <DropdownMenuContent>
                    <DropdownMenuLabel>
                        <Link href={`/${user.userID}`}>
                            @{user.userID}
                        </Link>
                    </DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                    <Link href={`/models/new`}>
                            + New Model
                        </Link> 
                    </DropdownMenuItem> 
                                      
                    <DropdownMenuItem>
                    <button alt="logout" onClick={handleLogut}>
                            Logout
                    </button> 
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
            
            }
        </div>
        <Drawer >
            <DrawerTrigger asChild>
                <Button alt="menu" className="md:hidden" variant="outline">
                    <Bars3Icon className="w-5"/>
                 </Button>
            </DrawerTrigger>
            <DrawerContent>
            <div className="flex flex-col items-center p-5 space-y-5 border-b-2">
            {user && 
                <div className="flex flex-col items-center justify-start w-full">                    
                    <Avatar >
                        <AvatarImage alt="profileImg"  src="https://github.com/shadcn.png" />
                        <AvatarFallback>K</AvatarFallback>
                    </Avatar>
                    <Link href={`/${user.userID}`}>
                        <Button alt="userID" className="mt-2 font-semibold text-black bg-white hover:bg-black/10">                            
                        @{user.userID}
                        </Button>
                    </Link>                    
                </div>
            
            }  
            <div className="flex items-center space-x-2">
                        <Label htmlFor="airplane-mode">Theme</Label>
                        <Switch aria-label="switch-theme" alt="switch-theme" onClick={()=>{setTheme(theme=='dark'?'light':'dark')}} id="theme-switch" />
                        
                    </div>  
            {user && <DrawerClose asChild>
                    <Link href={`/models/new`}>
                        <Button alt="add new model" className="w-[90vw] ">                            
                                + New Model
                        </Button>
                    </Link>                
                </DrawerClose>}    
                          
                <DrawerClose asChild>
                    <Link href={'/models'}>
                        <Button alt="Models" className="w-[90vw] ">                            
                                Models
                        </Button>
                    </Link>                
                </DrawerClose>
                {user && <DrawerClose asChild>
                    
                        <Button alt="logout" onClick={handleLogut} className="w-[90vw] ">                            
                                Log out
                        </Button>
                                   
                </DrawerClose>}  
                {!user && <DrawerClose asChild>
                    <Link href={'/login'}>
                        <Button alt="login" className="w-[90vw] ">                            
                                Login
                        </Button>
                    </Link>                
                </DrawerClose>}
                
               { !user && <DrawerClose asChild>
                    <Link href={'/register'}>
                        <Button alt="register" className="w-[90vw] ">                            
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

