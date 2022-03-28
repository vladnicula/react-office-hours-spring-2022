import { Breadcrumbs, Link, Typography } from '@mui/material'
import type { NextPage, GetServerSideProps } from 'next'
import NextLink from 'next/link'
import React, { memo, useEffect } from 'react'
import { ClientAPI, ClientResponseModel } from '../src/api/clients'
import { InvalidUserTokenError, InvoiceAPI } from '../src/api/invoice-api-backend'
import { ClientTable } from '../src/containers/ClientTableContainer'
import { AuthContextProvider } from '../src/contexts/AuthContextProvider'
import { handle401Erorr } from '../src/utils/serverside-401-handler'


type ClientPageProps = {
  clients: ClientResponseModel[],
  total: number
}

const ClientPage: NextPage<ClientPageProps> = (props) => {    
  return (
    <AuthContextProvider>
        <Breadcrumbs aria-label="breadcrumb">
            <NextLink href="/">
              <Link underline="hover" color="inherit" href="/">
                Dashboard
              </Link>
            </NextLink>
            <Typography color="text.primary">Clients</Typography>
          </Breadcrumbs>  
          <ClientTable initialPayload={props} />
    </AuthContextProvider>
  )
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const userAuthToken = context.req.cookies.userToken as string

  InvoiceAPI.instance.setup(userAuthToken)

  try {
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
    console.log(err)
    if ( err instanceof InvalidUserTokenError) {
      return handle401Erorr(context)
    } 
  }

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
    props: {}
  }
  
}

export default ClientPage
