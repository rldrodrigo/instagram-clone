import { Injectable } from "@angular/core"
import { Router } from "@angular/router"
import { Usuario } from "./acesso/usuario.model"
import * as firebase from "firebase"

@Injectable()
export class Autenticacao {

    public token_id: string = ''

    constructor(private router: Router) { }


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
            .then((resposta: any) => {
                firebase.auth().currentUser?.getIdToken()
                    .then((idToken: string) => {
                        this.token_id = idToken
                        localStorage.setItem('idToken', idToken) //Passa como parametro chave / valor
                        this.router.navigate(['/home'])
                    })
            })
            .catch((error: Error) => console.log(error))
    }

    public autenticado(): boolean {

        if (this.token_id === '' && localStorage.getItem('idToken') != null) {
            // @ts-expect-error Ignora o erro de estar atribuindo null porém já está sendo tratado no null
            this.token_id = localStorage.getItem('idToken')
        }

        if (this.token_id === '') {
            this.router.navigate(['/'])
        }

        return (this.token_id !== '')
    }

    public sair(): void {
        firebase.auth().signOut()
            .then(() => {
                localStorage.removeItem('idToken')
                this.token_id = ''
                this.router.navigate(['/'])
            })

    }
}