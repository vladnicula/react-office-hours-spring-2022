import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { ErrorMessage } from "../../containers/ClientTableContainer";
import { PasswordField } from "../../components/PasswordField/PasswordField";
import { Button, TextField } from "@mui/material";

const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
}).required();

export type LoginInputs = {
    email: string,
    password: string,
};

export type LoginFormProps = {
    genericError?: string;
    onNavigateToSignUp: () => unknown
    onLoginRequest: (data: LoginInputs) => unknown
}

export const LoginForm = (props: LoginFormProps) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<LoginInputs>({
        mode: "onBlur",
        resolver: yupResolver(loginSchema)
    });

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="max-w-lg bg-white shadow-2xl rounded-lg p-8">
                { props.genericError ? <ErrorMessage message={props.genericError} /> : null}
                <form className="flex flex-col" onSubmit={handleSubmit(props.onLoginRequest)}>

                    <TextField 
                        margin="normal" 
                        id="name"
                        label="Email"
                        inputProps={{...register("email", { required: true }), "data-test": "email-field"  }}
                        error={!!errors.email}
                        helperText={errors.email?.message}
                        
                    />

                    <PasswordField 
                        fieldId="password"
                        labelTitle="Password"
                        inputProps={{...register("password", { required: true }), "data-test": "password-field" }}
                        errorMessage={errors.password?.message}
                    />
                    <br/>
                    <div className="flex justify-between">
                        <Button 
                            type="submit"
                            variant="contained">Login</Button>
                        <Button 
                            onClick={(ev) => {
                                ev.preventDefault();
                                props.onNavigateToSignUp();
                            }} 
                            variant="text">Sign Up</Button>
                    </div>
                </form>
            </div>
        </div>
    )

}
