"use client"
import { Inter } from 'next/font/google'
import NavbarUnique from '../Navbar/page'
import { usePathname } from 'next/navigation'

const inter = Inter({ subsets: ['latin'] })

export default  function Layout({ children }) { 

 const pathName = usePathname();
//  console.log(pathName) 
 return (
 <div>
   {pathName !== '/Components/Add_Agencies' ? 
   <NavbarUnique />
    : ''}
      <div className={inter.className}>{children}</div>
 </div>

 
  )
}



