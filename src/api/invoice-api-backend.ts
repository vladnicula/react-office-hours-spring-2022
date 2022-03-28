import axios from "axios";

export class InvalidUserTokenError extends Error {}

export class InvoiceAPI {

    private static _instance?: InvoiceAPI;

    static get instance () {
        if ( !InvoiceAPI._instance ) {
            InvoiceAPI._instance = new InvoiceAPI();
        }
        return InvoiceAPI._instance;
    }

    private _httpRequester = axios.create({
        baseURL: process.env.NEXT_PUBLIC_INVOICE_API_HOST,
        headers: {
            "Content-type": "application/json",
        }
    });

    get httpRequester () {
        if ( !this.initialised ) {
            throw new Error(
                `InvoiceAPI setup was not called. Make sure you call "InvoiceAPI.instance.setup(userAuthToken)" before using any API layer entity.`
            )
        } 
        return this._httpRequester;
    }

    initialised = false;
    
    setup(userAuthToken: string | null) {
        this.initialised = true;
        if ( userAuthToken ) {
            this.httpRequester.interceptors.request.use((request) => {
                request.headers = request.headers ?? {};
                request.headers.Authorization = `Bearer ${userAuthToken}`;
                return request;
              },
              (error) => {
                return Promise.reject(error);
              })

            this.httpRequester.interceptors.response.use(
                (response) => response,
                (error) => {
                    if ( error.response.status === 401 ) {
                        return Promise.reject(new InvalidUserTokenError('Invalid Token'))
                    } else {
                        return Promise.reject(error)
                    }
                }
            )
        }
    }
}