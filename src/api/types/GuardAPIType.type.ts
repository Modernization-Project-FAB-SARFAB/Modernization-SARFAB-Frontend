import { Guard, GuardFormData } from "@/types/guard.schema"

export type UpdateGuardAPIType = {
    formData: GuardFormData,
    guardId: Guard['guardId']
}

export type EndGuardApiType = {
    observations: Guard['observation'],
    guardId: Guard['guardId']
}