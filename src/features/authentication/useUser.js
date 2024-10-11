import { useQuery } from "@tanstack/react-query";

import  {getCurrentUser}  from "../../services/apiAuth";

export function   useUser() {
console.log( 'PGGGGGGGeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');

  const { isLoading, data: user } = useQuery({
    queryKey: ["user"],
    queryFn:  getCurrentUser(),
  });
console.log(user, 'Chveeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee');
  return { isLoading, user, isAuthenticated: user?.role === 'authenticated'};
}

export default useUser;
