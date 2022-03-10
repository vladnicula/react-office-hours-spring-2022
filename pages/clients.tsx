import { Breadcrumbs, Link, Typography } from '@mui/material'
import type { NextPage } from 'next'
import NextLink from 'next/link'
import React from 'react'
import { ClientTable } from '../src/components/ClientTable'
import { AuthContextProvider } from '../src/contexts/AuthContextProvider'
import { ClientDataProvider } from '../src/contexts/ClientDataProvider'

const ClientPage: NextPage = () => {
  return (
    <AuthContextProvider>
        <ClientDataProvider>
        <Breadcrumbs aria-label="breadcrumb">
          <NextLink href="/">
            <Link underline="hover" color="inherit" href="/">
              Dashboard
            </Link>
          </NextLink>
          <Typography color="text.primary">Clients</Typography>
        </Breadcrumbs>
            <ClientTable />
        </ClientDataProvider>
    </AuthContextProvider>
  )
}

export default ClientPage
