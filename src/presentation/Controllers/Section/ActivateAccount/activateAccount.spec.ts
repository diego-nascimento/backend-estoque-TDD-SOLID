import {ActivateControllerPresentation} from './ActivateAccount'
import {ActivateAccountUseCase} from '../../../../domain/usercases/Section/ActivationAccount'
import { httpRequest } from '../../../protocols/http'

const makeActivateAccountSlug = () =>{
  class activateAccountSlug implements ActivateAccountUseCase{
    async activate(code: string): Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new activateAccountSlug
}

describe('Activate Account', ()=>{
  test('Should return 400 if no query is provided', async ()=>{
    const Slug = makeActivateAccountSlug()
    const sut = new ActivateControllerPresentation(Slug)
    const httpRequest: httpRequest  ={
      
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: code'})
  })

  test('Should return 400 if no code is provided', async ()=>{
    const Slug = makeActivateAccountSlug()
    const sut = new ActivateControllerPresentation(Slug)
    const httpRequest: httpRequest  ={
      query:{

      }
    }

    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(400)
    expect(response.body).toEqual({Error: 'Bad Request: Missing Param: code'})
  })

  test('Should return 500 if something goes wrong', async ()=>{
    const Slug = makeActivateAccountSlug()
    const sut = new ActivateControllerPresentation(Slug)
    const httpRequest: httpRequest  ={
      query:{
        code: 'jaidjiosjdoisjiodjioasjdiojsadsadjios'
      }
    }

    jest.spyOn(Slug, 'activate').mockImplementationOnce(async ()=>{
      return Promise.resolve(false)
    })
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(500)
    expect(response.body).toEqual({Error: 'Something went wrong: Error on activating Account'})
  })

  test('Should return 200 if something goes allright', async ()=>{
    const Slug = makeActivateAccountSlug()
    const sut = new ActivateControllerPresentation(Slug)
    const httpRequest: httpRequest  ={
      query:{
        code: 'jaidjiosjdoisjiodjioasjdiojsadsadjios'
      }
    }
    const response = await sut.handle(httpRequest)
    expect(response.statusCode).toBe(200)
    expect(response.body).toEqual({data: true})
  })
})