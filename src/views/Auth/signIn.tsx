import COVER_IMAGE from '@/assets/images/signIn/sarfab2.png'
import LOGO from '@/assets/images/signIn/logo.png'
import ESCUDO from '@/assets/images/signIn/escudo.png'
import '@/views/Auth/singIn.css'
import ErrorMessage from '@/components/common/ErrorGeneralMessage/ErrorGeneralMessage';
import { UserLoginForm } from '@/types/index';
import { useForm } from 'react-hook-form';
import { useMutation } from '@tanstack/react-query';
import { authenticateUser } from '@/api/AuthApi';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {
  const navigate = useNavigate();

  const initialValues: UserLoginForm = {
    username: '',
    password: '',
  }
  const { register, handleSubmit, formState: { errors } } = useForm({ defaultValues: initialValues })

  const { mutate } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message)
    },
    onSuccess: () => {
      toast.success("Inicio de sesión exitoso");
      navigate('/recruitment/list');
    }
  })

  const handleLogin = (formData: UserLoginForm) => mutate(formData);

  return (
    <form onSubmit={handleSubmit(handleLogin)} className="w-full h-screen flex items-start" noValidate>
      <div className="hidden xl:block xl:w-1/2 ">
        <div className="image-container relative h-full flex flex-col">
          <div className="absolute overlay overlay_2 flex flex-col">
            <div className="mx-20 my-16">
              <div className="flex justify-center items-center space-x-4 my-5">
                <img src={ESCUDO} className="h-30 my-2" />
                <img src={LOGO} className="h-30 my-2" />
              </div>
              <h1 className="2xl:text-5xl md:text-3xl text-white font-bold">
                ¡Bienvenido al sistema del Servicio Voluntario de Búsqueda y Rescate SAR. FAB!
              </h1>
              <p className="text-2xl text-white font-normal my-3">
                Su dedicación y esfuerzo son esenciales para el cumplimiento de nuestra misión. ¡Adelante!
              </p>
            </div>
          </div>
          <img alt="sarfab" src={COVER_IMAGE} className="w-full h-full object-cover" />
        </div>
      </div>

      <div className='w-full 2xl:w-1/2 h-full bg-[#f5f5f5] flex flex-col justify-between  p-10 sm:p-6 md:p-8 lg:p-10 xl:p-15 2xl:p-20'>

        <h1 className='text-xl text-[#060606] font-semibold'>Salvamento y Rescate de la Fuerza Aérea Boliviana</h1>

        <div className='justify-center items-center flex flex-col'>
          <div className='w-full flex flex-col max-w-[550px] '>
            <div className='my-10'>
              <div className='w-full flex flex-col mb-2'>
                <h3 className='text-3xl font-bold text-black mb-2'>Inicio de sesión</h3>
                <p className='text-sm mb-2 text-graydark'>¡Bienvenido de vuelta! Ingresa tus credenciales</p>
              </div>

              <div className='w-full flex flex-col'>
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
                    <ErrorMessage>{errors.username.message}</ErrorMessage>
                  )}
                </div>
                <div className='flex flex-col'>
                  <input
                    id="password"
                    type='password'
                    placeholder='Contraseña'
                    className='w-full text-black py-4 my-2 bg-transparent border-b border-black outline-none focus:outline-none'
                    {...register("password", {
                      required: "El Password es obligatorio",
                    })} />
                  {errors.password && (
                    <ErrorMessage>{errors.password.message}</ErrorMessage>
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
              <button type="submit" className='w-full text-white my-4 bg-[#060606] rounded-md p-4 text-center flex items-center justify-center'>
                Iniciar Sesión
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
};

export default SignIn;
