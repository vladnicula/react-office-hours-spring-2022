import { LoginForm } from "../src/containers/LoginForm/LoginForm";

const LoginPage = () => {
    return (
        <LoginForm onSuccessfulLogin={(token) => {
            console.log("nonthing for now", token)
        }} />
    )
}

export default LoginPage;