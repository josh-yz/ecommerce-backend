import shortid from 'shortid'
import { Iuuid } from '../infrastructure/web/interfaces/Iuuid'


export class Uuid implements Iuuid {
  async id (): Promise<string> {
    const id = await shortid.generate()
    return id
  }
}
