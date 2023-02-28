import { useQuery } from "react-query"
import { useUserStore } from "../../../store/user"
import { SecurityServiceQuery } from "../../services/SecurityService"

export function useLoadUsersList() {
  const setAllUsers = useUserStore(state => state.setAllUsers)

  return useQuery(["getUsers"], SecurityServiceQuery.loadUserList, {
    onSuccess: data => {
      setAllUsers(data)
    }
  })
}

export function useLoadPublicUsersList() {
  const setAllUsers = useUserStore(state => state.setAllUsers)

  return useQuery(["getPublicUsers"], SecurityServiceQuery.loadPublicUserList, {
    onSuccess: data => {
      setAllUsers(data)
    }
  })
}

export function useGetLoggedUser() {
  const userStore = useUserStore()

  return useQuery(["getLoggedUser"], SecurityServiceQuery.getLoggedUser, {
    onSuccess: data => {
      userStore.setUser({
        email: data.email,
        full_name: data.full_name,
        picture: data.picture,
        role: data.role
      })
    },
    staleTime: 30 * 60 * 1000 // 30 minutes
  })
}

export function useGetUserPublicData(email: string) {
  return useQuery(
    ["getUserData", email],
    SecurityServiceQuery.getUserPublicData
  )
}

export function useGetAllUsersPublicData() {
  return useQuery(
    ["getAllUsersPublic"],
    SecurityServiceQuery.getAllUsersPublicData
  )
}

export function useOAuth() {
  return useQuery(["oAuth"], SecurityServiceQuery.oAuth)
}
