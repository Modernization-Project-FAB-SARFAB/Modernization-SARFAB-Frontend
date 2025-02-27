import { RecruitmentFormData } from "@/types/index";
import BackLink from "../common/BackLink/BackLink";
import ButtonGroup from "../common/ButtonGroup/ButtonGroup";
import RecruitForm from "./RecruitForm";
import { useForm } from "react-hook-form";
import { EditRecruitFormProps } from "./types/EditRecruitFormProps.types";
import { useMutation } from "@tanstack/react-query";
import { updateRecruit } from "@/api/RecruitmentAPI";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export default function EditRecruitForm({ data, recruitId }: EditRecruitFormProps) {
    const navigate = useNavigate();

    const { register, handleSubmit, formState: { errors }, control } = useForm<RecruitmentFormData>({
        defaultValues: {
            firstName: data.firstName,
            lastName: data.lastName,
            ci: data.ci,
            birthDate: data.birthDate,
            wantsMilitaryService: data.wantsMilitaryService
        }
    });

    const { mutate } = useMutation({
        mutationFn: updateRecruit,
        onError: () => {
            toast.error("Ocurrió un error al registrar el recluta");
        },
        onSuccess: () => {
            toast.success("Recluta registrado correctamente");
            navigate('/recruitment/list');
        }
    })

    const handleForm = (formData: RecruitmentFormData) => {
        const data = {
            formData,
            recruitId
        }
        mutate(data)
    }

    return (
        <>
            <div className="">
                <div className="">
                    {/* <!-- Contact Form --> */}
                    <div className="rounded-sm border border-stroke bg-white shadow-default dark:border-strokedark dark:bg-boxdark">
                        <BackLink
                            text="Volver a listado de reclutas"
                            iconSize={20}
                            link="/recruitment/list"
                        />
                        <h3 className="px-6.5 mt-3 dark:text-white text-2xl font-semibold text-black">
                            Editar recluta
                        </h3>
                        <form onSubmit={handleSubmit(handleForm)} noValidate>
                            <RecruitForm errors={errors} register={register} control={control} />
                            <div className="p-6.5">
                                <ButtonGroup label={"Editar recluta"} onPrimaryClick={handleSubmit(handleForm)} cancelLink='/recruitment/list' isPrimarySubmit={true} />
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </>
    )
}