export type ClientParams = {
    email: string,
    clientName: string,
    companyName: string,
    companyAddress: string,
    companyTaxNumber: string,
    companyRegNumber: string
};



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
    }
}