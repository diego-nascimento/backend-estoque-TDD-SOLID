import {createSectionData} from './createSection'

import {IsearchUser} from '../../../protocols/Section/searchUser'
import {generateJWT} from '../../../../infra/JsonWebToken/protocols/generate'
import {CompareEncryptedData} from '../../../../infra/Encrypt/Protocols/compareEncryptedData'
import { IUser } from '../../../../domain/model/user'
import { ICategoriaEntry } from '../../../../domain/usercases/Categoria/addCategoria'
import { IcreateSectionEntry } from '../../../../domain/usercases/Section/createSection'

const makegenerateJWTSlug = () =>{
  class generateSlug implements generateJWT{
    generate(value: string): string{
      return 'fake token'
    }
  }
  return new generateSlug
}

const makeCompareSlug = () =>{
  class compareSlug implements CompareEncryptedData{
    async compare(value: string, hashedValue: string):Promise<boolean>{
      return Promise.resolve(true)
    }
  }
  return new compareSlug
}

const fakeUser: IUser = {
  email: 'fake email',
  nome: 'fake name',
  password: 'fake password'
}

const makeSearchSlug = () =>{
  class searchSlug implements IsearchUser{
    async search(login: string): Promise<IUser>{
      return Promise.resolve(fakeUser)
    }
  }
  return new searchSlug
}

describe('Createa Session', ()=>{
  test('Should throw if Search throws', async()=>{
    const searchslug = makeSearchSlug()
    const compareSlug = makeCompareSlug()
    const generateslug = makegenerateJWTSlug()
    const sut = new createSectionData(searchslug, compareSlug, generateslug)
    jest.spyOn(searchslug, 'search').mockImplementationOnce(()=>{
      throw new Error()
    })
    const data:IcreateSectionEntry = {
      login: 'teste login',
      password: 'test password'
    }

    const promise = sut.createSection(data)
    await expect(promise).rejects.toThrowError()
  })

  test('Should call searchUser with correct values', async()=>{
    const searchslug = makeSearchSlug()
    const compareSlug = makeCompareSlug()
    const generateslug = makegenerateJWTSlug()
    const sut = new createSectionData(searchslug, compareSlug, generateslug)
    const spy = jest.spyOn(searchslug, 'search')

    const data:IcreateSectionEntry = {
      login: 'teste login',
      password: 'test password'
    }

    await sut.createSection(data)
    expect(spy).toHaveBeenCalledWith(data.login)
  })

  test('Should throw if Compare throws', async()=>{
    const searchslug = makeSearchSlug()
    const compareSlug = makeCompareSlug()
    const generateslug = makegenerateJWTSlug()
    const sut = new createSectionData(searchslug, compareSlug, generateslug)
    jest.spyOn(compareSlug, 'compare').mockImplementationOnce(()=>{
      throw new Error()
    })
    const data:IcreateSectionEntry = {
      login: 'teste login',
      password: 'test password'
    }

    const promise = sut.createSection(data)
    await expect(promise).rejects.toThrowError()
  })

  test('Should throw if compare return false', async()=>{
    const searchslug = makeSearchSlug()
    const compareSlug = makeCompareSlug()
    const generateslug = makegenerateJWTSlug()
    const sut = new createSectionData(searchslug, compareSlug, generateslug)
    jest.spyOn(compareSlug, 'compare').mockImplementationOnce(()=>{
      return Promise.resolve(false)
    })
    const data:IcreateSectionEntry = {
      login: 'teste login',
      password: 'test password'
    }

    const promise = sut.createSection(data)
    await expect(promise).rejects.toThrowError()
  })

  test('Should call compare with correct values', async()=>{
    const searchslug = makeSearchSlug()
    const compareSlug = makeCompareSlug()
    const generateslug = makegenerateJWTSlug()
    const sut = new createSectionData(searchslug, compareSlug, generateslug)
    const spy = jest.spyOn(compareSlug, 'compare')

    const data:IcreateSectionEntry = {
      login: 'teste login',
      password: 'test password'
    }

    await sut.createSection(data)
    expect(spy).toHaveBeenCalledWith(data.password, fakeUser.password)
  })

  test('Should throw if generate throws', async()=>{
    const searchslug = makeSearchSlug()
    const compareSlug = makeCompareSlug()
    const generateslug = makegenerateJWTSlug()
    const sut = new createSectionData(searchslug, compareSlug, generateslug)
    jest.spyOn(generateslug, 'generate').mockImplementationOnce(()=>{
      throw new Error()
    })
    const data:IcreateSectionEntry = {
      login: 'teste login',
      password: 'test password'
    }

    const promise = sut.createSection(data)
    await expect(promise).rejects.toThrowError()
  })

  test('Should call generate with correct values', async()=>{
    const searchslug = makeSearchSlug()
    const compareSlug = makeCompareSlug()
    const generateslug = makegenerateJWTSlug()
    const sut = new createSectionData(searchslug, compareSlug, generateslug)
    const spy = jest.spyOn(generateslug, 'generate')

    const data:IcreateSectionEntry = {
      login: 'teste login',
      password: 'test password'
    }

    await sut.createSection(data)
    expect(spy).toHaveBeenCalledWith(data.login)
  })

  test('Should call generate with correct values', async()=>{
    const searchslug = makeSearchSlug()
    const compareSlug = makeCompareSlug()
    const generateslug = makegenerateJWTSlug()
    const sut = new createSectionData(searchslug, compareSlug, generateslug)

    const data:IcreateSectionEntry = {
      login: 'teste login',
      password: 'test password'
    }

    const response = await sut.createSection(data)
    expect(response).toEqual({token: 'fake token'})
  })
})

