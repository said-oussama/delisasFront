import { Role } from './role';

export class User {
  iduser: number;
  email: string;
  password: string;
  firstName: string;
  lastName: string;
  avatar: string;
  role: Role;
  token?: string;
  username: string;
  roleUser: string
}
