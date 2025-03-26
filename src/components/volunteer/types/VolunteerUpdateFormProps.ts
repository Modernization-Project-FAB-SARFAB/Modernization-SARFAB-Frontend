import { UseFormRegister, FieldErrors, Control, UseFormSetValue} from "react-hook-form";
import { Recruit, VolunteerUpdateFormData } from "types";

export interface VolunteerUpdateFormProps {
    errors:  FieldErrors<VolunteerUpdateFormData>;
    register: UseFormRegister<VolunteerUpdateFormData>;
    control: Control<VolunteerUpdateFormData>;
    recruit ?: Recruit
    setValue ?: UseFormSetValue<VolunteerUpdateFormData>;
}