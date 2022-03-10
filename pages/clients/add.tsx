import { useContext } from "react";
import { AddClientFormContainer } from "../../src/containers/ClientFromContainer/ClientFromContainer";
import { AuthContext, AuthContextProvider } from "../../src/contexts/AuthContextProvider";

export default function AddClient () {
    const auth = useContext(AuthContext)
    console.log(auth)
    return (
        <AuthContextProvider>
            <AddClientFormContainer />
        </AuthContextProvider>
    )
}
