import {ListProdutoCategoria} from '../../../presentation/Controllers/Produto/ListProdutoCategoria/listProdutoCategoria'
import {dbListProdutoCategoria} from '../../../data/useCases/Produto/listProdutoCategoria'
import {listProdutoCategoriaPostgres} from '../../../infra/db/postgres/ProdutoRepository/listProdutoCategoriaRepository'


export const ListProdutoCategoriaFactory = ()=>{
  const listCategoriaProdutoInfra = new listProdutoCategoriaPostgres;
  const listCategoriaProdutoData = new dbListProdutoCategoria(listCategoriaProdutoInfra)
  const listCategoriaProdutoPresentation = new ListProdutoCategoria(listCategoriaProdutoData)
  return listCategoriaProdutoPresentation
}