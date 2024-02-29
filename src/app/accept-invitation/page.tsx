import { FC } from 'react'

interface pageProps {
    searchParams: {
        [key: string]: string | string[] | undefined
      }
}

const page: FC<pageProps> = ({ searchParams }: pageProps) => {
    const code = searchParams.code
  const id = searchParams.id
  const name = searchParams.name
    console.log("code: ", code, "id: ", id);
    
  return <div>page</div>
}

export default page