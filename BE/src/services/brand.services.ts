import { BRANDS_MESSAGE } from '~/constants/messages.js'
import { Brand } from '~/models/index.js'

class BrandService {
  async getAllBrands() {
    const brands = await Brand.find({})
    return brands
  }
  async getBrandById(brandId: string) {
    const brand = await Brand.findById(brandId)
    if (!brand) throw new Error(BRANDS_MESSAGE.BRAND_NOT_FOUND)
    return brand
  }
  async createBrand(brandName: string) {
    const brand = await Brand.create({ brandName })
    return brand ? brand : null
  }
  async updateBrand(brandId: string, brandName: string) {
    const brand = await Brand.findByIdAndUpdate(brandId, { brandName }, { new: true })
    if (!brand) return false
    return true
  }
  async deleteBrand(brandId: string) {
    const brand = await Brand.findByIdAndDelete(brandId)
    if (!brand) return false
    return true
  }
}
const brandService = new BrandService()
export default brandService
