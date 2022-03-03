import type { NextPage } from 'next'
import React from 'react'
import { ClientTable } from '../src/components/ClientTable'
import { AuthContextProvider } from '../src/contexts/AuthContextProvider'
import { ClientDataProvider } from '../src/contexts/ClientDataProvider'

const ClientPage: NextPage = () => {
  return (
    <AuthContextProvider>
        <ClientDataProvider>
            <ClientTable />
        </ClientDataProvider>
    </AuthContextProvider>
  )
}

export default ClientPage
