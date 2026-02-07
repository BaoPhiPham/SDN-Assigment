import { Brand, Perfume } from '~/models/index.js'
import { PerfumeSearchFilter } from '~/types/requests/requestPayload.js'

class PerfumeService {
  async getAllPerfumesService() {
    const result = await Perfume.find({})
      .select({
        perfumeName: 1, //0 là ko ko lấy, 1 là lấy
        uri: 1,
        targetAudience: 1
      })
      .populate({
        path: 'brand',
        select: 'brandName'
      })
    return result
  }
  async getPerfumeByIdService(id: string) {
    return await Perfume.findById(id).populate({
      path: 'brand',
      select: 'brandName'
    })
  }
  async searchPerfumeService(perfumeName?: string, brandName?: string) {
    const filter: PerfumeSearchFilter = {}
    if (perfumeName) {
      filter.perfumeName = {
        $regex: perfumeName,
        $options: 'i'
      }
    }
    if (brandName) {
      const brand = await Brand.findOne({ brandName })
      if (!brand) return []
      filter.brand = brand._id
    }

    const result = await Perfume.find(filter)
      .select({
        perfumeName: 1, //0 là ko ko lấy, 1 là lấy
        uri: 1,
        targetAudience: 1
      })
      .populate({
        path: 'brand',
        select: 'brandName'
      })
    return result
  }
}

export default new PerfumeService()
