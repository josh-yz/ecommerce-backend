import { NoReadyExist, ServerError } from '../errors'
import { HttpResponse } from '../interfaces/http'

export const badRequest = (error: Error): HttpResponse => ({
  statusCode: 400,
  body: error
})

export const unauthorized = (error: Error): HttpResponse => ({
  statusCode: 401,
  body: { name: error.message }
})

export const notFound = (data: any): HttpResponse => ({
  statusCode: 404,
  body: new NoReadyExist(data)
})

export const forbidden = (error: any): HttpResponse => ({
  statusCode: 403,
  body: error
})

export const serverError = (error: Error): HttpResponse => ({
  statusCode: 500,
  body: new ServerError(error.stack)
})

export const success = (data: any): HttpResponse => ({
  statusCode: 200,
  body: { data }
})

export const created = (data: any): HttpResponse => ({
  statusCode: 201,
  body: { data }
})

export const noContent = (): HttpResponse => ({
  statusCode: 201,
  body: {}
})

/**
 * 
 * Este código es un módulo de utilidades para crear diferentes tipos de respuestas HTTP en una aplicación web o API en Node.js.

Las funciones expuestas son las siguientes:

    badRequest: Crea una respuesta HTTP con un código de estado 400 (solicitud incorrecta) y el cuerpo del error pasado como argumento.
    unauthorized: Crea una respuesta HTTP con un código de estado 401 (no autorizado) y el cuerpo con un objeto que contiene el nombre del error pasado como argumento.
    notFound: Crea una respuesta HTTP con un código de estado 404 (no encontrado) y el cuerpo con un objeto que representa un error personalizado para indicar que el recurso solicitado no existe.
    forbidden: Crea una respuesta HTTP con un código de estado 403 (prohibido) y el cuerpo del error pasado como argumento.
    serverError: Crea una respuesta HTTP con un código de estado 500 (error interno del servidor) y el cuerpo con un objeto que representa un error personalizado para indicar que se produjo un error en el servidor.
    success: Crea una respuesta HTTP con un código de estado 200 (éxito) y el cuerpo con un objeto que contiene los datos pasados como argumento.
    created: Crea una respuesta HTTP con un código de estado 201 (creado) y el cuerpo con un objeto que contiene los datos pasados como argumento.
    noContent: Crea una respuesta HTTP con un código de estado 204 (sin contenido) y un cuerpo vacío.

Estas funciones son útiles para mantener la coherencia en la forma en que se manejan las respuestas HTTP en toda la aplicación y para evitar la duplicación de código.
 */