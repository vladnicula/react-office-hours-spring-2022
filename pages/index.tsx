import type { NextPage } from 'next'

import classNames from 'classnames'

type ClientTableRowItemProps = {
  name: string
  email: string
  companyDetails: {
    name: string
    totalBilled: number
  }
}

const ClientTableRowItem = (props: ClientTableRowItemProps) => {

  const totalBilledClasses = classNames(
    "text-left font-medium", 
    props.companyDetails.totalBilled > 5000 ? "text-green-500" : "text-red-500"
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
                <svg xmlns="http://www.w3.org/2000/svg" className="cursor-pointer" width="16" height="16" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round">
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

const Home: NextPage = () => {
  return (
    <section className="antialiased bg-gray-100 text-gray-600 h-screen px-4">
    <div className="flex flex-col justify-center h-full">
        <div className="w-full max-w-2xl mx-auto bg-white shadow-lg rounded-sm border border-gray-200">
            <header className="px-5 py-4 border-b border-gray-100">
                <h2 className="font-semibold text-gray-800">Customers</h2>
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
                              <ClientTableRowItem 
                                name={'Jane Cooper'}
                                email={'jane.cooper@example.com'}
                                companyDetails={{
                                  name: "Acme",
                                  totalBilled: 3000
                                }}
                              />
                              <ClientTableRowItem 
                                name={'Jane Cooper'}
                                email={'jane.cooper@example.com'}
                                companyDetails={{
                                  name: "Acme",
                                  totalBilled: 30000
                                }}
                              />
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>
  )
}

export default Home
