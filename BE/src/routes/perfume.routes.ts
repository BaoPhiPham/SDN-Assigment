import { Router } from 'express'
import {
  getAllPerfumesController,
  getPerfumeByIdController,
  searchPerfumeController
} from '~/controllers/perfume.controllers.js'
import { wrapRequestHandler } from '~/utils/handleFunction.js'

const perfumeRouter = Router()

//public route:
perfumeRouter.get('/', wrapRequestHandler(getAllPerfumesController))
//Static route (/search) phải đứng trước dynamic route (/:id)
perfumeRouter.get('/search', wrapRequestHandler(searchPerfumeController))
perfumeRouter.get('/:id', wrapRequestHandler(getPerfumeByIdController))

//private route:

export default perfumeRouter
