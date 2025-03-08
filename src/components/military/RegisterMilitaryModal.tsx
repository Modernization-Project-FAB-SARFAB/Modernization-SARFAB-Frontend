import Modal from "@/components/common/Modal/Modal";
import { useMilitaryForm } from "@/hooks/military/forms/useMilitaryForm";
import { useCreateMilitary } from "@/hooks/military/mutations/useCreateMilitary";
import { CreateMilitaryForm } from "@/types/index";
import FormInput from "@/components/common/FormInput/FormInput";
import FormSelectControlled from "@/components/common/FormSelect/FormSelectControlled";
import ButtonGroup from "@/components/common/ButtonGroup/ButtonGroup";
import { useMilitary } from "@/hooks/military/querys/useMilitary";
import { useQueryClient } from "@tanstack/react-query";

interface RegisterMilitaryModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function RegisterMilitaryModal({ isOpen, onClose }: RegisterMilitaryModalProps) {
    const { register, handleSubmit, formState: { errors }, control } = useMilitaryForm();
    const mutation = useCreateMilitary();
    const { rankOptionsForForms } = useMilitary();
    const queryClient = useQueryClient();

    const handleFormSubmit = async (formData: CreateMilitaryForm) => {
        try {
            await mutation.mutateAsync(formData);
            queryClient.invalidateQueries({ queryKey: ["military"] });
            onClose();
        } catch (error) {
            console.error("Error al registrar militar:", error);
        }
    };

    return (
        <Modal title="Registrar personal militar" isOpen={isOpen} onClose={onClose}>
            <form onSubmit={handleSubmit(handleFormSubmit)} className="p-8 space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5.5">
                    <FormInput label="Nombres" name="firstName" type="text" register={register} errors={errors} required />
                    <FormInput label="Apellidos" name="lastName" type="text" register={register} errors={errors} required />
                </div>

                <FormInput label="Teléfono" name="mobilePhone" type="text" register={register} errors={errors} required />

                <FormSelectControlled
                    label="Grado"
                    name="militaryRankId"
                    control={control}
                    options={rankOptionsForForms}
                    required
                />

                <div className="pt-6">
                    <ButtonGroup
                        buttons={[
                            { type: "button", label: "Registrar personal militar", onClick: handleSubmit(handleFormSubmit), variant: "primary", isLoading: mutation.isPending },
                            { type: "button", label: "Cancelar", onClick: onClose, variant: "secondary" }
                        ]}
                    />
                </div>
            </form>
        </Modal>
    );
}
