export {PrismaClient} from '@prisma/client'
export * from '../../../../domain/model/categoria';

//add Categoria
export * from  '../../../../data/protocols/Categoria/addCategoriaRepository'
export * from '../../../../domain/usercases/Categoria/addCategoria'

// List categorias
export * from '../../../../data/protocols/Categoria/listCategoriaRepository'

//update categoria
export * from '../../../../data/protocols/Categoria/updateCategoriaRepository'

//delete categoria
export * from '../../../../data/protocols/Categoria/deleteCategoriaRepository'
