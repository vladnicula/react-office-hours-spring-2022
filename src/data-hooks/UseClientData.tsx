import { useEffect, useReducer, useState } from "react";

const reducer = (state, action) => {
    console.log("redeucer running", {action, state})
    switch(action.type) {
        case "CLEAN_LOADING": {
            return {
                isLoaded: false,
                targetClientToken: "111",
                error: null,
                clients: []
            }
        }

        case "SET_CLIENT_LIST": {
            return {
                ...state,
                isLoaded: true,
                clients: action.payload.clients
            }
        }

        case "SET_CLIENT_FETCH_ERROR": {
            return {
                ...state,
                error: action.payload.error
                
            }
        }
    }

    return state;
}

export const useClientData = () => {
    const [clientData, dispatchClientData] = useReducer(
        reducer,
        {
            initialised: false,
            isLoaded: false,
            targetClientToken: "111",
            error: null as string | null,
            clients: [] as Record<string, any>[]
        }
    );

    useEffect(() => {
        let isEffectActive = true;
        dispatchClientData({
            type: "CLEAN_LOADING"
        });

        fetch(`//localhost:3139/clients`, {
            headers: {
                "Authorization": `Bearer ${clientData.targetClientToken}`
            }
        })
        .then((httpResponse) => {
            return httpResponse.json();
        })
        .then((jsonResponse) => {
            if ( isEffectActive ) {
                dispatchClientData({
                    type: "SET_CLIENT_LIST",
                    payload: {
                        clients: jsonResponse.clients
                    }
                });
            }
        })
        .catch((err) => {
            dispatchClientData({
                type: "SET_CLIENT_FETCH_ERROR",
                payload: {
                    error: "Data fetching error occured"
                }
            });
        })

        return () => {
            isEffectActive = false;
        }

    }, [clientData.isLoaded])

    return [clientData, dispatchClientData];
}
