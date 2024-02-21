"use client";
import { FC } from 'react'
import { usePathname } from "next/navigation";
import Navbar from './Navbar';


interface NavBarControllerProps {
  
}

const NavBarController: FC<NavBarControllerProps> = ({}) => {
    const pathname = usePathname();
    if (pathname.includes("/dashboard/")) {
        return null 
    }

  return (<Navbar />)
}

export default NavBarController