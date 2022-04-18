//importar interfaces ou entities
import { User } from "../entities/User";

declare global {
  namespace Express {
    interface Request {
      validated: User; // importar os tipos e colocar aqui exemplo: User | Car etc..
      token: string;
      userAuth: any;
    }
  }
}
