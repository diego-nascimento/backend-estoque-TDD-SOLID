import { IPhoto } from "../../model/Photo";
import { IProduto } from "../../model/produto";

export interface ProdutoPhotoEntry{
  id:number
}

export interface IProdutoEntry{
  name: string,
  description: string,
  resume: string,
  photos: Array<ProdutoPhotoEntry>
}

export interface addProdutouseCase{
  add(produto: IProdutoEntry): Promise<IProduto>
}