import { InvoiceAPI } from "./invoice-api-backend";

export type ClientParams = {
    email: string,
    clientName: string,
    companyName: string,
    companyAddress: string,
    companyTaxNumber: string,
    companyRegNumber: string
};

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

export const ClientAPI = {

    createClient: async (authToken: string, params: ClientParams) => {
        const payload = {
            email: params.email,
            name: params.clientName,
            companyDetails: {
                name: params.companyName,
                address: params.companyAddress,
                vatNumber: params.companyTaxNumber,
                regNumber: params.companyRegNumber,
            }
        }

        InvoiceAPI.instance.httpRequester.post("/clients", payload)
    },
    
    getClients: async (params: {
        order: "asc" | "desc",
        orderBy: "email" | "invoiceCount",
        limit: number,
        offset: number
    }) => {
        // TODO check and allow non filtered or sorted use

        const queryParams = {
            sort: {
                [params.orderBy]: params.order,
            },
            limit: params.limit,
            offset: params.offset
        }
    
        const encodeParamsString = encodeURIComponent(JSON.stringify(queryParams));

        const httpResponse = await InvoiceAPI.instance.httpRequester.get(`/clients?params=${encodeParamsString}`)

        return httpResponse.data as {
            type: "success",
            total: number,
            clients: ClientResponseModel[]
        }
    }
}
