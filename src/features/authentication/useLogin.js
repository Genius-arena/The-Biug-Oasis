import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { login as loginAPI } from "../../services/apiAuth";

export function useLogin() {
  const navigate = useNavigate();

  const queryClient = useQueryClient();
  const { mutate: login, isLoading: isLoading } = useMutation({
    mutationFn: ({ email, password }) => loginAPI({ email, password }),
    onSuccess: (user) => {
      toast.success("You have successfully Logged in");
      queryClient.setQueryData(["user"], user.user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.status, err.message);
    },
  });
  return { login, isLoading };
}
