import { Injectable } from "@angular/core"
import * as firebase from "firebase"
import { Progresso } from "./progresso.service"

@Injectable()
export class Bd {

    constructor(private progresso: Progresso) { }

    public publicar(publicacao: any): void {

        //console.log(publicacao)

        let nomeImagem = Date.now()

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
        /*
        firebase.database().ref(`publicacoes/${btoa(publicacao.email)}`)
            .push({ titulo: publicacao.titulo })
        */

    }
}