import { Breadcrumbs, Link, Typography } from '@mui/material'
import type { NextPage, GetServerSideProps } from 'next'
import NextLink from 'next/link'
import React, { memo, useEffect } from 'react'
import { ClientAPI, ClientResponseModel } from '../src/api/clients'
import { ClientTable } from '../src/containers/ClientTableContainer'
import { AuthContextProvider } from '../src/contexts/AuthContextProvider'
import { ClientDataProvider } from '../src/contexts/ClientDataProvider'



type ClientPageProps = {
  clients: ClientResponseModel[],
  total: number
}

const SomeMemoCompoent = memo(() => {
  return (
    <Breadcrumbs aria-label="breadcrumb">
    <NextLink href="/">
      <Link underline="hover" color="inherit" href="/">
        Dashboard
      </Link>
    </NextLink>
    <Typography color="text.primary">Clients</Typography>
  </Breadcrumbs>
  )
})

const ClientPage: NextPage<ClientPageProps> = (props) => {
  useEffect(() => {
    console.log("ClientPage mounts")
    return () => {
      console.log("ClientPage unmounts")
    }
  }, [])

  useEffect(() => {
    console.log("porps have updated")
    // @ts-ignore
  }, [...Object.keys(props).map((key) => props[key])])
  
  return (
    <AuthContextProvider>
        <ClientDataProvider>
          <SomeMemoCompoent />
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

export default ClientPage
