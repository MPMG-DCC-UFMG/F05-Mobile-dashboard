import { useQuery } from "react-query";
import { useUserStore } from "../../../store/user";
import { SecurityServiceQuery } from "../../services/SecurityService";

export function useLoadUsersList() {
  return useQuery(["getUsers"], SecurityServiceQuery.loadUserList);
}

export function useLoadPublicUsersList() {
  return useQuery(["getPublicUsers"], SecurityServiceQuery.loadPublicUserList);
}

export function useGetLoggedUser() {
  const userStore = useUserStore();

  return useQuery(["getLoggedUser"], SecurityServiceQuery.getLoggedUser, {
    onSuccess: (data) => {
      userStore.setUser({
        email: data.email,
        full_name: data.full_name,
        picture: data.picture,
        role: data.role,
      });
    },
    staleTime: Infinity,
  });
}

export function useGetUserPublicData(email: string) {
  return useQuery(
    ["getUserData", email],
    SecurityServiceQuery.getUserPublicData
  );
}
