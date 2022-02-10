import type { NextPage } from 'next'
import { useEffect, useState } from 'react'
import { ClientTable } from '../src/components/ClientTable'

const Home: NextPage = () => {
  const [isVisibile, setIsVisbile] = useState(true)
  return (
    <div>
      <button onClick={() => {
        setIsVisbile((s) => !s)
      }}>Toggle</button>
      {isVisibile ? <ClientTable /> : null}
    </div>
  )
}

export default Home
