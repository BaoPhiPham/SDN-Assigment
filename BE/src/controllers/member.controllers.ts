import { Request, Response } from 'express'
import HTTP_STATUS from '~/constants/httpStatus.js'
import { USERS_MESSAGE } from '~/constants/messages.js'
import memberServices from '../services/member.services.js'
import { matchedData } from 'express-validator'
import { ChangePasswordPayload, UpdateProfilePayload } from '~/types/requests/requestPayload.js'

export const updateProfileController = async (req: Request, res: Response) => {
  const payload = matchedData<UpdateProfilePayload>(req)
  const userId = req.userDecoded?.userId
  const result = await memberServices.updateProfileService(userId, payload)
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGE.UPDATE_ME_SUCCESS,
    data: result
  })
}

export const changePasswordController = async (req: Request, res: Response) => {
  const payload = matchedData<ChangePasswordPayload>(req) as ChangePasswordPayload
  const token = req.cookies.refreshToken
  const userId = req.userDecoded?.userId
  const result = await memberServices.changePasswordService(userId, payload, token)
  res.status(HTTP_STATUS.OK).json({
    message: USERS_MESSAGE.CHANGE_PASSWORD_SUCCESS,
    data: result
  })
}
