import HTTP_STATUS from '~/constants/httpStatus.js'
import { USERS_MESSAGE } from '~/constants/messages.js'

//dùng cho các error có các status khác như 500, 401, 404,... ko phải status 422
export class ErrorWithStatus {
  message: string
  status: number
  constructor({ message, status }: { message: string; status: number }) {
    this.message = message
    this.status = status
  }
}

type ErrorsType = Record<
  string,
  {
    msg: string
    [key: string]: any //các trường khác có thể thêm vào tùy thích
  }
>

export class EntityError extends ErrorWithStatus {
  error: ErrorsType //error này là 1 object gồm các error validation bên trong
  constructor({
    message = USERS_MESSAGE.VALIDATION_ERROR, //message trổng thì ta cho mặc định vì biết là lỗi Validate r
    error //các lỗi validate ErrorsType
    // status // do EntityError dành cho Validation thì status luôn là 422 => ko cần filed này
  }: {
    message?: string //thêm chấm hỏi là có hoặc ko có
    error: ErrorsType
    // status: number
  }) {
    super({ message, status: HTTP_STATUS.UNPROCESSABLE_ENTITY })
    this.error = error
  }
}
