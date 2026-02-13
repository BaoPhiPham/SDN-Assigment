import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus.js'
import { BRANDS_MESSAGE } from '~/constants/messages.js'
import brandService from '~/services/brand.services.js'
import { CreateBrandPayload } from '~/types/requests/requestPayload.js'

export const getAllBrandsController = async (req: Request, res: Response) => {
  const result = await brandService.getAllBrands()
  res.status(HTTP_STATUS.OK).json({
    message: BRANDS_MESSAGE.GET_ALL_BRANDS_SUCCESS,
    data: result
  })
}

export const getBrandByIdController = async (req: Request, res: Response) => {
  const result = await brandService.getBrandById(req.params.brandId as string)
  res.status(HTTP_STATUS.OK).json({
    message: BRANDS_MESSAGE.GET_BRAND_BY_ID_SUCCESS,
    data: result
  })
}

export const createBrandController = async (req: Request, res: Response) => {
  const { brandName } = req.body as CreateBrandPayload
  const result = await brandService.createBrand(brandName)
  if (!result) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: BRANDS_MESSAGE.CREATE_BRAND_FAILED
    })
  }
  res.status(HTTP_STATUS.CREATED).json({
    message: BRANDS_MESSAGE.CREATE_BRAND_SUCCESS,
    data: result
  })
}

export const updateBrandController = async (req: Request, res: Response) => {
  const { brandName } = req.body as CreateBrandPayload
  const result = await brandService.updateBrand(req.params.brandId as string, brandName)
  if (!result) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: BRANDS_MESSAGE.UPDATE_BRAND_FAILED
    })
  }
  res.status(HTTP_STATUS.OK).json({
    message: BRANDS_MESSAGE.UPDATE_BRAND_SUCCESS,
    data: result
  })
}

export const deleteBrandController = async (req: Request, res: Response) => {
  const result = await brandService.deleteBrand(req.params.brandId as string)
  if (!result) {
    return res.status(HTTP_STATUS.BAD_REQUEST).json({
      message: BRANDS_MESSAGE.DELETE_BRAND_FAILED
    })
  }
  res.status(HTTP_STATUS.OK).json({
    message: BRANDS_MESSAGE.DELETE_BRAND_SUCCESS,
    data: result
  })
}
