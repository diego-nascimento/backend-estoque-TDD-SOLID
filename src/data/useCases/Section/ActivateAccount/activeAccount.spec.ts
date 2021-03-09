import {ActivateAccount} from './ActivateAccount'
import {ActivateAccountRepository} from '../../../protocols/Section/ActivateAccount'

const fakeCode: string = 'asiojdiosajdijosaoidsiadoiasjdjiasijodjsa'

const makeSlug = ()=>{
  class slug implements ActivateAccountRepository{
    async activate(code: string): Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new slug
}

describe('Activate Account Data', ()=>{
  test('Should throw if Activate throws', async()=>{
    const slug = makeSlug()
    const sut = new ActivateAccount(slug)

    jest.spyOn(slug, 'activate').mockImplementationOnce(()=>{
      throw new Error()
    })

    const promise = sut.activate(fakeCode)
    await expect(promise).rejects.toThrowError()
  })

  test('Should have been called with correct values', async()=>{
    const slug = makeSlug()
    const sut = new ActivateAccount(slug)

    const spy = jest.spyOn(slug, 'activate')

    await sut.activate(fakeCode)
    expect(spy).toHaveBeenCalledWith(fakeCode)
  })

  test('Should return true if success', async()=>{
    const slug = makeSlug()
    const sut = new ActivateAccount(slug)
    const response = await sut.activate(fakeCode)
    expect(response).toEqual(true)
  })
})