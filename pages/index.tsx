import type { NextPage } from 'next'
import React, { createContext, memo, useContext, useMemo, useState } from 'react'
import { ClientTable } from '../src/components/ClientTable'
import { useClientData } from '../src/data-hooks/UseClientData'

export type MVCustomerProps = {
}

const MVCustomer = (props: MVCustomerProps) => {
  const clientData = useContext(ClientDataContext);
  return (
    <div>MVCustomer {clientData.clients[0]?.name}</div>
  )
}

const YetAnotherComponent = () => {
  const someData = useContext(SomeDataContext);
  return (
    <div>Some other component {someData}</div>
  )
}


export const ClientDataContext = createContext<{
  isLoaded: boolean;
  error: string | null;
  targetClientToken: string;
  clients: Record<string, any>[];
  dispatchClientData: (action: any) => void
}>({
  isLoaded: false,
  targetClientToken: "111",
  error: null,
  clients: [] as Record<string, any>[],
  dispatchClientData: (aciton: any) => {}
})


export const SomeDataContext = createContext<string>("")


export type ClientDashboardSectionProps = {

}

const ClientDashboardSection = memo<ClientDashboardSectionProps>((props) => {
  console.log(`ClientDashboardSection render function running`)
  return (
    <>
      <ClientTable />
      <MVCustomer />
      <YetAnotherComponent/>
    </>
  )
})

const Home: NextPage = () => {
  const [someData, setSomeData] = useState("some data not related to client")
  const [clientData, dispatchClientData] = useClientData()

  return (
    <ClientDataContext.Provider value={{...clientData, dispatchClientData}}>
      <SomeDataContext.Provider value={someData}>
        <div>
          <input type="text" onChange={(ev) => setSomeData(ev.target.value)}/>
          <ClientDashboardSection />
        </div>
      </SomeDataContext.Provider>
    </ClientDataContext.Provider>
  )
}

export default Home
