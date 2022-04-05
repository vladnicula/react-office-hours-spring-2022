import { useRouter } from 'next/router'
import { useState } from 'react';
import { LoginForm, LoginInputs } from "../src/forms/LoginForm/LoginForm";

import { setCookies } from 'cookies-next';

const LoginPage = () => {

    const router = useRouter()
    const [ errorMessage, setError ] = useState<undefined | string>()

    const handleLoginSuccess = () => {
        router.replace("/")
    }

    const handleLoginError = (err: string) => {
        setError(err)
    }

    const handleNavigationToSignup = () => {
        router.push("/sign-up")
    }

    return (
        <LoginForm 
            genericError={errorMessage}
            onLoginRequest={(data) => {
                apiLayer.login(
                    data, { onSuccess: handleLoginSuccess, onError: handleLoginError }
                )
            }}
            onNavigateToSignUp={handleNavigationToSignup}
        />
    )
}

export default LoginPage;

const apiLayer = {
    login: (data: LoginInputs, params: {
        onSuccess: Function, onError: (err: string) => void
    }) => {
        fetch("http://localhost:3139/login", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then( async (response) => {
            if ( response.status === 200 ) {
                const jsonResponse = await response.json()
                setCookies('userToken', jsonResponse.token)
                params.onSuccess()
            } else {
                return Promise.reject(await response.text())
            }
        })
        .catch((err) => {
            console.log(err);
            if ( typeof err === 'string' ) {
                params.onError(err)
            } else {
                params.onError("An unknown error occured")
            }
        });
    }
}