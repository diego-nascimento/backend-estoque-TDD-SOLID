import {countEstoque} from './countEstoque'
import {CountEstoque} from '../../../../domain/usercases/Estoque/AmoutEstoque'
import { httpRequest } from '../../../protocols/http'

const makeSlug = ()=>{
  class slug implements CountEstoque{
    async Count(produto: number): Promise<number>{
      return Promise.resolve(20)
    }
  }
  return new slug
}

describe('Count Stock Item', ()=>{
  test('Should return 400 if not produto is provided', async()=>{
    const slug = makeSlug()
    const sut = new countEstoque(slug)

    const httpRequest:httpRequest = {
      body:{
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error:'Bad Request: Missing param produto'})
  })

  test('Should return 500 count throws', async()=>{
    const slug = makeSlug()
    const sut = new countEstoque(slug)

    const httpRequest:httpRequest = {
      body:{
        produto: 1
      }
    }
    jest.spyOn(slug, 'Count').mockImplementationOnce(()=>{
      throw new Error('teste')
    })
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: 'Something went wrong: teste'})
  })

  test('Should return 200 if success', async()=>{
    const slug = makeSlug()
    const sut = new countEstoque(slug)

    const httpRequest:httpRequest = {
      body:{
        produto: 1
      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body.data).toEqual(20)
  })
})