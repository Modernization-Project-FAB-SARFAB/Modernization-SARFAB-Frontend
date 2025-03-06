import COVER_IMAGE from "@/assets/images/signIn/sarfab2.png";
import LOGO from '@/assets/images/signIn/logo.png'
import ESCUDO from '@/assets/images/signIn/escudo.png'

const AuthLoginLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <div className="w-full h-screen flex items-start">
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
        <div className="w-full 2xl:w-1/2 h-full bg-[#f5f5f5] flex flex-col justify-between  p-10 sm:p-6 md:p-8 lg:p-10 xl:p-15 2xl:p-20">
            <h1 className='text-xl text-[#060606] font-semibold'>Salvamento y Rescate de la Fuerza Aérea Boliviana</h1>

            {children}
        </div>
    </div>
);

export default AuthLoginLayout;
