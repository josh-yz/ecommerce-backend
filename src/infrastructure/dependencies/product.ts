import { DbAddProduct } from "../../application/use-cases/product/db-product";
import { FileManagerAdapter } from "../../utils-adapters/file-manager-adapter";
import { ProductMongoRepository } from "../repositories/mongo/product-repository";
import { GetProductController, ListProductsCategoryController, ListProductsController, RegisterProductController, RemoveProductController, UpdateDataProductController, UpdateProductController } from "../web/controllers/product/product";


export const makeListProductsController = (): ListProductsController => {
    const productMongoRepository = new ProductMongoRepository()
    const dbAddProduct = new DbAddProduct(productMongoRepository)
    const listProductsController = new ListProductsController(dbAddProduct, productMongoRepository)
    return listProductsController;
}

export const makeRegisterProductController = (): RegisterProductController => {
    const productMongoRepository = new ProductMongoRepository()
    const dbAddProduct = new DbAddProduct(productMongoRepository)
    // const iCategoryRepository = new CategoryMongoRepository()
    const fileManagerAdapter =  new FileManagerAdapter();
    const registerProductController = new RegisterProductController(dbAddProduct, productMongoRepository,fileManagerAdapter)
    return registerProductController
  }

  export const makeUpdateProductController = (): [UpdateProductController,UpdateDataProductController] => {
    const productMongoRepository = new ProductMongoRepository()
    const dbAddProduct = new DbAddProduct(productMongoRepository)
    const fileManagerAdapter =  new FileManagerAdapter();
    const updateProductController = new UpdateProductController(dbAddProduct, productMongoRepository,fileManagerAdapter)
    const updateDataProductController = new UpdateDataProductController(dbAddProduct, productMongoRepository,fileManagerAdapter)
    return [updateProductController,updateDataProductController]
  }



  export const makeRemoveProductController = (): RemoveProductController => {
    const productMongoRepository = new ProductMongoRepository()
    const dbAddProduct = new DbAddProduct(productMongoRepository)
    const fileManagerAdapter =  new FileManagerAdapter();
    const removeProductController = new RemoveProductController(dbAddProduct, productMongoRepository,fileManagerAdapter)
    return removeProductController
  }


  export const makeListProductsCategoryController = (): ListProductsCategoryController => {
    const productMongoRepository = new ProductMongoRepository()
    const dbAddProduct = new DbAddProduct(productMongoRepository)
    const listProductsCategoryController = new ListProductsCategoryController(dbAddProduct, productMongoRepository)
    return listProductsCategoryController;
}


export const makeGetProductController = (): GetProductController => {

  const productMongoRepository = new ProductMongoRepository()
  const dbAddProduct = new DbAddProduct(productMongoRepository)
  const getProductController = new GetProductController(dbAddProduct, productMongoRepository)
  return getProductController
}

  