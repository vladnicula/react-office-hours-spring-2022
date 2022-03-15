import { useRouter } from 'next/router'
import { useEffect, useState } from 'react';
import { LoginForm } from "../src/forms/LoginForm/LoginForm";

import { setCookies } from 'cookies-next';

const LoginPage = () => {

    const router = useRouter()
    const [ errorMessage, setError ] = useState<undefined | string>()

    // useEffect(() => {
    //     console.log("cookies", cookie.parse(document.cookie))
    // }, [])
    
    return (
        <LoginForm 
            genericError={errorMessage}
            onLoginRequest={(data) => {
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
                        router.replace("/")
                    } else {
                        return Promise.reject(await response.text())
                    }
                })
                .catch((err) => {
                    console.log(err);
                    if ( typeof err === 'string' ) {
                        setError(err)
                    } else {
                        setError("An unknown error occured")
                    }
                });
            }}
            onNavigateToSignUp={() => {
                router.push("/sign-up")
            }}
        />
    )
}

export default LoginPage;