import VideoPageNavbar from '@/components/Navbar/VideoPageNavbar'
import { FC } from 'react'

interface pageProps {
  params: {
    workspace: string
  }
}

const page: FC<pageProps> = ({params}: pageProps) => {
  const { workspace } = params
  return (
    <div>
    <VideoPageNavbar id='test'/>
    <div>page: {workspace}</div>
    </div>
  )
}

export default page