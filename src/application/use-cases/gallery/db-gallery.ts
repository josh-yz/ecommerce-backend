import { GalleryModel } from "../../../domian/entities/gallery"
import { IGalleryRepository } from "../../../domian/repositories/gallery-repository"
import { IGallery,IGalleryResponse } from "../../../domian/use-cases/gallery/gallery"

export class DbAddGallery implements IGallery {

  constructor(private readonly iGalleryRepository: IGalleryRepository) {
    this.iGalleryRepository = iGalleryRepository
  }
    async add (item: GalleryModel): Promise<IGalleryResponse> {
      const itemDb = await this.iGalleryRepository.add(item)
      return new Promise(resolve => resolve(
        itemDb
      ))
    }

    async getAll (gallery: GalleryModel): Promise<IGalleryResponse> {

      return new Promise(resolve => resolve(
        gallery
      ))
    }

    async get (item: GalleryModel): Promise<IGalleryResponse> {      
      return new Promise(resolve => resolve(
        item
      ))
    }

    async update (id: GalleryModel, body: GalleryModel): Promise<IGalleryResponse> {
      
      const itemUpdated = await this.iGalleryRepository.update(id, body)

      if(!itemUpdated) throw(new Error('Error to updated item'))
      
      return new Promise(resolve => resolve(
        itemUpdated
      ))
    }

    async remove (item: any): Promise<IGalleryResponse> {


      
      let { id } = item.item
      
      const itemDeleted = await this.iGalleryRepository.delete(id)
      
      return new Promise(resolve => resolve(
        itemDeleted
      ))
    }
}

