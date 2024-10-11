import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { signUp as signupAPI } from "../../services/apiAuth";

export function useSignup() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const { mutate: signup, isLoading: isLoading } = useMutation({
    mutationFn: ({ fullName, email, password }) =>
      signupAPI({ fullName, email, password }),
    onSuccess: (user) => {
      toast.success(
        "Account successfully created! Please verify the new account from the user's email address"
      );
      queryClient.setQueryData(["user"], user.user);
      console.log(user);
      navigate("/dashboard", { replace: true });
    },
    onError: (err) => {
      console.log(err);
      toast.error(err.status, err.message);
    },
  });
  return { signup, isLoading };
}
