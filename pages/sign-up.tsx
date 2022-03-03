import { useForm, SubmitHandler } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from "yup";
import { useRouter } from "next/router";

const signUpSchema = yup.object({
    name: yup.string().required(),
    email: yup.string().email().required(),
    password: yup.string().required(),
    confirmPassword: yup.string().required("You must confirm the password")
        .test("passwords-match", "Passwords must match", function (value) {
            return this.parent.password === value;
        }),
}).required();

type Inputs = {
    name: string,
    email: string,
    password: string,
    confirmPassword: string,
};

const SignUpPage = () => {
    const router = useRouter()

    const { register, handleSubmit, watch, formState: { errors } } = useForm<Inputs>({
        resolver: yupResolver(signUpSchema)
    });
    const onSubmit: SubmitHandler<Inputs> = (data) => {
        fetch("http://localhost:3139/register", {
            method: "POST",
            headers: {
                "Content-Type": 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then( async (response) => {
            console.log(response)
            if ( response.status === 200 ) {
                const jsonResponse = await response.json()
                console.log("successful respone", jsonResponse)
            } else {
                console.log("should probably handle error", await response.text())
            }
        })
        .catch((err) => {
            console.log("Should handle", err)
        });
        console.log('form ready for submission', data)
    }

    const inputClassName = `border border-2 rounded-r px-4 py-2 w-full`;

    return (
        <div className="flex h-screen items-center justify-center">
            <div className="max-w-lg bg-white shadow-2xl rounded-lg p-8">
                <form className="flex flex-col" onSubmit={handleSubmit(onSubmit)}>
                    {/* register your input into the hook by invoking the "register" function */}
                    <label>Name</label>
                    <input className={inputClassName} {...register("name")} />
                    {errors.name && <span>{errors.name.message}</span>}
                    
                    <label>Email</label>
                    <input className={inputClassName} {...register("email")} />
                    {errors.email && <span>{errors.email.message}</span>}

                    {/* include validation with required or other standard HTML validation rules */}
                    <label>Password</label>
                    <input type="password" className={inputClassName} {...register("password")} />
                    {/* errors will return when field validation fails  */}
                    {errors.password && <span>{errors.password.message}</span>}

                    <label>Confirm password</label>
                    <input type="password" className={inputClassName} {...register("confirmPassword")} />
                    {/* errors will return when field validation fails  */}
                    {errors.confirmPassword && <span>{errors.confirmPassword.message}</span>}
                    <br/>
                    <div className="flex justify-between">
                        <input style={{ width: 100}} className="relative bg-blue-500 text-white p-2 rounded text-md font-bold overflow-visible" type="submit" />
                        <button onClick={(ev) => {
                            ev.preventDefault();
                            // props.onNavigateToSignUp();
                            router.push('/login')
                        }} className="ml-2 relative bg-blue-500 text-white p-2 rounded text-md font-bold overflow-visible">Login</button>
                    </div>
                </form>
            </div>
        </div>
    )

}

export default SignUpPage;