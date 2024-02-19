import { FC } from 'react'

interface pageProps {
  params: {
    workspace: string
  }
}

const page: FC<pageProps> = ({params}: pageProps) => {
  const { workspace } = params
  return <div>page: {workspace}</div>
}

export default page