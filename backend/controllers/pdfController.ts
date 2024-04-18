import { getDocumentsService } from '../services/DocumentsService'
import { NextApiRequest, NextApiResponse } from 'next'
import onError from '@/backend/middlewares/errors'

export const getDocumentsController = async (
  req: NextApiRequest,
  res: NextApiResponse
) => {
  try {
    const user = await getDocumentsService()
    return res.status(201).json({
      user,
    })
  } catch (error: any) {
    onError(error, req, res)
  }
}
