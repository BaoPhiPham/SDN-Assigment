import HTTP_STATUS from '~/constants/httpStatus.js'
import { BRANDS_MESSAGE, PERFUMES_MESSAGE } from '~/constants/messages.js'
import { ErrorWithStatus } from '~/models/error.model.js'
import { Brand, Perfume } from '~/models/index.js'
import { CreatePerfumePayload, PerfumeSearchFilter, UpdatePerfumePayload } from '~/types/requests/requestPayload.js'

class PerfumeService {
  async getAllPerfumesService() {
    const result = await Perfume.find({ is_deleted: false })
      .populate({
        path: 'brand',
        select: 'brandName'
      })
    return result
  }
  async getPerfumeByIdService(id: string) {
    return await Perfume.findOne({ _id: id, is_deleted: false }).populate({
      path: 'brand',
      select: 'brandName'
    })
  }
  async searchPerfumeService(perfumeName?: string, brandName?: string) {
    const filter: PerfumeSearchFilter = {}

    if (perfumeName) {
      const escaped = perfumeName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&') //tránh user gửi regex nguy hiểm
      filter.perfumeName = { $regex: escaped, $options: 'i' }
    }
    if (brandName) {
      const brand = await Brand.findOne({ brandName, is_deleted: false })
      if (!brand) return []
      filter.brand = brand._id
    }

    const result = await Perfume.find({ ...filter, is_deleted: false })
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
  async createPerfume(payload: CreatePerfumePayload) {
    const brand = await Brand.findOne({ brandName: payload.brand as string })
    if (!brand) {
      throw new ErrorWithStatus({
        message: BRANDS_MESSAGE.BRAND_NOT_FOUND,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    payload.brand = brand._id
    const newPerfume = await Perfume.create(payload)
    return newPerfume
  }
  async updatePerfume(id: string, payload: UpdatePerfumePayload) {
    if (payload.brand) {
      const brand = await Brand.findOne({ brandName: payload.brand as string })
      if (!brand) {
        throw new ErrorWithStatus({
          message: BRANDS_MESSAGE.BRAND_NOT_FOUND,
          status: HTTP_STATUS.NOT_FOUND
        })
      }
      payload.brand = brand._id
    }
    const updatedPerfume = await Perfume.findByIdAndUpdate(id, payload, {
      new: true
    })
    if (!updatedPerfume) {
      throw new ErrorWithStatus({
        message: PERFUMES_MESSAGE.UPDATE_PERFUME_FAIL,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    return updatedPerfume
  }
  async deletePerfume(id: string) {
    const perfume = await Perfume.findByIdAndUpdate(id, { is_deleted: true })
    if (!perfume) {
      throw new ErrorWithStatus({
        message: PERFUMES_MESSAGE.DELETE_PERFUME_FAIL,
        status: HTTP_STATUS.NOT_FOUND
      })
    }
    return perfume
  }
}
const perfumeService = new PerfumeService()
export default perfumeService
