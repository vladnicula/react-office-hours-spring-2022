import type { GetServerSideProps, NextPage } from 'next'
import React from 'react'
import { ClientAPI, ClientResponseModel, InvalidUserTokenError } from '../src/api/clients'
import { ClientTable } from '../src/containers/ClientTableContainer'
import { ErrorBoundary } from '../src/containers/ErrorBoundry/ErrorBoundry'
import { LogoutButtonWrapper } from '../src/containers/LogoutButton/LogoutButtont'
import { AuthContextProvider } from '../src/contexts/AuthContextProvider'
import NextLink from 'next/link'

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

    const clientResponse = await ClientAPI.getClients(userAuthToken, {
      res,
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
        context.res.setHeader(
            "Set-Cookie", [
            `WebsiteToken=deleted; Max-Age=0`,
            `AnotherCookieName=deleted; Max-Age=0`]
        );

        return {
          redirect: {
            permanent: false,
            destination: "/login"
          }
        }
      }      
  }

  return {
    props: {},
  }
}


export default Home;
