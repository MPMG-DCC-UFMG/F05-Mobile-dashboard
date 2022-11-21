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

export function collectStatusMapping(status: number) {
  switch (status) {
    case 0:
      return "Pendente";
    case 1:
      return "Aprovado";
    case 2:
      return "Rejeitado";
    case 3:
      return "Excluído";
  }
}

export function convertEphocDate(seconds: number) {
  const date = new Date(seconds * 1000);
  const day = date.getDay() < 10 ? "0" + date.getDay() : date.getDay();
  const month = date.getMonth() < 10 ? "0" + date.getMonth() : date.getMonth();
  const year = date.getFullYear();

  return `${day}/${month}/${year}`;
}
