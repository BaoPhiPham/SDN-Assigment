import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus.js'
import { PERFUMES_MESSAGE } from '~/constants/messages.js'
import perfumeServices from '~/services/perfume.services.js'

export const getAllPerfumesController = async (req: Request, res: Response) => {
  const perfumes = await perfumeServices.getAllPerfumesService()
  res.status(HTTP_STATUS.OK).json({
    message: PERFUMES_MESSAGE.GET_ALL_PERFUMES_SUCCESS, //
    perfumes
  })
}

export const getPerfumeByIdController = async (req: Request, res: Response) => {
  const perfume = await perfumeServices.getPerfumeByIdService(req.params.id as string)
  res.status(HTTP_STATUS.OK).json({
    message: PERFUMES_MESSAGE.GET_PERFUME_BY_ID_SUCCESS,
    perfume
  })
}

export const searchPerfumeController = async (req: Request, res: Response) => {
  const perfumeName = req.query.name ? (req.query.name as string).trim() : ''
  const brandName = req.query.brandName ? (req.query.brandName as string).trim() : ''
  const perfumes = await perfumeServices.searchPerfumeService(perfumeName, brandName)
  res.status(HTTP_STATUS.OK).json({
    message: PERFUMES_MESSAGE.GET_ALL_PERFUMES_SUCCESS,
    perfumes
  })
}
