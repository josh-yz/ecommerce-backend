import { GalleryModel } from "../../entities/gallery"


export interface IGalleryResponse {
    id?: string
    _id?: string
    image: string
    order : number
    created_at: Date
    items?: any
    item?: any
}


export interface IGallery {
  add: (product: GalleryModel) => Promise<IGalleryResponse>
  get?: (id: GalleryModel) => Promise<IGalleryResponse>
  getAll?: (product: GalleryModel) => Promise<IGalleryResponse>
  update?: (id: GalleryModel, body: any) => Promise<IGalleryResponse>
  remove?: (id: GalleryModel) => Promise<IGalleryResponse>

}
