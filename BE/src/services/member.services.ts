import { USERS_MESSAGE } from '~/constants/messages.js'
import { Member } from '~/models/index.js'
import { ChangePasswordPayload, UpdateProfilePayload } from '~/types/requests/requestPayload.js'
import { hashFunction } from '~/utils/hash.js'
import authService from './auth.services.js'

class MemberService {
  async getMemberById(userId: string) {
    const user = await Member.findById(userId).select('-password')
    if (!user) {
      throw new Error(USERS_MESSAGE.USER_NOT_FOUND)
    }
    return user
  }
  async updateProfileService(userId: string, payload: UpdateProfilePayload) {
    const updated = await Member.findByIdAndUpdate(userId, payload, { new: true }).select('-password')

    if (!updated) {
      throw new Error(USERS_MESSAGE.USER_NOT_FOUND)
    }

    return updated
  }

  async changePasswordService(userId: string, payload: ChangePasswordPayload, token: string) {
    const member = await Member.findById(userId).select('-password')
    if (!member) {
      throw new Error(USERS_MESSAGE.USER_NOT_FOUND)
    }
    const hashOldPassword = hashFunction(payload.old_password)
    const hashNewPassword = hashFunction(payload.password)
    if (hashOldPassword !== member.password) {
      throw new Error(USERS_MESSAGE.OLD_PASSWORD_NOT_MATCH)
    }
    member.password = hashNewPassword
    await member.save()
    await authService.logoutService(token)
    return true
  }
}
const memberService = new MemberService()
export default memberService
