import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import CreateGuardForm from "@/components/guard/CreateGuardForm";
import { useBreadcrumb } from "@/hooks/components/useBreadcrumb";
import { useGuardForm } from "@/hooks/guard/forms/useGuardForm";
import { useCreatedGuard } from "@/hooks/guard/mutations/useCreatedGuard";
import { useShift } from "@/hooks/guard/querys/useShift";
import { GuardFormData } from "@/types/guard.schema";
import { useState } from "react";

export default function CreateGuardView() {
    useBreadcrumb([{ label: "Guardis", path: "/guards/list" }, { label: "Registrar guardia" }]);

    const [isSubmitting, setIsSubmitting] = useState(false);

    const initialValues: GuardFormData = {
        guardDate: '',
        shiftId: 0,
        responsibleId: 0,
        location: '',
        voluntareeIds: []
    };

    const { register, handleSubmit, formState: { errors }, control } = useGuardForm(initialValues);
    const mutation = useCreatedGuard();

    const { shiftData, shiftDataisLoading } = useShift();


    const handleForm = async (formData: GuardFormData) => {
        setIsSubmitting(true);
        await mutation.mutateAsync(formData).catch(() => setIsSubmitting(false))
    }

    return (
        <form onSubmit={handleSubmit(handleForm)} noValidate>
            {
                !shiftDataisLoading && <CreateGuardForm shiftData={shiftData} register={register} errors={errors} control={control} />
            }
            <div className="p-6.5">
                <ButtonGroup
                    buttons={[
                        { type: "button", label: "Registrar guardia", onClick: handleSubmit(handleForm), variant: "primary", disabled: isSubmitting, isLoading: isSubmitting },
                        { type: "link", label: "Cancelar", to: "/guards/list" }
                    ]}
                />
            </div>
        </form>
    )
}