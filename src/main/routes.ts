import {Router} from 'express'
import {addCategoriaFactory} from '../factories/Categoria/addCategoriaFactory'
import multerConfig from './midwares/multer'
import multer from 'multer'
import {addPhotoFactory} from '../factories/Photo/addPhotoFactory'
import {ListCategoriaFactory} from '../factories/Categoria/listCategoriaFactory'
import {updateCategoriaFactory} from '../factories/Categoria/updateCategoriaFactory'
import { deleteCategoriaFactory } from '../factories/Categoria/deleteCategoriaFactory'
import { deletePhotoFactory } from '../factories/Photo/deletePhotoFactory'
import { ListPhotoFactory } from '../factories/Photo/listPhotoFactory'

const route = Router()

route.post('/categoria', async (req, res)=>{
  const addCategoria = addCategoriaFactory()
  const response = await addCategoria.handle(req)
  return res.status(response.statusCode).json(response.body)
})
route.get('/categorias', async (req, res)=>{
  const listCategorias = ListCategoriaFactory()
  const response = await listCategorias.handle(req)
  return res.status(response.statusCode).json(response.body)
})

route.put('/categoria/:id', async (req, res)=>{
  const updateCategoria = updateCategoriaFactory()
  const response = await updateCategoria.handle(req)
  return res.status(response.statusCode).json(response.body)
})

route.delete('/categoria/:id', async (req, res)=>{
  const deleteCategoria = deleteCategoriaFactory()
  const response = await deleteCategoria.handle(req)
  return res.status(response.statusCode).json(response.body)
})


route.post('/photo',multer(multerConfig).single('photo'),  async (req, res)=>{
  const addPhoto = addPhotoFactory()
  const response = await addPhoto.handle(req)
  return res.status(response.statusCode).json(response.body)
})

route.delete('/photo/:id', async (req, res)=>{
  const deletePhoto = deletePhotoFactory()
  const response = await deletePhoto.handle(req)
  return res.status(response.statusCode).json(response.body)
})

route.get('/photos', async(req, res)=>{
  const listPhoto = ListPhotoFactory()
  const response = await listPhoto.handle(req)
  return res.status(response.statusCode).json(response.body)
})

export default route