//importar interfaces ou entities
export {};
declare global {
  namespace Express {
    interface Request {
      validated: any; // importar os tipos e colocar aqui exemplo: User | Car etc..
      token: string;
      userAuth: any;
    }
  }
}
