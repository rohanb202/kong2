
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Link from 'next/link'
export default function Navbar() {
  return (
    <div className="flex items-center justify-between p-2 ">
        <div className="flex items-center content-center justify-center space-x-10">
            <div className="text-xl">
            <Link href="/">
                Kong
            </Link>
            </div>
        
            
            {/* <form className="max-w-md mx-auto w-80">   
                <label for="default-search" className="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                <div className="relative">
                    <div className="absolute inset-y-0 flex items-center pointer-events-none start-0 ps-3">
                        <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"/>
                        </svg>
                    </div>
                    <input type="search" id="default-search" className="block w-full p-4 text-sm text-gray-900 border border-gray-300 rounded-lg ps-10 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 " placeholder="Search Models ..." required />
                    <button type="submit" className="text-white absolute end-2.5 bottom-2.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Search</button>
                </div>
            </form> */}
            <div className="flex items-center w-full max-w-sm space-x-2">
                <Input type="text" placeholder="Models.." />
                <Button type="submit">Search</Button>
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
  )
}

