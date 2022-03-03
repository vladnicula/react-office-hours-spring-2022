import { useRouter } from "next/router";
import { AuthContextProvider } from "../../src/contexts/AuthContextProvider";

export default function Client() {
    let router = useRouter();
      
    return (
      <AuthContextProvider>
        <h2>Client {router.query.id}</h2>
      </AuthContextProvider>
    );
  }