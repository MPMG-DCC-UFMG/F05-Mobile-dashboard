import { useMutation, useQueryClient } from "react-query"
import { useNavigate } from "react-router-dom"
import { Notify } from "../../../../components/Toast/Notify"
import { ErrorResponse } from "../../models/ErrorResponse"
import { SecurityServiceQuery } from "../../services/SecurityService"

export function useLogin() {
  const navigate = useNavigate()

  return useMutation(SecurityServiceQuery.login, {
    onError: (data: ErrorResponse) => {
      Notify(
        `Erro ao acessar o painel! ${data.message}`,
        "bottom-left",
        "error"
      )
    },
    onSuccess: () => {
      navigate("/dashboard")
      Notify("Bem vindo(a) ao Trena Dashboard!", "bottom-center", "info")
    }
  })
}

export function useKeepSession() {
  return useMutation(SecurityServiceQuery.login, {
    onError: () => {
      Notify("Erro ao manter sessão! Desconectando...", "bottom-left", "error")
    }
  })
}

export function useCreateUser() {
  const queryClient = useQueryClient()

  return useMutation(SecurityServiceQuery.createUser, {
    onError: () => {
      Notify(
        "Erro ao criar usuário! Verifique os campos",
        "bottom-left",
        "error"
      )
    },
    onSuccess: () => {
      Notify("Usuário criado com sucesso!", "bottom-left", "success")
      queryClient.invalidateQueries(["getUsers", "getPublicUsers"])
    }
  })
}

export function useDeleteUser() {
  const queryClient = useQueryClient()

  return useMutation(SecurityServiceQuery.deleteUser, {
    onError: () => {
      Notify("Erro ao deletar usuário!", "bottom-left", "error")
    },
    onSuccess: () => {
      Notify("Usuário criado com sucesso!", "bottom-left", "success")
      queryClient.invalidateQueries(["getUsers", "getPublicUsers"])
    }
  })
}

export function useOAuthLogout() {
  return useMutation(["oAuthLogout"], SecurityServiceQuery.oAuthLogout)
}
