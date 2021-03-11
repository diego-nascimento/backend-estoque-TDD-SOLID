import {ICreateSection, IcreateSectionEntry} from '../../../../domain/usercases/Section/createSection'
import { badRequest, forbidden, ok, serverError} from '../../../helpers/http-helpers';
import { Icontrollers } from '../../../protocols/controllers';
import { httpRequest, httpResponse } from '../../../protocols/http';

export class createSectionPresentation implements Icontrollers{
  private readonly createSection: ICreateSection
  
  constructor(createSection: ICreateSection){
    this.createSection = createSection
  }

  async handle(httpRequest: httpRequest): Promise<httpResponse>{
    try {
      const requestedFields = ['login', 'password']
    for (const field of requestedFields) {
      if(!httpRequest.body[field]){
        return badRequest(Error('Missing Param: '  + field))
      }
    }
    const {login, password} = httpRequest.body
    const data: IcreateSectionEntry = {login, password}
    const response = await this.createSection.createSection(data)
    if (response.status === 402) {
      return forbidden()
    }
    return ok(response)
    } catch (error) {
      return serverError(error)
    }
  }
}