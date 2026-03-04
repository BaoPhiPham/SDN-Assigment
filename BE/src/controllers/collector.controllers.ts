import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus.js'
import { COLLECTORS_MESSAGE } from '~/constants/messages.js'
import collectorService from '~/services/collector.services.js'

export const getAllCollectorsController = async (req: Request, res: Response) => {
  const result = await collectorService.getAllCollectors()
  res.status(HTTP_STATUS.OK).json({ message: COLLECTORS_MESSAGE.GET_ALL_COLLECTORS_SUCCESS, data: result })
}
