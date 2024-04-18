import Document from '../models/document'

export const getDocumentsRepository = async () => {
    const allDocuments = await Document.find()
    return allDocuments
}
