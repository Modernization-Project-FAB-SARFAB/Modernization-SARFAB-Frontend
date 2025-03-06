import { useForm } from "react-hook-form";
import Button from "@/components/common/Button/Button";
import ErrorMessage from "@/components/common/ErrorGeneralMessage/ErrorGeneralMessage";
import { AuthFormProps } from "./types/AuthFormProps.types";
import { UserLoginForm } from "@/types/index";
import AuthHeader from "./AuthHeader";

const AuthForm: React.FC<AuthFormProps> = ({ onSubmit, isLoading }) => {
    const { register, handleSubmit, formState: { errors } } = useForm<UserLoginForm>({
        defaultValues: { username: "", password: "" },
    });

    return (
        <div className='justify-center items-center flex flex-col'>
            <div className='w-full flex flex-col max-w-[550px] '>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                    <div className='my-10'>
                        <AuthHeader />

                        <div className='w-full flex flex-col mb-5.5'>
                            <div className='flex flex-col'>
                                <input
                                    id="username"
                                    type="username"
                                    placeholder='Nombre de usuario'
                                    className='w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                                    {...register("username", {
                                        required: "El nombre de usuario es obligatorio",
                                    })} />
                                {errors.username && (
                                    <ErrorMessage>* {errors.username.message}</ErrorMessage>
                                )}
                            </div>
                            <div className='flex flex-col mb-5.5'>
                                <input
                                    id="password"
                                    type='password'
                                    placeholder='Contraseña'
                                    className='w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                                    {...register("password", {
                                        required: "El Password es obligatorio",
                                    })} />
                                {errors.password && (
                                    <ErrorMessage>* {errors.password.message}</ErrorMessage>
                                )}
                            </div>
                        </div>

                        <div className='w-full flex items-conter justify-between'>
                            <div className='w-full flex items-center'>
                                <input type='checkbox' className='w-4 h-4 mr-2' />
                                <p>Recordar mi contraseña</p>
                            </div>

                            <p className='text-pm font-medium whitespace-nowrap cursor-pointer underline underline-offset-2'>Olvidaste tu contraseña</p>
                        </div>
                    </div>

                    <div className='w-full flex flex-col'>
                        <Button type='submit' label='Iniciar Sesión' variant='dark' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AuthForm;
