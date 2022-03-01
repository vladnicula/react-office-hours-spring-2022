import classNames from 'classnames'
import { memo, useContext, useEffect, useLayoutEffect, useState } from 'react';
import { ClientDataContext } from '../../../pages';

export type ClientTableRowItemProps = {
    name: string
    email: string
    companyDetails: {
      name: string
      totalBilled: number
    }
  }
  
export const ClientTableRowItem = (props: ClientTableRowItemProps) => {
  
    const totalBilledClasses = classNames(
      "text-left font-medium", 
      props.companyDetails.totalBilled > 0 ? "text-green-500" : "text-red-500"
    )
    
    return (
      <tr>
        <td className="px-2 py-4 whitespace-nowrap">
            <div className="flex items-center">
              <div className="flex-shrink-0 h-10 w-10">
                <img className="h-10 w-10 rounded-full" src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&amp;ixid=eyJhcHBfaWQiOjEyMDd9&amp;auto=format&amp;fit=facearea&amp;facepad=4&amp;w=256&amp;h=256&amp;q=60" alt=""/>
              </div>
              <div className="ml-4">
                <div className="text-sm font-medium text-gray-900">
                  {props.name}
                </div>
                <div className="text-sm text-gray-500">
                  {props.email}
                </div>
              </div>
            </div>
          </td>
          <td className="p-2 whitespace-nowrap">
              <div className="text-left">{props.companyDetails.name}</div>
          </td>
          <td className="p-2 whitespace-nowrap">
              <div className={totalBilledClasses}>${props.companyDetails.totalBilled}</div>
          </td>
          <td className="p-2 whitespace-nowrap">
              <div className="text-lg text-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="16" height="16" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                      <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                      <circle cx="12" cy="12" r="1"></circle>
                      <circle cx="12" cy="19" r="1"></circle>
                      <circle cx="12" cy="5" r="1"></circle>
                  </svg>
              </div>
          </td>
      </tr>
    );
  }

export type ClientTableProps = {
}

export type ErrorMessageProps = {
    message: string
}

export const ErrorMessage = (props: ErrorMessageProps) => {
    return (
        <div className="flex gap-4 bg-red-500 p-4 rounded-md">
            <div className="w-max">
                <div className="h-10 w-10 flex rounded-full bg-gradient-to-b from-red-100 to-red-300 text-red-700">
                    <span className="material-icons material-icons-outlined m-auto" style={{fontSize:20}}>
                        <svg xmlns="http://www.w3.org/2000/svg"  width="24" height="24" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                            <path d="M4 8v-2a2 2 0 0 1 2 -2h2"></path>
                            <path d="M4 16v2a2 2 0 0 0 2 2h2"></path>
                            <path d="M16 4h2a2 2 0 0 1 2 2v2"></path>
                            <path d="M16 20h2a2 2 0 0 0 2 -2v-2"></path>
                            <path d="M9 10h.01"></path>
                            <path d="M15 10h.01"></path>
                            <path d="M9.5 15.05a3.5 3.5 0 0 1 5 0"></path>
                        </svg>
                    </span>
                </div>
            </div>
            <div className="space-y-1 text-sm">
                <h6 className="font-medium text-white">Error</h6>
                <p className="text-red-100 leading-tight">{props.message}</p>
            </div>
        </div>
    )
}

export const ClientTable = memo<ClientTableProps>((props) => {
    console.log("render ClientTable")
    const clientData = useContext(ClientDataContext);

    const loadingMask = (
        <tr>
            <td colSpan={4}>
                <div style={{ height: 400 }} className='flex flex-col items-center justify-center'>
                    <svg className="text-black animate-spin -ml-1 mr-3 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>       
                </div>                   
            </td>
        </tr>
    )

    const content = clientData.clients ? clientData.clients.map((client) => {
        return (
            <ClientTableRowItem 
                key={client.email}
                name={client.name}
                email={client.email}
                companyDetails={{
                    name: client.companyDetails.name,
                    totalBilled: client.totalBilled
                }}
            />
        )
    }) : null;

    return (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100 flex">
                <h2 className="font-semibold text-gray-800 flex-1">Customers</h2>
            </header>
            <div className="p-3">
                <div className="overflow-x-auto">
                    <table className="table-auto w-full">
                        <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                            <tr>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Client Name</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Company Name</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    <div className="font-semibold text-left">Total Billed</div>
                                </th>
                                <th className="p-2 whitespace-nowrap">
                                    
                                </th>
                            </tr>
                        </thead>
                        <tbody className="text-sm divide-y divide-gray-100">
                            {
                                clientData.error 
                                ? (
                                    <tr>
                                        <td colSpan={4}>
                                            <ErrorMessage message={clientData.error} />
                                        </td>
                                    </tr>
                                )
                                : 
                                    clientData.isLoaded 
                                    ? content
                                    : loadingMask
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
})
