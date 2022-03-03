import { useRouter } from 'next/router'
import { LoginForm } from "../src/containers/LoginForm/LoginForm";

const LoginPage = () => {

    const router = useRouter()
    return (
        <LoginForm 
            onSuccessfulLogin={(token) => {
                window.localStorage.setItem('userToken', token);
                router.replace("/")
            }} 
            onNavigateToSignUp={() => {
                router.push("/sign-up")
            }}
        />
    )
}

export default LoginPage;