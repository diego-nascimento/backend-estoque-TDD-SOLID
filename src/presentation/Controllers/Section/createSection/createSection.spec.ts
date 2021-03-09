import {createSectionPresentation} from './createSection'
import {ICreateSection, IcreateSectionEntry, IcreateSectionReturn} from '../../../../domain/usercases/Section/createSection'
import { httpRequest } from '../../../protocols/http'

const fakeReturn:IcreateSectionReturn = {
  token: 'fake token'
}

const makeSlug = ()=>{
  class slug implements ICreateSection{
    async createSection(data: IcreateSectionEntry): Promise<IcreateSectionReturn>{
      return Promise.resolve(fakeReturn)
    }
  }
  return new slug
}

describe('Create section presentation', ()=>{
  test('Should return 400 if no login is provided', async()=>{
    const slug = makeSlug()
    const sut = new createSectionPresentation(slug)

    const httpRequest: httpRequest = {
      body: {
        password: 'teste password'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: "Bad Request: Missing Param: login"})
  })

  test('Should return 400 if no password is provided', async()=>{
    const slug = makeSlug()
    const sut = new createSectionPresentation(slug)

    const httpRequest: httpRequest = {
      body: {
        login: 'teste login',
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: "Bad Request: Missing Param: password"})
  })

  test('Should call create section with correct values', async()=>{
    const slug = makeSlug()
    const sut = new createSectionPresentation(slug)
    const httpRequest: httpRequest = {
      body: {
        login: 'teste login',
        password: 'test password'
      }
    }

    const spy = jest.spyOn(slug, 'createSection')
    await sut.handle(httpRequest)
    expect(spy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('Should return 500 if createSection Throws', async()=>{
    const slug = makeSlug()
    const sut = new createSectionPresentation(slug)
    const httpRequest: httpRequest = {
      body: {
        login: 'teste login',
        password: 'test password'
      }
    }

    jest.spyOn(slug, 'createSection').mockImplementationOnce(()=>{
      throw new Error('teste')
    })
    const response = await sut.handle(httpRequest)

    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: 'Something went wrong: teste'})
  })
})