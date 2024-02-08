import { FC } from 'react'
import { getServerSession } from "next-auth/next";
import { authOptions } from '../api/auth/[...nextauth]/route';
import { redirect } from 'next/navigation'
import Dashboard from '@/components/dashboard/Dashboard';



const page: FC = async() => {
    const session = await getServerSession(authOptions)
    if (!session) {
        return redirect("/api/auth/signin")
    }
  return (
    <Dashboard />
  )
}

export default page