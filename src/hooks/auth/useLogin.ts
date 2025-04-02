import { useMutation } from "@tanstack/react-query";
import { authenticateUser } from "@/api/AuthAPI";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { UserLoginForm } from "@/types/index";

export const useLogin = () => {
  const navigate = useNavigate();

  const { mutate, isPending } = useMutation({
    mutationFn: authenticateUser,
    onError: (error) => {
      toast.error(error.message);
    },
    onSuccess: () => {
      navigate("/notificaciones");
    },
  });

  const login = (formData: UserLoginForm) => mutate(formData);

  return { login, isPending };
};
