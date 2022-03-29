import { useAuthContext } from "../../contexts/AuthContextProvider";

export const LogoutButtonWrapper =  () => {
    const {logout} = useAuthContext()

    return (
        <button onClick={() => {
        logout();
    }}>Logout</button>
    )
}