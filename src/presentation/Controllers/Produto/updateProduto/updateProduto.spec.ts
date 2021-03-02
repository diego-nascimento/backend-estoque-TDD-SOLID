import {updateProdutoPresentation} from './updateProduto'
import {updateProduto} from '../../../../domain/usercases/Produto/updateProduto'
import { IProdutoEntry } from '../../../../domain/usercases/Produto/addProduto'
import { httpRequest, IProduto } from '../addProduto/protocols'
import { IPhoto } from '../../../../domain/model/Photo'


const fakePhoto: IPhoto = {
  id: 1,
  url: 'fake url'
}

const fakeProduto: IProduto ={
  id: 1,
  name: 'fake name',
  description: 'fake desc',
  resume: 'fake resume',
  preco: 15.25,
  photos: [fakePhoto, fakePhoto],
  categoria: {
    id: 1,
    name: 'fake name',
    photo: {
      id: 1,
      url: 'fake url'
    }
  }
}

const makeUpdateProduto = ()=>{
  class updateProdutoSlug implements updateProduto{
    async update(produto: IProdutoEntry, id:number):Promise<IProduto>{
      return Promise.resolve(fakeProduto)
    }
  }
  return new updateProdutoSlug
}

describe('Update Produto', ()=>{
  test('Should return 400 if no name is provided', async ()=>{
    const updateProdutoSlug = makeUpdateProduto()
    const sut = new updateProdutoPresentation(updateProdutoSlug)
    const httpRequest: httpRequest = {
      body: {
        description: 'desc test',
        resume: 'resume test',
        preco: 25.15,
        photos: [
          1, 2, 3
        ],
        categoria: 1
      },
      params:{
        id: 1
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: name'})
    
  })

  test('Should return 400 if no description is provided', async ()=>{
    const updateProdutoSlug = makeUpdateProduto()
    const sut = new updateProdutoPresentation(updateProdutoSlug)
    const httpRequest: httpRequest = {
      body: {
        name: 'fake name',
        resume: 'resume test',
        preco: 25.15,
        photos: [
          1, 2, 3
        ],
        categoria: 1
      },
      params:{
        id: 1
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: description'})
  })

  test('Should return 400 if no resume is provided', async ()=>{
    const updateProdutoSlug = makeUpdateProduto()
    const sut = new updateProdutoPresentation(updateProdutoSlug)
    const httpRequest: httpRequest = {
      body: {
        name: 'fake name',
        description: 'desc test',
        preco: 25.15,
        photos: [
          1, 2, 3
        ],
        categoria: 1
      },
      params:{
        id: 1
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: resume'})
    
  })

  test('Should return 400 if no preço is provided', async ()=>{
    const updateProdutoSlug = makeUpdateProduto()
    const sut = new updateProdutoPresentation(updateProdutoSlug)
    const httpRequest: httpRequest = {
      body: {
        name: 'fake name',
        description: 'desc test',
        resume: 'resume test',
        photos: [
          1, 2, 3
        ],
        categoria: 1
      },
      params:{
        id: 1
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: preco'})
    
  })

  test('Should return 400 if no photos is provided', async ()=>{
    const updateProdutoSlug = makeUpdateProduto()
    const sut = new updateProdutoPresentation(updateProdutoSlug)
    const httpRequest: httpRequest = {
      body: {
        name: 'fake name',
        description: 'desc test',
        preco: 25.25,
        resume: 'resume test',
        categoria: 1
      },
      params:{
        id: 1
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: photos'})
    
  })

  test('Should return 400 if no categoria is provided', async ()=>{
    const updateProdutoSlug = makeUpdateProduto()
    const sut = new updateProdutoPresentation(updateProdutoSlug)
    const httpRequest: httpRequest = {
      body: {
        name: 'fake name',
        description: 'desc test',
        preco: 25.25,
        resume: 'resume test',
        photos: [
          1, 2, 3
        ],
      },
      params:{
        id: 1
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: categoria'})
  })

  test('Should return 400 if no id is provided', async ()=>{
    const updateProdutoSlug = makeUpdateProduto()
    const sut = new updateProdutoPresentation(updateProdutoSlug)
    const httpRequest: httpRequest = {
      body: {
        name: 'fake name',
        description: 'desc test',
        preco: 25.25,
        resume: 'resume test',
        photos: [
          1, 2, 3
        ],
        categoria: 1
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: id'})
  })
})