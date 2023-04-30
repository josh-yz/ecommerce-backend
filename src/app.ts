console.log(`'Express server port: \x1b[32m${process.env.PORT}\x1b[0m`)
console.log('Base de datos  puerto 27017: \x1b[32m%s\x1b[0m', 'online')


///https://paulallies.medium.com/cle 

//domain/repositories contiene los metodos que se van a utilizar para conectar a la base de datos
//a mi me da igual yo uso mysql o mongo

//src/
// ├── domain/
// │   ├── models/
// │   │   ├── User.ts   entity
// │   │   └── Product.ts
// │   ├── repositories/
// │   │   ├── UserRepository.ts  // contienelas interface
// │   │   └── ProductRepository.ts
// │   └── services/
// │       ├── UserService.ts
// │       └── ProductService.ts
// ├── infrastructure/
// │   ├── persistence/
// │   │   ├── UserPersistence.ts // mongo
// │   │   └── ProductPersistence.ts
// │   └── web/
// │       ├── controllers/
// │       │   ├── UserController.ts
// │       │   └── ProductController.ts
// │       ├── routes/
// │       │   ├── userRoutes.ts
// │       │   └── productRoutes.ts
// │       └── server.ts
// ├── application/
// │   ├── use-cases/
// │   │   ├── CreateUserUseCase.ts
// │   │   ├── GetUserUseCase.ts
// │   │   ├── UpdateUserUseCase.ts
// │   │   ├── DeleteUserUseCase.ts
// │   │   ├── CreateProductUseCase.ts
// │   │   ├── GetProductUseCase.ts
// │   │   ├── UpdateProductUseCase.ts
// │   │   └── DeleteProductUseCase.ts
// │   ├── dtos/
// │   │   ├── UserDto.ts
// │   │   └── ProductDto.ts
// │   └── mapper/
// │       ├── UserMapper.ts
// │       └── ProductMapper.ts
// └── main.ts






//src/
// ├── domain/
// │   ├── models/
// │   │   ├── User.ts
// │   │   └── Product.ts
// │   ├── repositories/
// │   │   ├── UserRepository.ts
// │   │   └── ProductRepository.ts
// │   └── services/
// │       ├── UserService.ts
// │       └── ProductService.ts
// ├── infrastructure/
// │   ├── persistence/
// │   │   ├── UserPersistence.ts
// │   │   └── ProductPersistence.ts
// │   └── web/
// │       ├── controllers/
// │       │   ├── UserController.ts
// │       │   └── ProductController.ts
// │       ├── routes/
// │       │   ├── userRoutes.ts
// │       │   └── productRoutes.ts
// │       └── server.ts
// ├── application/
// │   ├── use-cases/
// │   │   ├── CreateUserUseCase.ts
// │   │   ├── GetUserUseCase.ts
// │   │   ├── UpdateUserUseCase.ts
// │   │   ├── DeleteUserUseCase.ts
// │   │   ├── CreateProductUseCase.ts
// │   │   ├── GetProductUseCase.ts
// │   │   ├── UpdateProductUseCase.ts
// │   │   └── DeleteProductUseCase.ts
// │   ├── dtos/
// │   │   ├── UserDto.ts
// │   │   └── ProductDto.ts
// │   └── mapper/
// │       ├── UserMapper.ts
// │       └── ProductMapper.ts
// └── main.ts
