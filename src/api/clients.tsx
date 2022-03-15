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

        const httpResponse = await fetch("http://localhost:3139/clients", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json',
                "Authorization": `Bearer ${authToken}`
            },
            body: JSON.stringify(payload)
        })

        const jsonReponse = await httpResponse.json();

        console.log(jsonReponse)
    },

    getClients: async (authToken: string, params: {
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

        console.log(queryParams)
    
        const encodeParamsString = encodeURIComponent(JSON.stringify(queryParams));

        const httpResponse = await fetch(`http://localhost:3139/clients?params=${encodeParamsString}`, {
            headers: {
                "Authorization": `Bearer ${authToken}`
            }
        })

        const jsonReponse = await httpResponse.json();

        // TODO add typesafety with try catch and error if invalid data recieved
        return jsonReponse as {
            total: number,
            clients: ClientResponseModel[]
        }
    }
}