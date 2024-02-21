import WorkSpace from '@/components/Workspace/Workspace'
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
    <WorkSpace id={workspace}/>
    </div>
  )
}

export default page