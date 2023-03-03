import { QueryFunctionContext } from "react-query"
import Config from "../../../config/Config"
import { PublicWork } from "../../models/PublicWork"
import TrenaAPI from "../TrenaAPI"

async function loadPublicWorks(): Promise<PublicWork[]> {
  const call = Config.BASE_URL + "/publicworks/"
  const res = await TrenaAPI.network().get(call)
  return res.body
}

async function loadPublicWorkQueue(): Promise<PublicWork[]> {
  const call = Config.BASE_URL + "/publicworks/queue"
  const res = await TrenaAPI.network().get(call)

  return res.body
}

async function deletePublicWork(publicWorkId: string): Promise<PublicWork> {
  const call = Config.BASE_URL + "/publicworks/delete"
  const token = localStorage.getItem("TOKEN")
  const res = await TrenaAPI.network()

    .delete(call)
    .type("application/json")
    .query({ public_work_id: publicWorkId, token: token })

  return res.body
}

async function addPublicWork(publicWork: PublicWork): Promise<PublicWork> {
  const call = Config.BASE_URL + "/publicworks/add"
  const res = await TrenaAPI.network()
    .post(call)
    .type("application/json")
    .send(publicWork)

  return res.body
}

async function updatePublicWork(publicWork: PublicWork): Promise<PublicWork> {
  const call = Config.BASE_URL + "/publicworks/update"
  const res = await TrenaAPI.network()
    .put(call)
    .type("application/json")
    .send(publicWork)

  return res.body
}

async function countPublicWork(): Promise<number> {
  const call = Config.BASE_URL + "/publicworks/count"
  const res = await TrenaAPI.network().get(call)

  return res.body
}

async function getPublicWorkById(
  ctx: QueryFunctionContext
): Promise<PublicWork> {
  const [, id] = ctx.queryKey
  const call = Config.BASE_URL + `/publicworks/${id}`
  const res = await TrenaAPI.network().get(call)

  return res.body
}

async function getPublicWorksWithCollectsInQueue(): Promise<PublicWork[]> {
  const call = Config.BASE_URL + "/publicworks/citizen/queue"
  const res = await TrenaAPI.network().get(call)

  return res.body
}

async function getPublicWorkReportDocx(publicWorkId: string): Promise<void> {
  const call = Config.BASE_URL + "/publicworks/reportDocx/" + publicWorkId
  const res = await TrenaAPI.network().get(call).responseType("blob")

  const url = window.URL.createObjectURL(res.body)
  const anchor = document.createElement("a")
  anchor.href = url
  anchor.download = `relatorio-editavel-obra-publica-${publicWorkId}.docx`
  anchor.click()
  anchor.remove()
}

export const PublicWorkServiceQuery = {
  loadPublicWorks,
  loadPublicWorkQueue,
  getPublicWorkById,
  getPublicWorksWithCollectsInQueue,
  deletePublicWork,
  addPublicWork,
  updatePublicWork,
  countPublicWork,
  getPublicWorkReportDocx
}
