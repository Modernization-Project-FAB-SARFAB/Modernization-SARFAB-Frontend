import Breadcrumb from "@/components/common/Breadcrumb/Breadcrumb";
import FormInput from "@/components/common/FormInput/FormInput";
import FormSelect from "@/components/common/FormSelect/FormSelect";
import { RiUserLocationLine } from "@remixicon/react";

function CreateAfiliationView() {
  return (
    <>
      <Breadcrumb items={[
        { label: "Voluntarios", path: "/voluntarios" },
        { label: "Registrar nuevo voluntario" }
      ]} />

      <div className="grid grid-cols-1 gap-9 sm:grid-cols-2">
        <div className="flex flex-col gap-9">
          <div className="flex flex-col gap-9">
            {/* <!-- Contact Form --> */}
            <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
              <div className="border-b border-stroke py-4 px-6.5 dark:border-strokedark">
                <h3 className=" dark:text-white text-2xl font-semibold text-black">
                  Datos personales
                </h3>
              </div>
              <form action="#">
                <div className="p-6.5">
                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <FormInput label="Nombres" placeholder="Ingresa los nombres" required />
                    <FormInput label="Apellidos" placeholder="Ingresa los apellidos" required />
                  </div>

                  <div className="mb-4.5">
                    <FormSelect
                      label="Departamento"
                      required
                      options={[
                        { value: 'cochabamba', label: 'Cochabamba' },
                        { value: 'la_paz', label: 'La Paz' },
                        { value: 'santa_cruz', label: 'Santa Cruz' },
                      ]}
                      icon={<RiUserLocationLine size={20} color="gray" />}
                    />
                  </div>

                  <div className="mb-4.5">
                    <FormInput
                      label="Documento de identidad - C.I."
                      placeholder="Ingresa el documento de identidad"
                      required
                    />
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <FormInput
                        label="Teléfono (Opcional)"
                        placeholder="Ingresa un teléfono de contacto"
                        type="number"
                      />
                    </div>

                    <div className="w-full xl:w-1/2">
                      <FormInput
                        label="Celular"
                        placeholder="Ingresa un número de celular"
                        type="number"
                        required
                      />
                    </div>
                  </div>

                  <div className="mb-4.5 flex flex-col gap-6 xl:flex-row">
                    <div className="w-full xl:w-1/2">
                      <FormInput label="Ocupación" placeholder="Estudiante, Licenciado, Independiente, etc." />
                    </div>
                    <div className="w-full xl:w-1/2">
                      <FormInput
                        label="Religión"
                        placeholder="Católico, Evangélico, No creyente, etc."
                        required
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
        <div className="flex flex-col gap-9">
          <div className="col-span-2 row-span-2 col-start-4">2</div>
          <div className="col-span-2 col-start-4 row-start-3">3</div>
          <div className="col-span-2 col-start-4 row-start-4">4</div>
        </div>
      </div>
    </>
  )
}

export default CreateAfiliationView;