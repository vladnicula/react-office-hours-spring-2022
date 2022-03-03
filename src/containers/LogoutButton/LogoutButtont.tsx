import { useContext } from "react";
import { AuthContext } from "../../contexts/AuthContextProvider";

export const LogoutButtonWrapper =  () => {
    const {logout} = useContext(AuthContext)

    return (
        <button onClick={() => {
        logout();
    }}>Logout</button>
    )
}