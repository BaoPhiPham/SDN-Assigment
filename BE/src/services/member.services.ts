import { USERS_MESSAGE } from '~/constants/messages.js'
import { Member } from '~/models/index.js'
import { ChangePasswordPayload, UpdateProfilePayload } from '~/types/requests/requestPayload.js'
import { hashFunction } from '~/utils/hash.js'

class MemberService {
  async updateProfileService(userId: string, payload: UpdateProfilePayload) {
    return (await Member.findByIdAndUpdate(userId, payload, { new: true })) ? 'success' : 'fail'
  }

  async changePasswordService(userId: string, payload: ChangePasswordPayload) {
    const member = await Member.findById(userId)
    if (!member) {
      throw new Error(USERS_MESSAGE.USER_NOT_FOUND)
    }
    const hashOldPassword = hashFunction(payload.old_password)
    const hashNewPassword = hashFunction(payload.password)
    if (hashOldPassword !== member.password) {
      throw new Error(USERS_MESSAGE.OLD_PASSWORD_NOT_MATCH)
    }
    return (await Member.findByIdAndUpdate(userId, { password: hashNewPassword }, { new: true })) ? 'success' : 'fail'
  }
}

export default new MemberService()
