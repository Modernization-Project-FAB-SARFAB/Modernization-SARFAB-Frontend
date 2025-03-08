import { UseFormRegister, FieldErrors, Control } from "react-hook-form";
import { CreateMilitaryForm } from "@/types/index";

export interface MilitaryFormProps {
    errors: FieldErrors<CreateMilitaryForm>;
    register: UseFormRegister<CreateMilitaryForm>;
    control: Control<CreateMilitaryForm>;
}