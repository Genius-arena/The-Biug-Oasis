import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { logout as logoutAPI } from "../../services/apiAuth";

export function useLogout() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const { mutate: logout, isLoading: isLoading } = useMutation({
    mutationFn: () => logoutAPI(),
    onSuccess: () => {
     navigate("/login", {replace: true}); 
     queryClient.removeQueries();
     toast.success("You hvae successfully Logged out");
    },
  });
  return { logout, isLoading };
}

