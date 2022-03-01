import type { NextPage } from 'next'
import React, { createContext, memo, useContext, useEffect, useMemo, useState } from 'react'
import { ClientTable } from '../src/components/ClientTable'
import { LoginForm } from '../src/containers/LoginForm/LoginForm'
import { useClientData } from '../src/data-hooks/UseClientData'

export const ClientDataContext = createContext<{
  isLoaded: boolean;
  error: string | null;
  clients: Record<string, any>[];
  dispatchClientData: (action: any) => void
}>({
  isLoaded: false,
  error: null,
  clients: [] as Record<string, any>[],
  dispatchClientData: (aciton: any) => {}
})

const Home: NextPage = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [authUserToken, setAuthUserToken] = useState<null | string>(null)
  const [clientData, dispatchClientData] = useClientData(authUserToken)

  useEffect(() => {
    const userToken = window.localStorage.getItem("userToken")
    if ( userToken ) {
      setAuthUserToken(userToken)
    }
    setIsLoading(false)
  }, [])

  if ( isLoading ) {
    return <>Loading</>
  }


  return (
    <ClientDataContext.Provider value={{...clientData, dispatchClientData}}>
        {authUserToken ? <ClientTable /> : <LoginForm onSuccessfulLogin={(token: string) => {
          setAuthUserToken(token);
          window.localStorage.setItem("userToken", token)
        }} />}
    </ClientDataContext.Provider>
  )
}

export default Home
