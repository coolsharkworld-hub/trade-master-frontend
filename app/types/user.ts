import Entity from './entity'

export interface User extends Entity {
  firstName: string
  lastName: string
  email: string
  phone: string
}
