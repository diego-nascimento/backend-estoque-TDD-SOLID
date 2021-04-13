import { IProduto } from "../../model/produto";

export interface ProdutoPhotoEntry{
  id:number
}

export interface ProdutoCategoriasEntry{
  id:number
}

export interface IProdutoEntry{
  name: string,
  description: string,
  resume: string,
  photos: Array<ProdutoPhotoEntry>
  categorias: Array<ProdutoCategoriasEntry>
  preco: number
}

export interface addProdutouseCase{
  add(produto: IProdutoEntry): Promise<IProduto>
}