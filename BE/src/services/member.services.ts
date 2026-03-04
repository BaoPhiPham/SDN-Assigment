import { USERS_MESSAGE } from '~/constants/messages.js'
import { Member } from '~/models/index.js'
import { ChangePasswordPayload, UpdateProfilePayload } from '~/types/requests/requestPayload.js'
import { comparePassword, hashPassword } from '~/utils/hash.js'
import authService from './auth.services.js'
import { ErrorWithStatus } from '~/models/error.model.js'
import HTTP_STATUS from '~/constants/httpStatus.js'

class MemberService {
  async getMemberById(userId: string) {
    const user = await Member.findById(userId).select('-password')
    if (!user) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.USER_NOT_FOUND, //
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }
    return user
  }
  async updateProfileService(userId: string, payload: UpdateProfilePayload) {
    const updated = await Member.findByIdAndUpdate(userId, payload, { new: true }).select('-password')

    if (!updated) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.USER_NOT_FOUND, //
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }

    return updated
  }

  async changePasswordService(userId: string, payload: ChangePasswordPayload, token: string) {
    const member = await Member.findById(userId)
    if (!member) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.USER_NOT_FOUND, //
        status: HTTP_STATUS.UNAUTHORIZED
      })
    }
    //nếu oauth2 thì ko change pass đc
    if (!member.password) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.ACCOUNT_USES_GOOGLE_LOGIN_CANNOT_CHANGE_PASSWORD, //
        status: HTTP_STATUS.BAD_REQUEST
      })
    }
    //
    if (!(await comparePassword(payload.old_password, member.password as string))) {
      throw new ErrorWithStatus({
        message: USERS_MESSAGE.OLD_PASSWORD_NOT_MATCH, //
        status: HTTP_STATUS.BAD_REQUEST
      })
    }
    member.password = await hashPassword(payload.password)
    await member.save()
    await authService.logoutService(token)
    return true
  }
}
const memberService = new MemberService()
export default memberService
