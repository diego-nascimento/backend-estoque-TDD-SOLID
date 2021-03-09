import {dbCheckAvailable} from './checkAvailable'
import {checkAvailableRepository} from '../../../protocols/Estoque/ckeckAvailableRepository'

const makeSlug = ()=>{
  class slug implements checkAvailableRepository{
    async check(produto: number, quantidade: number):Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new slug
}

describe('Check Availability', ()=>{
  test('Throws if check throws', async ()=>{
    const slug = makeSlug()
    const sut = new dbCheckAvailable(slug)

    jest.spyOn(slug, 'check').mockImplementationOnce(()=>{
      throw new Error()
    })

    const promise = sut.check(11, 1)
    await expect(promise).rejects.toThrow()
  })

  test('Should call check with correct values', async ()=>{
    const slug = makeSlug()
    const sut = new dbCheckAvailable(slug)
    const spy = jest.spyOn(slug, 'check')
    await sut.check(1, 2)
    expect(spy).toHaveBeenCalledWith(1, 2)
  })

  test('Should return false if dont checks', async ()=>{
    const slug = makeSlug()
    const sut = new dbCheckAvailable(slug)
    jest.spyOn(slug, 'check').mockImplementationOnce(()=>{
      return Promise.resolve(false)
    })
    const response = await sut.check(1, 2)
    expect(response).toEqual(false)
   })

   test('Should return true if checks', async ()=>{
    const slug = makeSlug()
    const sut = new dbCheckAvailable(slug)
    const response = await sut.check(1, 2)
    expect(response).toEqual(true)
   })
})