import { useRouter } from "next/router";
import { ClientAPI } from "../../api/clients";
import { useAuthContext } from "../../contexts/AuthContextProvider";
import { AddClientForm } from "../../forms/AddClientForm/AddClientForm";

export const AddClientFormContainer = () => {
    const router = useRouter()
    const auth = useAuthContext()

    return (
        // TODO name properly
        <AddClientForm
            onClientDataSubmitRequest={async (clientData) => {
                if (!auth.authUserToken) {
                    return;
                }
                try {
                    const response = await ClientAPI.createClient(auth.authUserToken, clientData)
                    router.push("/clients")
                } catch (err) {
                    console.error("should handle error", err)
                }
            }}
        />
    )
}