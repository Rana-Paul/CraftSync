import { FC } from 'react'
import { getServerSession } from "next-auth/next";
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation'
import Dashboard from '@/components/dashboard/Dashboard';



const page: FC = async() => {

  return (
    <Dashboard />
  )
}

export default page