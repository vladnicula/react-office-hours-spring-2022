import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { ClientAPI, ClientResponseModel } from '../src/api/clients'
import NextLink from 'next/link'

import { LogoutButtonWrapper } from '../src/containers/LogoutButton/LogoutButtont'
import { InvalidUserTokenError, InvoiceAPI } from '../src/api/invoice-api-backend'
import { handle401Erorr } from '../src/utils/serverside-401-handler'
import { ClientTable } from '../src/containers/ClientTableContainer'
import { ErrorBoundary } from '../src/containers/ErrorBoundry/ErrorBoundry'
import { AuthContextProvider } from '../src/contexts/AuthContextProvider'

export const MainNavigation = () => {  
  return (
    <div>
      <NextLink href="/">Home</NextLink>
      <NextLink href="/clients">Clients</NextLink>
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
    <ErrorBoundary>
      <AuthContextProvider>
          <ErrorBoundary>
          <MainNavigation /> 
          <ClientTable initialPayload={props} />
          </ErrorBoundary>
      </AuthContextProvider>
    </ErrorBoundary>
  )
}

export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAuthToken = context.req.cookies.userToken as string
  const { res } = context

  try {
    InvoiceAPI.instance.setup(userAuthToken)
    const clientResponse = await ClientAPI.getClients({
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

  } catch (err) {
      if ( err instanceof InvalidUserTokenError) {
        return handle401Erorr(context)
      }      
  }

  return {
    props: {},
  }
}


export default Home
