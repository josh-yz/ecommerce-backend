# [ CODERHOUSE ] PROYECTO FINAL - CURSO DE PROGRAMACIÓN BACKEND [ CLEAN ARCHITECTURE ]  
## 🟢 Profesor - [Marcos Villanueva](https://github.com/marcosvillanueva9)
## 🟢 Tutor - [Ariel Sotelo]

## Build & Run


### Instalar dependencias

Desde la consola, situarse en la carpeta del proyecto y ejecutar:

```js
npm i
```

### Modos de Ejecución

* Entorno de Producción
```js
npm run start | npm run pm2
```

* Entorno de Desarrollo
```js
npm run dev


# Endpoints

## Authentication
| Método   | Ruta             | Descripción                                                                  |
| :---     | :---            | :---                                                                         |
| POST     | /auth/admin     | Autenticación para usuarios administradores.                                 |
| POST     | /auth/user      | Autenticación para usuarios clientes.                                         |

## Carrito
| Método   | Ruta                              | Descripción                                                                        |
| :---     | :---                              | :---                                                                               |
| POST     | /cart                             | Crea un nuevo carrito vacío.                                                       |
| DELETE   | /cart/:user_id/product/:product_id | Elimina un producto específico del carrito de un usuario.                          |
| DELETE   | /cart/:cart_id                    | Elimina un carrito específico.                                                      |
| GET      | /cart/:user_id                    | Devuelve el carrito de un usuario específico.                                       |

## Categoría
| Método   | Ruta                    | Descripción                                                                  |
| :---     | :---                    | :---                                                                         |
| POST     | /category               | Crea una nueva categoría.                                                     |
| GET      | /category               | Devuelve todas las categorías.                                                 |
| PUT      | /category/:id           | Actualiza una categoría específica.                                            |
| DELETE   | /category/:category_id  | Elimina una categoría específica.                                               |

## Galería
| Método   | Ruta                       | Descripción                                                                   |
| :---     | :---                       | :---                                                                          |
| POST     | /gallery/:product_id       | Agrega una imagen a la galería de un producto específico.                     |
| DELETE   | /gallery/:gallery_id       | Elimina una imagen específica de la galería de un producto específico.        |
| GET      | /gallery/:product_id       | Devuelve todas las imágenes de la galería de un producto específico.          |

## Item
| Método   | Ruta                          | Descripción                                                                    |
| :---     | :---                          | :---                                                                           |
| POST     | /item/:product_id             | Agrega un nuevo item a un producto específico.                                 |
| GET      | /item                         | Devuelve todos los items.                                                       |
| DELETE   | /item/:item_id                | Elimina un item específico.                                                     |
| GET      | /item/:product_id             | Devuelve los items de un producto específico.                                   |

## Pedido
| Método   | Ruta                          | Descripción                                                                    |
| :---     | :---                          | :---                                                                           |
| POST     | /order                        | Crea un nuevo pedido a partir de un carrito existente.                           |
| GET      | /order/:user_id               | Devuelve todos los pedidos realizados por un usuario específico.                |

## Producto
| Método   | Ruta                          | Descripción                                                                    |
| :---     | :---                          | :---                                                                           |
| GET      | /product                      | Devuelve todos los productos.                                                   |
| POST     | /product                      | Crea un nuevo producto.                                                          |
| DELETE   | /product/:product_id          | Elimina un producto específico.                                                  |
| PUT      | /product/data/:product_id     | Actualiza la información de un producto específico.                             |
| GET      | /product/:product_id          | Devuelve la información de un producto específico.                               |
| GET      | /product/category/:category_id| Devuelve todos los productos de una categor
