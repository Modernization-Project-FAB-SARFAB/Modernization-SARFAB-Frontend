import { Volunteer, VolunteerUpdateFormData } from "@/types/volunteer.schema"

export type VolunteerAPIType = {
    formData: VolunteerUpdateFormData,
    volunteerId: Volunteer['id']
}