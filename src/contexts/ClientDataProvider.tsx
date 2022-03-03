import { createContext, useContext } from "react"
import { useClientData } from "../data-hooks/UseClientData"
import { AuthContext } from "./AuthContextProvider"

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
  
export const ClientDataProvider = (props: {
    children?: React.ReactNode;
}) => {
    const {authUserToken} = useContext(AuthContext)
    const [clientData, dispatchClientData] = useClientData(authUserToken)
    return (
        <ClientDataContext.Provider value={{...clientData, dispatchClientData}}>
        {props.children}
        </ClientDataContext.Provider>
    )
}