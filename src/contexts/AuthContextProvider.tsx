import { useState, useEffect, createContext } from "react";
import { useRouter } from 'next/router'

const useUserAuth = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const [authUserToken, setAuthUserToken] = useState<null | string>(null)

    useEffect(() => {
        const userToken = window.localStorage.getItem("userToken")
        if ( userToken ) {
          setAuthUserToken(userToken)
          setIsLoading(false)
        } else {
          router.replace("/login")
        }

    }, [])

    return {
        setAuthUserToken,
        authUserToken,
        isLoading
    }
}

export type AuthContextType = {
    authUserToken: string | null,
    login: (token: string) => void,
    logout: () => void
  }
  
  export const AuthContext = createContext<AuthContextType>({
    authUserToken: null,
    login: (token: string) => {},
    logout: () => {}
  })
  
  
  export const AuthContextProvider = (props: {
    children?: React.ReactNode;
  }) => {
    const { authUserToken, isLoading, setAuthUserToken } = useUserAuth();
    const router = useRouter()

    if ( isLoading ) {
      return <>Loading</>
    }
  
    return (
      <AuthContext.Provider value={{
        authUserToken, login: setAuthUserToken, logout: () => {
          window.localStorage.removeItem("userToken")
          router.replace('/login')
        }
      }}>
        {props.children}
      </AuthContext.Provider>
    )
  }