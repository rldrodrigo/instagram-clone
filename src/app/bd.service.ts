import { Injectable } from "@angular/core"
import * as firebase from "firebase"
import { Progresso } from "./progresso.service"

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }

    public publicar(publicacao: any): void {


        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
            .then((resposta: any) => {
                let nomeImagem = resposta.key

                firebase.storage().ref()
                    .child(`imagens/${nomeImagem}`)
                    .put(publicacao.imagem)
                    .on(firebase.storage.TaskEvent.STATE_CHANGED,
                        //Acompanhamento do progresso do upload
                        (snapshot: any) => {
                            this.progresso.status = 'andamento'
                            this.progresso.estado = snapshot
                        },
                        (error) => {
                            this.progresso.status = 'erro'
                        },
                        () => {
                            //finalização do processo
                            this.progresso.status = 'concluido'
                        }
                    )
            })
    }

    public consultaPublicacoes(emailUsuario: string): Promise<any> {
        return new Promise((resolve, reject) => {

            //consultar as publicações (database)
            firebase.database().ref(`publicacoes/${btoa(emailUsuario)}`)
                .once('value')
                .then((snapshot: any) => {
                    //console.log(snapshot.val())
                    let publicacoes: Array<any> = [];

                    snapshot.forEach((childSnapshot: any) => {

                        let publicacao = childSnapshot.val()

                        //consultar a url da imagem (storage)
                        firebase.storage().ref()
                            .child(`imagens/${childSnapshot.key}`)
                            .getDownloadURL()
                            .then((url: string) => {
                                publicacao.url_imagem = url

                                //consultar o nome do usuário responsável pela publicação
                                firebase.database().ref(`usuario_detalhe/${btoa(emailUsuario)}`)
                                    .once('value')
                                    .then((snapshot: any) => {
                                        publicacao.nome_usuario = snapshot.val().nome_usuario
                                        publicacoes.push(publicacao)
                                    })
                            })
                    });
                    resolve(publicacoes)
                })
        })


    }
}