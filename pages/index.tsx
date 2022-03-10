import type { NextPage } from 'next'
import React from 'react'
import { ClientTable } from '../src/containers/ClientTableContainer'
import { LogoutButtonWrapper } from '../src/containers/LogoutButton/LogoutButtont'
import { AuthContextProvider } from '../src/contexts/AuthContextProvider'
import { ClientDataProvider } from '../src/contexts/ClientDataProvider'

const MainNavigation = () => {
  return (
    <div>
      <LogoutButtonWrapper/>
    </div>
  )
}


const Home: NextPage = () => {
  return (
    <AuthContextProvider>
      <ClientDataProvider>
        <MainNavigation /> 
        <ClientTable />
      </ClientDataProvider>
    </AuthContextProvider>
  )
}

export default Home
