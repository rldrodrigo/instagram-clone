import { Usuario } from "./acesso/usuario.model"
import * as firebase from "firebase"

export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario): Promise<any> {

        return firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
            .then((resposta: any) => {

                //remove a senha do atributo senha do usuario
                // o comando abaixo serve para ignorar o erro que fere o atributo da interface criada
                // @ts-expect-error Aqui vai ocorrer um erro, mas estou ignorando  
                delete usuario.senha

                //registra dados complementares no path email na base64
                firebase.database().ref(`usuario_detalhe/${btoa(usuario.email)}`)
                    .set(usuario)

            })
            .catch((error: Error) => {
                console.log(error)
            })
    }

    public autenticar(email: string, senha: string): void {
        console.log('email: ', email, ' senha: ', senha)
        firebase.auth().signInWithEmailAndPassword(email, senha)
            .then((resposta: any) => console.log(resposta))
            .catch((error: Error) => console.log(error))
    }
}