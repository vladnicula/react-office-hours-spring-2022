import { Pagination, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TableSortLabel } from '@mui/material';
import { Box } from '@mui/system';
import { memo, useContext, useEffect, useState } from 'react';
import { useRouter } from 'next/router'
import { visuallyHidden } from '@mui/utils';
import { AuthContext } from '../../contexts/AuthContextProvider';
import { ClientAPI } from '../../api/clients';

export type ClientTableRowItemProps = {
    name: string
    email: string
    companyDetails: {
      name: string
      totalBilled: number
      invoicesCount: number
    }
  }
  
export const ClientTableRowItem = (props: ClientTableRowItemProps) => {
  
    return (
        <TableRow
            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
        >
            <TableCell component="th" scope="row">
            {props.name}
            </TableCell>
            <TableCell align="left">{props.email}</TableCell>
            <TableCell align="left">{props.companyDetails.name}</TableCell>
            <TableCell align="left">{props.companyDetails.totalBilled}</TableCell>
            <TableCell align="left">{props.companyDetails.invoicesCount}</TableCell>
        </TableRow>
    )    
}

export type ClientTableProps = {
    initialPayload?: {
        clients: ClientResponseModel[],
        total: number
    }
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


type HeadCell = {
    disablePadding: boolean;
    id?: ClientSortBy;
    label: string;
    numeric: boolean;
}

const headCells: readonly HeadCell[] = [
    {
        numeric: false,
        disablePadding: true,
        label: 'Name',
    },
    {
        id: 'email',
        numeric: false,
        disablePadding: true,
        label: 'Email',
    },
    {
        numeric: false,
        disablePadding: true,
        label: 'Company Name',
    },
    {
        numeric: false,
        disablePadding: true,
        label: 'Total Billed',
    },
    {
        id: 'invoiceCount',
        numeric: true,
        disablePadding: false,
        label: 'Invoice Count',
    },
];

type EnhancedTableProps = {
    onRequestSort: (event: React.MouseEvent<unknown>, property?: ClientSortBy) => void;
    order: Order;
    orderBy: string;
    rowCount: number;
  }

const EnhancedTableHead = (props: EnhancedTableProps) => {
    const { order, orderBy, rowCount, onRequestSort } =
      props;
    const createSortHandler =
      (property?: ClientSortBy) => (event: React.MouseEvent<unknown>) => {
        onRequestSort(event, property);
      };
  
    return (
      <TableHead>
        <TableRow>
          {headCells.map((headCell) => (
            <TableCell
              key={headCell.id ?? headCell.label}
              align={'left'}
              padding={headCell.disablePadding ? 'none' : 'normal'}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              {
                  headCell?.id ? (<TableSortLabel
                    active={orderBy === headCell.id}
                    direction={orderBy === headCell.id ? order : 'asc'}
                    onClick={createSortHandler(headCell?.id)}
                  >
                    {headCell.label}
                    {orderBy === headCell.id ? (
                        // TODO read about visuallyHidden
                      <Box component="span" sx={visuallyHidden}>
                        {order === 'desc' ? 'sorted descending' : 'sorted ascending'}
                      </Box>
                    ) : null}
                  </TableSortLabel>) : (<span>{headCell.label}</span>)
              }
              
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    );
  }

type Order = 'asc' | 'desc'
type ClientSortBy = 'email' | 'invoiceCount'

export type ClientResponseModel = {
    id: string;
    email: string;
    name: string;
    totalBilled: number;
    invoicesCount: number;   
    companyDetails: {
        name: string;
        address: string;
        vatNumber: string;
        regNumber: string;
    };
}

export const ClientTable = memo<ClientTableProps>((props) => {
    const router = useRouter();

    // TODO probaly a good place to typecheck
    const currentPageNumber = router.query.page 
        ? parseInt(router.query.page as string, 10)
        : 1

    const clientsArray = props.initialPayload?.clients ?? [];
    const totalClients = props.initialPayload?.total ?? 0;

    const [limit, setLimit] = useState(2);
    const [order, setOrder] = useState<Order>('asc');
    const [orderBy, setOrderBy] = useState<ClientSortBy>('email');
    
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

    const content = clientsArray ? clientsArray.map((client) => {
        return (
            <ClientTableRowItem 
                key={client.email}
                name={client.name}
                email={client.email}
                companyDetails={{
                    name: client.companyDetails.name,
                    totalBilled: client.totalBilled,
                    invoicesCount: client.invoicesCount
                }}
            />
        )
    }) : null;

    /**
     * <EnhancedTableHead
              numSelected={selected.length}
              order={order}
              orderBy={orderBy}
              onSelectAllClick={handleSelectAllClick}
              onRequestSort={handleRequestSort}
              rowCount={rows.length}
            />
     */
    const handleRequestSort = (
        event: React.MouseEvent<unknown>,
        property?: ClientSortBy,
        ) => {
            if (!property) {
                return;
            }
            const isAsc = orderBy === property && order === 'asc';
            setOrder(isAsc ? 'desc' : 'asc');
            setOrderBy(property);
    };

    const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
        router.push(`/clients?page=${value}`)
    }
        
    return (
        <div className="w-full max-w-2xl bg-white shadow-lg rounded-sm border border-gray-200">
            <div className="p-3">
                <div className="overflow-x-auto">
                <TableContainer component={Paper}>
                    <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    {/* <TableHead>
                        <TableRow>
                            <TableCell>Client Name</TableCell>
                            <TableCell align="right">Email</TableCell>
                            <TableCell align="right">Company Name</TableCell>
                            <TableCell align="right">Total Billed</TableCell>
                            <TableCell align="right">Invoice Count</TableCell>
                        </TableRow>
                    </TableHead> */}
                    <EnhancedTableHead
                        order={order}
                        orderBy={orderBy}
                        onRequestSort={handleRequestSort}
                        rowCount={4}
                    />
                    <TableBody>
                        {/* {
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
                        } */}
                        {content}
                        </TableBody>
                    </Table>
                    </TableContainer>
                        
                    <span>
                        total page count {Math.ceil(totalClients / limit)} <br/>
                        current page { currentPageNumber }
                    </span>
                    <Pagination
                        count={Math.ceil(totalClients / limit)} 
                        page={currentPageNumber} 
                        onChange={handlePaginationChange} 
                        shape="rounded" 
                    />
                </div>
            </div>
        </div>
    )
})
