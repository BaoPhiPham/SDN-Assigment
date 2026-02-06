//này là tạo type thủ công cho expiresIn khi tạo token trong user.services
export type StringValue = `${number}${'s' | 'm' | 'h' | 'd' | 'w' | 'y'}` | `${number}`
