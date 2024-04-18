import { getDocumentsRepository } from '../repository/DocumentsRepository'

export const getDocumentsService = async () => {

  const allDocuments = await getDocumentsRepository()
  return allDocuments
}
