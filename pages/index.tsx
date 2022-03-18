import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { ClientAPI, ClientResponseModel } from '../src/api/clients'
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


type ClientPageProps = {
  clients: ClientResponseModel[],
  total: number
}

const Home: NextPage<ClientPageProps> = (props) => {
  return (
    <AuthContextProvider>
      <ClientDataProvider>
        <MainNavigation /> 
        <ClientTable initialPayload={props} />
      </ClientDataProvider>
    </AuthContextProvider>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAuthToken = context.req.cookies.userToken as string

  const clientResponse = await ClientAPI.getClients(userAuthToken, {
    order: "asc",
    orderBy: "email",
    limit: 2,
    offset: (parseInt(context.query?.page as string, 10) - 1 ?? 1) * 2
  })

  return {
    props: {
      clients: clientResponse.clients,
      total: clientResponse.total
    }, // will be passed to the page component as props
  }
}


export default Home
