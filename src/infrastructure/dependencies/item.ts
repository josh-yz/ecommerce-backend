import { DbAddItem } from "../../application/use-cases/db-item/db-item"
import { ItemMongoRepository } from "../repositories/mongo/item-repository"
import { ProductMongoRepository } from "../repositories/mongo/product-repository"
import { GetItemController, GetItemsProductByIdController, ListItemsController, RegisterItemController, RemoveItemController } from "../web/controllers/item/item"


export const makeRegisterItemController = (): RegisterItemController => {

    const itemMongoRepository = new ItemMongoRepository()
    const dbAddItem = new DbAddItem(itemMongoRepository)
    const iProductRepository = new ProductMongoRepository()
    const registerItemController = new RegisterItemController(dbAddItem, iProductRepository, itemMongoRepository)
    return registerItemController
  }

  export const makeListItemsController = (): ListItemsController => {
    const itemMongoRepository = new ItemMongoRepository()
    const dbAddItem = new DbAddItem(itemMongoRepository)
    const listItemsController = new ListItemsController(dbAddItem, itemMongoRepository)
    return listItemsController
  }


  export const makeGetItemsProductByIdController = (): GetItemsProductByIdController => {

    const itemMongoRepository = new ItemMongoRepository()
  
    const dbAddItem = new DbAddItem(itemMongoRepository)
    const getItemsProductByIdController = new GetItemsProductByIdController(dbAddItem, itemMongoRepository)
    return getItemsProductByIdController
  }
  
  export const makeRemoveItemController = (): RemoveItemController => {

    const itemMongoRepository = new ItemMongoRepository()
    const dbAddItem = new DbAddItem(itemMongoRepository)
    const removeItemController = new RemoveItemController(dbAddItem, itemMongoRepository)
    return removeItemController
  }
  