export function inspectionsStatusMapping(status: number) {
  switch (status) {
    case 0:
      return "Pendente";
    case 1:
      return "Atualizada";
    case 2:
      return "Enviada";
  }
}
