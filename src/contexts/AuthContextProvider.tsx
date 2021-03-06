import { useState, useEffect, createContext, useContext } from "react";
import { useRouter } from 'next/router'
import { getCookie, removeCookies } from 'cookies-next';

const useUserAuth = () => {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(true);
    const [authUserToken, setAuthUserToken] = useState<null | string>(null)

    useEffect(() => {
        const userToken = getCookie("userToken") as string
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
  
  export const AuthContext = createContext<null | AuthContextType>(null)
  
export const useAuthContext = () => {
    const auth = useContext(AuthContext)
    if ( auth === null ) {
        throw new Error("Auth context is not initialised yet")
    }

    return auth;
}

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
          // window.localStorage.removeItem("userToken")
          removeCookies('userToken')
          router.replace('/login')
        }
      }}>
        {props.children}
      </AuthContext.Provider>
    )
  }