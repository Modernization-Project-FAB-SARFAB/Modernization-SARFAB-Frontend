import { useEffect, useRef, useMemo } from "react";
import {
  useMilitary,
  useMilitaryById,
  useMilitaryForm,
  useCreateMilitary,
  useUpdateMilitary,
} from "@/hooks/military";
import { CreateMilitaryForm } from "@/types/index";
import { useQueryClient } from "@tanstack/react-query";

interface UseMilitaryFormLogicProps {
  isOpen: boolean;
  onClose: () => void;
  militaryId?: number;
}

export function useMilitaryFormLogic({ isOpen, onClose, militaryId }: UseMilitaryFormLogicProps) {
  const { rankOptionsForForms } = useMilitary();
  const queryClient = useQueryClient();
  const createMutation = useCreateMilitary();
  const updateMutation = useUpdateMilitary();
  const { data: militaryData, isLoading } = useMilitaryById(militaryId ?? 0);
  const hasInitialized = useRef(false);

  const selectedRank = useMemo(() => {
    return rankOptionsForForms.find(
      (rank) => rank.label.trim().toLowerCase() === militaryData?.rankName?.trim().toLowerCase()
    );
  }, [militaryData, rankOptionsForForms]);

  const form = useMilitaryForm();

  useEffect(() => {
    if (militaryData && isOpen && !hasInitialized.current) {
      form.reset({
        firstName: militaryData.firstName || "",
        lastName: militaryData.lastName || "",
        mobilePhone: militaryData.mobilePhone || "",
        militaryRankId: selectedRank?.value ?? 0,
      });
      hasInitialized.current = true;
    }
  }, [militaryData, selectedRank, isOpen, form]);

  useEffect(() => {
    if (!isOpen) {
      hasInitialized.current = false;
    }
  }, [isOpen]);

  const handleFormSubmit = async (formData: CreateMilitaryForm) => {
    if (militaryId) {
      await updateMutation.mutateAsync({ formData, entityId: militaryId });
    } else {
      await createMutation.mutateAsync(formData);
    }
    queryClient.invalidateQueries({ queryKey: ["military"] });
    onClose();
  };

  return {
    isLoading,
    handleFormSubmit,
    formProps: {
      form,
      rankOptions: rankOptionsForForms,
    },
  };
}
