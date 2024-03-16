
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
export default function Navbar() {
  return (
    <>
    <div className="flex items-center justify-between p-4 border-b-2 ">
        <div className="flex items-center content-center justify-center space-x-10">
            <div className="text-xl">
            <Link href="/">
                Kong
            </Link>
            </div>            
            <div className="flex items-center w-full max-w-sm space-x-2">
                <Input  type="text" placeholder="Models.." />
                <Button className="bg-slate-700" type="submit">Search</Button>
            </div>
 
        </div>
        <div className="flex items-center space-x-10">
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
        
    </div>
   
    </>
  )
}

