export {PrismaClient} from '@prisma/client'
export { IProduto } from "../../../../domain/model/produto";

//add produto
export { IProdutoEntry } from "../../../../domain/usercases/Produto/addProduto";
export { addProdutoRepository } from "../../../../data/protocols/Produtos/addProdutoRepository";

//getproduto
export {getProdutoRepository} from '../../../../data/protocols/Produtos/getProdutoRespository'

//listProdutoCategoria
export {listProdutoCategoriaRepository} from '../../../../data/protocols/Produtos/listProdutoCategoriaRepository'


//listprodutos
export { listProdutoRepository } from "../../../../data/protocols/Produtos/listProdutoRepository";
export { IPhoto } from "../../../../domain/model/Photo";


//updateProduto

export { updateProdutoRepository } from "../../../../data/protocols/Produtos/updateProdutoRepository";

//delete Produto

export {deleteProdutoRepository} from '../../../../data/protocols/Produtos/deleteProdutoRepository'
