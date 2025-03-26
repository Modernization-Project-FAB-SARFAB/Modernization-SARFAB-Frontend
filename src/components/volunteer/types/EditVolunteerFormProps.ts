import { Volunteer, VolunteerFormData } from "@/types/index"

export interface EditVolunteerFormProps {
    data: VolunteerFormData;
    volunteerId: Volunteer['id']
}