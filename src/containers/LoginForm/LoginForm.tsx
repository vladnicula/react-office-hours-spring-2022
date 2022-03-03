import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useState } from "react";
import { ErrorMessage } from "../../components/ClientTable";

const loginSchema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
}).required();

type Inputs = {
    email: string,
    password: string,
};

type LoginFormProsp = {
    onSuccessfulLogin: (token: string) => unknown
    onNavigateToSignUp: () => unknown
}

export const LoginForm = (props: LoginFormProsp) => {

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(loginSchema)
    });

    const [ errorMessage, setError ] = useState<null | string>(null)
    
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        fetch("http://localhost:3139/login", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then( async (response) => {
            if ( response.status === 200 ) {
                const jsonResponse = await response.json()
                props.onSuccessfulLogin(jsonResponse.token)
            } else {
                return Promise.reject(await response.text())
            }
        })
        .catch((err) => {
            console.log(err);
            if ( typeof err === 'string' ) {
                setError(err)
            } else {
                setError("An unknown error occured")
            }
        });
        
        console.log('form ready for submission', data)
    };

    const inputClassName = `border border-2 rounded-r px-4 py-2 w-full`;

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="max-w-lg bg-white shadow-2xl rounded-lg p-8">
                { errorMessage ? <ErrorMessage message={errorMessage} /> : null}
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <label>Email</label>
                    <input className={inputClassName} defaultValue="test" {...register("email", { required: true })} />
                    {errors.email && <span>{errors.email.message}</span>}

                    {/* include validation with required or other standard HTML validation rules */}
                    <label>Password</label>
                    <input type="password" className={inputClassName} {...register("password", { required: true })} />
                    {/* errors will return when field validation fails  */}
                    {errors.password && <span>{errors.password.message}</span>}
                    <br/>
                    <div className="flex justify-between">
                        <input style={{ width: 100}} className="relative bg-blue-500 text-white p-2 rounded text-md font-bold overflow-visible" type="submit" />
                        <button onClick={(ev) => {
                            ev.preventDefault();
                            props.onNavigateToSignUp();
                        }} className="ml-2 relative bg-blue-500 text-white p-2 rounded text-md font-bold overflow-visible">Sign Up</button>
                    </div>
                </form>
            </div>
        </div>
    )

}
