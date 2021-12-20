import { Usuario } from "./acesso/usuario.model"

export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario): void {
        console.log('Chegamos até o serviço: ', usuario)
    }
}