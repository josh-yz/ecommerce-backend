import { DbAddGallery } from "../../application/use-cases/gallery/db-gallery"
import { FileManagerAdapter } from "../../utils-adapters/file-manager-adapter"
import { GalleryMongoRepository } from "../repositories/mongo/gallery-repository"
import { ProductMongoRepository } from "../repositories/mongo/product-repository"
import { GetGalleriesProductByIdController, RegisterGalleryController, RemoveGalleryController } from "../web/controllers/gallery/gallery"



export const makeRegisterGalleryController = (): RegisterGalleryController => {
    const galleryMongoRepository = new GalleryMongoRepository()
    const dbAddGallery = new DbAddGallery(galleryMongoRepository)
    const iProductRepository = new ProductMongoRepository()
    const fileManagerAdapter =  new FileManagerAdapter();
    const registerGalleryController = new RegisterGalleryController(dbAddGallery, iProductRepository, galleryMongoRepository,fileManagerAdapter)
    return registerGalleryController
  }

  export const makeGetGalleriesProductByIdController = (): GetGalleriesProductByIdController => {
    const galleryMongoRepository = new GalleryMongoRepository()
    const dbAddGallery = new DbAddGallery(galleryMongoRepository)
    const getGalleriesProductByIdController = new GetGalleriesProductByIdController(dbAddGallery, galleryMongoRepository)
    return getGalleriesProductByIdController
  }
  
  export const makeRemoveGalleryController = (): RemoveGalleryController => {
    const galleryMongoRepository = new GalleryMongoRepository()
    const dbAddGallery = new DbAddGallery(galleryMongoRepository)
    const fileManagerAdapter =  new FileManagerAdapter();
    const removeGalleryController = new RemoveGalleryController(dbAddGallery, galleryMongoRepository,fileManagerAdapter)
    return removeGalleryController
  }
  