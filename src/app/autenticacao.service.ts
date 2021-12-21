import { Usuario } from "./acesso/usuario.model"
import * as firebase from "firebase"

export class Autenticacao {
    public cadastrarUsuario(usuario: Usuario): void {

        firebase.auth().createUserWithEmailAndPassword(usuario.email, usuario.senha)
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
}