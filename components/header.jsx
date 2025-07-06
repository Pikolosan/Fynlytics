import React from 'react'
import { Button } from './ui/button'
import { LayoutDashboard, PenBox } from 'lucide-react'
import Link from 'next/link'

const Header = () => {
  return (
    <div className='fixed top-0 w-full bg-white/80 backdrop-blur-md z-50 border-b'>
        <nav className='container mx-auto px-4 py-4 flex items-center justify-between'>
            <Link href="/">
                <h1 className="logo">Finlytics</h1>
            </Link>
            <div className='flex items-center space-x-4'>
                <Link href={"/dashboard"} className='text-gray-600 hover:text-blue-900 flex items-center gap-2'>
                    <Button variant="outline" >
                        <LayoutDashboard size={18}/>
                        <span className='hidden md:inline'>Dashboard</span>
                    </Button>
                </Link>
                <Link href={"/trasaction/create"}> 
                    <Button className='flex items-center gap-2'>
                        <PenBox size={18}/>
                        <span className='hidden md:inline'>Add Transaction</span>
                    </Button>
                </Link>
            </div>
        </nav>
        
    </div>
  )
}

export default Header