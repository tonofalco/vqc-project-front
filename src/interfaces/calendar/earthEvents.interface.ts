// obtener eventos terrestres
export interface EarthEventGetData {
  id: number
  transportNumber: string
  transport: string
  seats: string
  nameClient: string
  phone: string
  departure: string
  destination: string
  price: number
  advance: number
  start: string
  end: string
  title: string
  status: string
  notes: string
  userId: string
  createdAt: string
  updatedAt: string
  user: {
    name: string
  }
}

// datos del formulario (todos los campos como strings para input HTML)
export interface EarthEventFormData {
  transportNumber: string
  transport: string
  seats: string
  nameClient: string
  phone: string
  departure: string
  destination: string
  price: string
  advance: string
  start: string
  end: string
  title: string
  status: string
  notes: string
}

// crear evento terrestre
export interface EarthEventRequest {
  transportNumber: number
  transport: string
  seats: number
  nameClient: string
  phone: number
  departure: string
  destination: string
  start: number
  end: number
  price: number
  advance: number
  notes: string
  title: string
  status: string
}

// // respuesta esperada al crear o actualizar un evento terrestre
// export interface EarthEventResponse {
//   ok: boolean
//   evento: {
//   id: number
//   transportNumber: number
//   transport: string
//   seats: number
//   nameClient: string
//   phone: number
//   departure: string
//   destination: string
//   price: number
//   advance: number
//   start: string
//   end: string
//   status: string
//   notes: string
//   userId: string
//   createdAt: string
//   updatedAt: string
//   }
// }