import { AddClientFormContainer } from "../../src/containers/ClientFromContainer/ClientFromContainer";
import { ErrorBoundary } from "../../src/containers/ErrorBoundry/ErrorBoundry";
import { AuthContextProvider } from "../../src/contexts/AuthContextProvider";

export default function AddClient () {
    return (
        <ErrorBoundary>
            <AuthContextProvider>
                <AddClientFormContainer />
            </AuthContextProvider>
        </ErrorBoundary>
    )
}
