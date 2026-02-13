import { Request, Response } from 'express'
import { matchedData } from 'express-validator'
import HTTP_STATUS from '~/constants/httpStatus.js'
import { PERFUMES_MESSAGE } from '~/constants/messages.js'
import perfumeServices from '~/services/perfume.services.js'
import { CreatePerfumePayload, UpdatePerfumePayload } from '~/types/requests/requestPayload.js'

export const getAllPerfumesController = async (req: Request, res: Response) => {
  const perfumes = await perfumeServices.getAllPerfumesService()
  res.status(HTTP_STATUS.OK).json({
    message: PERFUMES_MESSAGE.GET_ALL_PERFUMES_SUCCESS, //
    data: perfumes
  })
}

export const getPerfumeByIdController = async (req: Request, res: Response) => {
  const perfume = await perfumeServices.getPerfumeByIdService(req.params.id as string)
  res.status(HTTP_STATUS.OK).json({
    message: PERFUMES_MESSAGE.GET_PERFUME_BY_ID_SUCCESS,
    data: perfume
  })
}

export const searchPerfumeController = async (req: Request, res: Response) => {
  const perfumeName = req.query.name ? (req.query.name as string).trim() : ''
  const brandName = req.query.brandName ? (req.query.brandName as string).trim() : ''
  const perfumes = await perfumeServices.searchPerfumeService(perfumeName, brandName)
  res.status(HTTP_STATUS.OK).json({
    message: PERFUMES_MESSAGE.GET_ALL_PERFUMES_SUCCESS,
    data: perfumes
  })
}

export const createPerfumeController = async (req: Request, res: Response) => {
  const payload = matchedData<CreatePerfumePayload>(req)
  const perfume = await perfumeServices.createPerfume(payload)
  if (!perfume) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: PERFUMES_MESSAGE.CREATE_PERFUME_FAIL
    })
  }
  res.status(HTTP_STATUS.CREATED).json({
    message: PERFUMES_MESSAGE.CREATE_PERFUME_SUCCESS,
    data: perfume
  })
}

export const updatePerfumeController = async (req: Request, res: Response) => {
  const payload = matchedData<UpdatePerfumePayload>(req)
  const perfume = await perfumeServices.updatePerfume(req.params.id as string, payload)
  if (!perfume) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: PERFUMES_MESSAGE.UPDATE_PERFUME_FAIL
    })
  }
  res.status(HTTP_STATUS.OK).json({
    message: PERFUMES_MESSAGE.UPDATE_PERFUME_SUCCESS,
    data: perfume
  })
}

export const deletePerfumeController = async (req: Request, res: Response) => {
  const perfume = await perfumeServices.deletePerfume(req.params.id as string)
  if (!perfume) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: PERFUMES_MESSAGE.DELETE_PERFUME_FAIL
    })
  }
  res.status(HTTP_STATUS.OK).json({
    message: PERFUMES_MESSAGE.DELETE_PERFUME_SUCCESS,
    data: perfume
  })
}
