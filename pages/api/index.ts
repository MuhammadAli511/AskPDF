import dbConnect from '@/backend/utils/dbConnect'
import { getDocumentsController } from '@/backend/controllers/pdfController'
import { NextApiRequest, NextApiResponse } from 'next'
import { createRouter } from 'next-connect'

dbConnect()
const router = createRouter<NextApiRequest, NextApiResponse>()

router.get(async (req, res) => {
  return getDocumentsController(req, res)
})

export default router.handler({})
