import HTTP_STATUS from '~/constants/httpStatus.js'
import { BRANDS_MESSAGE } from '~/constants/messages.js'
import { ErrorWithStatus } from '~/models/error.model.js'
import { Brand } from '~/models/index.js'

class BrandService {
  async getAllBrands() {
    const brands = await Brand.find({ is_deleted: false })
    return brands
  }
  async getBrandById(brandId: string) {
    const brand = await Brand.findOne({ _id: brandId, is_deleted: false })

    if (!brand) {
      throw new ErrorWithStatus({
        message: BRANDS_MESSAGE.BRAND_NOT_FOUND, //
        status: HTTP_STATUS.BAD_REQUEST
      })
    }
    return brand
  }
  async createBrand(brandName: string) {
    const brand = await Brand.create({ brandName })
    return brand ? brand : null
  }
  async updateBrand(brandId: string, brandName: string) {
    const brand = await Brand.findByIdAndUpdate(brandId, { brandName }, { new: true })
    if (!brand) return null
    return brand
  }
  async deleteBrand(brandId: string) {
    const brand = await Brand.findByIdAndUpdate(brandId, { is_deleted: true })
    if (!brand) return null
    return brand
  }
}
const brandService = new BrandService()
export default brandService
