import { GalleryModel } from "../entities/gallery"
import { IGalleryResponse } from "../use-cases/gallery/gallery"


export interface IGalleryRepository {
  add: (productData:GalleryModel) => Promise<IGalleryResponse>
  getAll: () => Promise<IGalleryResponse>
  getOne: (email: string) => Promise<IGalleryResponse>
  getById: (id: string) => Promise<IGalleryResponse>
  delete: (id: string) => Promise<IGalleryResponse>
  update: (id: GalleryModel, body: GalleryModel) => Promise<IGalleryResponse>
  count: (value?: any) => Promise<IGalleryResponse>
  select: (value?: any) => Promise<IGalleryResponse>
  getGalleriesByProductId?: (id: string) => Promise<IGalleryResponse>

}


