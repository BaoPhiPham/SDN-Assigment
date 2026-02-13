import { Request, Response } from 'express'
import { COLLECTORS_MESSAGE } from '~/constants/messages.js'
import collectorService from '~/services/collector.services.js'

export const getAllCollectorsController = async (req: Request, res: Response) => {
  const result = await collectorService.getAllCollectors()
  res.status(200).json({ message: COLLECTORS_MESSAGE.GET_ALL_COLLECTORS_SUCCESS, data: result })
}
