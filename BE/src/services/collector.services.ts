import { Member } from '~/models/index.js'

class CollectorService {
  async getAllCollectors() {
    const collectors = await Member.find({}).select('-password')
    return collectors
  }
}

const collectorService = new CollectorService()
export default collectorService
