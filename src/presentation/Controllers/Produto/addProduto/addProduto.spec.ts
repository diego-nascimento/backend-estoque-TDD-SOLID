import {addProduto} from './addProduto'
import {addProdutouseCase, IProdutoEntry} from '../../../../domain/usercases/Produto/addProduto'
import { IProduto } from '../../../../domain/model/produto'
import { IPhoto } from '../../../../domain/model/Photo'
import { httpRequest } from '../../../protocols/http'
import { serverError } from '../../../helpers/http-helpers'

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

const makeaddProdutouseCase = ()=>{
  class addProdutouseCaseSlug implements addProdutouseCase{
     add(produto: IProdutoEntry): Promise<IProduto>{
      return new Promise(resolve => resolve(fakeProduto))
     }
  }
  return new addProdutouseCaseSlug
}

describe('add Produto', ()=>{
  test('Should return 400 if no name is provided', async ()=>{
    const sut = new addProduto(makeaddProdutouseCase())
    const httpRequest: httpRequest = {
      body: {
        description: 'desc test',
        resume: 'resume test',
        photos: [
          1, 2, 3
        ],
        categoria: 1
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: name'})

  })

  test('Should return 400 if no description is provided', async ()=>{
    const sut = new addProduto(makeaddProdutouseCase())
    const httpRequest: httpRequest = {
      body: {
        name: 'name test',
        resume: 'resume test',
        photos: [
          1, 2, 3
        ],
        categoria: 1
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: description'})

  })

  test('Should return 400 if no resume is provided', async ()=>{
    const sut = new addProduto(makeaddProdutouseCase())
    const httpRequest: httpRequest = {
      body: {
        name: 'name test',
        description: 'description test',
        photos: [
          1, 2, 3
        ],
        categoria: 1
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: resume'})

  })

  test('Should return 400 if no photos is provided', async ()=>{
    const sut = new addProduto(makeaddProdutouseCase())
    const httpRequest: httpRequest = {
      body: {
        name: 'name test',
        description: 'description test',
        resume: 'resume test',
        categoria: 1
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: photos'})

  })

  test('Should return 400 if no categoria is provided', async ()=>{
    const sut = new addProduto(makeaddProdutouseCase())
    const httpRequest: httpRequest = {
      body: {
        name: 'name test',
        description: 'description test',
        resume: 'resume test',
        photos: [
          1, 2, 3
        ]
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: categoria'})

  })

  test('Should return 400 if no preço is provided', async ()=>{
    const sut = new addProduto(makeaddProdutouseCase())
    const httpRequest: httpRequest = {
      body: {
        name: 'name test',
        description: 'description test',
        resume: 'resume test',
        categoria: 1,
        photos: [
          1, 2, 3
        ]
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: preco'})

  })

  test('Should return 500 if something goes wrong', async ()=>{
    const sut = new addProduto(makeaddProdutouseCase())
    const httpRequest: httpRequest = {
      body: {
        name: 'name test',
        description: 'description test',
        resume: 'resume test',
        photos: [
          1, 2, 3
        ],
        categoria: 1
      }
    }
    const serverErrorTest = serverError(new Error('teste'))

    jest.spyOn(sut, 'handle').mockReturnValueOnce(new Promise(resolve => resolve(serverErrorTest)))

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: 'Something went wrong: teste'})

  })

  test('Should return 200 if goes right', async ()=>{
    const sut = new addProduto(makeaddProdutouseCase())
    const httpRequest: httpRequest = {
      body: {
        name: 'name test',
        description: 'description test',
        resume: 'resume test',
        preco: 25.25,
        photos: [
        1, 2, 3
        ],
        categoria: 1
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual(fakeProduto)

  })

})