import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ErrorMessage } from "../../containers/ClientTableContainer";
import { Button, TextField } from "@mui/material";

const clientSchema = yup.object({
    email: yup.string().email().required(),
    clientName: yup.string().required(),
    companyName: yup.string().required(),
    companyAddress: yup.string().required(),
    companyTaxNumber: yup.string().required(),
    companyRegNumber: yup.string().required()
}).required();

export type ClientInputs = {
    email: string,
    clientName: string,
    companyName: string,
    companyAddress: string,
    companyTaxNumber: string,
    companyRegNumber: string
};

export type AddClientFormProps = {
    genericError?: string;
    onClientDataSubmitRequest: (data: ClientInputs) => unknown
}

export const AddClientForm = (props: AddClientFormProps) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<ClientInputs>({
        mode: "onBlur",
        resolver: yupResolver(clientSchema)
    });

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="flex-1 max-w-xl bg-white shadow-2xl rounded-lg p-8">
                { props.genericError ? <ErrorMessage message={props.genericError} /> : null}
                <form className="flex flex-col" onSubmit={handleSubmit(props.onClientDataSubmitRequest)}>

                    <TextField 
                        margin="normal" 
                        id="name"
                        label="Client Name"
                        inputProps={{...register("clientName", { required: true }) }}
                        error={!!errors.clientName}
                        helperText={errors.clientName?.message ?? " "}
                    />

                     <TextField 
                        margin="normal" 
                        id="email"
                        label="Client Email"
                        inputProps={{...register("email", { required: true }) }}
                        error={!!errors.email}
                        helperText={errors.email?.message ?? " "}
                    />

                     <TextField 
                        margin="normal" 
                        id="company-name"
                        label="Company Name"
                        inputProps={{...register("companyName", { required: true }) }}
                        error={!!errors.companyName}
                        helperText={errors.companyName?.message?? " "}
                    />
                      <TextField 
                        margin="normal" 
                        id="company-address"
                        label="Company Address"
                        inputProps={{...register("companyAddress", { required: true }) }}
                        error={!!errors.companyAddress}
                        helperText={errors.companyAddress?.message?? " "}
                    />
                    <TextField 
                        margin="normal" 
                        id="company-name"
                        label="Company Registration Number"
                        inputProps={{...register("companyRegNumber", { required: true }) }}
                        error={!!errors.companyRegNumber}
                        helperText={errors.companyRegNumber?.message?? " "}
                    />
                    <TextField 
                        margin="normal" 
                        id="company-name"
                        label="Company Tax Number"
                        inputProps={{...register("companyTaxNumber", { required: true }) }}
                        error={!!errors.companyTaxNumber}
                        helperText={errors.companyTaxNumber?.message?? " "}
                    />


                    <br/>
                    <div className="flex justify-between">
                        <Button 
                            type="submit"
                            variant="contained">Create Client</Button>
                    </div>
                </form>
            </div>
        </div>
    )

}
